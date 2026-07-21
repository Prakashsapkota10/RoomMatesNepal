import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Analytics",
  noIndex: true,
});

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-muted-foreground">Platform-wide analytics and performance insights.</p>
    </div>
  );
}
