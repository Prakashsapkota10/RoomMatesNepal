/**
 * Shared types for the admin System Analytics page.
 * TODO: Replace with real DTOs returned by the backend analytics API.
 */

export interface SystemStat {
  label: string;
  value: string;
  trend: number;
}

export interface UserGrowthPoint {
  month: string;
  newUsers: number;
  activeUsers: number;
}

export interface EngagementSlice {
  name: string;
  value: number;
  color: string;
}

export interface LocationStat {
  city: string;
  users: number;
  /** [latitude, longitude] used to plot this city on the heatmap. */
  coords: [number, number];
}

export interface ModerationMiniStat {
  label: string;
  value: string;
  note: string;
  noteColor: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}
