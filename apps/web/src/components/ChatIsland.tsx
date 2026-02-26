import { useState, useRef, useEffect, useCallback } from "react";
import { useStreamingChat } from "@/lib/useStreamingChat";
import { useAudioQueue } from "@/lib/useAudioQueue";
import { useRealtimeVoice, type LiveStatus } from "@/lib/useRealtimeVoice";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What do you do?",
  "Tell me about your AI products",
  "What's your tech stack?",
];

const VOICE_WORKER_URL =
  (typeof window !== "undefined" && (window as any).__VOICE_WORKER_URL) ||
  "https://voice-agent.comfyfw.workers.dev";

export default function ChatIsland() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "speak">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Speak mode
  const [liveResponseText, setLiveResponseText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const streamAbortRef = useRef<AbortController | null>(null);

  const { streamChat } = useStreamingChat();
  const audioQueue = useAudioQueue();

  // Live voice hook
  const live = useRealtimeVoice({
    workerUrl: VOICE_WORKER_URL,
    onTranscript: useCallback((text: string) => {
      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setLiveResponseText("");
    }, []),
    onResponseToken: useCallback((_token: string, fullText: string) => {
      setLiveResponseText(fullText);
    }, []),
    onResponseComplete: useCallback((text: string) => {
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      setLiveResponseText("");
    }, []),
    onError: useCallback((msg: string) => {
      console.error("Voice error:", msg);
    }, []),
  });

  // Auto-scroll
  useEffect(() => {
    scrollRef.current && (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  }, [messages, streamingText, liveResponseText]);

  // ─── Chat tab: send message ───
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;
      setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
      setInput("");
      setIsStreaming(true);
      setStreamingText("");

      const ac = new AbortController();
      streamAbortRef.current = ac;
      audioQueue.reset();

      await streamChat({
        message: text.trim(),
        history: messages.slice(-8),
        signal: ac.signal,
        onToken: (_t, full) => setStreamingText(full),
        onSentence: () => {},
        onComplete: (full) => {
          setMessages((prev) => [...prev, { role: "assistant", content: full }]);
          setStreamingText("");
          setIsStreaming(false);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Something went wrong. Email me at hey@roushanrakesh.com!" },
          ]);
          setStreamingText("");
          setIsStreaming(false);
        },
      });
    },
    [isStreaming, messages, streamChat, audioQueue]
  );

  // ─── Tab switching ───
  function switchToSpeak() {
    streamAbortRef.current?.abort();
    audioQueue.abort();
    setTab("speak");
    live.connect();
  }

  function switchToChat() {
    live.disconnect();
    setTab("chat");
    setLiveResponseText("");
  }

  function handleClose() {
    audioQueue.abort();
    streamAbortRef.current?.abort();
    live.disconnect();
    setIsOpen(false);
    setTab("chat");
  }

  // ─── Closed FAB ───
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full border border-[oklch(0.269_0_0)] bg-[oklch(0.145_0_0)]/90 backdrop-blur-xl text-sm text-[oklch(0.556_0_0)] hover:text-[oklch(0.985_0_0)] hover:border-[oklch(0.646_0.222_41.116)]/50 transition-all shadow-lg cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.646_0.222_41.116)] opacity-50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[oklch(0.646_0.222_41.116)]" />
        </span>
        <span className="hidden sm:inline">Talk to Rakesh</span>
        <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
        </svg>
      </button>
    );
  }

  // ─── Main panel ───
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] max-h-[520px] flex flex-col rounded-2xl border border-[oklch(0.269_0_0)] bg-[oklch(0.145_0_0)] shadow-2xl overflow-hidden">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[oklch(0.269_0_0)]">
        {/* Tabs */}
        <div className="flex bg-[oklch(0.178_0_0)] rounded-lg p-0.5">
          <button
            onClick={() => (tab === "speak" ? switchToChat() : null)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              tab === "chat"
                ? "bg-[oklch(0.269_0_0)] text-[oklch(0.985_0_0)] shadow-sm"
                : "text-[oklch(0.556_0_0)] hover:text-[oklch(0.708_0_0)]"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => (tab === "chat" ? switchToSpeak() : null)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              tab === "speak"
                ? "bg-[oklch(0.269_0_0)] text-[oklch(0.985_0_0)] shadow-sm"
                : "text-[oklch(0.556_0_0)] hover:text-[oklch(0.708_0_0)]"
            }`}
          >
            Speak
          </button>
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="p-1.5 text-[oklch(0.444_0_0)] hover:text-[oklch(0.985_0_0)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ─── Speak Tab ─── */}
      {tab === "speak" && <SpeakView status={live.status} responseText={liveResponseText} onEnd={switchToChat} />}

      {/* ─── Chat Tab ─── */}
      {tab === "chat" && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[380px]">
            {messages.length === 0 && !streamingText && (
              <div className="space-y-2">
                <p className="text-xs text-[oklch(0.556_0_0)] mb-3">Ask me anything:</p>
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-[oklch(0.269_0_0)] hover:border-[oklch(0.371_0_0)] text-[oklch(0.708_0_0)] hover:text-[oklch(0.985_0_0)] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[85%] ${
                  msg.role === "user"
                    ? "ml-auto bg-[oklch(0.646_0.222_41.116)] text-white"
                    : "bg-[oklch(0.205_0_0)] text-[oklch(0.708_0_0)]"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {streamingText && (
              <div className="bg-[oklch(0.205_0_0)] text-[oklch(0.708_0_0)] text-sm px-3 py-2 rounded-xl max-w-[85%]">
                {streamingText}
                <span className="inline-block w-1.5 h-4 bg-[oklch(0.646_0.222_41.116)] ml-0.5 animate-pulse align-text-bottom" />
              </div>
            )}
            {isStreaming && !streamingText && (
              <div className="bg-[oklch(0.205_0_0)] text-[oklch(0.556_0_0)] text-sm px-3 py-2 rounded-xl max-w-[85%] flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 p-3 border-t border-[oklch(0.269_0_0)]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[oklch(0.178_0_0)] border border-[oklch(0.269_0_0)] rounded-lg px-3 py-2 text-sm text-[oklch(0.985_0_0)] placeholder-[oklch(0.444_0_0)] outline-none focus:border-[oklch(0.371_0_0)] transition-colors"
              disabled={isStreaming}
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="p-2 rounded-lg bg-[oklch(0.646_0.222_41.116)] text-white hover:bg-[oklch(0.553_0.195_38.402)] disabled:opacity-40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

// ─── Speak View ───

function SpeakView({
  status,
  responseText,
  onEnd,
}: {
  status: LiveStatus;
  responseText: string;
  onEnd: () => void;
}) {
  // Two visual modes: listening (green) and speaking (orange). Processing folds into speaking.
  const isConnecting = status === "connecting" || status === "ready";
  const isListening = status === "listening";
  const isSpeaking = status === "speaking" || status === "processing";
  const isError = status === "error";

  return (
    <div className="flex flex-col items-center justify-between py-8 px-6 min-h-[400px]">
      {/* Orb area — pure animation, no text */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">

          {/* Connecting: faint pulsing ring */}
          {isConnecting && (
            <div className="w-20 h-20 rounded-full border-2 border-[oklch(0.3_0_0)]" style={{ animation: "orbFade 1.5s ease-in-out infinite" }} />
          )}

          {/* Listening: green breathing orb with outer ripple */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border border-emerald-500/20" style={{ animation: "ripple 2.5s ease-out infinite" }} />
              <div className="absolute inset-3 rounded-full border border-emerald-500/10" style={{ animation: "ripple 2.5s ease-out 0.8s infinite" }} />
              <div
                className="w-20 h-20 rounded-full bg-emerald-500/15 shadow-[0_0_60px_rgba(16,185,129,0.2)]"
                style={{ animation: "breathe 2.4s ease-in-out infinite" }}
              />
            </>
          )}

          {/* Speaking: warm orange flowing orb */}
          {isSpeaking && (
            <>
              <div className="absolute inset-[-4px] rounded-full bg-[oklch(0.646_0.222_41.116)]/10" style={{ animation: "speakOuter 1.2s ease-in-out infinite" }} />
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[oklch(0.646_0.222_41.116)] to-orange-500 shadow-[0_0_50px_rgba(234,88,12,0.35)]"
                style={{ animation: "speakFlow 0.8s ease-in-out infinite alternate" }}
              />
            </>
          )}

          {/* Error: dim red pulse */}
          {isError && (
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30" style={{ animation: "orbFade 2s ease-in-out infinite" }} />
          )}
        </div>
      </div>

      {/* End button — minimal */}
      <button
        onClick={onEnd}
        className="mt-4 px-5 py-2 rounded-full text-xs font-mono text-[oklch(0.5_0_0)] hover:text-red-400 transition-colors cursor-pointer"
      >
        end
      </button>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes speakFlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes speakOuter {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes orbFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
