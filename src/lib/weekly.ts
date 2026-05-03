import songsData from "../../data/songs.json";

export interface Song {
  title: string;
  artist: string;
  note?: string;
  week: string;
  spotifyId?: string;
}

export function getWeeklyData(): {
  songs: { current: Song; herstory: Song[] };
} {
  return {
    songs: songsData as { current: Song; herstory: Song[] },
  };
}

export function formatWeek(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}
