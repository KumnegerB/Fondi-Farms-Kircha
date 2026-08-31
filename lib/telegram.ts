import crypto from "crypto";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

/**
 * Validates the initData received from Telegram WebApp
 */
export function validateTelegramInitData(initData: string): boolean {
  if (!BOT_TOKEN || !initData) return false;

  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get("hash");
  urlParams.delete("hash");

  const params: string[] = [];
  urlParams.forEach((val, key) => {
    params.push(`${key}=${val}`);
  });
  params.sort();

  const dataCheckString = params.join("\n");
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(BOT_TOKEN)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return calculatedHash === hash;
}

/**
 * Send a notification message via Telegram Bot to a user
 */
export async function sendTelegramNotification(
  chatId: number | string,
  message: string,
  parseMode: "HTML" | "Markdown" = "HTML",
) {
  if (!BOT_TOKEN) {
    console.warn("TELEGRAM_BOT_TOKEN not configured.");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: parseMode,
      }),
    },
  );

  return response.json();
}
