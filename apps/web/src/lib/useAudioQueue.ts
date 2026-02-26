import { useRef, useCallback, useState } from "react";

interface QueueItem {
  sentence: string;
  audioPromise: Promise<Blob | null>;
}

async function fetchTTS(text: string): Promise<Blob | null> {
  try {
    const res = await fetch("/api/voice/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("audio")) {
      return await res.blob();
    }
    return null; // server said use browser TTS
  } catch {
    return null;
  }
}

function browserTTS(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
      voices.find((v) => v.lang.startsWith("en-"));
    if (preferred) utt.voice = preferred;
    utt.onend = () => resolve();
    utt.onerror = () => resolve();
    window.speechSynthesis.speak(utt);
  });
}

export function useAudioQueue() {
  const queueRef = useRef<QueueItem[]>([]);
  const isPlayingRef = useRef(false);
  const abortedRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const onDrainCallbackRef = useRef<(() => void) | null>(null);

  const playNext = useCallback(async () => {
    if (abortedRef.current) {
      queueRef.current = [];
      isPlayingRef.current = false;
      setIsSpeaking(false);
      return;
    }

    const next = queueRef.current.shift();
    if (!next) {
      isPlayingRef.current = false;
      setIsSpeaking(false);
      // Queue drained — notify (for hands-free loop restart)
      onDrainCallbackRef.current?.();
      return;
    }

    isPlayingRef.current = true;
    setIsSpeaking(true);

    const blob = await next.audioPromise;

    if (abortedRef.current) {
      queueRef.current = [];
      isPlayingRef.current = false;
      setIsSpeaking(false);
      return;
    }

    if (blob) {
      // Play server TTS audio
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudioRef.current = audio;

      await new Promise<void>((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          currentAudioRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          currentAudioRef.current = null;
          resolve();
        };
        audio.play().catch(() => resolve());
      });
    } else {
      // Fallback to browser TTS
      await browserTTS(next.sentence);
    }

    if (!abortedRef.current) {
      playNext();
    }
  }, []);

  const enqueue = useCallback(
    (sentence: string) => {
      abortedRef.current = false;
      // Fire TTS request immediately (parallel prefetch)
      const audioPromise = fetchTTS(sentence);
      queueRef.current.push({ sentence, audioPromise });

      if (!isPlayingRef.current) {
        playNext();
      }
    },
    [playNext]
  );

  const abort = useCallback(() => {
    abortedRef.current = true;
    queueRef.current = [];

    // Stop current audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    isPlayingRef.current = false;
    setIsSpeaking(false);
  }, []);

  const reset = useCallback(() => {
    abortedRef.current = false;
  }, []);

  const onDrain = useCallback((cb: () => void) => {
    onDrainCallbackRef.current = cb;
  }, []);

  return { enqueue, abort, reset, isSpeaking, onDrain };
}
