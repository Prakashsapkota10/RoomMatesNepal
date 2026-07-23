"use client";

import { CheckCircle2, Clock, XCircle, PauseCircle, Building2, FileText } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/admin/toast-provider";
import { PaymentStatusBadge } from "./payment-status-badge";
import { PaymentTypeBadge } from "./payment-type-badge";
import { PaymentTimeline } from "./payment-timeline";
import { InvoiceActionButtons } from "./invoice-actions";
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_TONE, PAYMENT_TYPE_LABELS } from "./constants";
import { formatCurrency, formatPaymentDate } from "./payment.utils";
import type { PaymentRow } from "./types";

interface PaymentDetailDrawerProps {
  payment: PaymentRow | null;
  onOpenChange: (open: boolean) => void;
  onInvoiceGenerated: (paymentId: string, invoiceId: string) => void;
}

const STATUS_ICON = {
  success: CheckCircle2,
  warning: Clock,
  error: XCircle,
  info: Clock,
  neutral: PauseCircle,
} as const;

function KeyValueRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">{children}</p>
  );
}

/**
 * Right-side transaction detail drawer for /admin/payments. Content below
 * "Payment Parties" is entirely type-specific (subscription vs. rent vs.
 * deposit) via a switch on `payment.type` — new payment types plug in by
 * adding one more case, without touching the drawer shell.
 */
