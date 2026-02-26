import { useState, useMemo, useCallback } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface QuestionDef {
  text: string;
  options: [string, string, string]; // each maps to score 0, 1, 2
}

interface LayerDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: [QuestionDef, QuestionDef];
}

type Answers = Record<string, [number | null, number | null]>;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const LAYERS: LayerDef[] = [
  {
    id: "speed",
    name: "Speed Moat",
    icon: "\u26A1",
    description: "How fast can you deliver value compared to raw LLM access?",
    questions: [
      {
        text: "How much faster is your product vs using ChatGPT directly?",
        options: ["Same speed", "2x faster", "5x+ faster"],
      },
      {
        text: "Do you use custom inference infrastructure?",
        options: ["No, standard APIs", "Partially customized", "Yes, fully custom"],
      },
    ],
  },
  {
    id: "workflow",
    name: "Workflow Moat",
    icon: "\u2699\uFE0F",
    description: "How deeply embedded is your product in the user's process?",
    questions: [
      {
        text: "How many steps does your product automate vs the manual alternative?",
        options: ["1\u20132 steps", "3\u20135 steps", "6+ steps"],
      },
      {
        text: "Would switching to a competitor require rebuilding workflows?",
        options: ["No, easy to switch", "Somewhat painful", "Yes, completely"],
      },
    ],
  },
  {
    id: "integration",
    name: "Integration Moat",
    icon: "\uD83D\uDD17",
    description: "How connected is your product to other systems?",
    questions: [
      {
        text: "How many external systems does your product connect to?",
        options: ["0\u20131 systems", "2\u20134 systems", "5+ systems"],
      },
      {
        text: "Is your product embedded in the user's daily workflow tool?",
        options: ["No, standalone", "Optional integration", "Required / embedded"],
      },
    ],
  },
  {
    id: "data",
    name: "Data Moat",
    icon: "\uD83E\uDDEA",
    description: "Does your product get smarter with usage?",
    questions: [
      {
        text: "Does your product collect proprietary data that improves over time?",
        options: ["No", "Some data", "Core to our value"],
      },
      {
        text: "How long would it take a competitor to replicate your data?",
        options: ["Days", "Months", "Years"],
      },
    ],
  },
  {
    id: "distribution",
    name: "Distribution Moat",
    icon: "\uD83D\uDE80",
    description: "Does your product spread itself?",
    questions: [
      {
        text: "Does using your product expose new people to it?",
        options: ["No", "Indirectly", "Yes, built-in virality"],
      },
      {
        text: "Do you have a community, content, or brand moat?",
        options: ["None yet", "Growing", "Strong"],
      },
    ],
  },
];

interface MoatTier {
  label: string;
  color: string;
  colorClass: string;
  barColor: string;
  advice: string;
}

