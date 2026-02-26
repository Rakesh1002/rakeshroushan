# RR Holdings - 100 Startups in 100 Days

## Mission

Launch 100 startups and reach $100,000 MRR in 100 days, starting January 1, 2026.

---

## Quick Links

### Company & Legal

- [Corporate Structure](company/holding-structure.md) - US-India holding company architecture
- [US Formation Guide](company/us-corp-formation.md) - Delaware C-Corp checklist
- [India Subsidiary Guide](company/india-subsidiary.md) - Pvt Ltd formation process
- [Banking Setup](company/banking-setup.md) - Mercury, HDFC, Stripe configuration
- [Compliance Calendar](company/compliance-calendar.md) - All deadlines and filings
- [IP Assignment](company/ip-assignment.md) - Intellectual property ownership

### Legal Templates

- [Independent Contractor Agreement](company/contractor-agreements/independent-contractor.md)
- [NDA Template](company/contractor-agreements/nda-template.md)
- [Terms of Service](company/terms-privacy/terms-of-service.md)
- [Privacy Policy](company/terms-privacy/privacy-policy.md)

### Strategy & Execution

- [100-Day Plan](strategy/100-day-plan.md) - Daily execution calendar
- [Startup Portfolio](strategy/startup-portfolio.md) - All 30+ ideas organized
- [Prioritization Matrix](strategy/prioritization-matrix.md) - ICE scoring
- [Launch Checklist](strategy/launch-checklist.md) - Pre/during/post launch
- [Growth Playbook](strategy/growth-playbook.md) - Acquisition & retention

### Frameworks

- [Idea Validation](strategy/frameworks/idea-validation.md) - 24-hour validation process
- [Build-Measure-Learn](strategy/frameworks/build-measure-learn.md) - Lean startup loop
- [Decision Matrix](strategy/frameworks/decision-matrix.md) - Build/scale/pivot/kill
- [Time-Boxing](strategy/frameworks/time-boxing.md) - Shipping fast
- [Automation-First](strategy/frameworks/automation-first.md) - CI/CD and operations

---

## Corporate Structure

```
RR Holdings Inc. (Delaware C-Corp)
├── All intellectual property
├── Customer contracts
├── Revenue collection (USD)
└── 100% ownership of:
    └── RR Tech Pvt Ltd (India)
        ├── Development operations
        ├── Contractor management
        └── Local expenses (INR)
```

---

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | Next.js 14+, TypeScript, Tailwind, shadcn/ui    |
| Backend    | Next.js API Routes, Cloudflare Workers, FastAPI |
| Database   | Cloudflare D1, Supabase, Drizzle ORM            |
| Auth       | Clerk                                           |
| Payments   | Stripe                                          |
| AI/ML      | OpenAI, Anthropic, Modal (GPU)                  |
| Hosting    | Cloudflare Pages, DigitalOcean, Modal           |
| Analytics  | PostHog                                         |
| Monitoring | Sentry, BetterStack                             |

---

## Portfolio Overview

### Tier 1: Revenue-Ready

| Product   | URL         | Description                    |
| --------- | ----------- | ------------------------------ |
| AudioPod  | audiopod.ai | AI DAW for podcasts/audiobooks |
| UnQuest   | unquest.ai  | AI market research             |
| JEET      | jeetapp.in  | JEE/NEET prep platform         |
| TeleStack | -           | AI receptionist for healthcare |

### Tier 2: MVP Stage

| Product     | URL        | Description              |
| ----------- | ---------- | ------------------------ |
| WhatsByy    | -          | WhatsApp marketing bot   |
| BuildNative | -          | React Native app builder |
| NameMyApp   | namemy.app | AI name generator        |
| UnSearch    | -          | Web search API for RAG   |

### Tier 3+: Ideas

See [startup-portfolio.md](strategy/startup-portfolio.md) for full list of 30+ ideas.

---

## Key Metrics

### Targets

