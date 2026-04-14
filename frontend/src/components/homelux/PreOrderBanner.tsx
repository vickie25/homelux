import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PreOrderBanner() {
  return (
    <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <img
        src="/preorder-banner.webp"
        alt="Custom furniture"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: headline */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Custom Orders
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "white",
                fontWeight: 300,
              }}
            >
              Create your dream<br />
              furniture masterpiece<br />
              <em className="not-italic" style={{ color: "var(--gold)" }}>today!</em>
            </h2>
            <Button
              className="rounded-full font-medium px-8 py-5 text-sm tracking-wide group hover:opacity-90 transition-all"
              style={{
                backgroundColor: "var(--gold)",
                color: "white",
                border: "none",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              Pre-Order Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right: subtext + divider */}
          <div className="lg:pl-12 lg:border-l" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <p
              className="text-lg leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
              }}
            >
              We believe in the power of your vision. Let us craft a bespoke piece
              that perfectly reflects your style, your space, and your story.
            </p>
            <div
              className="mt-8 h-px w-16"
              style={{ backgroundColor: "var(--gold)" }}
            />
            <p
              className="mt-4 text-sm"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Delivery across Nairobi &amp; Kenya
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