function getTier(score: number): MoatTier {
  if (score <= 6)
    return {
      label: "No Moat",
      color: "#ef4444",
      colorClass: "tier-red",
      barColor: "#ef4444",
      advice:
        "Your product is likely a thin wrapper. Focus on building proprietary data loops, deeper integrations, and workflow lock-in before a competitor copies your prompt.",
    };
  if (score <= 12)
    return {
      label: "Emerging Moat",
      color: "#eab308",
      colorClass: "tier-yellow",
      barColor: "#eab308",
      advice:
        "You're building real defenses \u2014 keep going. Double down on the layers where you scored highest, and shore up the weakest ones. Your next milestone: make switching painful.",
    };
  if (score <= 17)
    return {
      label: "Strong Moat",
      color: "#22c55e",
      colorClass: "tier-green",
      barColor: "#22c55e",
      advice:
        "You have genuine defensibility. Competitors will have a hard time replicating what you've built. Keep compounding your advantages, especially your data and distribution moats.",
    };
  return {
    label: "Fortress",
    color: "oklch(0.646 0.222 41.116)",
    colorClass: "tier-accent",
    barColor: "oklch(0.646 0.222 41.116)",
    advice:
      "You're building something exceptionally hard to compete with. Your moat is multi-layered and self-reinforcing. This is rare \u2014 protect it and keep compounding.",
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function MoatCalculator() {
  const [step, setStep] = useState(0); // 0..4 = quiz steps, 5 = results
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(LAYERS.map((l) => [l.id, [null, null]])) as Answers
  );
  const [animateResults, setAnimateResults] = useState(false);

  const currentLayer = LAYERS[step] as LayerDef | undefined;

  /* Scoring */
  const layerScores = useMemo(() => {
    return LAYERS.map((l) => {
      const [a, b] = answers[l.id];
      return { id: l.id, name: l.name, icon: l.icon, score: (a ?? 0) + (b ?? 0) };
    });
  }, [answers]);

  const totalScore = useMemo(
    () => layerScores.reduce((s, l) => s + l.score, 0),
    [layerScores]
  );

  const tier = useMemo(() => getTier(totalScore), [totalScore]);

  /* Handlers */
  const setAnswer = useCallback(
    (qIndex: 0 | 1, value: number) => {
      if (!currentLayer) return;
      setAnswers((prev) => {
        const copy = { ...prev };
        const pair = [...copy[currentLayer.id]] as [number | null, number | null];
        pair[qIndex] = value;
        copy[currentLayer.id] = pair;
        return copy;
      });
    },
    [currentLayer]
  );

  const canAdvance =
    currentLayer != null &&
    answers[currentLayer.id][0] !== null &&
    answers[currentLayer.id][1] !== null;

  const goNext = useCallback(() => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      setStep(5);
      // small delay so the DOM is painted before we animate bars
      requestAnimationFrame(() => {
        setTimeout(() => setAnimateResults(true), 80);
      });
    }
  }, [step]);

  const goBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const retake = useCallback(() => {
    setStep(0);
    setAnimateResults(false);
    setAnswers(
      Object.fromEntries(LAYERS.map((l) => [l.id, [null, null]])) as Answers
    );
  }, []);

  const shareOnTwitter = useCallback(() => {
    const breakdown = layerScores
      .map((l) => `${l.icon} ${l.name}: ${l.score}/4`)
      .join(" | ");
    const text = `My AI Product Moat Score: ${totalScore}/20 (${tier.label})\n\n${breakdown}\n\nTake the assessment:`;
    const url = "https://roushanrakesh.com/tools/moat-calculator";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [layerScores, totalScore, tier]);

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  /* ---- Results view ---- */
  if (step === 5) {
    return (
      <div style={styles.wrapper}>
        {/* Report Card */}
        <div style={styles.reportCard}>
          {/* Header */}
          <div style={styles.reportHeader}>
            <p style={styles.reportLabel}>Your AI Product Moat Score</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: tier.color,
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {totalScore}
              </span>
              <span style={{ fontSize: 24, color: "oklch(0.556 0 0)" }}>/20</span>
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "6px 16px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
                color: "#fff",
                background: tier.color,
              }}
            >
              {tier.label}
            </span>
          </div>

          {/* Bar chart */}
          <div style={{ padding: "0 28px 8px" }}>
            {layerScores.map((layer) => {
              const pct = (layer.score / 4) * 100;
              return (
                <div key={layer.id} style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500 }}>
                      {layer.icon} {layer.name}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "var(--font-mono, monospace)",
                        color: "oklch(0.556 0 0)",
                      }}
                    >
                      {layer.score}/4
                    </span>
                  </div>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 6,
                        background:
                          layer.score <= 1
                            ? "#ef4444"
                            : layer.score <= 2
                              ? "#eab308"
                              : layer.score <= 3
                                ? "#22c55e"
                                : "oklch(0.646 0.222 41.116)",
                        width: animateResults ? `${pct}%` : "0%",
                        transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advice */}
          <div
            style={{
              margin: "0 28px 28px",
              padding: 20,
              borderRadius: 12,
              background: "oklch(0.178 0 0)",
              border: "1px solid oklch(0.269 0 0)",
            }}
          >
            <p style={{ fontSize: 13, color: "oklch(0.556 0 0)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
              What this means
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "oklch(0.708 0 0)" }}>
              {tier.advice}
            </p>
          </div>

          {/* Watermark */}
          <div
            style={{
              textAlign: "center" as const,
              paddingBottom: 20,
              fontSize: 12,
              color: "oklch(0.371 0 0)",
            }}
          >
            roushanrakesh.com/tools/moat-calculator
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actionsRow}>
          <button onClick={shareOnTwitter} style={styles.twitterBtn}>
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ flexShrink: 0 }}
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on Twitter
          </button>
          <button onClick={retake} style={styles.retakeBtn}>
            Retake Assessment
          </button>
        </div>

        {/* CTA */}
        <div style={styles.ctaBox}>
          <p style={{ fontSize: 14, color: "oklch(0.708 0 0)", marginBottom: 8 }}>
            Want to learn how to build a real moat around your AI product?
          </p>
          <a
            href="/blog/ai-wrapper-moat"
            style={styles.ctaLink}
          >
            Read: Your AI Product is a Wrapper. Here's How to Build a Moat. &rarr;
          </a>
        </div>
      </div>
    );
  }

  /* ---- Quiz view ---- */
  if (!currentLayer) return null;
  const pair = answers[currentLayer.id];

  return (
    <div style={styles.wrapper}>
      {/* Progress bar */}
      <div style={styles.progressOuter}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((step + 1) / 5) * 100}%`,
            }}
          />
        </div>
        <span style={styles.progressText}>
          {step + 1} / 5
        </span>
      </div>

      {/* Layer header */}
      <div style={styles.layerHeader}>
        <span style={styles.layerIcon}>{currentLayer.icon}</span>
        <div>
          <h3 style={styles.layerName}>{currentLayer.name}</h3>
          <p style={styles.layerDesc}>{currentLayer.description}</p>
        </div>
      </div>

      {/* Questions */}
      <div style={styles.questionsContainer}>
        {currentLayer.questions.map((q, qi) => (
          <div key={qi} style={styles.questionBlock}>
            <p style={styles.questionText}>
              <span style={styles.questionNum}>Q{qi + 1}.</span> {q.text}
            </p>
            <div style={styles.optionsGrid}>
              {q.options.map((opt, oi) => {
                const selected = pair[qi as 0 | 1] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => setAnswer(qi as 0 | 1, oi)}
                    style={{
                      ...styles.optionBtn,
                      borderColor: selected
                        ? "oklch(0.646 0.222 41.116)"
                        : "oklch(0.269 0 0)",
                      background: selected
                        ? "oklch(0.646 0.222 41.116 / 0.1)"
                        : "oklch(0.178 0 0)",
                      color: selected
                        ? "oklch(0.985 0 0)"
                        : "oklch(0.708 0 0)",
                    }}
                  >
                    <span
                      style={{
                        ...styles.radioCircle,
                        borderColor: selected
                          ? "oklch(0.646 0.222 41.116)"
                          : "oklch(0.371 0 0)",
                      }}
                    >
                      {selected && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "oklch(0.646 0.222 41.116)",
                          }}
                        />
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        <button
          onClick={goBack}
          disabled={step === 0}
          style={{
            ...styles.navBtnSecondary,
            opacity: step === 0 ? 0.3 : 1,
            cursor: step === 0 ? "not-allowed" : "pointer",
          }}
        >
          &larr; Back
        </button>
        <button
          onClick={goNext}
          disabled={!canAdvance}
          style={{
            ...styles.navBtnPrimary,
            opacity: canAdvance ? 1 : 0.4,
            cursor: canAdvance ? "pointer" : "not-allowed",
          }}
        >
          {step === 4 ? "See My Score" : "Next"} &rarr;
        </button>
      </div>

      {/* Mini scoreboard */}
      <div style={styles.miniScoreboard}>
        {LAYERS.map((l, i) => {
          const done = answers[l.id][0] !== null && answers[l.id][1] !== null;
          const active = i === step;
          return (
            <button
              key={l.id}
              onClick={() => setStep(i)}
              style={{
                ...styles.miniDot,
                background: done
                  ? "oklch(0.646 0.222 41.116)"
                  : active
                    ? "oklch(0.371 0 0)"
                    : "oklch(0.205 0 0)",
                border: active
                  ? "2px solid oklch(0.646 0.222 41.116)"
                  : "2px solid transparent",
                color: done ? "#fff" : "oklch(0.556 0 0)",
              }}
              title={l.name}
            >
              {l.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inline styles (no Tailwind dependency inside the React island)       */
/* ------------------------------------------------------------------ */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 640,
    margin: "0 auto",
    fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)",
  },

  /* Progress */
  progressOuter: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    background: "oklch(0.205 0 0)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
    background: "oklch(0.646 0.222 41.116)",
    transition: "width 0.4s ease",
  },
  progressText: {
    fontSize: 13,
    fontFamily: "var(--font-mono, monospace)",
    color: "oklch(0.556 0 0)",
    whiteSpace: "nowrap",
  },

  /* Layer header */
  layerHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 28,
  },
  layerIcon: {
    fontSize: 32,
    lineHeight: 1,
    flexShrink: 0,
  },
  layerName: {
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    color: "oklch(0.985 0 0)",
  },
  layerDesc: {
    fontSize: 14,
    color: "oklch(0.556 0 0)",
    margin: "4px 0 0",
    lineHeight: 1.4,
  },

  /* Questions */
  questionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  questionBlock: {},
  questionText: {
    fontSize: 15,
    fontWeight: 500,
    color: "oklch(0.985 0 0)",
    marginBottom: 14,
    lineHeight: 1.5,
  },
  questionNum: {
    color: "oklch(0.646 0.222 41.116)",
    fontWeight: 700,
    marginRight: 4,
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 18px",
    borderRadius: 12,
    border: "1.5px solid",
    fontSize: 14,
    textAlign: "left" as const,
    cursor: "pointer",
    transition: "all 0.2s ease",
    lineHeight: 1.3,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* Nav row */
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
    gap: 12,
  },
  navBtnSecondary: {
    padding: "10px 20px",
    borderRadius: 10,
    border: "1px solid oklch(0.269 0 0)",
    background: "transparent",
    color: "oklch(0.708 0 0)",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  navBtnPrimary: {
    padding: "10px 24px",
    borderRadius: 10,
    border: "none",
    background: "oklch(0.646 0.222 41.116)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  /* Mini scoreboard */
  miniScoreboard: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid oklch(0.269 0 0 / 0.5)",
  },
  miniDot: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  /* ---------- Results ---------- */
  reportCard: {
    border: "1px solid oklch(0.269 0 0)",
    borderRadius: 20,
    background: "oklch(0.165 0 0)",
    overflow: "hidden",
  },
  reportHeader: {
    textAlign: "center" as const,
    padding: "36px 28px 28px",
    borderBottom: "1px solid oklch(0.269 0 0 / 0.5)",
    marginBottom: 28,
  },
  reportLabel: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "oklch(0.556 0 0)",
    marginBottom: 12,
  },
  barTrack: {
    height: 10,
    borderRadius: 6,
    background: "oklch(0.205 0 0)",
    overflow: "hidden",
  },

  /* Actions */
  actionsRow: {
    display: "flex",
    gap: 12,
    marginTop: 24,
    flexWrap: "wrap" as const,
  },
  twitterBtn: {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    background: "#1d9bf0",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
    minWidth: 160,
  },
  retakeBtn: {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    borderRadius: 12,
    border: "1px solid oklch(0.269 0 0)",
    background: "transparent",
    color: "oklch(0.708 0 0)",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: 160,
  },

  /* CTA */
  ctaBox: {
    marginTop: 28,
    padding: 24,
    borderRadius: 16,
    border: "1px solid oklch(0.269 0 0)",
    background: "oklch(0.178 0 0)",
    textAlign: "center" as const,
  },
  ctaLink: {
    fontSize: 14,
    fontWeight: 600,
    color: "oklch(0.646 0.222 41.116)",
    textDecoration: "none",
  },
};
