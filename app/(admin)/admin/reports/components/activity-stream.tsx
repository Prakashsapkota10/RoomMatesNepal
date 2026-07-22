"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface ActivityStreamEntry {
  id: string;
  color: string;
  message: string;
  time: string;
}

interface ActivityStreamProps {
  entries: ActivityStreamEntry[];
}

/**
 * Dark "Activity Stream" panel — a live-feeling log of moderation events.
 * Uses the project's existing dark-panel pattern (bg-foreground/text-background),
 * the same one used for CTA sections elsewhere in the app.
 * TODO: replace `entries` with a real moderation activity-log query.
 */
export function ActivityStream({ entries }: ActivityStreamProps) {
  return (
    <Card className="bg-foreground text-background border-0">
      <CardContent className="p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold">Activity Stream</h3>

        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 mt-1.5 ${entry.color}`} />
              <div className="min-w-0">
                <p
                  className="text-xs leading-snug text-background/90"
                  dangerouslySetInnerHTML={{ __html: entry.message }}
                />
                <p className="text-[10px] text-background/50 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-1 border-background/20 bg-background/5 text-background hover:bg-background/10 font-medium"
        >
          View All Logs
        </Button>
      </CardContent>
    </Card>
  );
}
