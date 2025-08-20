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

## 🎨 Customization

### Personal Information
Update the content in the section components:
- `src/components/sections/Hero.tsx` - Name and title
- `src/components/sections/About.tsx` - Bio and skills
- `src/components/sections/Projects.tsx` - Portfolio projects
- `src/components/sections/Contact.tsx` - Contact information

### 3D Scene
Modify the 3D elements in:
- `src/components/Scene.tsx` - Main scene setup
- `src/components/3d/` - Individual 3D objects

### Styling
- Colors and theme: `src/app/globals.css`
- Component styles: Individual component files with Tailwind CSS

## 🔧 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **3D Scene Optimization**: Efficient rendering and LOD techniques
- **Bundle Analysis**: Webpack optimization for Three.js
- **Caching**: Advanced caching strategies

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full feature desktop experience
- **Touch Interactions**: Gesture-friendly 3D controls

## 🔗 Live Projects Integration

The portfolio automatically pulls data from:
- **GitHub**: [Rakesh1002](https://github.com/Rakesh1002/) repositories
- **LinkedIn**: [rakeshroushan1002](https://www.linkedin.com/in/rakeshroushan1002/) profile

## 🚀 Deployment

### Vercel (Recommended)
```bash
pnpm build
```
Then deploy to [Vercel](https://vercel.com)

### Other Platforms
The build output is compatible with any static hosting service:
```bash
pnpm build
pnpm export  # For static export if needed
```

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimal JavaScript payload
- **Loading Speed**: Sub-2 second first paint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About Rakesh Roushan

**Founder, AudioPod AI | Ex-Paytm, Ninjacart, Airtel**

Multi-versatile, pragmatic, curious & result-oriented professional based in Bengaluru, India. Rakesh specializes in building and scaling technology-driven ventures, passionate about democratizing audio creation and knowledge access using AI.

**Current Ventures:**
- **AudioPod AI** (Oct 2024 - Present): Co-Founder creating AI-driven audio tools
- **UnQuest AI** (Nov 2023 - Present): Founder building advanced knowledge management systems

**Connect with Rakesh:**
- **LinkedIn**: [rakeshroushan1002](https://www.linkedin.com/in/rakeshroushan1002/)
- **GitHub**: [Rakesh1002](https://github.com/Rakesh1002/)
- **Location**: Bengaluru, Karnataka, India

---

Built with ❤️ using the latest web technologies