import Link from "next/link";
import { Leaf, Share2, Globe, Play, MessageCircle } from "lucide-react";
import { SITE_NAME, SITE_SHORT_NAME, SITE_TAGLINE, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const socialLinks = [
  { icon: Share2, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: Globe, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: Play, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: MessageCircle, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark-text text-white">
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="Elevo Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">{SITE_SHORT_NAME}</span>
                <span className="text-[10px] text-white/50 font-medium tracking-wide">Community</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">{SITE_TAGLINE}</p>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">Elevo, Kerala, India</p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-forest flex items-center justify-center transition-colors"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Get in Touch</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Elevo, Kerala</li>
              <li>
                <a href="mailto:contact@Elevo.in" className="hover:text-white transition-colors">contact@Elevo.in</a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200">
                Send a Message
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p className="text-xs text-white/30">Built with ❤️ for the community</p>
        </div>
      </div>
    </footer>
  );
}
