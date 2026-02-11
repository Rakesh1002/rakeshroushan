# RR Holdings - Rakesh Roushan

> 100 Startups in 100 Days | $100,000 MRR Target | Portfolio Website + Strategy Hub

This is the consolidated monorepo for RR Holdings, containing both the **3D portfolio website** and the **company/strategy documentation** for launching 100 startups in 100 days.

---

## Portfolio Website

A superfast, responsive personal portfolio website built with Three.js, Next.js 15, and modern web technologies. Features immersive 3D animations, AI-powered chat, Payload CMS blog, and smooth interactions.

### Key Features

- **3D Animations**: Interactive Three.js scenes with flying starfield and particle effects
- **AI Chat**: OpenAI-powered conversational interface
- **Blog/CMS**: Payload CMS with rich text editor, RSS feed
- **Contact System**: Email notifications via Nodemailer
- **GitHub Integration**: Dynamically fetches and displays repositories
- **Newsletter**: Subscriber management via Payload CMS
- **SEO Optimized**: Structured data, sitemaps, robots.txt
- **Fully Responsive**: Mobile-first design across all devices

### Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15, React 19, TypeScript                    |
| 3D         | Three.js, React Three Fiber, React Three Drei       |
| Styling    | Tailwind CSS 4, Shadcn/ui, Framer Motion            |
| CMS        | Payload CMS 3.50 (PostgreSQL)                       |
| AI         | OpenAI GPT-4o-mini                                  |
| Email      | Nodemailer (SMTP)                                   |
| Package    | pnpm                                                |

### Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

See [README.env.md](README.env.md) for required environment variables.

---

## Company & Legal Documentation

Corporate structure, legal templates, and compliance documentation for the US-India holding company.

```
RR Holdings Inc. (Delaware C-Corp)
├── All intellectual property
├── Customer contracts & revenue (USD)
└── 100% ownership of:
    └── RR Tech Pvt Ltd (India)
        ├── Development operations
        ├── Contractor management
        └── Local expenses (INR)
```

### Quick Links

- [Corporate Structure](company/holding-structure.md)
- [US Formation Guide](company/us-corp-formation.md)
- [India Subsidiary Guide](company/india-subsidiary.md)
- [Banking Setup](company/banking-setup.md)
- [Compliance Calendar](company/compliance-calendar.md)
- [IP Assignment](company/ip-assignment.md)

### Legal Templates

- [Independent Contractor Agreement](company/contractor-agreements/independent-contractor.md)
- [NDA Template](company/contractor-agreements/nda-template.md)
- [Terms of Service](company/terms-privacy/terms-of-service.md)
- [Privacy Policy](company/terms-privacy/privacy-policy.md)

---

## Strategy & Execution

Playbooks and frameworks for the 100-day sprint.

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

## Portfolio Overview

### Tier 1: Revenue-Ready

| Product   | Description                    | MRR Target |
| --------- | ------------------------------ | ---------- |
| AudioPod  | AI DAW for podcasts/audiobooks | $30k       |
| UnQuest   | AI market research             | $20k       |
| JEET      | JEE/NEET prep platform         | $15k       |
| TeleStack | AI receptionist for healthcare | $10k       |

See [startup-portfolio.md](strategy/startup-portfolio.md) for all 30+ ideas across Tier 2-4.

---

## Project Structure

```
.
├── src/                        # Portfolio website source
│   ├── app/                    # Next.js app directory
│   │   ├── (payload)/          # Payload CMS admin & API
│   │   ├── api/                # API routes (chat, contact, subscribe, github, rss)
│   │   ├── blog/               # Blog pages
│   │   ├── page.tsx            # Homepage
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── 3d/                 # Three.js 3D components
│   │   ├── sections/           # Page sections (Hero, About, Experience, Projects, Blog, Contact)
│   │   └── ui/                 # Shadcn/ui components
│   ├── collections/            # Payload CMS collections (Posts, Users, Subscribers, Media)
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities (payload, openai, utils)
├── company/                    # Legal & corporate documentation
│   ├── holding-structure.md
│   ├── us-corp-formation.md
│   ├── india-subsidiary.md
│   ├── banking-setup.md
│   ├── compliance-calendar.md
│   ├── ip-assignment.md
│   ├── contractor-agreements/
│   └── terms-privacy/
├── strategy/                   # Execution playbooks & frameworks
│   ├── 100-day-plan.md
│   ├── startup-portfolio.md
│   ├── prioritization-matrix.md
│   ├── launch-checklist.md
│   ├── growth-playbook.md
│   └── frameworks/
├── public/                     # Static assets
├── sample-blog-content/        # Sample blog posts
├── .cursorrules                # AI coding guidelines
├── .cursorignore               # AI context exclusions
├── payload.config.ts           # Payload CMS config
├── next.config.ts              # Next.js config
└── package.json
```

---

## Key Metrics

| Metric            | Day 30 | Day 60  | Day 100  |
| ----------------- | ------ | ------- | -------- |
| Products Launched | 15     | 50      | 100      |
| MRR               | $5,000 | $25,000 | $100,000 |
| Paying Customers  | 100    | 500     | 2,000    |

---

## Key Principles

1. **Ship fast** - Done is better than perfect
2. **Revenue first** - Validate with payment, not signups
3. **Automate everything** - CI/CD, monitoring, billing, support
4. **Learn publicly** - Build in public for distribution
5. **Kill fast** - 30 days without traction = kill

---

## About Rakesh Roushan

**Founder, AudioPod AI & UnQuest AI | Ex-Paytm, Ninjacart, Airtel**

Multi-versatile, pragmatic, curious & result-oriented professional based in Bengaluru, India. Specializes in building and scaling technology-driven ventures.

- **Twitter**: [@rakeshroushan](https://twitter.com/rakeshroushan)
- **LinkedIn**: [rakeshroushan1002](https://www.linkedin.com/in/rakeshroushan1002/)
- **GitHub**: [Rakesh1002](https://github.com/Rakesh1002/)
- **Email**: rakesh@rrholdings.com

---

**100 products. 100 days. $100k MRR. Let's build.**
