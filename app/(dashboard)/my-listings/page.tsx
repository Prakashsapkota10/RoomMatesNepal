import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "My Listings",
  noIndex: true,
});

export default function MyListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Listings</h1>
      <p className="text-muted-foreground">Your active and past listings will appear here.</p>
    </div>
  );
}
