import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Manage Users",
  noIndex: true,
});

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <p className="text-muted-foreground">View, suspend, and manage user accounts.</p>
    </div>
  );
}
