import { useState } from "react"
import { Mail, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Privacy & Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer id="footer" style={{ backgroundColor: "var(--homelux-dark)" }}>
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Stay in the Loop
            </p>
            <h3
              className="text-xl font-light text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Get design inspiration &amp; exclusive offers
            </h3>
            <p
              className="text-sm mb-5"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Join our newsletter for the latest arrivals and interior trends.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full text-sm h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-[var(--gold)] focus-visible:ring-[var(--gold)]"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              />
              <Button
                className="rounded-full h-10 px-4 text-sm font-medium flex-shrink-0 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "white",
                  border: "none",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                Subscribe
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Col 2: Contact */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Contact Us
            </p>
            <a
              href="mailto:info@homelux.co.ke"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-5"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "var(--gold)" }} />
              info@homelux.co.ke
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  href: "#",
                  svg: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
                },
                {
                  label: "Instagram",
                  href: "#",
                  svg: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  label: "X (Twitter)",
                  href: "#",
                  svg: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold)"
                    ;(e.currentTarget as HTMLElement).style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"
                    ;(e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"
                  }}
                >
                  {svg}
                </a>
              ))}
              {/* TikTok (custom SVG) */}
              <a
                href="#"
                aria-label="TikTok"
                className="h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold)"
                  ;(e.currentTarget as HTMLElement).style.color = "white"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"
                  ;(e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"
                }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Location */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Our Location
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
              <div>
                <p
                  className="text-sm text-white/80"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Westlands, Nairobi
                </p>
                <p
                  className="text-sm text-white/80 mt-0.5"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  ABC Place, 2nd Floor
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Mon–Sat: 9am – 6pm
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Watermark strip */}
      <div className="relative overflow-hidden py-6">
        {/* Giant watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[10rem] sm:text-[14rem] lg:text-[18rem] font-semibold tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "rgba(255,255,255,0.03)",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            HOMELUX
          </span>
        </div>
        {/* Copyright */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} Homelux. All rights reserved.
          </p>
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Elevate Every Room
          </p>
        </div>
      </div>
    </footer>
  )
}
