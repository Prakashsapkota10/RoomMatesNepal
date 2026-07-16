import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { ActivitiesClient } from "./components/activities-client";

export const metadata: Metadata = buildMeta({
  title: "My Activities",
  noIndex: true,
});

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
