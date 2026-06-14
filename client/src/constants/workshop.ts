export interface WorkshopType {
  title: string;
  tagline: string;
  ageGroup: string;
  duration: string;
  mode: string;
  fee: string;
  startDate: string; // Display format (e.g. "15 July 2026")
  countdownTarget: string; // ISO date format for parsing (e.g. "2026-07-15T10:00:00")
  spotsLeft: number;
}

export const WORKSHOP: WorkshopType = {
  title: "AI & Robotics Summer Workshop",
  tagline: "Where young minds build the future — one robot at a time.",
  ageGroup: "8–14 Years",
  duration: "4 Weeks",
  mode: "Online (Live + Recorded)",
  fee: "₹2,999",
  startDate: "15 July 2026",
  countdownTarget: "2026-07-15T10:00:00",
  spotsLeft: 12
};
