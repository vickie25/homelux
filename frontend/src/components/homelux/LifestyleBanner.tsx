import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LifestyleBanner() {
  return (
    <section className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background */}
      <img
        src="/lifestyle-banner.webp"
        alt="Elegant dining room"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 lg:pb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            {/* Left text */}
            <div className="max-w-lg">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Designed for Living
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light leading-snug"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "white",
                  fontWeight: 300,
                }}
              >
                Choose the most appropriate<br />
                furnishings for your house.
              </h2>
            </div>

            {/* CTA right */}
            <div className="flex-shrink-0">
              <Button
                className="rounded-full font-medium px-8 py-5 text-sm tracking-wide group hover:bg-white/90 transition-all"
                style={{
                  backgroundColor: "white",
                  color: "var(--homelux-dark)",
                  border: "none",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
                asChild
              >
                <a href="#collections">
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
