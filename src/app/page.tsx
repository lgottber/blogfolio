import { getAllPosts } from "../lib/posts.ts";
import { getWeeklyData } from "../lib/weekly.ts";
import HomeWrapper from "../components/HomeWrapper.tsx";

export default function HomePage() {
  const posts = getAllPosts();
  const { songs } = getWeeklyData();

  return (
    <HomeWrapper
      posts={posts}
      song={songs.current}
    />
  );
}
