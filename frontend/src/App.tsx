import { Navbar } from "@/components/homelux/Navbar"
import { HeroBanner } from "@/components/homelux/HeroBanner"
import { AboutStrip } from "@/components/homelux/AboutStrip"
import { CollectionsGrid } from "@/components/homelux/CollectionsGrid"
import { LifestyleBanner } from "@/components/homelux/LifestyleBanner"
import { ShopByCategory } from "@/components/homelux/ShopByCategory"
import { PreOrderBanner } from "@/components/homelux/PreOrderBanner"
import { Footer } from "@/components/homelux/Footer"
import { WhatsAppButton } from "@/components/homelux/WhatsAppButton"

export function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--homelux-bg)" }}>
      <Navbar />
      <main>
        <HeroBanner />
        <AboutStrip />
        <CollectionsGrid />
        <LifestyleBanner />
        <ShopByCategory />
        <PreOrderBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
