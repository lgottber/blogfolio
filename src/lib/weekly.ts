import songsData from "../../data/songs.json";
import hairData from "../../data/hair-colors.json";

export interface Song {
  title: string;
  artist: string;
  note?: string;
  week: string;
  spotifyId?: string;
}

export interface HairColor {
  name: string;
  hex: string;
  note?: string;
  week: string;
}

export interface WeeklyData {
  songs: { current: Song; herstory: Song[] };
  hairColors: { current: HairColor; herstory: HairColor[] };
}

export function getWeeklyData(): WeeklyData {
  return {
    songs: songsData as { current: Song; herstory: Song[] },
    hairColors: hairData as { current: HairColor; herstory: HairColor[] },
  };
}

export function formatWeek(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}
