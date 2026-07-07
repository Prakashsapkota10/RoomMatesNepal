import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Roommate Profile",
});

export default function RoommateProfilePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Roommate Profile</h1>
      <p className="text-muted-foreground">Seeker ID: {params.id}</p>
    </div>
  );
}
