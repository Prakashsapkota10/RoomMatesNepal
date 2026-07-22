import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { verifyRole } from "@/lib/auth";
import { AnalyticsClient } from "./components/analytics-client";

export const metadata: Metadata = buildMeta({
  title: "System Analytics",
  noIndex: true,
});

export default async function AdminAnalyticsPage() {
  // Route already gated by app/(admin)/layout.tsx — verifyRole is a defense-in-depth
  // check at the page level in case this page is ever reached via a different layout.
  await verifyRole("admin");

  return <AnalyticsClient />;
}
