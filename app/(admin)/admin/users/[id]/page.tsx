import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "User Detail",
  noIndex: true,
});

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">User Detail</h1>
      <p className="text-muted-foreground">User ID: {params.id}</p>
    </div>
  );
}
