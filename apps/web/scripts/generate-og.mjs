/**
 * Build-time OG image generation script.
 *
 * Reads all blog posts from src/content/posts/*.mdx, parses frontmatter,
 * and generates 1200x630 PNG OG images using satori + @resvg/resvg-js.
 *
 * Usage:  node scripts/generate-og.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");
const OUT_DIR = path.join(ROOT, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

// ─── Colours ────────────────────────────────────────────────────────────────
const BG = "#1a1a1a";
const BG_SUBTLE = "#232323";
const ACCENT = "#e85d04";
const TEXT = "#f5f5f5";
const TEXT_MUTED = "#a0a0a0";
const TEXT_DIM = "#707070";
const PILL_BG = "#2a2a2a";
const PILL_BORDER = "#3a3a3a";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Extremely minimal frontmatter parser — handles the fields we need. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const meta = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (!m) continue;
    let [, key, value] = m;
    // Strip surrounding quotes
    value = value.replace(/^["']|["']$/g, "").trim();
    if (key === "tags") {
      // Parse YAML inline array: ["a", "b", "c"]
      const inner = value.replace(/^\[|\]$/g, "");
      meta.tags = inner
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""));
    } else if (key === "date") {
      meta.date = value;
    } else {
      meta[key] = value;
    }
  }
  return meta;
}

/** Truncate text to a max length, adding ellipsis if needed. */
function truncate(str, max) {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "\u2026";
}

/** Format a date string like "February 1, 2026" */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Font loading ───────────────────────────────────────────────────────────

