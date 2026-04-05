"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

const CAL_LINK = "https://cal.com/xeinst/quick-chat"

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-sm border-b border-border">
      <Link href="/">
        <Image src="/logo.png" alt="Xeinst" width={32} height={32} />
      </Link>
      <nav className="flex items-center gap-6 md:gap-8">
        <Link
          href="/about"
          className={`text-sm font-medium tracking-wide transition-opacity hidden sm:block ${
            pathname === "/about" ? "underline underline-offset-4" : "hover:opacity-60"
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`text-sm font-medium tracking-wide transition-opacity hidden sm:block ${
            pathname === "/contact" ? "underline underline-offset-4" : "hover:opacity-60"
          }`}
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
  )
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <span>/</span>
      <span className="text-foreground">{current}</span>
    </nav>
  )
}

export function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 sm:hidden">
      <Link
        href={CAL_LINK}
        className="flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-all active:bg-transparent active:text-foreground"
      >
        Book a Call
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
