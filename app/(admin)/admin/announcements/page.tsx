import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Announcements",
  noIndex: true,
});

export default function AdminAnnouncementsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Announcements</h1>
      <p className="text-muted-foreground">Create and manage platform announcements.</p>
    </div>
  );
}
