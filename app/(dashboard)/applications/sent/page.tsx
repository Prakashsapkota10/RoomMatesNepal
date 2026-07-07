import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Sent Applications",
  noIndex: true,
});

export default function SentApplicationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Sent Applications</h1>
      <p className="text-muted-foreground">Applications you have submitted to listings.</p>
    </div>
  );
}
