"use client";

import { MoreVertical, Eye, User, Building2, CreditCard, Copy, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/admin/toast-provider";
import { InvoiceActionMenuItems } from "./invoice-actions";
import type { PaymentRow } from "./types";

interface PaymentRowActionsProps {
  payment: PaymentRow;
  onViewDetails: (payment: PaymentRow) => void;
  onInvoiceGenerated: (paymentId: string, invoiceId: string) => void;
}

/**
 * Row-level action menu — actions are context-aware per payment type so
 * irrelevant items (e.g. "View Booking" on a subscription) never appear.
 * TODO: wire "View User" / "View Property" / "View Booking" / "View
 * Subscription" to their real detail routes once they exist; "Flag Payment"
 * to a moderation/flagging endpoint.
 */
export function PaymentRowActions({ payment, onViewDetails, onInvoiceGenerated }: PaymentRowActionsProps) {
  const { showToast } = useToast();

  function copyToClipboard(value: string, label: string) {
    navigator.clipboard?.writeText(value).then(() => {
      showToast(`${label} copied to clipboard.`, "success");
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${payment.id}`}>
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(payment)}>
          <Eye className="h-3.5 w-3.5" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => showToast(`Opening ${payment.payer.name}'s profile.`, "info")}>
          <User className="h-3.5 w-3.5" />
          View User
        </DropdownMenuItem>

        {payment.type === "subscription" && (
          <DropdownMenuItem onClick={() => showToast(`Opening subscription for ${payment.payer.name}.`, "info")}>
            <CreditCard className="h-3.5 w-3.5" />
            View Subscription
          </DropdownMenuItem>
        )}

        {payment.type === "monthly_rent" && (
          <DropdownMenuItem
            onClick={() => showToast(`Opening ${payment.context.propertyTitle}.`, "info")}
          >
            <Building2 className="h-3.5 w-3.5" />
            View Property
          </DropdownMenuItem>
        )}

        {payment.type === "security_deposit" && (
          <>
            <DropdownMenuItem onClick={() => showToast(`Opening booking ${payment.context.bookingId}.`, "info")}>
              <Eye className="h-3.5 w-3.5" />
              View Booking
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => showToast(`Opening ${payment.context.propertyTitle}.`, "info")}
            >
              <Building2 className="h-3.5 w-3.5" />
              View Property
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <InvoiceActionMenuItems
          payment={payment}
          onGenerated={(invoiceId) => onInvoiceGenerated(payment.id, invoiceId)}
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => copyToClipboard(payment.id, "Payment ID")}>
          <Copy className="h-3.5 w-3.5" />
          Copy Payment ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(payment.transactionReference, "Transaction reference")}>
          <Copy className="h-3.5 w-3.5" />
          Copy Transaction Reference
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => showToast(`Payment ${payment.id} flagged for review.`, "error")}
        >
          <Flag className="h-3.5 w-3.5" />
          Flag Payment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
