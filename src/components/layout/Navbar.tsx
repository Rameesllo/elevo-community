"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { NAV_LINKS, SITE_SHORT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img src="/logo.png" alt="Elevo Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-dark-text tracking-tight">{SITE_SHORT_NAME}</span>
              <span className="text-[10px] text-muted font-medium tracking-wide">Community</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-mint-fog text-forest"
                    : "text-dark-text/70 hover:text-forest hover:bg-mint-fog/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/#join" className="hidden sm:inline-flex btn-primary text-xs px-4 py-2">
              Join Us
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-dark-text hover:bg-mint-fog transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "bg-mint-fog text-forest"
                      : "text-dark-text/70 hover:text-forest hover:bg-mint-fog/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <Link href="/#join" className="btn-primary w-full text-sm justify-center" onClick={() => setMobileOpen(false)}>
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
