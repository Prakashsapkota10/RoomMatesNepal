import type { Contributor } from "../types";
import { formatPoints } from "../utils";

interface TopContributorsProps {
  contributors: Contributor[];
}

export function TopContributors({ contributors }: TopContributorsProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
        Top Contributors
      </h3>
      <div className="flex flex-col gap-3">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="flex items-center gap-3">
            {contributor.avatar ? (
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {contributor.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">{contributor.name}</p>
              <p className="text-[10px] text-muted-foreground">{contributor.role}</p>
            </div>
            <span className="text-xs font-bold text-primary whitespace-nowrap">
              {formatPoints(contributor.points)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
