"use client";

import { useState } from "react";
import { Download, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast-provider";
import type { SubscriptionRow } from "./types";

/**
 * Invoice actions for the subscription detail drawer — View/Download and
 * Send Invoice. No backend document generation exists yet, so this
 * simulates the round trip with a short delay + toast feedback, matching
 * the "frontend interaction, no backend work" scope for this task.
 * TODO: wire to real invoice endpoints once available; connect to the same
 * invoice system used by /admin/payments rather than a separate one.
 */
export function InvoiceActionButtons({ subscription }: { subscription: SubscriptionRow }) {
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsDownloading(false);
    showToast(`Downloading invoice for ${subscription.id}...`, "info");
  }

  async function handleSend() {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSending(false);
    showToast(`Invoice sent to ${subscription.subscriber.email}.`, "success");
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="btn-secondary-motion flex-1 gap-1.5 font-medium"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
        {isDownloading ? "Downloading..." : "Download Invoice"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="btn-secondary-motion flex-1 gap-1.5 font-medium"
        onClick={handleSend}
        disabled={isSending}
      >
        {isSending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        {isSending ? "Sending..." : "Send Invoice"}
      </Button>
    </div>
  );
}
