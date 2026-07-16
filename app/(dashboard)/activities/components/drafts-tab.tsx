"use client";

import { useState, useEffect } from "react";
import { FileText, Pencil, Trash2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Draft {
  id: string;
  title: string;
  type: "listing" | "requirement";
  lastEdited: string;
  completionPercent: number;
}

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchDrafts(): Promise<Draft[]> {
  await new Promise((r) => setTimeout(r, 200));

  return [
    {
      id: "d1",
      title: "Studio Apartment - Sanepa",
      type: "listing",
      lastEdited: "2 hours ago",
      completionPercent: 70,
    },
    {
      id: "d2",
      title: "Looking for flatmate in Patan",
      type: "requirement",
      lastEdited: "1 day ago",
      completionPercent: 40,
    },
    {
      id: "d3",
      title: "Room near Tribhuvan University",
      type: "listing",
      lastEdited: "3 days ago",
      completionPercent: 55,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DraftsTab() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDrafts().then((data) => {
      setDrafts(data);
      setIsLoading(false);
    });
  }, []);

  function handleDelete(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No drafts yet. Your incomplete listings and requirements will appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {drafts.map((draft) => (
        <Card key={draft.id} className="card-dashboard">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-light shrink-0">
              <FileText className="h-4.5 w-4.5 text-warning-dark" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground truncate">{draft.title}</h4>
                <Badge variant="outline" className="text-[9px] px-1.5 font-medium capitalize shrink-0">
                  {draft.type}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {draft.lastEdited}
                </span>
                <span>{draft.completionPercent}% complete</span>
              </div>
              {/* Mini progress bar */}
              <div className="h-1 w-24 rounded-full bg-muted mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-warning"
                  style={{ width: `${draft.completionPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="outline" size="xs" className="gap-1 text-xs font-medium">
                <Pencil className="h-3 w-3" />
                Continue
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(draft.id)}
                aria-label="Delete draft"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
