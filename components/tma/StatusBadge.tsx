import React from "react";
import { Badge } from "@/components/ui/Badge";
import { KirchaListingStatus, ReservationStatus } from "@/types/kircha";
import { ShopOrderStatus } from "@/types/shop";
import {
  KIRCHA_STATUS_CONFIG,
  RESERVATION_STATUS_CONFIG,
} from "@/lib/constants";

export function KirchaListingStatusBadge({
  status,
}: {
  status: KirchaListingStatus;
}) {
  const config = KIRCHA_STATUS_CONFIG[status] || {
    label: status,
    color: "bg-stone-100 text-stone-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export function ReservationStatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  const config = RESERVATION_STATUS_CONFIG[status] || {
    label: status,
    color: "bg-stone-100 text-stone-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export function ShopOrderStatusBadge({ status }: { status: ShopOrderStatus }) {
  const map: Record<
    ShopOrderStatus,
    {
      label: string;
      variant: "default" | "success" | "warning" | "info" | "danger" | "purple";
    }
  > = {
    awaiting_payment: { label: "Awaiting Payment", variant: "warning" },
    paid: { label: "Paid", variant: "success" },
    preparing: { label: "Preparing", variant: "info" },
    ready_for_pickup: { label: "Ready for Pickup", variant: "purple" },
    collected: { label: "Collected", variant: "default" },
    cancelled: { label: "Cancelled", variant: "danger" },
  };

  const current = map[status] || { label: status, variant: "default" };

  return <Badge variant={current.variant}>{current.label}</Badge>;
}
