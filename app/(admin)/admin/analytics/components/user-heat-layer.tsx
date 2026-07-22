"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import type { LocationStat } from "./types";

interface UserHeatLayerProps {
  data: LocationStat[];
}

/**
 * Imperative Leaflet heatmap layer (via leaflet.heat) plotting user density
 * by city. Weighted by user count so Kathmandu renders as the hottest spot.
 * Must run inside a react-leaflet <MapContainer>, since it reads the map
 * instance directly via useMap().
 */
export function UserHeatLayer({ data }: UserHeatLayerProps) {
  const map = useMap();

  useEffect(() => {
    const max = Math.max(...data.map((d) => d.users));
    const points: [number, number, number][] = data.map((d) => [
      d.coords[0],
      d.coords[1],
      // Normalize intensity to 0.4–1 so smaller cities still show up.
      0.4 + (d.users / max) * 0.6,
    ]);

    const heatLayer = L.heatLayer(points, {
      radius: 35,
      blur: 25,
      maxZoom: 12,
      minOpacity: 0.35,
      // Canvas gradients need literal color strings — mirrors the brand blue
      // scale from app/globals.css (--brand / --brand-dark) since CSS custom
      // properties can't be resolved inside the heatmap's off-screen canvas.
      gradient: {
        0.2: "#93c5fd",
        0.4: "#60a5fa",
        0.6: "#3b82f6",
        0.8: "#1554D1",
        1.0: "#0A2D73",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, data]);

  return null;
}
