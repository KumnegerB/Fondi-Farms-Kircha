import {
  ChapaInitializeRequest,
  ChapaInitializeResponse,
  ChapaVerifyResponse,
} from "@/types/payment";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || "";
const CHAPA_API_URL = "https://api.chapa.co/v1";

export async function initializeChapaPayment(
  params: ChapaInitializeRequest,
): Promise<ChapaInitializeResponse> {
  const response = await fetch(`${CHAPA_API_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to initialize Chapa payment");
  }

  return response.json();
}

export async function verifyChapaPayment(
  txRef: string,
): Promise<ChapaVerifyResponse> {
  const response = await fetch(
    `${CHAPA_API_URL}/transaction/verify/${encodeURIComponent(txRef)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to verify Chapa payment");
  }

  return response.json();
}
