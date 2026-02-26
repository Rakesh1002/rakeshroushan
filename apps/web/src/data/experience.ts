export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  impact?: string;
  tags: string[];
  url?: string;
}

export const experience: Experience[] = [
  {
    title: "Founder",
    company: "Roushan Venture Studio",
    location: "Bengaluru, India",
    period: "Jan 2025 - Present",
    current: true,
    description:
      "Building a portfolio of 20+ AI-powered SaaS products. Leveraging Cloudflare's edge infrastructure to ship fast with near-zero infra costs.",
    impact: "12 products live, 8 in development — solo founder, zero employees",
    tags: ["AI/ML", "Venture Studio", "Product Strategy"],
    url: "https://roushan.xyz",
  },
  {
    title: "Founder",
    company: "AudioPod AI",
    location: "Bengaluru, India",
    period: "Nov 2024 - Present",
    current: true,
    description:
      "Unified AI audio workstation — Like Canva for Audio. Seamless and accessible audio tools for all content creators.",
    impact: "Flagship product — diarization, voice cloning, stem splitting, translation",
    tags: ["AI/ML", "Audio Processing", "Product Strategy"],
    url: "https://audiopod.ai",
  },
  {
    title: "Founder",
    company: "UnQuest AI",
    location: "Bengaluru, India",
    period: "Nov 2023 - Oct 2024",
    description:
      "Built an AI knowledge management platform — the world's best knowledge companion.",
    impact: "0-to-1 build: RAG pipeline, semantic search, multi-format ingestion",
    tags: ["AI/ML", "Knowledge Management", "NLP"],
    url: "https://unquest.ai",
  },
  {
    title: "Deputy General Manager",
    company: "Paytm",
    location: "India",
    period: "Jan 2023 - Nov 2023",
    description:
      "Led Business Product for Paytm Soundbox service team. Drove strategy and growth for fintech product lines.",
    impact: "Owned product strategy for Soundbox — Paytm's highest-margin hardware product",
    tags: ["Strategy", "Growth", "Fintech"],
  },
  {
    title: "Strategy & Growth",
    company: "Ninjacart",
    location: "Bengaluru, India",
    period: "Oct 2021 - Dec 2022",
    description:
      "Led 0-1 initiatives for Ninjacart Fintech business. Built and scaled new revenue streams in agri-tech.",
    impact: "Launched fintech vertical from scratch — credit, payments, and insurance for farmers",
    tags: ["Strategy", "Agri-tech", "Operations"],
  },
  {
    title: "Marketing Manager",
    company: "Bharti Airtel",
    location: "India",
    period: "Nov 2020 - Sept 2021",
    description:
      "Managed 500cr+ topline marketing for Airtel Karnataka. Digital marketing, brand strategy, and analytics.",
    impact: "Managed INR 500cr+ P&L — largest regional marketing portfolio",
    tags: ["Digital Marketing", "Brand Strategy", "Analytics"],
  },
  {
    title: "Zonal Sales Manager",
    company: "Bharti Airtel",
    location: "India",
    period: "Aug 2019 - Nov 2020",
    description:
      "Managed 5cr+ topline sales across semi-urban Hyderabad territory.",
    tags: ["Sales", "Operations", "Team Management"],
  },
  {
    title: "Management Associate",
    company: "Singtel",
    location: "Singapore",
    period: "Jun 2019 - Jul 2019",
    description:
      "Product marketing campaigns for prepaid services across South East Asian markets.",
    tags: ["Product Marketing", "Telecom", "Analytics"],
  },
  {
    title: "Young Leader",
    company: "Bharti Airtel",
    location: "India",
    period: "Jun 2018 - May 2019",
    description:
      "Sales and marketing across rural and urban Indian markets as part of Airtel's leadership program.",
    tags: ["Sales", "Marketing", "Leadership"],
  },
];
