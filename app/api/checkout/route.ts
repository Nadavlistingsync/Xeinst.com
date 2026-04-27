import { NextResponse } from "next/server";
import { createWhopClient, whopIsConfigured } from "@/lib/whop";

type CheckoutRequest = {
  pageId: string;
  handle: string;
  displayName: string;
  price: number;
  campaignTitle: string;
  agentEmail: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CheckoutRequest>;
  const price = Number(body.price ?? 0);

  if (!body.pageId || !body.handle || !body.campaignTitle || !price) {
    return NextResponse.json(
      { message: "Missing checkout details." },
      { status: 400 },
    );
  }

  if (!whopIsConfigured()) {
    return NextResponse.json({
      mode: "demo",
      receiptId: `demo_${Date.now()}`,
      message:
        "Demo checkout ready. Add WHOP_API_KEY and WHOP_COMPANY_ID to create live Whop checkout configurations.",
    });
  }

  const whop = await createWhopClient();

  if (!whop?.checkoutConfigurations) {
    return NextResponse.json(
      { message: "Whop SDK is not available in this runtime." },
      { status: 500 },
    );
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  const checkoutConfiguration = await whop.checkoutConfigurations.create({
    plan: {
      company_id: process.env.WHOP_COMPANY_ID,
      currency: "usd",
      initial_price: price,
    },
    redirect_url: `${origin}/checkout/complete`,
    allow_promo_codes: false,
    metadata: {
      marketplace: "renttok",
      creator_page_id: body.pageId,
      creator_handle: body.handle,
      creator_display_name: body.displayName,
      campaign_title: body.campaignTitle,
      agent_email: body.agentEmail,
      price_usd: price,
    },
  });

  return NextResponse.json({
    mode: "whop",
    planId: checkoutConfiguration.plan?.id,
    sessionId: checkoutConfiguration.id,
    purchaseUrl:
      checkoutConfiguration.purchase_url ?? checkoutConfiguration.purchaseUrl,
    message: "Whop checkout configuration created.",
  });
}
