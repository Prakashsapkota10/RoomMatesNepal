"use client";

import { AlertTriangle, SearchX } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PaymentStatusBadge } from "./payment-status-badge";
import { PaymentTypeBadge } from "./payment-type-badge";
import { PaymentRowActions } from "./payment-row-actions";
import { PAYMENT_METHOD_LABELS } from "./constants";
import { formatCurrency, formatPaymentDate, getContextLabel } from "./payment.utils";
import type { PaymentRow } from "./types";

interface PaymentTableProps {
  payments: PaymentRow[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onViewDetails: (payment: PaymentRow) => void;
  onInvoiceGenerated: (paymentId: string, invoiceId: string) => void;
}

function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: 8 }, (_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full max-w-24" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

/**
 * Transaction table for /admin/payments — Payment ID, Payer, Type, Related
 * Property/Context, Amount, Date, Method, Status, Actions. Handles loading
 * (skeleton rows), error, and empty states inline.
 */
export function PaymentTable({
  payments,
  isLoading = false,
  isError = false,
  onRetry,
  onViewDetails,
  onInvoiceGenerated,
}: PaymentTableProps) {
  if (isError) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <p className="text-sm font-medium text-foreground">Couldn&apos;t load payments.</p>
        <p className="text-xs text-muted-foreground">Something went wrong while fetching transactions.</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="btn-secondary-motion mt-2" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!isLoading && payments.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No payments found.</p>
        <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payment ID</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payer</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Context</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Amount</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeletonRows />
        ) : (
          payments.map((payment, index) => (
            <TableRow
              key={payment.id}
              className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => onViewDetails(payment)}
            >
              <TableCell>
                <span className="text-sm font-semibold text-primary">#{payment.id}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                      {payment.payer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{payment.payer.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{payment.transactionReference}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <PaymentTypeBadge type={payment.type} />
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground max-w-[180px] truncate block">
                  {getContextLabel(payment)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(payment.amount)}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground">{formatPaymentDate(payment.paidAt ?? payment.createdAt)}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground">{PAYMENT_METHOD_LABELS[payment.method]}</span>
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={payment.status} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <PaymentRowActions
                    payment={payment}
                    onViewDetails={onViewDetails}
                    onInvoiceGenerated={onInvoiceGenerated}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
