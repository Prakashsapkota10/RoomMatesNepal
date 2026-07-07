import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format NPR currency */
export function formatCurrency(amount: number, currency = CURRENCY): string {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Relative time — "2 hours ago" */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-NP");
}

/** Truncate string */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/** Slug from string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Get trust score label */
export function getTrustLabel(score: number): string {
  if (score <= 20) return "Unverified";
  if (score <= 40) return "Basic";
  if (score <= 60) return "Trusted";
  if (score <= 80) return "Verified";
  return "Elite";
}

/** Get trust score colour */
export function getTrustColor(score: number): string {
  if (score <= 20) return "text-red-500";
  if (score <= 40) return "text-orange-500";
  if (score <= 60) return "text-yellow-500";
  if (score <= 80) return "text-blue-500";
  return "text-green-500";
}

/** Build URL search params from an object */
export function buildSearchParams(
  params: Record<string, string | number | boolean | undefined>
): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  });
  const str = sp.toString();
  return str ? `?${str}` : "";
}
