import { useState, useEffect } from "react"
import { Menu, X, Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#collections" },
  { label: "Collections", href: "#collections" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#footer" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <span
              className="text-2xl lg:text-3xl font-semibold tracking-[0.15em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: scrolled ? "var(--homelux-dark)" : "var(--homelux-dark)",
              }}
            >
              Homelux
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors relative group"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "var(--gold)" }}
                />
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-body"
                style={{ backgroundColor: "var(--gold)", color: "white", border: "none" }}
              >
                0
              </Badge>
            </Button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-4 w-4" />
              <Badge
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                style={{ backgroundColor: "var(--gold)", color: "white", border: "none" }}
              >
                0
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "white", borderTop: "1px solid var(--border)" }}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-foreground py-2 border-b border-border last:border-0"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
