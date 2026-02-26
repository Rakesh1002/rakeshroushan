import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What do you do?",
  "Tell me about your ventures",
  "What's your experience?",
  "Are you open to collaborate?",
];

export default function ChatIsland() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-6),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Email me at hey@roushanrakesh.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[oklch(0.269_0_0)] bg-[oklch(0.178_0_0)] text-sm text-[oklch(0.556_0_0)] hover:text-[oklch(0.985_0_0)] hover:border-[oklch(0.371_0_0)] transition-all cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"
          />
        </svg>
        Ask me anything...
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] flex flex-col rounded-2xl border border-[oklch(0.269_0_0)] bg-[oklch(0.145_0_0)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(0.269_0_0)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium">Chat with Rakesh</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[oklch(0.556_0_0)] hover:text-[oklch(0.985_0_0)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[340px]">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-[oklch(0.556_0_0)]">Quick questions:</p>
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
        {loading && (
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
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 rounded-lg bg-[oklch(0.646_0.222_41.116)] text-white hover:bg-[oklch(0.553_0.195_38.402)] disabled:opacity-40 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  );
}
