import type { CommunityStat } from "../types";

interface CommunityStatsProps {
  stats: CommunityStat[];
}

export function CommunityStats({ stats }: CommunityStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col items-center justify-center rounded-2xl border bg-card py-5 px-3"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-primary">
            {stat.value}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
