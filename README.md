# r2r — Personal OS + Portfolio

Your **personal operating system** for managing life, building a personal brand, and shipping projects.

## 🚀 Quick Start (Open This Daily)

```
os/00-today.md
```

That's it. Everything flows from there.

## 📁 Repo Structure

```
r2r/
├── os/              ← Operating system
│   ├── 00-today.md  ← SINGLE ENTRY POINT
│   ├── inbox.md     ← Capture everything here first
│   ├── brand/       ← Identity, strategy, assets
│   ├── content/     ← Content engine (social)
│   ├── ventures/    ← Projects (Active & Incubating)
│   ├── systems/     ← Ops, cadence, automation
│   └── public/      ← Synced to web
└── web/             ← Next.js portfolio site
```

## 🔄 Daily Operating Loop

1. **Morning** — Open `os/00-today.md`, set Top 3
2. **Throughout** — Capture to `os/inbox.md`, publish from `os/content/queue.md`
3. **Evening** — Shutdown: capture loose ends, prep tomorrow

## 💻 Website

```bash
cd web/rr
npm install && npm run dev
```

**Content sync:** `os/public/` → `web/rr/content/` via `os/systems/automation/scripts/sync-web-content.mjs`

## 🎯 Philosophy

- **Velocity > Perfection** — Ship weekly
- **One inbox** — Don't let things scatter
- **Active only** — Ideas go to archive until ready
- **Single source of truth** — No duplicate docs
