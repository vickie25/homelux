import { useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"


const products = [
  {
    id: 1,
    name: "Chair Oak Veneer",
    badge: "Best Price",
    badgeType: "best",
    price: "KES 6,401",
    image: "/product-chair-oak.webp",
  },
  {
    id: 2,
    name: "Bar Stool Low Black Steel",
    badge: "Top Rated",
    badgeType: "top",
    price: "KES 23,375",
    image: "/product-barstool.webp",
  },
  {
    id: 3,
    name: "Mega 2.5-Seater Sofa",
    badge: "Top Rated",
    badgeType: "top",
    price: "KES 332,000",
    image: "/product-sofa-mega.webp",
  },
  {
    id: 4,
    name: "Dining Cabinet with Sliding Doors",
    badge: "Top Rated",
    badgeType: "top",
    price: "KES 52,900",
    image: "/product-dining-cabinet.webp",
  },
  {
    id: 5,
    name: "York 1-Seater Sofa",
    badge: "Top Rated",
    badgeType: "top",
    price: "KES 63,401",
    image: "/product-york-sofa.webp",
  },
  {
    id: 6,
    name: "Artistic Pendant Lamp",
    badge: "Best Price",
    badgeType: "best",
    price: "KES 24,900",
    image: "/product-pendant-lamp.webp",
  },
]

export function CollectionsGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      id="collections"
      className="py-16 lg:py-24"
      style={{ backgroundColor: "var(--homelux-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Curated for You
            </p>
            <h2
              className="text-4xl lg:text-5xl font-light"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--homelux-dark)",
                fontWeight: 400,
              }}
            >
              Our Collections
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image area */}
              <div className="relative h-64 sm:h-72 bg-white overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: product.badgeType === "best" ? "var(--gold)" : "var(--homelux-dark)",
                      color: "white",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Cart button on hover */}
                <div
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  } sm:block`}
                >
                  <Button
                    size="icon"
                    className="rounded-full shadow-lg text-white hover:opacity-90"
                    style={{ backgroundColor: "var(--gold)", border: "none" }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex items-end justify-between">
                <div>
                  <p
                    className="text-sm font-medium leading-snug mb-1"
                    style={{ color: "var(--homelux-dark)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "var(--homelux-dark)",
                      fontSize: "1.125rem",
                    }}
                  >
                    {product.price}
                  </p>
                </div>

                {/* Always visible cart on mobile */}
                <div className="sm:hidden">
                  <Button
                    size="icon"
                    className="rounded-full text-white hover:opacity-90"
                    style={{ backgroundColor: "var(--gold)", border: "none" }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
