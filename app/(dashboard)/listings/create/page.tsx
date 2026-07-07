import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Post a Room",
  noIndex: true,
});

export default function CreateListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Post a Room</h1>
      <p className="text-muted-foreground">Fill in the details to create your listing.</p>
    </div>
  );
}
