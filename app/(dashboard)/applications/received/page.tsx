import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Received Applications",
  noIndex: true,
});

export default function ReceivedApplicationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Received Applications</h1>
      <p className="text-muted-foreground">People who have applied to your listings.</p>
    </div>
  );
}
