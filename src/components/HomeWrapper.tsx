"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Song } from "../lib/weekly.ts";
import { PostMeta } from "../lib/posts.ts";
import StaticHome from "./StaticHome.tsx";

const DraggableHome = dynamic(() => import("./DraggableHome.tsx"), {
  ssr: false,
});

interface Props {
  posts: PostMeta[];
  song: Song;
}

export default function HomeWrapper(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StaticHome {...props} />;
  }

  return <DraggableHome {...props} />;
}
