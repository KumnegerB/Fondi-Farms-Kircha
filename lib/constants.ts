export const APP_CONFIG = {
  name: "Digital Kircha",
  tagline: "Direct-to-Consumer Ethiopian Kircha & Farm Shop",
  primaryMarket: "Ambo, Ethiopia",
  defaultPickupLocation: "Fondi Farms, Main Road, Ambo, Ethiopia",
  supportPhone: "+251911234567",
  supportTelegram: "@DigitalKirchaSupport",
  currency: "ETB",
};

export const KIRCHA_STATUS_CONFIG = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  open: { label: "Available", color: "bg-emerald-100 text-emerald-800" },
  slaughter_scheduled: {
    label: "Slaughter Scheduled",
    color: "bg-blue-100 text-blue-800",
  },
  slaughtered: {
    label: "Slaughtered",
    color: "bg-amber-100 text-amber-800",
  },
  ready_for_pickup: {
    label: "Ready for Pickup",
    color: "bg-purple-100 text-purple-800",
  },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
} as const;

export const RESERVATION_STATUS_CONFIG = {
  awaiting_deposit: {
    label: "Awaiting Deposit",
    color: "bg-amber-100 text-amber-800",
  },
  reserved: { label: "Reserved", color: "bg-blue-100 text-blue-800" },
  balance_due: {
    label: "Balance Due",
    color: "bg-orange-100 text-orange-800",
  },
  paid: { label: "Fully Paid", color: "bg-emerald-100 text-emerald-800" },
  ready_for_pickup: {
    label: "Ready for Pickup",
    color: "bg-purple-100 text-purple-800",
  },
  collected: { label: "Collected", color: "bg-gray-100 text-gray-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  forfeited: { label: "Forfeited", color: "bg-red-100 text-red-800" },
} as const;
