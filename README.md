# RentTok Marketplace

Marketplace MVP for real estate agents to book NYC TikTok rental pages, pay with Whop, upload listing videos, and track campaign performance.

## What is included

- Agent marketplace with searchable TikTok rental pages, engagement metrics, pricing, saved pages, and detail panel.
- Booking workflow: choose page, create Whop checkout, confirm payment, upload listing video, send to creator.
- Creator queue for page owners to approve/post campaigns and release completed payouts.
- Agent campaign dashboard with views, likes, comments, engagement rate, payment status, and campaign stages.
- Creator onboarding form that accepts a TikTok handle and imports estimated metrics through `/api/tiktok/creator-metrics`.
- Whop-ready checkout and webhook API routes.
- NYC-only marketplace scope for this version.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Whop setup

Copy `.env.example` to `.env.local` and add:

```bash
WHOP_API_KEY=
WHOP_COMPANY_ID=
WHOP_WEBHOOK_SECRET=
NEXT_PUBLIC_WHOP_APP_ID=
NEXT_PUBLIC_WHOP_ENVIRONMENT=sandbox
```

`/api/checkout` creates a Whop checkout configuration when `WHOP_API_KEY` and `WHOP_COMPANY_ID` are set. Without those values, the app runs in demo checkout mode so the whole marketplace can still be tested.

`/api/webhooks/whop` is ready for `payment.succeeded` events and verifies through the Whop SDK when `WHOP_WEBHOOK_SECRET` is configured.

## TikTok setup

TikTok live metrics require creator OAuth. The public Display API is built around authorized profile/video access, so this app does not scrape arbitrary TikTok handles. Use these variables when you add OAuth:

```bash
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
TIKTOK_LIVE_METRICS=false
TIKTOK_ACCESS_TOKEN=
```

The current creator metrics route returns believable demo metrics and a note explaining the OAuth boundary. The production next step is to store each creator's TikTok access token, refresh it, and replace the demo response with Display API user/video reads.
