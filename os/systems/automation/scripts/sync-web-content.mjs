import { mkdir, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Syncs os/public/* -> web/rr/content/*
// Run from repo root: node os/systems/automation/scripts/sync-web-content.mjs

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, "os", "public");
const dstDir = path.join(repoRoot, "web", "rr", "content");

// Sync public content (recursive)
await mkdir(dstDir, { recursive: true });
await cp(srcDir, dstDir, { recursive: true });
console.log(`Synced ${srcDir} -> ${dstDir}`);

// Sync specific OS artifacts
const calendarSrc = path.join(repoRoot, "os", "content", "calendar.csv");
const calendarDst = path.join(dstDir, "social-calendar.csv");

try {
  await cp(calendarSrc, calendarDst);
  console.log("Synced calendar.csv");
} catch (e) {
  console.warn("Warning: Could not sync calendar.csv (might not exist yet)");
}