export function PaymentDetailDrawer({ payment, onOpenChange, onInvoiceGenerated }: PaymentDetailDrawerProps) {
  const { showToast } = useToast();

  return (
    <Sheet open={!!payment} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 gap-0 flex flex-col">
        {payment && (
          <>
            <SheetHeader className="px-4 pt-4 pb-3 border-b shrink-0">
              <SheetTitle>Transaction Details</SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto flex-1">
              {/* General payment header */}
              <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-5 border-b">
                {(() => {
                  const tone = PAYMENT_STATUS_TONE[payment.status];
                  const Icon = STATUS_ICON[tone];
                  const toneColor =
                    tone === "success"
                      ? "text-[color:var(--success)] bg-[color:var(--success-light)]"
                      : tone === "warning"
                      ? "text-[color:var(--warning)] bg-[color:var(--warning-light)]"
                      : tone === "error"
                      ? "text-[color:var(--error)] bg-[color:var(--error-light)]"
                      : tone === "info"
                      ? "text-[color:var(--trust)] bg-[color:var(--trust-light)]"
                      : "text-muted-foreground bg-muted";
                  return (
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${toneColor} icon-pop`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  );
                })()}
                <PaymentStatusBadge status={payment.status} />
                <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(payment.amount)}</p>
                <div className="flex items-center gap-1.5">
                  <PaymentTypeBadge type={payment.type} />
                  <span className="text-xs text-muted-foreground">
                    {formatPaymentDate(payment.paidAt ?? payment.createdAt)}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-5">
                {/* Payment parties */}
                <div>
                  <SectionLabel>Payment Parties</SectionLabel>
                  <div className="flex items-center gap-3 rounded-xl border p-3">
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                        {payment.payer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground leading-tight">{payment.payer.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Paid By · {payment.payer.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border p-3 mt-2">
                    {payment.type === "subscription" ? (
                      <>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Building2 className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground leading-tight">RoomMate Nepal</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">Payment Recipient</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Avatar size="sm">
                          <AvatarFallback className="text-[10px] font-semibold bg-muted text-muted-foreground">
                            {payment.context.owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground leading-tight">{payment.context.owner.name}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">Paid To · Owner</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Type-specific sections */}
                {payment.type === "subscription" && (
                  <div>
                    <SectionLabel>Subscription Details</SectionLabel>
                    <div className="rounded-xl border p-3">
                      <KeyValueRow label="Plan Name" value={payment.context.planName} />
                      <KeyValueRow
                        label="Subscription Status"
                        value={
                          payment.context.subscriptionStatus.charAt(0).toUpperCase() +
                          payment.context.subscriptionStatus.slice(1)
                        }
                      />
                      <KeyValueRow label="Billing Cycle" value={payment.context.billingCycle === "monthly" ? "Monthly" : "Yearly"} />
                      <KeyValueRow label="Start Date" value={formatPaymentDate(payment.context.startDate)} />
                      <KeyValueRow label="End Date" value={formatPaymentDate(payment.context.endDate)} />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-secondary-motion mt-2 w-full font-medium"
                      onClick={() => showToast(`Opening subscription for ${payment.payer.name}.`, "info")}
                    >
                      View Subscription
                    </Button>
                  </div>
                )}

                {payment.type === "monthly_rent" && (
                  <div>
                    <SectionLabel>Property / Booking</SectionLabel>
                    <div className="rounded-xl border p-3">
                      <KeyValueRow label="Property / Listing" value={payment.context.propertyTitle} />
                      <KeyValueRow label="Location" value={payment.context.propertyLocation} />
                      <KeyValueRow label="Monthly Rent" value={formatCurrency(payment.context.rentAmount)} />
                    </div>

                    <SectionLabel>
                      <span className="mt-4 block">Rent Payment Details</span>
                    </SectionLabel>
                    <div className="rounded-xl border p-3">
                      <KeyValueRow label="Tenant" value={payment.payer.name} />
                      <KeyValueRow label="Property Owner" value={payment.context.owner.name} />
                      <KeyValueRow label="Rent Period" value={payment.context.rentPeriod} />
                      <KeyValueRow label="Due Date" value={formatPaymentDate(payment.context.dueDate)} />
                      <KeyValueRow label="Payment Date" value={formatPaymentDate(payment.paidAt)} />
                      <KeyValueRow label="Payment Status" value={<PaymentStatusBadge status={payment.status} />} />
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary-motion flex-1 font-medium"
                        onClick={() => showToast(`Opening ${payment.payer.name}'s profile.`, "info")}
                      >
                        View Tenant
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary-motion flex-1 font-medium"
                        onClick={() => showToast(`Opening ${payment.context.owner.name}'s profile.`, "info")}
                      >
                        View Owner
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary-motion flex-1 font-medium"
                        onClick={() => showToast(`Opening ${payment.context.propertyTitle}.`, "info")}
                      >
                        View Property
                      </Button>
                    </div>
                  </div>
                )}

                {payment.type === "security_deposit" && (
                  <div>
                    <SectionLabel>Property / Booking</SectionLabel>
                    <div className="rounded-xl border p-3">
                      <KeyValueRow label="Property" value={payment.context.propertyTitle} />
                      <KeyValueRow label="Location" value={payment.context.propertyLocation} />
                      <KeyValueRow label="Security Deposit" value={formatCurrency(payment.context.depositAmount)} />
                    </div>

                    <SectionLabel>
                      <span className="mt-4 block">Security Deposit Details</span>
                    </SectionLabel>
                    <div className="rounded-xl border p-3">
                      <KeyValueRow label="Tenant" value={payment.payer.name} />
                      <KeyValueRow label="Property Owner" value={payment.context.owner.name} />
                      <KeyValueRow label="Booking" value={payment.context.bookingId} />
                      <KeyValueRow label="Booking Date" value={formatPaymentDate(payment.context.bookingDate)} />
                      <KeyValueRow label="Payment Date" value={formatPaymentDate(payment.paidAt)} />
                      <KeyValueRow label="Deposit Status" value={<PaymentStatusBadge status={payment.context.depositStatus} />} />
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary-motion flex-1 font-medium"
                        onClick={() => showToast(`Opening booking ${payment.context.bookingId}.`, "info")}
                      >
                        View Booking
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary-motion flex-1 font-medium"
                        onClick={() => showToast(`Opening ${payment.context.propertyTitle}.`, "info")}
                      >
                        View Property
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transaction information */}
                <div>
                  <SectionLabel>Transaction Information</SectionLabel>
                  <div className="rounded-xl border p-3">
                    <KeyValueRow label="Payment ID" value={`#${payment.id}`} />
                    <KeyValueRow label="Transaction Reference" value={payment.transactionReference} />
                    <KeyValueRow label="Payment Method" value={PAYMENT_METHOD_LABELS[payment.method]} />
                    <KeyValueRow label="Payment Type" value={PAYMENT_TYPE_LABELS[payment.type]} />
                    <KeyValueRow label="Amount" value={formatCurrency(payment.amount)} />
                    <KeyValueRow label="Payment Date" value={formatPaymentDate(payment.paidAt ?? payment.createdAt)} />
                    <KeyValueRow
                      label="Invoice ID"
                      value={
                        payment.invoiceId ?? <span className="text-muted-foreground font-normal">Not generated</span>
                      }
                    />
                    <KeyValueRow label="Status" value={<PaymentStatusBadge status={payment.status} />} />
                  </div>
                </div>

                {/* Payment timeline */}
                <div>
                  <SectionLabel>Payment Timeline</SectionLabel>
                  <div className="rounded-xl border p-3.5">
                    <PaymentTimeline steps={payment.timeline} />
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="flex-row gap-2 p-4 border-t bg-muted/30 shrink-0">
              <InvoiceActionButtons
                payment={payment}
                onGenerated={(invoiceId) => onInvoiceGenerated(payment.id, invoiceId)}
              />
              <Button
                variant="outline"
                className="flex-1 btn-secondary-motion gap-1.5 font-semibold border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => showToast(`Payment ${payment.id} flagged for review.`, "error")}
              >
                <FileText className="h-4 w-4" />
                Flag Transaction
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
