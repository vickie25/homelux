import { useState } from "react"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["Living Room", "Dining Room", "Office Room", "Kitchen Room"]

const categoryProducts: Record<string, Array<{ id: number; name: string; price: string; image: string }>> = {
  "Living Room": [
    { id: 1, name: "York 1-Seater Sofa", price: "KES 63,401", image: "/product-york-sofa.webp" },
    { id: 2, name: "Calla Lounge Chair", price: "KES 23,375", image: "/product-calla-lounge.webp" },
    { id: 3, name: "Calla 1-Seater Sofa", price: "KES 43,900", image: "/product-calla-sofa.webp" },
    { id: 4, name: "Riviera Lounge Chair", price: "KES 52,900", image: "/product-riviera-lounge.webp" },
  ],
  "Dining Room": [
    { id: 1, name: "Dining Cabinet", price: "KES 52,900", image: "/product-dining-cabinet.webp" },
    { id: 2, name: "Bar Stool Low Black", price: "KES 23,375", image: "/product-barstool.webp" },
    { id: 3, name: "Mega 2.5-Seater Sofa", price: "KES 332,000", image: "/product-sofa-mega.webp" },
    { id: 4, name: "Artistic Pendant Lamp", price: "KES 24,900", image: "/product-pendant-lamp.webp" },
  ],
  "Office Room": [
    { id: 1, name: "Chair Oak Veneer", price: "KES 6,401", image: "/product-chair-oak.webp" },
    { id: 2, name: "Riviera Lounge Chair", price: "KES 52,900", image: "/product-riviera-lounge.webp" },
    { id: 3, name: "York 1-Seater Sofa", price: "KES 63,401", image: "/product-york-sofa.webp" },
    { id: 4, name: "Artistic Pendant Lamp", price: "KES 24,900", image: "/product-pendant-lamp.webp" },
  ],
  "Kitchen Room": [
    { id: 1, name: "Bar Stool Low Black", price: "KES 23,375", image: "/product-barstool.webp" },
    { id: 2, name: "Dining Cabinet", price: "KES 52,900", image: "/product-dining-cabinet.webp" },
    { id: 3, name: "Calla Lounge Chair", price: "KES 23,375", image: "/product-calla-lounge.webp" },
    { id: 4, name: "Chair Oak Veneer", price: "KES 6,401", image: "/product-chair-oak.webp" },
  ],
}

export function ShopByCategory() {
  const [activeCategory, setActiveCategory] = useState("Living Room")
  const products = categoryProducts[activeCategory]

  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: "white" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Browse by Space
          </p>
          <h2
            className="text-4xl lg:text-5xl font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "var(--homelux-dark)",
              fontWeight: 400,
            }}
          >
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          {/* Category list */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 text-left transition-all duration-250 py-2 pr-4 border-b-2 lg:border-b-0 lg:border-l-2 text-sm font-medium"
                style={{
                  borderColor: activeCategory === cat ? "var(--gold)" : "transparent",
                  color: activeCategory === cat ? "var(--homelux-dark)" : "var(--homelux-muted)",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  paddingLeft: activeCategory === cat ? "12px" : "0px",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product 2x2 grid */}
          <div>
            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[var(--homelux-bg)] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                >
                  <div className="relative h-44 sm:h-56 bg-white overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250 sm:block hidden">
                      <Button
                        size="icon"
                        className="rounded-full text-white shadow-md hover:opacity-90 h-8 w-8"
                        style={{ backgroundColor: "var(--gold)", border: "none" }}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p
                      className="text-sm font-medium leading-tight mb-1 truncate"
                      style={{ color: "var(--homelux-dark)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: "var(--homelux-dark)",
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="rounded-full px-8 py-5 text-sm font-medium tracking-wide group transition-all"
                style={{
                  borderColor: "var(--homelux-dark)",
                  color: "var(--homelux-dark)",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                Show More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
