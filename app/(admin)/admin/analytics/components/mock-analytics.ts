import type {
  SystemStat,
  UserGrowthPoint,
  EngagementSlice,
  LocationStat,
  ModerationMiniStat,
} from "./types";

// TODO: Replace all mock data below with real aggregates from the analytics API.

export const SYSTEM_STATS: SystemStat[] = [
  { label: "Total Users", value: "24,812", trend: 12.5 },
  { label: "Active Listings", value: "1,402", trend: 4.2 },
  { label: "Community Posts", value: "856", trend: -2.1 },
  { label: "Avg. Resolution", value: "4.2h", trend: -18 },
];

export const USER_GROWTH_DATA: UserGrowthPoint[] = [
  { month: "Jan", newUsers: 320, activeUsers: 180 },
  { month: "Feb", newUsers: 410, activeUsers: 240 },
  { month: "Mar", newUsers: 460, activeUsers: 300 },
  { month: "Apr", newUsers: 520, activeUsers: 410 },
  { month: "May", newUsers: 610, activeUsers: 520 },
  { month: "Jun", newUsers: 780, activeUsers: 690 },
];

export const ENGAGEMENT_SOURCE_DATA: EngagementSlice[] = [
  { name: "Room Search", value: 62, color: "var(--color-chart-1)" },
  { name: "Community Chat", value: 28, color: "var(--color-chart-5)" },
  { name: "Direct Links", value: 10, color: "var(--muted)" },
];

export const TOP_LOCATIONS: LocationStat[] = [
  { city: "Kathmandu", users: 12402, coords: [27.7172, 85.324] },
  { city: "Pokhara", users: 5120, coords: [28.2096, 83.9856] },
  { city: "Lalitpur", users: 3890, coords: [27.6588, 85.3247] },
  { city: "Bhaktapur", users: 1240, coords: [27.671, 85.4298] },
];

export const MODERATION_MINI_STATS: ModerationMiniStat[] = [
  {
    label: "Avg. Response",
    value: "14m",
    note: "↓ 2m from last week",
    noteColor: "text-[color:var(--trust)]",
    icon: "Gauge",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    label: "Resolutions",
    value: "1,240",
    note: "94% automated-assisted",
    noteColor: "text-muted-foreground",
    icon: "ClipboardCheck",
    iconColor: "text-[color:var(--community-dark)]",
    iconBg: "bg-[color:var(--community-light)]",
  },
  {
    label: "Pending Review",
    value: "18",
    note: "Critical Priority: 3",
    noteColor: "text-destructive",
    icon: "TriangleAlert",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
];
