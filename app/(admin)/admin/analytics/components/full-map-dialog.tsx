"use client";

import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { LocationStat } from "./types";

interface FullMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: LocationStat[];
}

// Leaflet touches `window` on import, so the map must be client-only with no SSR.
const UserDensityMap = dynamic(
  () => import("./user-density-map").then((mod) => mod.UserDensityMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    ),
  }
);

/**
 * Full-size map modal — opened when the admin clicks the Top Locations map
 * preview. Renders the same heatmap at a much larger size, with scroll-wheel
 * zoom enabled since it's no longer competing with page scroll inside a
 * modal. Closes via the dialog's built-in close button, backdrop click, or Esc.
 * TODO: swap in the same real data source as the preview map once available.
 */
export function FullMapDialog({ open, onOpenChange, data }: FullMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 shrink-0">
          <DialogTitle>User Density Map — Nepal</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 isolate">
          {open && <UserDensityMap data={data} scrollWheelZoom />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
