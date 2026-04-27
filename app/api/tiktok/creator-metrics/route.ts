import { NextResponse } from "next/server";

function hashHandle(handle: string) {
  return [...handle].reduce((total, char) => total + char.charCodeAt(0), 0);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { handle?: string; price?: number };
  const rawHandle = body.handle?.trim() || "@rentals";
  const handle = rawHandle.startsWith("@") ? rawHandle : `@${rawHandle}`;
  const seed = hashHandle(handle);
  const followers = 42_000 + (seed % 160_000);
  const avgViews = Math.round(followers * (0.42 + (seed % 24) / 100));
  const engagementRate = Number((2.1 + (seed % 190) / 100).toFixed(2));
  const market = "New York, NY";

  return NextResponse.json({
    source:
      process.env.TIKTOK_LIVE_METRICS === "true" ? "adapter-ready" : "demo",
    note:
      "NYC-only beta: TikTok live metrics require creator OAuth. Display API can read authorized profile and video metadata; arbitrary public handle scraping is intentionally not used here.",
    page: {
      id: handle.replace("@", "").replaceAll(".", "-"),
      handle,
      displayName: handle
        .replace("@", "")
        .split(/[._-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      avatarLabel: handle.replace("@", "").slice(0, 3).toUpperCase(),
      market,
      niche: seed % 3 === 0 ? "Luxury Rentals" : "Apartments",
      followers,
      avgViews,
      engagementRate,
      avgLikes: Math.round(avgViews * (engagementRate / 100) * 0.72),
      avgComments: Math.round(avgViews * 0.0008),
      price: body.price ?? Math.max(175, Math.round(avgViews / 350) * 25),
      deliveryDays: 2 + (seed % 3),
      audience: "Estimated renter-heavy audience pending creator OAuth",
      verified: seed % 5 === 0,
      topPerformer: engagementRate > 3.2,
      saved: false,
      tags: ["Rentals", "NYC", "Creator submitted"],
      contentNotes: [
        "Creator OAuth required for live pull",
        "Paid partnership disclosure required",
        "Manual creator approval before posting",
        "Agent dashboard tracks post performance",
      ],
      weeklyViews: Array.from({ length: 12 }, (_, index) =>
        Math.round(avgViews * (0.42 + index * 0.045 + ((seed + index) % 9) / 100)),
      ),
    },
  });
}
