import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const content = `User-agent: *
Allow: /

Sitemap: https://roushanrakesh.com/sitemap-index.xml
`;
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
};