async function loadFont() {
  // Fetch Inter from Google Fonts API (wght 400 and 700)
  const weights = [
    { weight: 400, url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf" },
    { weight: 600, url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf" },
    { weight: 700, url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf" },
  ];

  const fonts = await Promise.all(
    weights.map(async ({ weight, url }) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch Inter weight ${weight}: ${res.statusText}`);
      const buffer = await res.arrayBuffer();
      return {
        name: "Inter",
        data: buffer,
        weight,
        style: "normal",
      };
    })
  );

  return fonts;
}

// ─── Layout builders ────────────────────────────────────────────────────────

function buildPostImage({ title, description, date, tags }) {
  const displayTitle = truncate(title, 90);
  const displayDesc = truncate(description, 130);

  const tagPills = (tags || []).slice(0, 4).map((tag) => ({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "6px",
        backgroundColor: PILL_BG,
        border: `1px solid ${PILL_BORDER}`,
        fontSize: 14,
        color: TEXT_MUTED,
        letterSpacing: "0.02em",
      },
      children: tag,
    },
  }));

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: BG,
        padding: "0",
        fontFamily: "Inter",
      },
      children: [
        // Top accent bar
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, transparent)`,
            },
            children: [],
          },
        },
        // Main content area
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              padding: "48px 60px 40px 60px",
            },
            children: [
              // Top section: branding + date
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  },
                  children: [
                    // Logo / brand
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        },
                        children: [
                          // Orange circle avatar
                          {
                            type: "div",
                            props: {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: ACCENT,
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: 700,
                              },
                              children: "R",
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                display: "flex",
                                flexDirection: "column",
                              },
                              children: [
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      fontSize: 16,
                                      fontWeight: 600,
                                      color: TEXT,
                                      lineHeight: 1.2,
                                    },
                                    children: "Rakesh Roushan",
                                  },
                                },
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      fontSize: 13,
                                      color: TEXT_DIM,
                                      lineHeight: 1.2,
                                    },
                                    children: "roushanrakesh.com",
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    // Date
                    date
                      ? {
                          type: "div",
                          props: {
                            style: {
                              fontSize: 14,
                              color: TEXT_DIM,
                            },
                            children: formatDate(date),
                          },
                        }
                      : { type: "div", props: { children: [] } },
                  ],
                },
              },
              // Middle: Title + Description
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "center",
                    gap: "16px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: 44,
                          fontWeight: 700,
                          color: TEXT,
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                        },
                        children: displayTitle,
                      },
                    },
                    displayDesc
                      ? {
                          type: "div",
                          props: {
                            style: {
                              fontSize: 18,
                              color: TEXT_MUTED,
                              lineHeight: 1.5,
                            },
                            children: displayDesc,
                          },
                        }
                      : { type: "div", props: { children: [] } },
                  ],
                },
              },
              // Bottom: Tags + accent line
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  },
                  children: [
                    // Tags
                    tagPills.length > 0
                      ? {
                          type: "div",
                          props: {
                            style: {
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            },
                            children: tagPills,
                          },
                        }
                      : { type: "div", props: { children: [] } },
                    // "Read more" indicator
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: 14,
                          color: ACCENT,
                          fontWeight: 600,
                        },
                        children: "Read on blog →",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Bottom accent bar
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, transparent, ${ACCENT}88, ${ACCENT})`,
            },
            children: [],
          },
        },
      ],
    },
  };
}

function buildDefaultImage() {
  const credentials = [
    "IIM Calcutta",
    "Ex-Paytm",
    "Ex-Ninjacart",
    "Ex-Bharti Airtel",
  ];

  const credentialPills = credentials.map((c) => ({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "8px",
        backgroundColor: PILL_BG,
        border: `1px solid ${PILL_BORDER}`,
        fontSize: 14,
        color: TEXT_MUTED,
      },
      children: c,
    },
  }));

  const stats = [
    { value: "20+", label: "AI Products" },
    { value: "0", label: "Employees" },
    { value: "1", label: "Founder" },
  ];

  const statBoxes = stats.map((s) => ({
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 28px",
        borderRadius: "12px",
        backgroundColor: BG_SUBTLE,
        border: `1px solid ${PILL_BORDER}`,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontSize: 32,
              fontWeight: 700,
              color: ACCENT,
              lineHeight: 1.2,
            },
            children: s.value,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: 13,
              color: TEXT_DIM,
              marginTop: "4px",
            },
            children: s.label,
          },
        },
      ],
    },
  }));

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: BG,
        fontFamily: "Inter",
      },
      children: [
        // Top accent bar
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, transparent)`,
            },
            children: [],
          },
        },
        // Main content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              padding: "48px 60px",
              gap: "24px",
            },
            children: [
              // Orange circle avatar
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                    color: "#fff",
                    fontSize: 32,
                    fontWeight: 700,
                  },
                  children: "R",
                },
              },
              // Name
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 48,
                    fontWeight: 700,
                    color: TEXT,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  },
                  children: "Rakesh Roushan",
                },
              },
              // Tagline
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 22,
                    color: TEXT_MUTED,
                    textAlign: "center",
                    lineHeight: 1.4,
                    maxWidth: "700px",
                  },
                  children: "Building 20+ AI Products as a Solo Founder",
                },
              },
              // Stats row
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "16px",
                    marginTop: "8px",
                  },
                  children: statBoxes,
                },
              },
              // Credentials
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "4px",
                  },
                  children: credentialPills,
                },
              },
              // URL
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 15,
                    color: TEXT_DIM,
                    marginTop: "8px",
                  },
                  children: "roushanrakesh.com",
                },
              },
            ],
          },
        },
        // Bottom accent bar
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, transparent, ${ACCENT}88, ${ACCENT})`,
            },
            children: [],
          },
        },
      ],
    },
  };
}

// ─── SVG → PNG ──────────────────────────────────────────────────────────────

async function renderToPng(element, fonts) {
  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🖼  OG image generation starting...\n");

  // Ensure output directory
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Load fonts
  console.log("   Loading fonts...");
  const fonts = await loadFont();
  console.log("   Fonts loaded.\n");

  // ── Discover posts ──────────────────────────────────────────────────────
  const postFiles = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  console.log(`   Found ${postFiles.length} posts.\n`);

  // ── Generate post images ────────────────────────────────────────────────
  for (const file of postFiles) {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const meta = parseFrontmatter(raw);

    const element = buildPostImage({
      title: meta.title || slug,
      description: meta.description || "",
      date: meta.date || "",
      tags: meta.tags || [],
    });

    const png = await renderToPng(element, fonts);
    const outPath = path.join(OUT_DIR, `${slug}.png`);
    fs.writeFileSync(outPath, png);
    console.log(`   ✓  ${slug}.png  (${(png.length / 1024).toFixed(1)} KB)`);
  }

  // ── Generate default image ──────────────────────────────────────────────
  const defaultElement = buildDefaultImage();
  const defaultPng = await renderToPng(defaultElement, fonts);
  const defaultPath = path.join(OUT_DIR, "og-default.png");
  fs.writeFileSync(defaultPath, defaultPng);
  console.log(`   ✓  og-default.png  (${(defaultPng.length / 1024).toFixed(1)} KB)`);

  console.log(`\n🎉  Done — ${postFiles.length + 1} images written to public/og/`);
}

main().catch((err) => {
  console.error("OG generation failed:", err);
  process.exit(1);
});
