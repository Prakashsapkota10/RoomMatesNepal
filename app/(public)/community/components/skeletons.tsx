import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_COUNTS } from "../constants";

export function HeroSkeleton() {
  return (
    <section className="pt-24 pb-8 lg:pt-28 lg:pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-10 w-full max-w-xl rounded-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}


export function CategorySkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: SKELETON_COUNTS.categories }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
  );
}

export function DiscussionCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex gap-3">
        <Skeleton className="h-5 w-5 rounded" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedDiscussionSkeleton() {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-48 md:h-auto md:w-72 lg:w-80" />
        <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrendingCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="flex flex-col gap-5">
      {/* AI Card */}
      <Skeleton className="h-40 rounded-2xl" />
      {/* Contributors */}
      <div className="rounded-2xl border bg-card p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1 flex flex-col gap-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
      {/* Tags */}
      <div className="rounded-2xl border bg-card p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-28 rounded-full" />
          ))}
        </div>
      </div>
      {/* Cities */}
      <div className="rounded-2xl border bg-card p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </aside>
  );
}
