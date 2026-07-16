"use client";

import { useState, useEffect } from "react";
import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ArchivedItem {
  id: string;
  title: string;
  type: "listing" | "requirement";
  archivedAt: string;
  reason: string;
}

async function fetchArchived(): Promise<ArchivedItem[]> {
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: "a1", title: "Room in Thamel - Budget", type: "listing", archivedAt: "2 weeks ago", reason: "Expired" },
    { id: "a2", title: "Flatmate search - Kirtipur", type: "requirement", archivedAt: "1 month ago", reason: "Fulfilled" },
  ];
}

export function ArchivedTab() {
  const [items, setItems] = useState<ArchivedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArchived().then((data) => { setItems(data); setIsLoading(false); });
  }, []);

  function handleRestore(id: string) { setItems((p) => p.filter((i) => i.id !== id)); }
  function handleDelete(id: string) { setItems((p) => p.filter((i) => i.id !== id)); }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No archived items. Deactivated or expired listings appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Card key={item.id} className="card-dashboard">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
              <Archive className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                <Badge variant="outline" className="text-[9px] px-1.5 capitalize shrink-0">{item.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Archived {item.archivedAt} • {item.reason}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="outline" size="xs" className="gap-1 text-xs" onClick={() => handleRestore(item.id)}>
                <RotateCcw className="h-3 w-3" /> Restore
              </Button>
              <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
