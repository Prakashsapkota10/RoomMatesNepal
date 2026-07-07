import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Manage Listings",
  noIndex: true,
});

export default function AdminListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Listings</h1>
      <p className="text-muted-foreground">Review, approve, and remove listings.</p>
    </div>
  );
}
