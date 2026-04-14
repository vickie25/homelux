import { ArrowRight, Truck, Shield, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"


const stats = [
  { value: "875+", label: "Furniture Pieces" },
  { value: "400+", label: "Fresh Interior Designs" },
  { value: "800+", label: "Happy Clients" },
]

const trustItems = [
  { icon: Truck, label: "Free Delivery in Nairobi" },
  { icon: Shield, label: "Secure Payment" },
  { icon: Star, label: "800+ Happy Clients" },
  { icon: MessageCircle, label: "WhatsApp Support" },
]

export function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-living-room.webp"
          alt="Elegant living room"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay - more on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-[#FAF8F5]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/40 via-transparent to-transparent" />
      </div>

      {/* Trust bar */}
      <div
        className="relative z-10 w-full border-b"
        style={{ backgroundColor: "rgba(250,248,245,0.85)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon
                  className="h-3.5 w-3.5 flex-shrink-0"
                  style={{ color: "var(--gold)" }}
                />
                <span
                  className="text-xs font-medium tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "var(--homelux-text)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <p
              className="animate-hero-1 text-xs font-medium tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Elevate Every Room
            </p>

            {/* H1 */}
            <h1
              className="animate-hero-2 text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--homelux-dark)",
                fontWeight: 400,
              }}
            >
              Discover elegant &amp;<br />
              affordable furniture<br />
              <em className="not-italic" style={{ color: "var(--gold)" }}>for every room</em>
            </h1>

            {/* Subtext */}
            <p
              className="animate-hero-3 text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--homelux-muted)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Transform your space with sophisticated and stylish pieces,
              and create a serene and inviting home.
            </p>

            {/* CTA */}
            <div className="animate-hero-4 flex items-center gap-4 flex-wrap">
              <Button
                className="rounded-full text-white font-medium px-8 py-6 text-sm tracking-wide group hover:opacity-90 transition-all"
                style={{
                  backgroundColor: "var(--gold)",
                  border: "none",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
                asChild
              >
                <a href="#collections">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <a
                href="#about"
                className="text-sm font-medium underline underline-offset-4 transition-colors hover:opacity-70"
                style={{ color: "var(--homelux-dark)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — overlaps next section */}
      <div className="relative z-20 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] grid grid-cols-3 -mb-8 overflow-hidden"
            style={{ backgroundColor: "var(--homelux-dark)" }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative flex flex-col items-center justify-center py-5 px-4">
                {i > 0 && (
                  <div
                    className="absolute left-0 top-4 bottom-4 w-px"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  />
                )}
                <span
                  className="text-2xl sm:text-3xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: "var(--gold)",
                    fontWeight: 600,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs text-center mt-0.5 tracking-wide"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing for stat bar overlap */}
      <div className="h-8 relative z-10" style={{ backgroundColor: "var(--homelux-bg)" }} />
    </section>
  )
}
