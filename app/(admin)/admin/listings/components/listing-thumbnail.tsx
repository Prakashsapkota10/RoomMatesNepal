"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ListingThumbnailProps {
  src?: string;
  alt: string;
  className?: string;
}

/** Compact table thumbnail used in the listings/roommate-requests tables. */
export function ListingThumbnail({ src, alt, className }: ListingThumbnailProps) {
  return (
    <div className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ImageOff className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
