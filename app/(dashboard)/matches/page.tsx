import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "AI Matches",
  noIndex: true,
});

export default function MatchesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">AI Matches</h1>
      <p className="text-muted-foreground">Your compatibility matches will appear here.</p>
    </div>
  );
}
