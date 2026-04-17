"use client";
import dynamic from "next/dynamic";
import { HairColor, Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";

function HomeSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "14px",
      }}
    >
      {[
        { col: "1 / -1", h: "220px" },
        { col: "1 / -1", h: "120px" },
        { col: undefined, h: "260px" },
        { col: undefined, h: "260px" },
        { col: "1 / -1", h: "180px" },
      ].map((tile, i) => (
        <div
          key={i}
          className="os-window"
          style={{
            gridColumn: tile.col,
            height: tile.h,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

const DraggableHome = dynamic(() => import("./DraggableHome"), {
  ssr: false,
  loading: HomeSkeleton,
});

interface Props {
  posts: PostMeta[];
  song: Song;
  hairColor: HairColor;
}

export default function HomeWrapper(props: Props) {
  return <DraggableHome {...props} />;
}
