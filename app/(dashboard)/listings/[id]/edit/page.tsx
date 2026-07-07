import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Edit Listing",
  noIndex: true,
});

export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Listing</h1>
      <p className="text-muted-foreground">Listing ID: {params.id}</p>
    </div>
  );
}
