import Link from "next/link";

type CheckoutCompleteProps = {
  searchParams: Promise<{
    status?: string;
    receipt_id?: string;
  }>;
};

export default async function CheckoutComplete({
  searchParams,
}: CheckoutCompleteProps) {
  const params = await searchParams;
  const status = params.status ?? "success";

  return (
    <main className="checkout-complete">
      <section>
        <p className="eyebrow">Whop checkout</p>
        <h1>{status === "success" ? "Payment confirmed" : "Checkout paused"}</h1>
        <p>
          Return to the marketplace to upload the listing video and move the
          campaign into creator approval.
        </p>
        {params.receipt_id ? <span>Receipt: {params.receipt_id}</span> : null}
        <Link href="/">Back to marketplace</Link>
      </section>
    </main>
  );
}
