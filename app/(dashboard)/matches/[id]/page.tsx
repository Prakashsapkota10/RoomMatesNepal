import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Match Profile",
  noIndex: true,
});

export default function MatchProfilePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Match Profile</h1>
      <p className="text-muted-foreground">Match ID: {params.id}</p>
    </div>
  );
}
