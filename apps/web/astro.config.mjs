// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://roushanrakesh.com",
  output: "static",
  adapter: cloudflare(),

  integrations: [
    react(),
    mdx(),
    sitemap(),
    keystatic(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
