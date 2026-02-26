import { useRef, useCallback, useState } from "react";

/**
 * Real-time voice hook: connects to the voice-agent Worker via WebSocket.
 *
 * Protocol:
 * - Text frames (JSON): control messages (transcript, response tokens, etc.)
 * - Binary frames: audio data (client→server: mic audio, server→client: TTS mp3)
 */

// Silence detection config
const SILENCE_THRESHOLD = 12;
const SILENCE_DURATION_MS = 1500;
const MIN_SPEECH_MS = 400;

export type LiveStatus =
  | "disconnected"
  | "connecting"
  | "ready"
  | "listening"
  | "processing"
  | "speaking"
  | "error";

interface UseRealtimeVoiceOptions {
  workerUrl: string;
  onTranscript?: (text: string) => void;
  onResponseToken?: (token: string, fullText: string) => void;
  onResponseComplete?: (text: string) => void;
  onError?: (message: string) => void;
}

export function useRealtimeVoice(opts: UseRealtimeVoiceOptions) {
  const { workerUrl, onTranscript, onResponseToken, onResponseComplete, onError } = opts;

  const [status, setStatus] = useState<LiveStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceStartRef = useRef<number | null>(null);
  const recordingStartRef = useRef<number>(0);
  const isListeningRef = useRef(false);
  const statusRef = useRef<LiveStatus>("disconnected");

  // Audio playback queue
  const audioQueueRef = useRef<Blob[]>([]);
  const isPlayingRef = useRef(false);

  const setStatusBoth = useCallback((s: LiveStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  // ─── Audio playback ───

  const playNext = useCallback(() => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      if (!isPlayingRef.current && audioQueueRef.current.length === 0) {
        // All audio played — if we're in "speaking" status, go back to ready
        if (statusRef.current === "speaking") {
          setStatusBoth("ready");
          // Auto-restart listening for continuous conversation
          setTimeout(() => {
            if (wsRef.current?.readyState === WebSocket.OPEN && statusRef.current === "ready") {
              startListening();
            }
          }, 300);
        }
      }
      return;
    }

    isPlayingRef.current = true;
    if (statusRef.current !== "speaking") setStatusBoth("speaking");

    const blob = audioQueueRef.current.shift()!;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.onended = () => {
      URL.revokeObjectURL(url);
      isPlayingRef.current = false;
      playNext();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      isPlayingRef.current = false;
      playNext();
    };
    audio.play().catch(() => {
      URL.revokeObjectURL(url);
      isPlayingRef.current = false;
      playNext();
    });
  }, []);

  // ─── WebSocket connection ───

  const connect = useCallback(() => {
    if (wsRef.current) return;
    setStatusBoth("connecting");

    const wsUrl = workerUrl.replace(/^http/, "ws") + "/session";
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      // Wait for "ready" message from server
    };

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // Binary frame = TTS audio chunk (mp3)
        const blob = new Blob([event.data], { type: "audio/mpeg" });
        audioQueueRef.current.push(blob);
        if (!isPlayingRef.current) playNext();
        return;
      }

      // Text frame = JSON control message
      try {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "ready":
            setStatusBoth("ready");
            // Auto-start listening once connected
            setTimeout(() => startListening(), 200);
            break;

          case "listening":
            setStatusBoth("listening");
            break;

          case "processing":
            setStatusBoth("processing");
            break;

          case "transcript":
            onTranscript?.(msg.text);
            break;

          case "response_start":
            // Response streaming has started
            break;

          case "response_token":
            onResponseToken?.(msg.token, msg.full_text);
            break;

          case "response_complete":
            onResponseComplete?.(msg.text);
            break;

          case "audio_end":
            // All TTS audio sent. If nothing is playing, go back to ready & re-listen
            if (!isPlayingRef.current && audioQueueRef.current.length === 0) {
              setStatusBoth("ready");
              setTimeout(() => {
                if (wsRef.current?.readyState === WebSocket.OPEN && statusRef.current === "ready") {
                  startListening();
                }
              }, 300);
            }
            break;

          case "error":
            onError?.(msg.message);
            // Recover: go back to ready and restart listening
            if (statusRef.current === "processing") {
              setStatusBoth("ready");
              setTimeout(() => {
                if (wsRef.current?.readyState === WebSocket.OPEN && statusRef.current === "ready") {
                  startListening();
                }
              }, 500);
            }
            break;
        }
      } catch {
        // ignore parse errors
      }
    };

    ws.onerror = () => {
      setStatusBoth("error");
      onError?.("Connection failed");
    };

    ws.onclose = () => {
      wsRef.current = null;
      setStatusBoth("disconnected");
      stopAudio();
    };
  }, [workerUrl, onTranscript, onResponseToken, onResponseComplete, onError, playNext]);

  // ─── Mic capture + silence detection ───

  const startListening = useCallback(async () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    if (isListeningRef.current) return;

    // Barge-in: stop any playing audio
    stopAudio();
    if (statusRef.current === "speaking" || statusRef.current === "processing") {
      ws.send(JSON.stringify({ type: "interrupt" }));
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      isListeningRef.current = true;
      recordingStartRef.current = Date.now();

      // Tell server we're starting
      ws.send(JSON.stringify({ type: "start" }));

      // Send audio chunks as binary WebSocket frames
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
          e.data.arrayBuffer().then((buf) => {
            ws.send(buf);
          });
        }
      };

      recorder.onstop = () => {
        isListeningRef.current = false;
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        audioContextRef.current?.close();
        audioContextRef.current = null;

        // Tell server audio is done
        if (ws.readyState === WebSocket.OPEN) {
          if (Date.now() - recordingStartRef.current > MIN_SPEECH_MS) {
            ws.send(JSON.stringify({ type: "end_of_speech" }));
          } else {
            // Too short — restart listening
            setTimeout(() => {
              if (wsRef.current?.readyState === WebSocket.OPEN && statusRef.current !== "disconnected") {
                startListening();
              }
            }, 200);
          }
        }
      };

      // Record with timeslice to get periodic chunks
      recorder.start(250);

      // Silence detection
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      silenceStartRef.current = null;

      const dataArray = new Uint8Array(analyser.fftSize);

      function checkSilence() {
        if (!isListeningRef.current) return;
        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = (dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length) * 128;

        if (rms < SILENCE_THRESHOLD) {
          if (!silenceStartRef.current) silenceStartRef.current = Date.now();
          else if (Date.now() - silenceStartRef.current > SILENCE_DURATION_MS) {
            if (Date.now() - recordingStartRef.current > MIN_SPEECH_MS) {
              // Silence detected — stop recording
              if (mediaRecorderRef.current?.state === "recording") {
                mediaRecorderRef.current.stop();
              }
              return;
            }
          }
        } else {
          silenceStartRef.current = null;
        }

        requestAnimationFrame(checkSilence);
      }

      requestAnimationFrame(checkSilence);
    } catch (err) {
      console.error("Mic access denied:", err);
      onError?.("Microphone access denied");
    }
  }, [onError]);

  // ─── Stop audio playback ───

  const stopAudio = useCallback(() => {
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  // ─── Disconnect ───

  const disconnect = useCallback(() => {
    // Stop recording
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    isListeningRef.current = false;

    // Stop audio
    stopAudio();

    // Stop mic stream
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioContextRef.current?.close();
    audioContextRef.current = null;

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setStatusBoth("disconnected");
  }, [stopAudio]);

  return {
    status,
    connect,
    disconnect,
    startListening,
    stopAudio,
  };
}