| Metric            | Day 30 | Day 60  | Day 100  |
| ----------------- | ------ | ------- | -------- |
| Products Launched | 15     | 50      | 100      |
| MRR               | $5,000 | $25,000 | $100,000 |
| Paying Customers  | 100    | 500     | 2,000    |

### Current Status (Update Daily)

| Metric        | Target | Actual |
| ------------- | ------ | ------ |
| Day           | 1/100  | ✓      |
| Products Live | 0      | 0      |
| MRR           | $0     | $0     |

---

## Daily Workflow

```
06:00 - Wake up, review metrics
06:30 - Deep work: coding (4 hours)
10:30 - Launch/post new product
11:00 - Marketing & outreach
12:00 - Lunch
13:00 - Customer support
14:00 - Deep work: coding (4 hours)
18:00 - Admin & planning
19:00 - Wind down
```

---

## File Structure

```
/Users/rakesh/RR/
├── .cursorrules                    # AI coding guidelines
├── README.md                       # This file
│
├── company/                        # Legal & corporate
│   ├── holding-structure.md
│   ├── us-corp-formation.md
│   ├── india-subsidiary.md
│   ├── banking-setup.md
│   ├── compliance-calendar.md
│   ├── ip-assignment.md
│   ├── contractor-agreements/
│   │   ├── independent-contractor.md
│   │   └── nda-template.md
│   └── terms-privacy/
│       ├── terms-of-service.md
│       └── privacy-policy.md
│
├── strategy/                       # Execution playbooks
│   ├── 100-day-plan.md
│   ├── startup-portfolio.md
│   ├── prioritization-matrix.md
│   ├── launch-checklist.md
│   ├── growth-playbook.md
│   └── frameworks/
│       ├── idea-validation.md
│       ├── build-measure-learn.md
│       ├── decision-matrix.md
│       ├── time-boxing.md
│       └── automation-first.md
│
├── content/                        # Marketing assets (TBD)
│   ├── brand-kit/
│   ├── social-templates/
│   └── email-sequences/
│
├── templates/                      # Code boilerplates (TBD)
│   ├── nextjs-saas/
│   ├── ai-app/
│   └── landing-page/
│
└── web/                           # Portfolio site (TBD)
```

---

## Getting Started

### Day 1 Actions

1. **Start Stripe Atlas** - Begin US formation
2. **Set up Mercury** - Apply for bank account
3. **Configure infrastructure** - Cloudflare, DigitalOcean, Modal accounts
4. **First product** - Pick from Tier 1, start building

### Weekly Rhythm

- **Monday**: Plan week, start new product
- **Tuesday-Thursday**: Build and ship
- **Friday**: Launch and market
- **Saturday**: Support and iterate
- **Sunday**: Review metrics, plan next week

---

## Key Principles

1. **Ship fast** - Done is better than perfect
2. **Revenue first** - Validate with payment, not signups
3. **Automate everything** - You can't hire your way out
4. **Learn publicly** - Build in public for distribution
5. **Kill fast** - 30 days without traction = kill

---

## Resources

### Tools

- [Cursor](https://cursor.sh) - AI-powered IDE
- [v0.dev](https://v0.dev) - UI generation
- [Stripe Atlas](https://atlas.stripe.com) - Company formation
- [Mercury](https://mercury.com) - Business banking

### Communities

- [Indie Hackers](https://indiehackers.com)
- [X/Twitter](https://twitter.com)
- [Product Hunt](https://producthunt.com)

---

## Contact

**Rakesh Roushan**

- Twitter: [@rakeshroushan](https://twitter.com/rakeshroushan)
- Email: rakesh@rrholdings.com
- Website: [rakeshroushan.com](https://rakeshroushan.com)

---

## Changelog

| Date        | Update                         |
| ----------- | ------------------------------ |
| Jan 1, 2026 | Initial infrastructure created |

---

_Last Updated: January 1, 2026_

**Let's build. 100 products. 100 days. $100k MRR.**
