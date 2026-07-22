"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { UserHeatLayer } from "./user-heat-layer";
import type { LocationStat } from "./types";

interface UserDensityMapProps {
  data: LocationStat[];
  /** Enable mouse-wheel zoom — off by default so the map never traps page scroll. */
  scrollWheelZoom?: boolean;
}

// Centered over Nepal so all four tracked cities are visible by default.
const NEPAL_CENTER: [number, number] = [27.9, 84.6];

/**
 * Real interactive Leaflet map of Nepal with a user-density heatmap layer
 * (via leaflet.heat) plus small city markers for reference.
 * TODO: swap the OpenStreetMap tile layer for the project's preferred tile
 * provider if one is chosen later, and feed real geo-aggregated user data.
 */
export function UserDensityMap({ data, scrollWheelZoom = false }: UserDensityMapProps) {
  return (
    <MapContainer
      center={NEPAL_CENTER}
      zoom={7}
      scrollWheelZoom={scrollWheelZoom}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <UserHeatLayer data={data} />
      {data.map((loc) => (
        <CircleMarker
          key={loc.city}
          center={loc.coords}
          radius={5}
          pathOptions={{ color: "#0A2D73", fillColor: "#1554D1", fillOpacity: 1, weight: 1.5 }}
        >
          <Tooltip direction="top" offset={[0, -4]}>
            <span className="text-xs font-medium">
              {loc.city} · {loc.users.toLocaleString()} users
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
