import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const sortedPosts = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Rakesh Roushan — AI Products & Strategy",
    description:
      "Frameworks on AI product strategy, execution, and the solo founder journey. By Rakesh Roushan, founder of Roushan Venture Studio.",
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>
<managingEditor>hey@roushanrakesh.com (Rakesh Roushan)</managingEditor>
<webMaster>hey@roushanrakesh.com (Rakesh Roushan)</webMaster>`,
  });
}
