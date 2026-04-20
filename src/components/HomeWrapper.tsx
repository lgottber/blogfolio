"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";
import StaticHome from "./StaticHome";

const DraggableHome = dynamic(() => import("./DraggableHome"), { ssr: false });

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
