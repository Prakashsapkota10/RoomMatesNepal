import type { Metadata } from "next";
import { CommunityPageContent } from "./community-page-content";

export const metadata: Metadata = {
  title: "Community Hub",
  description:
    "Connect with fellow urban dwellers in Nepal. Find roommates, discover hidden gems, and share your living experiences.",
};

export default function CommunityPage() {
  return <CommunityPageContent />;
}
