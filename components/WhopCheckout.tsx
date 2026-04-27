"use client";

import { WhopCheckoutEmbed } from "@whop/checkout/react";

type WhopCheckoutProps = {
  planId: string;
  sessionId?: string;
  onComplete: (receiptId: string) => void;
};

export function WhopCheckout({
  planId,
  sessionId,
  onComplete,
}: WhopCheckoutProps) {
  const CheckoutEmbed = WhopCheckoutEmbed as unknown as React.ComponentType<{
    planId: string;
    sessionId?: string;
    returnUrl: string;
    theme: "light";
    environment?: "production" | "sandbox";
    hidePrice?: boolean;
    fallback?: React.ReactNode;
    onComplete?: (planId: string, receiptId: string) => void;
    styles?: {
      container?: {
        paddingX?: number;
        paddingY?: number;
        paddingTop?: number;
        paddingBottom?: number;
      };
    };
  }>;

  return (
    <CheckoutEmbed
      fallback={<div className="checkout-placeholder">Loading Whop checkout...</div>}
      planId={planId}
      sessionId={sessionId}
      returnUrl={`${window.location.origin}/checkout/complete`}
      theme="light"
      environment={
        process.env.NEXT_PUBLIC_WHOP_ENVIRONMENT === "production"
          ? "production"
          : "sandbox"
      }
      hidePrice={false}
      styles={{ container: { paddingX: 0, paddingY: 0 } }}
      onComplete={(_, receiptId) => onComplete(receiptId)}
    />
  );
}
