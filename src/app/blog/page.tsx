import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import OSWindow from "@/components/OSWindow";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, things I love, and whatever else — Lauren's blog posts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <Link href="/" className="y2k-btn">♥ back</Link>
      </div>

      <OSWindow title="blog_entries/">
        <div style={{ padding: "14px 18px", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#7a5890",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            ✦ all posts ✦
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "15px",
              color: "#a080c0",
              marginTop: "6px",
            }}
          >
            thoughts, things i love, and whatever else ♥
          </p>
        </div>
      </OSWindow>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {posts.length === 0
          ? (
            <OSWindow title="empty.txt">
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#b098c8",
                }}
              >
                no posts yet ♥
              </div>
            </OSWindow>
          )
          : (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
      </div>
    </div>
  );
}
