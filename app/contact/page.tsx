import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Xeinst - The Real Estate Media Company",
  description: "Get in touch with Xeinst. Schedule a discovery call or reach out via email to learn how we can help grow your real estate brand.",
  alternates: {
    canonical: "/contact",
  },
}

const CAL_LINK = "https://cal.com/nadavbenedekxeinst/social-media-stratagey-and-plan"

export default function Contact() {
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
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl font-normal tracking-tight leading-[1.1] md:text-7xl">
            Lets discuss your
            <br />
            <span className="italic">content strategy</span>
          </h1>
        </div>
      </section>

      {/* Contact Options */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Schedule Call */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-normal">Schedule a Call</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                The best way to get started is with a discovery call. Well discuss your goals, review your existing content, and outline a strategy tailored to your real estate business.
              </p>
              <Link
                href={CAL_LINK}
                className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
              >
                Book Discovery Call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Direct Contact */}
            <div className="space-y-8">
              <h2 className="font-serif text-3xl font-normal">Direct Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-2">Email</p>
                    <Link
                      href="mailto:nadav.benedek@xeinst.com"
                      className="text-lg hover:opacity-60 transition-opacity"
                    >
                      nadav.benedek@xeinst.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 font-serif text-3xl font-normal">Follow Us</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/company/xeinstmedia" },
              { name: "Instagram", url: "https://www.instagram.com/xeinstmedia/" },
              { name: "YouTube", url: "https://www.youtube.com/xeinstmedia" },
              { name: "TikTok", url: "https://www.tiktok.com/@xeinstmedia" },
              { name: "Whop", url: "https://whop.com/xeinstmedia/" },
            ].map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-border p-6 hover:bg-secondary transition-colors"
              >
                <span className="text-lg font-medium">{social.name}</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 font-serif text-3xl font-normal">Common Questions</h2>
          <div className="space-y-8">
            {[
              {
                question: "What types of real estate professionals do you work with?",
                answer: "We work exclusively with real estate agents, brokers, and investors. Whether youre focused on luxury properties, commercial real estate, or residential sales, our content strategies are tailored to your specific market and audience.",
              },
              {
                question: "How does the content distribution process work?",
                answer: "After our discovery call, we review your existing content library. Our team then identifies the best moments for short-form clips, develops a distribution strategy, and our network of content clippers produces and publishes content across your chosen platforms.",
              },
              {
                question: "What platforms do you distribute content on?",
                answer: "We focus on the platforms where real estate audiences are most active: TikTok, Instagram Reels, YouTube Shorts, and LinkedIn. We tailor the content format and messaging for each platform to maximize engagement.",
              },
              {
                question: "How long before I see results?",
                answer: "Most clients begin seeing increased engagement within the first few weeks of consistent posting. Building a strong personal brand and audience typically takes 3-6 months of strategic content distribution.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border pb-8 last:border-b-0">
                <h3 className="font-serif text-xl font-normal mb-4">{faq.question}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
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
