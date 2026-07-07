import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Find a Roommate",
  description: "Browse roommate seekers across Nepal and find your ideal match.",
});

export default function RoommatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Find a Roommate</h1>
      <p className="text-muted-foreground">Browse people looking for rooms or roommates.</p>
    </div>
  );
}
