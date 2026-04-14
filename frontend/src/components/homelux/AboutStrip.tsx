import { Separator } from "@/components/ui/separator"

export function AboutStrip() {
  return (
    <section
      id="about"
      className="py-16 lg:py-20 pt-16"
      style={{ backgroundColor: "var(--homelux-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
          {/* Label */}
          <div className="flex lg:flex-col items-center lg:items-start gap-4">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: "var(--homelux-muted)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              About Us
            </p>
            <div
              className="hidden lg:block h-px w-12 mt-2"
              style={{ backgroundColor: "var(--gold)" }}
            />
          </div>

          {/* Quote */}
          <div>
            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl font-light leading-snug mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--homelux-dark)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              "We believe that excellent furniture is essential for a beautiful,
              functioning home. With a love of design and craftsmanship, we combine
              current aesthetics with timeless beauty."
            </blockquote>
            <p
              className="text-sm"
              style={{ color: "var(--homelux-muted)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              — The Homelux Team, Nairobi
            </p>
          </div>
        </div>

        <Separator className="mt-12 lg:mt-16" />
      </div>
    </section>
  )
}
