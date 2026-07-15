"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Map preview card with a placeholder map and "Open Full Map" button.
 * TODO: Replace with actual map integration (Leaflet/Mapbox/Google Maps).
 */
export function MapPreview() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-4 pt-3 pb-2">
          Live Location View
        </p>
        {/* Placeholder map */}
        <div className="relative h-32 bg-gradient-to-br from-green-100 via-green-50 to-blue-50 dark:from-green-900/20 dark:via-green-800/10 dark:to-blue-900/10 flex items-center justify-center">
          <MapPin className="h-8 w-8 text-foreground" />
          <Button
            size="xs"
            className="absolute bottom-2 right-2 text-[10px] font-semibold bg-foreground text-background hover:bg-foreground/90"
          >
            Open Full Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
