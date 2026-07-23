"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/admin/toast-provider";
import type { PaymentRow } from "./types";

/**
 * Invoice actions for a payment row — "Generate Invoice" (when none exists
 * yet) or "View/Download Invoice" (when one does). No backend document
 * generation exists yet, so this simulates the round trip with a short
 * delay + toast feedback, matching the "frontend interaction, no backend
 * work" scope for this task.
 * TODO: replace simulated delay with a real POST /api/admin/payments/:id/invoice
 * and an actual PDF download (e.g. window.open(invoiceUrl)).
 */

interface UseInvoiceActionOptions {
  payment: PaymentRow;
  /** Called after a successful "Generate Invoice" so the caller can update local state (e.g. attach an invoiceId). */
  onGenerated?: (invoiceId: string) => void;
}

function useInvoiceAction({ payment, onGenerated }: UseInvoiceActionOptions) {
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  async function generateInvoice() {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsGenerating(false);
    const invoiceId = `INV-${new Date().getFullYear()}-${payment.id.replace("PAY-", "")}`;
    onGenerated?.(invoiceId);
    showToast(`Invoice ${invoiceId} generated for ${payment.id}.`, "success");
  }

  async function downloadInvoice() {
    if (!payment.invoiceId) return;
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsDownloading(false);
    showToast(`Downloading invoice ${payment.invoiceId}...`, "info");
  }

  function viewInvoice() {
    if (!payment.invoiceId) return;
    showToast(`Opening invoice ${payment.invoiceId}.`, "info");
  }

  return { generateInvoice, downloadInvoice, viewInvoice, isGenerating, isDownloading };
}

/** Dropdown menu items for the row action menu — context-aware based on whether an invoice already exists. */
export function InvoiceActionMenuItems({ payment, onGenerated }: UseInvoiceActionOptions) {
  const { generateInvoice, downloadInvoice, isGenerating, isDownloading } = useInvoiceAction({
    payment,
    onGenerated,
  });

  if (payment.invoiceId) {
    return (
      <DropdownMenuItem onClick={downloadInvoice} disabled={isDownloading}>
        {isDownloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
        Download Invoice
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={generateInvoice} disabled={isGenerating}>
      {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
      Generate Invoice
    </DropdownMenuItem>
  );
}

/** Full-size buttons for the same actions, used in the Transaction Detail Drawer footer. */
export function InvoiceActionButtons({ payment, onGenerated }: UseInvoiceActionOptions) {
  const { generateInvoice, downloadInvoice, isGenerating, isDownloading } = useInvoiceAction({
    payment,
    onGenerated,
  });

  if (payment.invoiceId) {
    return (
      <Button
        variant="outline"
        className="flex-1 btn-secondary-motion gap-1.5 font-semibold"
        onClick={downloadInvoice}
        disabled={isDownloading}
      >
        {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isDownloading ? "Downloading..." : "Download Invoice"}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="flex-1 btn-secondary-motion gap-1.5 font-semibold"
      onClick={generateInvoice}
      disabled={isGenerating}
    >
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
      {isGenerating ? "Generating..." : "Generate Invoice"}
    </Button>
  );
}
