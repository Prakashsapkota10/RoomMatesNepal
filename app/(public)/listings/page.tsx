import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { ListingsContent } from "./listings-content";

export const metadata: Metadata = buildMeta({
  title: "Browse Room Listings",
  description: "Browse verified room listings, apartments, PGs, and hostels across Nepal.",
});

export default function ListingsPage() {
  return <ListingsContent />;
}
