type WhopClient = {
  checkoutConfigurations?: {
    create: (input: unknown) => Promise<{
      id?: string;
      purchase_url?: string;
      purchaseUrl?: string;
      plan?: { id?: string };
    }>;
  };
  webhooks?: {
    unwrap: (body: string, options: { headers: Record<string, string> }) => {
      type: string;
      data: unknown;
    };
  };
};

export function whopIsConfigured() {
  return Boolean(process.env.WHOP_API_KEY && process.env.WHOP_COMPANY_ID);
}

export async function createWhopClient(): Promise<WhopClient | null> {
  if (!process.env.WHOP_API_KEY) {
    return null;
  }

  const module = await import("@whop/sdk");
  const WhopConstructor = (module.default ?? module.Whop) as new (
    options: Record<string, string | undefined>,
  ) => WhopClient;

  return new WhopConstructor({
    appID: process.env.NEXT_PUBLIC_WHOP_APP_ID,
    apiKey: process.env.WHOP_API_KEY,
    webhookKey: process.env.WHOP_WEBHOOK_SECRET
      ? Buffer.from(process.env.WHOP_WEBHOOK_SECRET).toString("base64")
      : undefined,
  });
}
