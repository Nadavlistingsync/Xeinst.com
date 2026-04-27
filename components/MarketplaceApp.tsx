"use client";

import dynamic from "next/dynamic";
import {
  BarChart3,
  Bell,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronsUpDown,
  CircleDollarSign,
  Clock3,
  Eye,
  FileVideo,
  Filter,
  Home,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  MoreVertical,
  PlaySquare,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { campaigns as seededCampaigns, tiktokPages as seededPages } from "@/lib/demo-data";
import { compactNumber, currency, percent, todayLabel } from "@/lib/format";
import type { Campaign, CampaignStatus, CheckoutResponse, TikTokPage } from "@/lib/types";

const WhopCheckout = dynamic(
  () => import("@/components/WhopCheckout").then((module) => module.WhopCheckout),
  {
    ssr: false,
    loading: () => <div className="checkout-placeholder">Preparing secure checkout...</div>,
  },
);

type AppView = "marketplace" | "campaigns" | "creator";
type BookingStep = "details" | "checkout" | "upload" | "review";

const navItems = [
  { id: "marketplace", label: "Marketplace", icon: Home },
  { id: "campaigns", label: "My Campaigns", icon: LayoutDashboard, count: 3 },
  { id: "creator", label: "Creator Queue", icon: Inbox, count: 2 },
] as const;

const secondaryNav = [
  { label: "Messages", icon: MessageCircle, count: 3 },
  { label: "Payments", icon: WalletCards },
  { label: "Saved Pages", icon: Bookmark },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const statusOrder: CampaignStatus[] = [
  "Video Upload",
  "Creator Approval",
  "Posted",
  "Completed",
];

function buildPath(data: number[], width = 316, height = 150) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const spread = max - min || 1;
  return data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / spread) * (height - 18) - 9;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function PageAvatar({ page, size = "md" }: { page: TikTokPage; size?: "sm" | "md" | "lg" }) {
  return (
    <div className={`page-avatar ${size}`} aria-hidden="true">
      <span>{page.avatarLabel}</span>
      <small>Rentals</small>
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  return <span className={`status-badge ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function MarketplaceApp() {
  const [view, setView] = useState<AppView>("marketplace");
  const [pages, setPages] = useState<TikTokPage[]>(seededPages);
  const [campaigns, setCampaigns] = useState<Campaign[]>(seededCampaigns);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(seededPages[0]?.id ?? "");
  const [savedOnly, setSavedOnly] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("details");
  const [campaignTitle, setCampaignTitle] = useState("Downtown 2BR Rental");
  const [agentEmail, setAgentEmail] = useState("agent@urban-key.com");
  const [checkout, setCheckout] = useState<CheckoutResponse | null>(null);
  const [videoName, setVideoName] = useState("");
  const [bookingBusy, setBookingBusy] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [creatorHandle, setCreatorHandle] = useState("@yourtiktokhandle");
  const [creatorPrice, setCreatorPrice] = useState("250");
  const [creatorBusy, setCreatorBusy] = useState(false);
  const [creatorMessage, setCreatorMessage] = useState("");

  const selectedPage = pages.find((page) => page.id === selectedId) ?? pages[0];

  const filteredPages = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return pages
      .filter((page) => {
        if (savedOnly && !page.saved) {
          return false;
        }

        if (!normalized) {
          return true;
        }

        return [
          page.handle,
          page.displayName,
          page.market,
          page.niche,
          ...page.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      })
      .sort((a, b) => b.engagementRate - a.engagementRate);
  }, [pages, query, savedOnly]);

  const statusCounts = useMemo(() => {
    return statusOrder.map((status) => ({
      status,
      count: campaigns.filter((campaign) => campaign.status === status).length,
    }));
  }, [campaigns]);

  function toggleSaved(pageId: string) {
    setPages((current) =>
      current.map((page) =>
        page.id === pageId ? { ...page, saved: !page.saved } : page,
      ),
    );
  }

  async function startCheckout() {
    if (!selectedPage) {
      return;
    }

    setBookingBusy(true);
    setBookingError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: selectedPage.id,
          handle: selectedPage.handle,
          displayName: selectedPage.displayName,
          price: selectedPage.price,
          campaignTitle,
          agentEmail,
        }),
      });

      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok) {
        throw new Error(data.message || "Checkout could not be created.");
      }

      setCheckout(data);
      setBookingStep("checkout");
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setBookingBusy(false);
    }
  }

  function markPaymentComplete(receiptId?: string) {
    setCheckout((current) => ({
      mode: current?.mode ?? "demo",
      planId: current?.planId,
      sessionId: current?.sessionId,
      purchaseUrl: current?.purchaseUrl,
      receiptId: receiptId ?? current?.receiptId ?? `demo_${Date.now()}`,
      message: "Payment confirmed. Upload the listing video.",
    }));
    setBookingStep("upload");
  }

  function handleVideoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setVideoName(file.name);
    }
  }

  function sendCampaignToCreator() {
    if (!selectedPage || !checkout) {
      return;
    }

    const nextCampaign: Campaign = {
      id: String(1100 + campaigns.length + 1),
      title: campaignTitle,
      pageId: selectedPage.id,
      creatorHandle: selectedPage.handle,
      creatorName: selectedPage.displayName,
      status: videoName ? "Creator Approval" : "Video Upload",
      paymentStatus: "Paid",
      paidAmount: selectedPage.price,
      videoName: videoName || undefined,
      videoDuration: videoName ? "0:30" : undefined,
      receiptId: checkout.receiptId,
    };

    setCampaigns((current) => [nextCampaign, ...current]);
    setBookingStep("review");
    setView("campaigns");
  }

  function closeBooking() {
    setBookingOpen(false);
    setBookingStep("details");
    setCheckout(null);
    setVideoName("");
    setBookingError("");
  }

  function markPosted(campaignId: string) {
    setCampaigns((current) =>
      current.map((campaign) => {
        if (campaign.id !== campaignId) {
          return campaign;
        }

        const page = pages.find((item) => item.id === campaign.pageId);
        const baseViews = page?.avgViews ?? 68400;
        return {
          ...campaign,
          status: "Posted",
          postedOn: todayLabel(),
          views: Math.round(baseViews * 0.82),
          likes: Math.round(baseViews * 0.026),
          comments: Math.round(baseViews * 0.001),
          engagementRate: page?.engagementRate ?? 3.1,
        };
      }),
    );
  }

  function releaseCampaign(campaignId: string) {
    setCampaigns((current) =>
      current.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: "Completed", paymentStatus: "Released" }
          : campaign,
      ),
    );
  }

  async function pullCreatorMetrics() {
    setCreatorBusy(true);
    setCreatorMessage("");

    try {
      const response = await fetch("/api/tiktok/creator-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: creatorHandle,
          price: Number(creatorPrice),
        }),
      });
      const data = (await response.json()) as { page: TikTokPage; note: string };

      setPages((current) => {
        const withoutDuplicate = current.filter((page) => page.id !== data.page.id);
        return [data.page, ...withoutDuplicate];
      });
      setSelectedId(data.page.id);
      setCreatorMessage(data.note);
      setView("marketplace");
    } catch {
      setCreatorMessage("Could not pull metrics. Try the handle again.");
    } finally {
      setCreatorBusy(false);
    }
  }

  if (!selectedPage) {
    return null;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">RT</div>
          <div>
            <strong>RentTok</strong>
            <span>Marketplace</span>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                className={active ? "active" : ""}
                key={item.id}
                onClick={() => setView(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {"count" in item && item.count ? <em>{item.count}</em> : null}
              </button>
            );
          })}
        </nav>

        <nav className="secondary-nav" aria-label="Secondary">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} type="button">
                <Icon size={18} />
                <span>{item.label}</span>
                {item.count ? <em>{item.count}</em> : null}
              </button>
            );
          })}
        </nav>

        <div className="agent-card">
          <div className="agent-photo" aria-hidden="true" />
          <div>
            <strong>Urban Key Realty</strong>
            <span>Agent account</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="wallet-panel">
          <span>Wallet Balance</span>
          <strong>$2,450.00</strong>
          <button type="button">Add Funds</button>
        </div>

        <form
          className="creator-onboard"
          onSubmit={(event) => {
            event.preventDefault();
            void pullCreatorMetrics();
          }}
        >
          <div className="form-heading">
            <strong>Onboard TikTok Page</strong>
            <Sparkles size={16} />
          </div>
          <label>
            TikTok Handle
            <input
              value={creatorHandle}
              onChange={(event) => setCreatorHandle(event.target.value)}
              placeholder="@yourtiktokhandle"
            />
          </label>
          <label>
            Post Price (USD)
            <input
              inputMode="numeric"
              value={creatorPrice}
              onChange={(event) => setCreatorPrice(event.target.value)}
              placeholder="250"
            />
          </label>
          <label>
            Typical Delivery
            <select defaultValue="3 days">
              <option>2 days</option>
              <option>3 days</option>
              <option>4 days</option>
            </select>
          </label>
          <button disabled={creatorBusy} type="submit">
            {creatorBusy ? "Pulling metrics..." : "Pull Metrics"}
          </button>
          {creatorMessage ? <p>{creatorMessage}</p> : null}
        </form>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />
            <input
              aria-label="Search TikTok pages"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by handle, market, or niche"
            />
          </div>
          <button className="filter-button" type="button">
            <Filter size={17} />
            Filters
            <em>2</em>
          </button>
          <button
            className={savedOnly ? "filter-button active-filter" : "filter-button"}
            onClick={() => setSavedOnly((current) => !current)}
            type="button"
          >
            <BookmarkCheck size={17} />
            Saved
          </button>
          <div className="account-actions">
            <button aria-label="Notifications" className="icon-button" type="button">
              <Bell size={18} />
              <em>5</em>
            </button>
            <div className="user-pill">
              <span>JS</span>
              Jane Smith
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="filter-strip">
          <span>Location: New York, NY <X size={14} /></span>
          <span>Followers: 10K - 500K <X size={14} /></span>
          <span>Niche: Rentals <X size={14} /></span>
          <span>Engagement: 2%+ <X size={14} /></span>
          <button type="button">Clear all</button>
          <label>
            Sort by
            <select defaultValue="Recommended">
              <option>Recommended</option>
              <option>Highest engagement</option>
              <option>Lowest price</option>
              <option>Fastest delivery</option>
            </select>
          </label>
        </div>

        {view === "marketplace" ? (
          <MarketplaceView
            filteredPages={filteredPages}
            selectedPage={selectedPage}
            onSelectPage={(id) => setSelectedId(id)}
            onToggleSaved={toggleSaved}
            onOpenBooking={() => {
              setBookingOpen(true);
              setBookingStep("details");
            }}
            campaigns={campaigns}
          />
        ) : null}

        {view === "campaigns" ? (
          <CampaignsView
            campaigns={campaigns}
            pages={pages}
            statusCounts={statusCounts}
            onMarkPosted={markPosted}
            onRelease={releaseCampaign}
          />
        ) : null}

        {view === "creator" ? (
          <CreatorQueueView
            campaigns={campaigns}
            onMarkPosted={markPosted}
            onRelease={releaseCampaign}
          />
        ) : null}
      </section>

      <aside className="detail-panel">
        <button
          aria-label="Close selected page"
          className="close-detail"
          onClick={() => setBookingOpen(false)}
          type="button"
        >
          <X size={18} />
        </button>

        <PageAvatar page={selectedPage} size="lg" />
        <div className="detail-title">
          <h2>
            {selectedPage.handle}
            {selectedPage.verified ? <ShieldCheck size={18} /> : null}
          </h2>
          <p>{selectedPage.displayName}</p>
          {selectedPage.topPerformer ? (
            <span className="performer">
              <Sparkles size={15} />
              Top Performer
            </span>
          ) : null}
        </div>

        <div className="tag-row">
          <span>{selectedPage.niche}</span>
          <span>{selectedPage.market}</span>
        </div>

        <div className="metrics-grid">
          <Metric label="Followers" value={compactNumber(selectedPage.followers)} />
          <Metric label="Avg. Views" value={compactNumber(selectedPage.avgViews)} />
          <Metric label="Eng. Rate" value={percent(selectedPage.engagementRate)} />
          <Metric label="Avg. Likes" value={compactNumber(selectedPage.avgLikes)} />
          <Metric label="Avg. Comments" value={compactNumber(selectedPage.avgComments)} />
        </div>

        <div className="chart-panel">
          <div>
            <strong>Engagement Overview</strong>
            <span>Last 30 days</span>
          </div>
          <svg viewBox="0 0 316 150" role="img" aria-label="Engagement trend">
            <path className="chart-area" d={`${buildPath(selectedPage.weeklyViews)} L 316 150 L 0 150 Z`} />
            <path className="chart-line" d={buildPath(selectedPage.weeklyViews)} />
          </svg>
          <div className="chart-axis">
            <span>Apr 1</span>
            <span>Apr 14</span>
            <span>Apr 27</span>
          </div>
        </div>

        <div className="pricing-block">
          <div>
            <span>Post Price</span>
            <strong>{currency(selectedPage.price)}</strong>
          </div>
          <div>
            <span>Typical Delivery</span>
            <strong>{selectedPage.deliveryDays}-{selectedPage.deliveryDays + 1} days</strong>
          </div>
        </div>

        {!bookingOpen ? (
          <div className="detail-actions">
            <button className="primary-cta" onClick={() => setBookingOpen(true)} type="button">
              <CircleDollarSign size={18} />
              Book This Page
            </button>
            <button className="secondary-cta" onClick={() => toggleSaved(selectedPage.id)} type="button">
              {selectedPage.saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {selectedPage.saved ? "Saved" : "Save for Later"}
            </button>
            <button className="text-cta" type="button">
              <MessageCircle size={17} />
              Contact Creator
            </button>
          </div>
        ) : (
          <BookingPanel
            agentEmail={agentEmail}
            bookingBusy={bookingBusy}
            bookingError={bookingError}
            bookingStep={bookingStep}
            campaignTitle={campaignTitle}
            checkout={checkout}
            page={selectedPage}
            videoName={videoName}
            onAgentEmailChange={setAgentEmail}
            onCampaignTitleChange={setCampaignTitle}
            onCheckout={startCheckout}
            onClose={closeBooking}
            onDemoPayment={() => markPaymentComplete()}
            onLivePayment={markPaymentComplete}
            onSendCampaign={sendCampaignToCreator}
            onVideoChange={handleVideoChange}
          />
        )}

        <div className="compliance">
          <strong>Compliance & Requirements</strong>
          {selectedPage.contentNotes.map((note) => (
            <span key={note}>
              <CheckCircle2 size={16} />
              {note}
            </span>
          ))}
          <button type="button">View full policy</button>
        </div>
      </aside>
    </main>
  );
}

function MarketplaceView({
  filteredPages,
  selectedPage,
  campaigns,
  onSelectPage,
  onToggleSaved,
  onOpenBooking,
}: {
  filteredPages: TikTokPage[];
  selectedPage: TikTokPage;
  campaigns: Campaign[];
  onSelectPage: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onOpenBooking: () => void;
}) {
  return (
    <div className="market-layout">
      <section className="creator-table">
        <div className="table-head">
          <span>TikTok Page</span>
          <span>Followers</span>
          <span>Avg. Views</span>
          <span>Eng. Rate</span>
          <span>Niche</span>
          <span>Market</span>
          <span>
            Price
            <ChevronsUpDown size={14} />
          </span>
        </div>
        <div className="table-body">
          {filteredPages.map((page) => (
            <article
              className={page.id === selectedPage.id ? "creator-row selected" : "creator-row"}
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectPage(page.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span className="creator-cell">
                <PageAvatar page={page} />
                <span>
                  <strong>{page.handle}</strong>
                  <small>{page.displayName}</small>
                  {page.topPerformer ? <em>Top Performer</em> : null}
                </span>
              </span>
              <span>{compactNumber(page.followers)}</span>
              <span>{compactNumber(page.avgViews)}</span>
              <span>{percent(page.engagementRate)}</span>
              <span>
                <mark>{page.niche}</mark>
              </span>
              <span>{page.market}</span>
              <span className="price-cell">
                {currency(page.price)}
                <button
                  aria-label={page.saved ? "Remove saved page" : "Save page"}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleSaved(page.id);
                  }}
                  type="button"
                >
                  {page.saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </span>
            </article>
          ))}
        </div>
        <footer className="table-footer">
          <span>Showing 1-{filteredPages.length} of {filteredPages.length + 30} results</span>
          <div>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </div>
        </footer>
      </section>

      <section className="campaign-preview">
        <div className="section-title">
          <div>
            <p className="eyebrow">Agent dashboard</p>
            <h1>My Campaigns</h1>
          </div>
          <button onClick={onOpenBooking} type="button">
            <Plus size={17} />
            New Booking
          </button>
        </div>
        <CampaignPipeline campaigns={campaigns} />
        <CampaignTable
          campaigns={campaigns.slice(0, 4)}
          compact
          onMarkPosted={() => undefined}
          onRelease={() => undefined}
        />
      </section>
    </div>
  );
}

function CampaignsView({
  campaigns,
  pages,
  statusCounts,
  onMarkPosted,
  onRelease,
}: {
  campaigns: Campaign[];
  pages: TikTokPage[];
  statusCounts: { status: CampaignStatus; count: number }[];
  onMarkPosted: (campaignId: string) => void;
  onRelease: (campaignId: string) => void;
}) {
  const totalViews = campaigns.reduce((total, campaign) => total + (campaign.views ?? 0), 0);
  const totalSpend = campaigns.reduce((total, campaign) => total + campaign.paidAmount, 0);
  const averageEngagement =
    campaigns
      .filter((campaign) => campaign.engagementRate)
      .reduce((total, campaign) => total + (campaign.engagementRate ?? 0), 0) /
    Math.max(1, campaigns.filter((campaign) => campaign.engagementRate).length);

  return (
    <section className="full-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Agent workspace</p>
          <h1>Campaign Dashboard</h1>
        </div>
        <button type="button">
          <SlidersHorizontal size={17} />
          Export
        </button>
      </div>
      <div className="dashboard-metrics">
        <Metric label="Total Views" value={compactNumber(totalViews)} />
        <Metric label="Active Pages" value={String(new Set(campaigns.map((campaign) => campaign.pageId)).size)} />
        <Metric label="Total Spend" value={currency(totalSpend)} />
        <Metric label="Avg. Engagement" value={percent(Number.isFinite(averageEngagement) ? averageEngagement : 0)} />
      </div>
      <CampaignPipeline campaigns={campaigns} />
      <CampaignTable campaigns={campaigns} onMarkPosted={onMarkPosted} onRelease={onRelease} />
      <div className="insight-strip">
        <Eye size={18} />
        <span>
          Best current fit: {pages[0].handle} is pacing above average for luxury rental videos in New York.
        </span>
      </div>
    </section>
  );
}

function CreatorQueueView({
  campaigns,
  onMarkPosted,
  onRelease,
}: {
  campaigns: Campaign[];
  onMarkPosted: (campaignId: string) => void;
  onRelease: (campaignId: string) => void;
}) {
  const queued = campaigns.filter((campaign) =>
    ["Creator Approval", "Posted"].includes(campaign.status),
  );

  return (
    <section className="full-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">TikTok owner view</p>
          <h1>Creator Queue</h1>
        </div>
        <button type="button">
          <Clock3 size={17} />
          SLA 2.8 days
        </button>
      </div>
      <div className="queue-list">
        {queued.map((campaign) => (
          <article className="queue-item" key={campaign.id}>
            <div>
              <span className="queue-icon">
                <FileVideo size={18} />
              </span>
              <div>
                <h3>{campaign.title}</h3>
                <p>{campaign.creatorHandle} · {currency(campaign.paidAmount)} paid</p>
              </div>
            </div>
            <StatusBadge status={campaign.status} />
            <div className="queue-actions">
              {campaign.status === "Creator Approval" ? (
                <button onClick={() => onMarkPosted(campaign.id)} type="button">
                  <Send size={16} />
                  Mark Posted
                </button>
              ) : null}
              {campaign.status === "Posted" ? (
                <button onClick={() => onRelease(campaign.id)} type="button">
                  <Check size={16} />
                  Release Payout
                </button>
              ) : null}
              <button aria-label="More actions" type="button">
                <MoreVertical size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CampaignPipeline({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="pipeline">
      {statusOrder.map((status, index) => {
        const count = campaigns.filter((campaign) => campaign.status === status).length;
        const icons = [Upload, Inbox, PlaySquare, CheckCircle2];
        const Icon = icons[index];
        return (
          <div className="pipeline-step" key={status}>
            <span>
              <Icon size={18} />
            </span>
            <div>
              <strong>{status}</strong>
              <small>{count}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CampaignTable({
  campaigns,
  compact,
  onMarkPosted,
  onRelease,
}: {
  campaigns: Campaign[];
  compact?: boolean;
  onMarkPosted: (campaignId: string) => void;
  onRelease: (campaignId: string) => void;
}) {
  return (
    <div className={compact ? "campaign-table compact" : "campaign-table"}>
      <div className="campaign-head">
        <span>Campaign</span>
        <span>Creator</span>
        <span>Status</span>
        <span>Video</span>
        <span>Posted On</span>
        <span>Views</span>
        <span>Likes</span>
        <span>Comments</span>
        <span>Eng. Rate</span>
        <span />
      </div>
      {campaigns.map((campaign) => (
        <div className="campaign-row" key={campaign.id}>
          <span>
            <strong>{campaign.title}</strong>
            <small>Campaign ID: {campaign.id}</small>
          </span>
          <span>
            <strong>{campaign.creatorHandle}</strong>
            <small>{campaign.creatorName}</small>
          </span>
          <span>
            <StatusBadge status={campaign.status} />
          </span>
          <span>
            {campaign.videoName ? (
              <span className="video-chip">
                <FileVideo size={16} />
                {campaign.videoDuration ?? "0:30"}
              </span>
            ) : (
              "—"
            )}
          </span>
          <span>{campaign.postedOn ?? "—"}</span>
          <span>{campaign.views ? compactNumber(campaign.views) : "—"}</span>
          <span>{campaign.likes ? compactNumber(campaign.likes) : "—"}</span>
          <span>{campaign.comments ? compactNumber(campaign.comments) : "—"}</span>
          <span>{campaign.engagementRate ? percent(campaign.engagementRate) : "—"}</span>
          <span className="row-actions">
            {!compact && campaign.status === "Creator Approval" ? (
              <button onClick={() => onMarkPosted(campaign.id)} type="button">Post</button>
            ) : null}
            {!compact && campaign.status === "Posted" ? (
              <button onClick={() => onRelease(campaign.id)} type="button">Release</button>
            ) : null}
            <button aria-label="More campaign actions" type="button">
              <MoreVertical size={16} />
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

function BookingPanel({
  agentEmail,
  bookingBusy,
  bookingError,
  bookingStep,
  campaignTitle,
  checkout,
  page,
  videoName,
  onAgentEmailChange,
  onCampaignTitleChange,
  onCheckout,
  onClose,
  onDemoPayment,
  onLivePayment,
  onSendCampaign,
  onVideoChange,
}: {
  agentEmail: string;
  bookingBusy: boolean;
  bookingError: string;
  bookingStep: BookingStep;
  campaignTitle: string;
  checkout: CheckoutResponse | null;
  page: TikTokPage;
  videoName: string;
  onAgentEmailChange: (value: string) => void;
  onCampaignTitleChange: (value: string) => void;
  onCheckout: () => void;
  onClose: () => void;
  onDemoPayment: () => void;
  onLivePayment: (receiptId: string) => void;
  onSendCampaign: () => void;
  onVideoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="booking-panel">
      <div className="booking-head">
        <strong>Book sponsored post</strong>
        <button aria-label="Close booking" onClick={onClose} type="button">
          <X size={16} />
        </button>
      </div>

      <div className="booking-steps">
        {(["details", "checkout", "upload", "review"] as BookingStep[]).map((step, index) => (
          <span className={bookingStep === step ? "current" : ""} key={step}>
            {index + 1}
          </span>
        ))}
      </div>

      {bookingStep === "details" ? (
        <div className="booking-form">
          <label>
            Listing title
            <input value={campaignTitle} onChange={(event) => onCampaignTitleChange(event.target.value)} />
          </label>
          <label>
            Agent email
            <input value={agentEmail} onChange={(event) => onAgentEmailChange(event.target.value)} />
          </label>
          <div className="booking-summary">
            <span>Creator</span>
            <strong>{page.handle}</strong>
            <span>Post price</span>
            <strong>{currency(page.price)}</strong>
            <span>Delivery</span>
            <strong>{page.deliveryDays}-{page.deliveryDays + 1} days</strong>
          </div>
          {bookingError ? <p className="error-text">{bookingError}</p> : null}
          <button className="primary-cta" disabled={bookingBusy} onClick={onCheckout} type="button">
            <CircleDollarSign size={18} />
            {bookingBusy ? "Creating checkout..." : "Continue to Whop"}
          </button>
        </div>
      ) : null}

      {bookingStep === "checkout" ? (
        <div className="checkout-step">
          {checkout?.mode === "whop" && checkout.planId ? (
            <>
              <WhopCheckout
                planId={checkout.planId}
                sessionId={checkout.sessionId}
                onComplete={onLivePayment}
              />
              {checkout.purchaseUrl ? (
                <a href={checkout.purchaseUrl} rel="noreferrer" target="_blank">
                  Open hosted Whop checkout
                </a>
              ) : null}
            </>
          ) : (
            <div className="demo-checkout">
              <CircleDollarSign size={22} />
              <strong>Whop demo checkout</strong>
              <p>{checkout?.message}</p>
              <button className="primary-cta" onClick={onDemoPayment} type="button">
                Simulate paid through Whop
              </button>
            </div>
          )}
        </div>
      ) : null}

      {bookingStep === "upload" ? (
        <div className="upload-step">
          <label className="upload-drop">
            <Upload size={22} />
            <strong>{videoName || "Upload listing video"}</strong>
            <span>MP4, MOV, or WebM. Creator receives this after payment.</span>
            <input accept="video/mp4,video/quicktime,video/webm" onChange={onVideoChange} type="file" />
          </label>
          <button className="primary-cta" disabled={!videoName} onClick={onSendCampaign} type="button">
            <Send size={18} />
            Send to Creator
          </button>
        </div>
      ) : null}

      {bookingStep === "review" ? (
        <div className="review-step">
          <CheckCircle2 size={24} />
          <strong>Campaign sent to creator</strong>
          <p>The agent dashboard now tracks approval, posting, views, likes, comments, and payout status.</p>
          <button className="secondary-cta" onClick={onClose} type="button">
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}
