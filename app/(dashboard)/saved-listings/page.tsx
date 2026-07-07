import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Saved Listings",
  noIndex: true,
});

export default function SavedListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Saved Listings</h1>
      <p className="text-muted-foreground">Your bookmarked listings will appear here.</p>
    </div>
  );
}
