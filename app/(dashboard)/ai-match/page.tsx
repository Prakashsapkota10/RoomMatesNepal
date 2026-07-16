import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { AIMatchClient } from "./components/ai-match-client";

export const metadata: Metadata = buildMeta({
  title: "AI Match",
  noIndex: true,
});

export default function AIMatchPage() {
  return <AIMatchClient />;
}
