import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Reports",
  noIndex: true,
});

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="text-muted-foreground">Review user-submitted reports and flags.</p>
    </div>
  );
}
