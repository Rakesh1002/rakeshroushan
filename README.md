# roushanrakesh.com

Personal portfolio and marketing site for Rakesh Roushan.

## Structure

```
apps/web/        → Astro site (roushanrakesh.com) on Cloudflare Workers
docs/            → Strategy docs & operational playbooks (from RR Holdings)
  company/       → Legal, corporate, banking, compliance
  strategy/      → Execution plans, frameworks, growth playbooks
_archive/        → Legacy Next.js + Payload CMS code (reference only)
```

## Tech Stack

- **Framework:** Astro 6 (Content Collections, MDX)
- **CMS:** Keystatic (git-based, visual editor)
- **Hosting:** Cloudflare Workers/Pages
- **Styling:** Tailwind CSS 4
- **Interactive:** React islands (Three.js, AI chat)

## Development

```bash
pnpm install
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build for production
```

## Related

- [roushan.xyz](https://roushan.xyz) — Roushan Venture Studio (investor/builder-facing)
- [rr-os](https://github.com/Rakesh1002/rr-os) — Venture studio operating system
