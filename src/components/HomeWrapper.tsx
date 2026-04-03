"use client";
import dynamic from "next/dynamic";
import { HairColor, Song } from "@/lib/weekly";
import { PostMeta } from "@/lib/posts";

const DraggableHome = dynamic(() => import("./DraggableHome"), {
  ssr: false,
});

interface Props {
  posts: PostMeta[];
  song: Song;
  hairColor: HairColor;
}

export default function HomeWrapper(props: Props) {
  return <DraggableHome {...props} />;
}
