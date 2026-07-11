import { Shield } from "lucide-react";
import type { CommunityGuideline } from "../types";

interface CommunityGuidelinesProps {
  guidelines: CommunityGuideline[];
}

export function CommunityGuidelines({ guidelines }: CommunityGuidelinesProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      {guidelines.map((guideline) => (
        <div key={guideline.id} className="flex flex-col items-center text-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h4 className="text-sm font-bold">{guideline.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {guideline.description}
          </p>
        </div>
      ))}
    </div>
  );
}
