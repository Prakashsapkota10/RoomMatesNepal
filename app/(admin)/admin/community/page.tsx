import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Community Management",
  noIndex: true,
});

export default function AdminCommunityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Community Management</h1>
      <p className="text-muted-foreground">Manage questions, discussions, and community posts.</p>
    </div>
  );
}
