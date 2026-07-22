"use client";

import { ImageIcon, MessageSquareText, FileText } from "lucide-react";
import type { AdminReportRow } from "./types";

const ICON_MAP = {
  image: ImageIcon,
  chat: MessageSquareText,
  document: FileText,
} as const;

interface EvidenceLinkProps {
  file?: AdminReportRow["evidenceFile"];
  type?: AdminReportRow["evidenceType"];
}

/** Small clickable evidence reference shown in the reports table's Evidence column. */
export function EvidenceLink({ file, type }: EvidenceLinkProps) {
  if (!file) {
    return <span className="text-xs text-muted-foreground italic">No evidence provided</span>;
  }

  const Icon = type ? ICON_MAP[type] : FileText;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate max-w-[120px]">{file}</span>
    </button>
  );
}
