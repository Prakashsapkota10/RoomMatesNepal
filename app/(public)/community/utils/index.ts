/**
 * Format large numbers into compact form (e.g. 1200 → "1.2k")
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
}

/**
 * Format date string to relative time (e.g. "2h ago", "15m ago")
 */
export function formatDate(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Date(dateStr).toLocaleDateString("en-NP");
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Get trust score color class based on the score value
 */
export function calculateTrustColor(score: number): string {
  if (score >= 90) return "text-[color:var(--success)]";
  if (score >= 75) return "text-[color:var(--trust)]";
  if (score >= 50) return "text-[color:var(--warning)]";
  return "text-muted-foreground";
}

/**
 * Format points with suffix (e.g. 2400 → "2.4k pts")
 */
export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1).replace(/\.0$/, "")}k pts`;
  }
  return `${points} pts`;
}
