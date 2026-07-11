import type { PopularCity } from "../types";

interface PopularCitiesProps {
  cities: PopularCity[];
}

export function PopularCities({ cities }: PopularCitiesProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
        Popular Cities
      </h3>
      <div className="flex flex-col gap-2.5">
        {cities.map((city) => (
          <div key={city.id} className="flex items-center justify-between">
            <span className="text-sm font-medium">{city.name}</span>
            <span className="text-xs text-muted-foreground">{city.members}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
