"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"

const CAL_LINK = "https://cal.com/xeinst/quick-chat"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/">
          <Image src="/logo.png" alt="Xeinst" width={32} height={32} />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/about"
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity hidden sm:block"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity hidden sm:block"
          >
            Contact
          </Link>
          <Link
            href={CAL_LINK}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            Book a Call
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 bg-noise">
        <div className="relative z-10 max-w-5xl text-center">
          <p className="mb-6 text-sm font-medium tracking-widest uppercase text-muted-foreground animate-fade-up">
            Premium Content Studio
          </p>
          <h1 className="font-serif text-6xl font-normal tracking-tight text-balance leading-[1.1] md:text-8xl lg:text-9xl animate-fade-up-delay-1">
            The Real Estate
            <br />
            <span className="italic">Media Company</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl animate-fade-up-delay-2">
            Vetted clippers distribute your content on Reels, TikTok, and Shorts. You pay per view — not per deliverable.
          </p>
          {/* Platform icons */}
          <div className="mt-8 flex items-center justify-center gap-6 animate-fade-up-delay-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/><circle cx="18.406" cy="5.594" r="1.44"/></svg>
              <span className="text-sm">Reels</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              <span className="text-sm">TikTok</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="text-sm">Shorts</span>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 animate-fade-up-delay-4">
            <Link
              href={CAL_LINK}
              className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
            >
              Book a Call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator - clickable */}
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="h-16 w-px bg-foreground/30 animate-scroll-line group-hover:bg-foreground transition-colors" />
        </button>
      </section>

      {/* Stats Grid */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { number: "6M+", label: "Total Views" },
            { number: "100%", label: "Real Estate Focus" },
            { number: "24hr", label: "Turnaround" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center border-b border-border px-6 py-16 md:border-b-0 md:border-r last:border-r-0 transition-all duration-300 hover:bg-secondary/50 cursor-default"
            >
              <span className="font-serif text-5xl font-normal md:text-6xl transition-transform duration-300 group-hover:scale-110">{stat.number}</span>
              <span className="mt-3 text-sm font-medium tracking-wide text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-border px-6 py-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
                What We Do
              </p>
              <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
                Our Services
              </h2>
            </div>
            <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
              End-to-end content distribution designed specifically for real estate professionals. From strategy to execution, we handle everything so you can focus on closing deals.
            </p>
          </div>
          
          <div className="grid gap-px bg-border md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Short-Form Content",
                description: "Scroll-stopping reels and TikToks that capture attention and drive engagement.",
              },
              {
                number: "02",
                title: "Content Strategy",
                description: "Data-driven planning to maximize your reach and convert viewers into clients.",
              },
              {
                number: "03",
                title: "Brand Development",
                description: "Establish a distinctive presence that sets you apart in the market.",
              },
            ].map((service, i) => (
              <div key={i} className="bg-background p-10 md:p-12">
                <span className="text-sm font-medium tracking-widest text-muted-foreground">
                  ({service.number})
                </span>
                <h3 className="mt-6 font-serif text-2xl font-normal md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Quote Section */}
      <section className="border-t border-border px-6 py-32 md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <blockquote className="font-serif text-4xl font-normal tracking-tight text-balance leading-[1.2] md:text-6xl lg:text-7xl">
            {"\"Turn attention into leverage.\""}
          </blockquote>
          <p className="mt-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Our Philosophy
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-border px-6 py-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
              How It Works
            </p>
            <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
              Simple Process
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Other agencies charge per video. We charge per result.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
            
            <div className="grid gap-16 md:grid-cols-2 md:gap-y-32">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description: "We learn about your brand, goals, and existing content to understand your vision.",
                  highlight: false,
                },
                {
                  step: "02",
                  title: "Review & Refine",
                  description: "We analyze your content library and identify the best clips for maximum impact.",
                  highlight: false,
                },
                {
                  step: "03",
                  title: "Strategize",
                  description: "We create a tailored distribution plan optimized for your target audience and platforms.",
                  highlight: false,
                },
                {
                  step: "04",
                  title: "Pay Per View",
                  description: "Our network of vetted clippers transforms and distributes your content at scale. Pay as little as $0.01 per view — you only pay for results, not deliverables.",
                  highlight: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative ${i % 2 === 1 ? "md:mt-16" : ""}`}
                >
                  <div className={`flex flex-col items-start gap-6 ${item.highlight ? "border-2 border-foreground p-8 -m-8" : ""}`}>
                    <div className={`flex h-16 w-16 items-center justify-center border ${item.highlight ? "border-foreground bg-foreground" : "border-border bg-background"}`}>
                      <span className={`font-serif text-xl ${item.highlight ? "text-background font-semibold" : ""}`}>{item.step}</span>
                    </div>
                    <div>
                      <h3 className={`font-serif text-2xl md:text-3xl ${item.highlight ? "font-semibold" : "font-normal"}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-3 max-w-sm text-base leading-relaxed ${item.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      

      {/* Who It's For */}
      <section className="border-t border-border px-6 py-32 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Who Its For
            </p>
            <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
              Built for Top Performers
            </h2>
            <p className="mt-4 text-sm font-medium tracking-wide text-muted-foreground">
              By application only — Limited to 10 new clients per month
            </p>
          </div>
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-2 w-2 bg-foreground flex-shrink-0" />
                  <span className="text-lg">Team leads and brokers</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-2 w-2 bg-foreground flex-shrink-0" />
                  <span className="text-lg">Real estate investors and fund operators</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-2 w-2 bg-foreground flex-shrink-0" />
                  <span className="text-lg">$50M+ GCI or $20M+ AUM</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Real estate is the most underserved niche in short-form distribution. We fix that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-border px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <div className="space-y-6">
              <span className="inline-block border border-border px-4 py-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Why Us
              </span>
              <h3 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
                Exclusively Real Estate
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                We only work with agents and investors. This singular focus means we understand your market, your audience, and what drives engagement in property. Our team knows real estate content inside and out from luxury listings to investment properties, market updates to client testimonials.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity">
                Learn more about us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-6">
              <span className="inline-block border border-border px-4 py-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Our Promise
              </span>
              <h3 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
                Quality Over Volume
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Each piece is crafted with intention. We prioritize content that builds genuine authority and trust, not just vanity metrics. Our strategic approach ensures every clip serves a purpose in building your personal brand and attracting qualified leads.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity">
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-10">
            <Link href="/">
              <Image src="/logo.png" alt="Xeinst" width={40} height={40} />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
              <Link
                href="https://www.linkedin.com/company/xeinstmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.instagram.com/xeinstmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="https://www.youtube.com/xeinstmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                YouTube
              </Link>
              <Link
                href="https://www.tiktok.com/@xeinstmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                TikTok
              </Link>
              <Link
                href="https://whop.com/xeinstmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                Whop
              </Link>
              <Link
                href="mailto:nadav.benedek@xeinst.com"
                className="text-base font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </Link>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-border text-center">
            <span className="text-sm text-muted-foreground">Xeinst - Premium Content for Real Estate</span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 sm:hidden">
        <Link
          href={CAL_LINK}
          className="flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-all active:bg-transparent active:text-foreground"
        >
          Book a Call
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
