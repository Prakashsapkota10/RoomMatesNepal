"use client";

import { Wifi, AirVent, Bike, UtensilsCrossed, Car, Home, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "High-speed WiFi": Wifi,
  WiFi: Wifi,
  "Air Conditioning": AirVent,
  "Bike Parking": Bike,
  Parking: Car,
  "Kitchen Access": UtensilsCrossed,
};

/** Resolves a plain-text amenity/preference label to a matching lucide icon, with a sensible fallback. */
export function AmenityIcon({ label, className }: { label: string; className?: string }) {
  const Icon = ICON_MAP[label] ?? Home;
  return <Icon className={className ?? "h-4 w-4"} />;
}
