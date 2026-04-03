import { getAllPosts } from "@/lib/posts";
import { getWeeklyData } from "@/lib/weekly";
import HomeWrapper from "@/components/HomeWrapper";

export default function HomePage() {
  const posts = getAllPosts();
  const { songs, hairColors } = getWeeklyData();

  return (
    <HomeWrapper
      posts={posts}
      song={songs.current}
      hairColor={hairColors.current}
    />
  );
}
