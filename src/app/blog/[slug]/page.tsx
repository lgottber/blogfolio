import { getAllPosts, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import OSWindow from "@/components/OSWindow";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Lauren's Blogfolio`,
    description: post.description,
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <Link href="/blog" className="y2k-btn">♥ back</Link>
      </div>

      {/* Post header window */}
      <OSWindow title={`📄 ${post.title}`}>
        <div style={{ padding: "18px 22px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            <time
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                color: "#b098c8",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags?.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#7a5890",
                  border: "1px solid #c8aaf0",
                  padding: "3px 8px",
                  background: "#ead8ff",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {post.description && (
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "16px",
                color: "#a080c0",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {post.description}
            </p>
          )}
        </div>
      </OSWindow>

      {/* Post content window */}
      <OSWindow title="contents">
        <div style={{ padding: "20px 24px" }}>
          <div
            className="y2k-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </OSWindow>

      <div style={{ textAlign: "center" }}>
        <Link href="/blog" className="y2k-btn">♥ all posts</Link>
      </div>
    </div>
  );
}
