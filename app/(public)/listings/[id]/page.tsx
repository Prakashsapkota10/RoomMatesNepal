import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Listing Details",
});

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Listing Details</h1>
      <p className="text-muted-foreground">Listing ID: {params.id}</p>
    </div>
  );
}
