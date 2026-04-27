import { NextResponse } from "next/server";
import { createWhopClient } from "@/lib/whop";

export async function POST(request: Request) {
  const whop = await createWhopClient();

  if (!process.env.WHOP_WEBHOOK_SECRET || !whop?.webhooks) {
    return NextResponse.json(
      {
        message:
          "Webhook received, but WHOP_WEBHOOK_SECRET is not configured for signature verification.",
      },
      { status: 202 },
    );
  }

  const body = await request.text();
  const headers = Object.fromEntries(request.headers);
  const event = whop.webhooks.unwrap(body, { headers });

  if (event.type === "payment.succeeded") {
    console.log("[renttok] Whop payment succeeded", event.data);
  }

  return new Response("OK", { status: 200 });
}
