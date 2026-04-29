import { NextResponse } from "next/server";

type PublishRequest = {
  campaignId?: string;
  title?: string;
  caption?: string;
  videoFileName?: string;
  creatorHandle?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as PublishRequest;

  if (!body.campaignId || !body.caption || !body.videoFileName) {
    return NextResponse.json(
      { message: "Missing campaign, caption, or video filename." },
      { status: 400 },
    );
  }

  const livePostingEnabled = process.env.TIKTOK_LIVE_POSTING === "true";
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

  if (!livePostingEnabled || !accessToken) {
    return NextResponse.json({
      mode: "demo",
      posted: true,
      postId: `demo_post_${Date.now()}`,
      message:
        "Demo publish complete. Set TIKTOK_LIVE_POSTING=true and TIKTOK_ACCESS_TOKEN to send real posts to TikTok.",
    });
  }

  const publishResponse = await fetch(
    "https://open.tiktokapis.com/v2/post/publish/video/init/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_info: {
          title: body.title ?? "NYC rental listing",
          description: body.caption,
          privacy_level: "PUBLIC_TO_EVERYONE",
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
          video_cover_timestamp_ms: 1000,
        },
        source_info: {
          source: "FILE_UPLOAD",
          video_size: 0,
          chunk_size: 0,
          total_chunk_count: 1,
        },
      }),
    },
  );

  const payload = (await publishResponse.json()) as {
    data?: { publish_id?: string };
    error?: { message?: string };
  };

  if (!publishResponse.ok) {
    return NextResponse.json(
      {
        message:
          payload?.error?.message ??
          "TikTok publish init failed. Confirm Content Posting API approval and OAuth scopes.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    mode: "live",
    posted: true,
    postId: payload.data?.publish_id ?? `live_post_${Date.now()}`,
    message:
      "TikTok publish initialized. Continue upload/status checks in your TikTok developer workflow.",
  });
}
