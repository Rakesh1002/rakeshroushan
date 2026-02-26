import { useState, useEffect, useRef, useCallback } from "react";

interface SearchItem {
  type: "page" | "post" | "project" | "action";
  title: string;
  description?: string;
  url: string;
  tags?: string[];
}

// Static data — injected at build time via props
const PAGES: SearchItem[] = [
  { type: "page", title: "Home", url: "/", description: "Landing page" },
  { type: "page", title: "Blog", url: "/blog", description: "Articles on AI, product strategy, and execution" },
  { type: "page", title: "Reading", url: "/reading", description: "Books and articles I'm reading" },
  { type: "page", title: "Speaking", url: "/speaking", description: "Talk topics, past appearances, and booking" },
  { type: "page", title: "Moat Calculator", url: "/tools/moat-calculator", description: "Score your AI product's defensibility" },
  { type: "page", title: "AudioPod AI", url: "/products/audiopod", description: "Flagship AI audio workstation case study" },
  { type: "page", title: "Findable", url: "/products/findable", description: "AI-powered search platform case study" },
  { type: "action", title: "Subscribe to Newsletter", url: "#newsletter", description: "Weekly AI product insights" },
  { type: "action", title: "Get in Touch", url: "#contact", description: "Collaborate, advisory, or just say hi" },
  { type: "action", title: "RSS Feed", url: "/rss.xml", description: "Subscribe via RSS" },
];

interface CommandPaletteProps {
  posts: { title: string; description: string; url: string; tags: string[] }[];
  projects: { title: string; description: string; url: string; tags: string[] }[];
}

export default function CommandPalette({ posts, projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allItems: SearchItem[] = [
    ...PAGES,
    ...posts.map((p) => ({
      type: "post" as const,
      title: p.title,
      description: p.description,
      url: p.url,
      tags: p.tags,
    })),
    ...projects.map((p) => ({
      type: "project" as const,
      title: p.title,
      description: p.description,
      url: p.url,
      tags: p.tags,
    })),
  ];

  const filtered = query.trim()
    ? allItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
        );
      })
    : allItems;

  const grouped = {
    action: filtered.filter((i) => i.type === "action"),
    page: filtered.filter((i) => i.type === "page"),
    post: filtered.filter((i) => i.type === "post"),
    project: filtered.filter((i) => i.type === "project"),
  };

  const flatFiltered = [...grouped.action, ...grouped.page, ...grouped.post, ...grouped.project];

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const navigate = useCallback(
    (url: string) => {
      close();
      if (url.startsWith("#")) {
        const el = document.querySelector(url);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (url.startsWith("http")) {
        window.open(url, "_blank");
      } else {
        window.location.href = url;
      }
    },
    [close]
  );

  // Global keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll("[data-cmd-item]");
      items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatFiltered[selectedIndex];
      if (item) navigate(item.url);
    }
  }

  const typeLabels: Record<string, string> = {
    action: "Actions",
    page: "Pages",
    post: "Blog Posts",
    project: "Products",
  };

  const typeIcons: Record<string, string> = {
    action: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
    page: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    post: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
    project: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  };

  if (!isOpen) {
    return null;
  }

  let itemIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      {/* Palette */}
      <div className="relative w-full max-w-[560px] mx-4 rounded-2xl border border-[oklch(0.269_0_0)] bg-[oklch(0.145_0_0)] shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[oklch(0.269_0_0)]">
          <svg className="w-5 h-5 text-[oklch(0.444_0_0)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts, products, pages..."
            className="flex-1 bg-transparent text-sm text-[oklch(0.985_0_0)] placeholder-[oklch(0.444_0_0)] outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-[oklch(0.205_0_0)] text-[10px] font-mono text-[oklch(0.444_0_0)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
          {flatFiltered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[oklch(0.444_0_0)]">
              No results for "{query}"
            </div>
          ) : (
            (["action", "page", "post", "project"] as const).map((type) => {
              const items = grouped[type];
              if (items.length === 0) return null;
              return (
                <div key={type} className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.444_0_0)]">
                    {typeLabels[type]}
                  </div>
                  {items.map((item) => {
                    const thisIndex = itemIndex++;
                    const isSelected = thisIndex === selectedIndex;
                    return (
                      <button
                        key={item.url + item.title}
                        data-cmd-item
                        onClick={() => navigate(item.url)}
                        onMouseEnter={() => setSelectedIndex(thisIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isSelected
                            ? "bg-[oklch(0.646_0.222_41.116)]/10 text-[oklch(0.985_0_0)]"
                            : "text-[oklch(0.708_0_0)] hover:bg-[oklch(0.205_0_0)]"
                        }`}
                      >
                        <svg className="w-4 h-4 shrink-0 opacity-50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={typeIcons[type]} />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.description && (
                            <p className="text-xs text-[oklch(0.444_0_0)] truncate mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <span className="text-[10px] text-[oklch(0.444_0_0)]">↵</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[oklch(0.269_0_0)] text-[10px] text-[oklch(0.371_0_0)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[oklch(0.205_0_0)]">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[oklch(0.205_0_0)]">↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[oklch(0.205_0_0)]">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
