import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import process from "node:process";

const postsDir = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) =>
    f.endsWith(".md") || f.endsWith(".mdx")
  );

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1999-12-31",
      description: data.description,
      tags: data.tags ?? [],
    } satisfies PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(slug: string): Post | null {
  const mdPath = path.join(postsDir, `${slug}.md`);
  const mdxPath = path.join(postsDir, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
    ? mdxPath
    : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "1999-12-31",
    description: data.description,
    tags: data.tags ?? [],
    content: marked(content) as string,
  };
}
