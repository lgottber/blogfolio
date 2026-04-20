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
import WelcomeTile from "./WelcomeTile";
import WeeklyWidget from "./WeeklyWidget";
import CatPainter from "./CatPainter";
import Soundboard from "./Soundboard";
import PostCard from "./PostCard";
import { Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";
import { DragHandleContext } from "./DragHandleContext";

type TileId = "welcome" | "weekly" | "catpainter" | "soundboard" | "blog";

interface Props {
  posts: PostMeta[];
  song: Song;
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
        alignSelf: id === "welcome" || id === "catpainter" || id === "soundboard"
          ? "stretch"
          : "start",
        display: id === "welcome" || id === "catpainter" || id === "soundboard"
          ? "flex"
          : undefined,
        flexDirection: id === "welcome" || id === "catpainter" ||
            id === "soundboard"
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

const INITIAL_TILES: TileId[] = [
  "welcome",
  "weekly",
  "soundboard",
  "catpainter",
  "blog",
];

export default function DraggableHome({ posts, song }: Props) {
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
        return <WeeklyWidget song={song} />;
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
            className="home-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
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
