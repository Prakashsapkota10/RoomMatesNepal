import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Post Roommate Request",
  noIndex: true,
});

export default function CreateRoommateRequestPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Post Roommate Request</h1>
      <p className="text-muted-foreground">Describe what you are looking for in a roommate.</p>
    </div>
  );
}
