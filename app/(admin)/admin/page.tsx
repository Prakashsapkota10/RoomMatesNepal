import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Platform overview and management.</p>
    </div>
  );
}
