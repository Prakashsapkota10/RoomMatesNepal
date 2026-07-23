"use client";

import { useState } from "react";
import { StickyNote, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatVerificationDateTime } from "./verification.utils";
import type { ReviewNote } from "./types";

interface ReviewNotesProps {
  notes: ReviewNote[];
  onAddNote: (message: string) => void;
}

/**
 * Internal review notes — timestamped, attributed to the acting admin, and
 * stored as part of the verification's history. Visible only within this
 * admin-only drawer, never surfaced to the end user.
 * TODO: wire onAddNote to a real POST /api/admin/verifications/:id/notes call.
 */
export function ReviewNotes({ notes, onAddNote }: ReviewNotesProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit() {
    if (!draft.trim()) return;
    onAddNote(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-3">
      {notes.length === 0 ? (
        <p className="text-xs text-muted-foreground">No internal notes yet.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {notes.map((note) => (
            <div key={note.id} className="flex gap-2.5 rounded-xl border p-3">
              <StickyNote className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm text-foreground leading-relaxed">{note.message}</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {note.authorName} · {formatVerificationDateTime(note.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add an internal review note — visible only to admins..."
          className="min-h-16 text-sm"
        />
        <Button
          size="sm"
          className="btn-primary-motion gap-1.5 font-semibold self-end"
          disabled={!draft.trim()}
          onClick={handleSubmit}
        >
          <Send className="h-3.5 w-3.5" />
          Add Note
        </Button>
      </div>
    </div>
  );
}
