export type PaymentType = "kircha_deposit" | "kircha_balance" | "shop_order";

export type PaymentStatus = "pending" | "successful" | "failed";

export type PaymentGateway = "chapa";

export interface PaymentTransaction {
  id: string;
  reference: string; // Internal unique reference, e.g. "TX-KRC-9812-DEP"
  chapaTxRef?: string;
  type: PaymentType;
  orderId: string; // KirchaReservation ID or ShopOrder ID
  customerId: string;
  amountETB: number;
  status: PaymentStatus;
  gateway: PaymentGateway;
  checkoutUrl?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChapaInitializeRequest {
  amount: string;
  currency: "ETB";
  email?: string;
  first_name: string;
  last_name?: string;
  phone_number: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}

export interface ChapaInitializeResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}

export interface ChapaVerifyResponse {
  message: string;
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: number;
    charge: number;
    mode: string;
    method: string;
    type: string;
    status: "success" | "failed" | "pending";
    reference: string;
    tx_ref: string;
    customization: {
      title: string;
      description: string;
      logo: string | null;
    };
    created_at: string;
    updated_at: string;
  };
}
