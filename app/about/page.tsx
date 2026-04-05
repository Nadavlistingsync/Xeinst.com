import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Xeinst - The Real Estate Media Company",
  description: "Learn about Xeinst, the premium real estate media company helping agents and investors build their personal brand through strategic content distribution.",
  alternates: {
    canonical: "/about",
  },
}

const CAL_LINK = "https://cal.com/xeinst/quick-chat"

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/">
          <Image src="/logo.png" alt="Xeinst" width={32} height={32} />
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            About Xeinst
          </p>
          <h1 className="font-serif text-5xl font-normal tracking-tight leading-[1.1] md:text-7xl">
            Building the future of
            <br />
            <span className="italic">real estate media</span>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <h2 className="font-serif text-3xl font-normal md:text-4xl">Our Mission</h2>
            </div>
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              <p>
                At Xeinst, we believe that every real estate professional deserves a powerful digital presence. In todays market, your online brand is often the first impression potential clients have of you and your business.
              </p>
              <p>
                We founded Xeinst with a singular focus: helping real estate agents and investors leverage short-form content to build authority, attract clients, and close more deals. Unlike general marketing agencies, we exclusively serve the real estate industry, giving us deep expertise in what resonates with property buyers and sellers.
              </p>
              <p>
                Our approach combines strategic content planning with a network of skilled content clippers who transform your existing long-form videos, podcasts, and presentations into scroll-stopping social media content. We handle the strategy and distribution so you can focus on what you do best: closing deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { number: "6M+", label: "Views Generated" },
            { number: "100%", label: "Real Estate Focus" },
            { number: "2024", label: "Founded" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center border-b border-border px-6 py-16 md:border-b-0 md:border-r last:border-r-0"
            >
              <span className="font-serif text-5xl font-normal md:text-6xl">{stat.number}</span>
              <span className="mt-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 font-serif text-3xl font-normal md:text-4xl">What We Stand For</h2>
          <div className="grid gap-12 md:grid-cols-2">
            {[
              {
                title: "Quality Over Quantity",
                description: "We prioritize creating content that builds genuine authority and trust, not just vanity metrics. Every piece we distribute is crafted with intention.",
              },
              {
                title: "Industry Expertise",
                description: "Our exclusive focus on real estate means we understand the nuances of property marketing, from luxury listings to investment opportunities.",
              },
              {
                title: "Strategic Distribution",
                description: "We dont just create content we ensure it reaches the right audience across TikTok, Instagram, YouTube Shorts, and emerging platforms.",
              },
              {
                title: "Partnership Approach",
                description: "We work alongside our clients as true partners, invested in their long-term success and brand growth in the real estate space.",
              },
            ].map((value, i) => (
              <div key={i} className="space-y-4">
                <h3 className="font-serif text-xl font-normal md:text-2xl">{value.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
            Ready to work together?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            Schedule a discovery call to discuss how Xeinst can help elevate your real estate brand.
          </p>
          <div className="mt-10">
            <Link
              href={CAL_LINK}
              className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
            >
              Book a Discovery Call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <Link href="/">
              <Image src="/logo.png" alt="Xeinst" width={32} height={32} />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-border text-center">
            <span className="text-sm text-muted-foreground">Xeinst - Premium Content for Real Estate</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
