"use client";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import OSWindow from "./OSWindow";
import WeeklyWidget from "./WeeklyWidget";
import CatPainter from "./CatPainter";
import Soundboard from "./Soundboard";
import PostCard from "./PostCard";
import { HairColor, Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";
import { DragHandleContext } from "./DragHandleContext";

type TileId = "welcome" | "weekly" | "catpainter" | "soundboard" | "blog";

interface Props {
  posts: PostMeta[];
  song: Song;
  hairColor: HairColor;
}

function SortableTile(
  { id, children, gridColumn }: {
    id: TileId;
    children: React.ReactNode;
    gridColumn?: string;
  },
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const handleProps = {
    ...(listeners ?? {}),
    ...attributes,
  } as Record<string, unknown>;
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        gridColumn,
        alignSelf: id === "welcome" || id === "catpainter"
          ? "stretch"
          : "start",
        display: id === "welcome" || id === "catpainter" ? "flex" : undefined,
        flexDirection: id === "welcome" || id === "catpainter"
          ? "column"
          : undefined,
      }}
    >
      <DragHandleContext.Provider value={handleProps}>
        {children}
      </DragHandleContext.Provider>
    </div>
  );
}

function WelcomeTile() {
  return (
    <OSWindow title="welcome.txt" fillHeight>
      <div style={{ padding: "18px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, var(--lavender-soft), var(--pink-soft))",
              border: "2px solid var(--window-border)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              boxShadow: "2px 2px 0 var(--window-border)",
            }}
          >
            <span className="heartbeat">✿</span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 2,
              }}
            >
              hi, i&apos;m lauren! ♥
            </div>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text-light)",
                lineHeight: 2,
              }}
            >
              ✦ welcome to my little corner
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px dashed var(--lavender-soft)",
            marginBottom: "12px",
          }}
        />
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "15px",
            color: "var(--text-mid)",
            lineHeight: 1.85,
            margin: "0 0 12px",
          }}
        >
          this is my personal site where i share things i love — music, hair
          colors, blog posts, and my cat amari ♥ always under construction &amp;
          made with lots of sparkles ✦
        </p>
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          {[
            { icon: "✍️", text: "blogger" },
            { icon: "🎵", text: "music lover" },
            { icon: "🐱", text: "cat mom" },
            { icon: "✨", text: "always online" },
          ].map(({ icon, text }) => (
            <span
              key={text}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                background: "var(--lavender-pale)",
                color: "var(--text-mid)",
                border: "1px solid var(--window-border)",
                borderRadius: "20px",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "9px" }}>{icon}</span> {text}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          {[
            "var(--pink-mid)",
            "var(--lavender)",
            "var(--mint)",
            "var(--peach)",
            "var(--pink-soft)",
            "var(--lavender-soft)",
          ].map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "8px",
                background: c,
                borderRadius: "4px",
              }}
            />
          ))}
        </div>
      </div>
    </OSWindow>
  );
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
                fontFamily: "'Nunito', sans-serif",
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

const INITIAL_TILES: TileId[] = [
  "welcome",
  "weekly",
  "soundboard",
  "catpainter",
  "blog",
];

export default function DraggableHome({ posts, song, hairColor }: Props) {
  const [tiles, setTiles] = useState<TileId[]>(INITIAL_TILES);
  const [activeId, setActiveId] = useState<TileId | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  );

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as TileId);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (over && active.id !== over.id) {
      setTiles((prev) =>
        arrayMove(
          prev,
          prev.indexOf(active.id as TileId),
          prev.indexOf(over.id as TileId),
        )
      );
    }
  }

  function renderTile(id: TileId) {
    switch (id) {
      case "welcome":
        return <WelcomeTile />;
      case "weekly":
        return <WeeklyWidget song={song} hairColor={hairColor} />;
      case "catpainter":
        return <CatPainter />;
      case "soundboard":
        return <Soundboard />;
      case "blog":
        return <BlogTile posts={posts} />;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tiles} strategy={rectSortingStrategy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "14px",
              alignItems: "start",
            }}
          >
            {tiles.map((id) => (
              <SortableTile
                key={id}
                id={id}
                gridColumn={id === "blog" || id === "welcome" || id === "weekly"
                  ? "1 / -1"
                  : id === "soundboard"
                  ? "span 2"
                  : undefined}
              >
                {renderTile(id)}
              </SortableTile>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <div
              style={{
                opacity: 0.8,
                transform: "rotate(1.5deg)",
                pointerEvents: "none",
              }}
            >
              {renderTile(activeId)}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
