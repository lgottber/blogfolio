import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import OSWindow from "@/components/OSWindow";

export const metadata: Metadata = { title: "blog — Lauren's Blogfolio" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <Link href="/" className="y2k-btn">♥ back</Link>
      </div>

      <OSWindow title="blog_entries/">
        <div style={{ padding: "14px 18px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#7a5890",
              lineHeight: 1.8,
            }}
          >
            ✦ all posts ✦
          </div>
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
                  fontFamily: "var(--font-nunito), sans-serif",
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
