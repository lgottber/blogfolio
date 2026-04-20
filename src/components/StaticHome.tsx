import OSWindow from "./OSWindow";
import WeeklyWidget from "./WeeklyWidget";
import CatPainter from "./CatPainter";
import Soundboard from "./Soundboard";
import PostCard from "./PostCard";
import WelcomeTile from "./WelcomeTile";
import { Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";

interface Props {
  posts: PostMeta[];
  song: Song;
}

function BlogTile({ posts }: { posts: PostMeta[] }) {
  return (
    <OSWindow title="blog_entries/">
      <div style={{ padding: "8px" }}>
        {posts.length === 0
          ? (
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
          )
          : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
      </div>
    </OSWindow>
  );
}

export default function StaticHome({ posts, song }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
      }}
    >
      <div
        className="home-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "14px",
          alignItems: "start",
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <WelcomeTile />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <WeeklyWidget song={song} />
        </div>
        <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column" }}>
          <Soundboard />
        </div>
        <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column" }}>
          <CatPainter />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <BlogTile posts={posts} />
        </div>
      </div>
    </div>
  );
}
