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

---

# Rakesh Roushan - 3D Portfolio Website

A superfast, responsive personal portfolio website built with Three.js, Next.js 15, and modern web technologies. This portfolio showcases Rakesh Roushan's work as a Founder, Product Manager, and Marketer with immersive 3D animations and smooth interactions.

## ✨ Features

- **🎯 Modern Design**: Clean, professional design with stunning 3D elements
- **⚡ Superfast Performance**: Optimized with Next.js 15, Turbopack, and advanced performance techniques
- **📱 Fully Responsive**: Perfect experience across all devices and screen sizes
- **🎨 3D Animations**: Interactive Three.js scenes with floating objects and particle effects
- **🚀 Smooth Scrolling**: Framer Motion powered animations and scroll interactions
- **🔗 Real Projects**: Direct integration with GitHub projects and LinkedIn profile
- **🎭 Interactive Elements**: Hover effects, smooth transitions, and engaging micro-interactions
- **💼 Professional Showcase**: Tailored for entrepreneurial and product management expertise

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 + Shadcn/ui components
- **3D Graphics**: Three.js + React Three Fiber + React Three Drei
- **Animations**: Framer Motion + GSAP
- **Language**: TypeScript
- **Performance**: Advanced optimizations and code splitting
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rakesh1002/portfolio
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the portfolio

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── 3d/            # Three.js 3D components
│   ├── sections/      # Page sections (Hero, About, Projects, Contact)
│   ├── ui/            # Reusable UI components
│   ├── Navigation.tsx # Main navigation
│   └── Scene.tsx      # Main 3D scene
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## 👨‍💻 About Rakesh Roushan

**Founder, AudioPod AI | Ex-Paytm, Ninjacart, Airtel**

- **LinkedIn**: [rakeshroushan1002](https://www.linkedin.com/in/rakeshroushan1002/)
- **GitHub**: [Rakesh1002](https://github.com/Rakesh1002/)

---

Built with ❤️ using the latest web technologies
