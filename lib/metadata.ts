import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/lib/constants";

interface PageMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMeta({
  title,
  description = APP_DESCRIPTION,
  image,
  noIndex = false,
}: PageMetaOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(APP_URL),
    openGraph: {
      title: fullTitle,
      description,
      siteName: APP_NAME,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
