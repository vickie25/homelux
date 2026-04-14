# Homelux — Furniture Website Design Brief
**For use with Bolt.dev · Landing Page v1.0**

---

## 1. Research Summary: What Makes Furniture Websites Convert

### Kenya Market Leaders (What's Working Locally)
| Brand | What They Do Well |
|---|---|
| **Furniture Palace Kenya** | Premium product photography, luxury Italian collections, prominent price display |
| **Victoria Homestore** | One-stop-shop feel, bedroom/living/dining categories on homepage, delivery badge |
| **MoKo Home+Living** | Instalment payment option ("Lipa Mdogo Mdogo" / FlexPay), warm brand voice |
| **Fairdeal / Ashley's Kenya** | Themed collections, seasonal discounts (up to 50%), multi-city delivery |
| **Dignity Furniture** | Mid-century modern niche, custom-made positioning, accessible price point |

**Key Kenya-specific conversion levers:**
- Instalment/BNPL (Buy Now Pay Later) — huge for high-ticket furniture in Kenya
- Free delivery callout (big trust builder)
- WhatsApp CTA (Kenyans prefer to enquire via WhatsApp before purchasing)
- KES pricing displayed prominently (not USD)
- Room-based category navigation (Living Room, Bedroom, Dining, Office)

### Global Best Practices (Wayfair, IKEA, Article, Made.com)
- **High-quality lifestyle photography** — furniture in real room settings, not white backgrounds
- **Stats proof bar** (e.g. "875+ products · 400+ happy clients") — social proof above the fold
- **Shop by Room / Category** section — reduces decision fatigue
- **Mid-page lifestyle banner** — full-width immersive image with a secondary CTA
- **Pre-order / Custom order CTA** — increases AOV (average order value)
- **Newsletter signup** in footer — email list is the #1 long-term conversion asset
- **Trust signals**: delivery info, warranty, returns policy visible on homepage

### Conversion Rate Context
- Furniture ecommerce globally converts at **1–1.4%** on average (lowest of all categories — high-consideration purchase)
- Top performers hit **3–4%** through: great mobile UX, fast load times, financing options, and visual storytelling
- **Mobile-first is non-negotiable** — 72%+ of Kenyan internet users are on mobile

---

## 2. Brand Identity — Homelux

| Element | Spec |
|---|---|
| **Brand Name** | Homelux |
| **Tagline** | *Elevate Every Room* |
| **Brand Personality** | Premium but approachable. Warm, elegant, aspirational. |
| **Target Customer** | Nairobi professionals, 28–50, furnishing/upgrading their home |
| **Price Positioning** | Mid-to-premium (KES 5,000 – KES 500,000+) |
| **Tone of Voice** | Confident, warm, sophisticated — never cold or corporate |

### Color Palette
```css
--color-primary: #1A1A1A;       /* Deep charcoal — headings, nav */
--color-accent: #C8A96E;        /* Warm gold — CTAs, highlights */
--color-bg: #FAF8F5;            /* Warm off-white — page background */
--color-surface: #FFFFFF;       /* Cards, product tiles */
--color-text: #2C2C2A;          /* Body text */
--color-text-muted: #888780;    /* Captions, labels */
--color-dark-section: #1A1A1A;  /* Dark banner backgrounds */
```

### Typography
```
Display / Hero: 'Cormorant Garamond' (Google Fonts) — elegant serif for headlines
Body: 'DM Sans' (Google Fonts) — clean, modern, highly readable on mobile
Accent/Labels: 'DM Sans' uppercase tracking-widest — for category labels, badges
```

---

## 3. Landing Page — Full Section Blueprint

### SECTION 1: Navigation Bar
```
[HOMELUX logo — left]    [Home] [Shop] [Collections] [About Us] [Contact Us]    [🔍] [👤] [🛒]
```
- Sticky on scroll, background becomes white with subtle shadow
- Mobile: hamburger menu, logo centered
- Accent color on active link

---

### SECTION 2: Hero Banner (Above the Fold)
**Layout:** Full-width, ~85vh height. Text left, lifestyle image right (or full bleed with text overlay)

**Headline (H1):**
> Discover elegant &
> affordable furniture
> for every room

**Subtext (small, muted):**
> Transform your space with sophisticated and stylish pieces, and create a serene and inviting home.

**CTA Button (Primary):**
> `Shop Now →`
- Background: `var(--color-accent)` (#C8A96E gold)
- Text: white
- Rounded pill shape, padding 14px 36px

**Background image:** Warm-toned living room, natural light, beige/cream tones (use Unsplash/Pexels placeholder)

**Stats bar (bottom of hero, overlapping section below):**
| 875+ | 400+ | 800+ |
|---|---|---|
| Furniture Pieces | Fresh Interior Designs | Happy Clients |
- Dark card (#1A1A1A), white text, three columns, slight border-radius

---

### SECTION 3: About Us Strip
**Layout:** Two columns — label left, quote right

```
About Us    |  "We believe that excellent furniture is essential for a
            |   beautiful, functioning home. With a love of design and
            |   craftsmanship, we combine current aesthetics with
            |   timeless beauty."
```
- Light divider line below
- Simple, no background — breathing room

---

### SECTION 4: Our Collections (Product Grid)
**Heading:**
> Our Collections `← →` (navigation arrows right-aligned)

**Grid:** 3 columns desktop / 2 columns tablet / 1 column mobile
**6 product cards:**

Each card:
```
[Product Image — white bg]
[Badge: "Best Price" | "Top Rated"]
[Product Name — e.g. "Bar Stool Low Black Steel"]
[Price — KES 23,375]
[🛒 Add to cart icon — bottom right]
```

**Sample products to include:**
| Product | Badge | Price (KES) |
|---|---|---|
| Chair Oak Veneer | Best Price | KES 6,401 |
| Bar Stool Low Black Steel | Top Rated | KES 23,375 |
| Mega 2.5-seater Sofa | Top Rated | KES 332,000 |
| Dining Cabinet with Sliding Doors | Top Rated | KES 52,900 |
| York 1-Seater Sofa | Top Rated | KES 63,401 |
| Artistic Pendant Lamp | Best Price | KES 24,900 |

---

### SECTION 5: Mid-Page Lifestyle Banner (Full Width)
**Layout:** Full-bleed dark lifestyle image (dark dining/living room scene)

**Text overlay (bottom-left):**
> CHOOSE THE MOST APPROPRIATE
> FURNISHINGS FOR YOUR HOUSE.

**CTA Button (right side):**
> `Explore Now →`
- White button, dark text
- Subtle hover: gold accent border

---

### SECTION 6: Shop by Categories
**Layout:** Two columns — category list left, 2x2 product grid right

**Left column — Categories (clickable list):**
- **Living Room** (underlined/active)
- Dining Room
- Office Room
- Kitchen Room

**Right 2x2 grid (Living Room products shown by default):**
| York 1-Seater Sofa — KES 63,401 | Calla Lounge Chair — KES 23,375 |
|---|---|
| Calla 1-Seater Sofa — KES 43,900 | Riviera Lounge Chair — KES 52,900 |

**Below grid:**
> `Show More →` button (outlined, centered)

---

### SECTION 7: Pre-Order Banner (Dark Section)
**Background:** Full-width lifestyle image, dark overlay

**Heading (large, white):**
> Create your dream
> furniture masterpiece
> today!

**Right side mini-text:**
> We believe in the power of
> your vision.

**CTA Button:**
> `Pre-Order Now →`
- Gold accent button

---

### SECTION 8: Footer
**Layout:** 4 columns on desktop, stacked on mobile

**Column 1: Newsletter**
```
[Email input field                    ] [Subscribe Now]
```

**Column 2: Contact Us**
- info@homelux.co.ke
- [FB] [IG] [X] [TikTok] icons

**Column 3: Location**
- Westlands, Nairobi
- ABC Place, 2nd Floor

**Column 4: Quick Links**
- Home
- About Us
- Privacy & Policy
- Terms & Conditions

**Bottom strip (full width dark):**
Large watermark text: `HOMELUX` — very large, dark background

---

## 4. Conversion Optimisation Elements to Include

### Trust Signals (visible on hero section or sticky bar)
```
🚚 Free Delivery in Nairobi    🔒 Secure Payment    ⭐ 800+ Happy Clients    📞 WhatsApp Support
```

### WhatsApp Float Button
- Fixed bottom-right corner
- Green WhatsApp icon
- Label: "Chat with us"
- Link: `https://wa.me/254XXXXXXXXX`

### Sticky "Add to Cart" / "Get a Quote" behaviour on product cards
- Cart icon appears on hover over product card
- Mobile: always visible

---

## 5. Technical Specification for Bolt.dev

### Stack
```
Framework:    React + Vite (or Next.js)
Styling:      Tailwind CSS
Icons:        Lucide React
Fonts:        Google Fonts — Cormorant Garamond + DM Sans
Images:       Unsplash/Pexels placeholder URLs (real lifestyle photography)
```

### Responsive Breakpoints
| Breakpoint | Columns | Notes |
|---|---|---|
| Mobile < 640px | 1 col | Stack all sections, hamburger nav |
| Tablet 640–1024px | 2 col | Product grid 2-col, nav visible |
| Desktop > 1024px | 3 col | Full layout as described above |

### Component List
```
<Navbar />              — sticky, transparent → white on scroll
<HeroBanner />          — full-height, CTA, stats bar
<AboutStrip />          — two-col quote section
<CollectionsGrid />     — product cards with badge + price
<LifestyleBanner />     — full-bleed mid-page CTA
<ShopByCategory />      — tabbed category + 2x2 grid
<PreOrderBanner />      — dark full-width CTA section
<Footer />              — 4-col with newsletter form
<WhatsAppButton />      — fixed floating button
```

### Animation Suggestions
- Hero text: fade-in + slight upward translate on load (staggered 200ms)
- Product cards: scale(1.02) on hover, shadow appears
- Stats numbers: count-up animation when scrolled into view
- Category tabs: smooth underline slide transition
- Navbar: smooth background transition on scroll

---

## 6. Copy Prompts / Content Guidance

### Hero Headline Options (pick one)
1. *"Discover elegant & affordable furniture for every room"* ← (reference design)
2. *"Luxury Living, Kenyan Pricing"*
3. *"Furnish Your Dream Home — Delivered to Your Door"*

### CTAs Throughout
| Position | CTA Text |
|---|---|
| Hero primary | Shop Now → |
| Mid-banner | Explore Now → |
| Category section | Show More → |
| Pre-order banner | Pre-Order Now → |
| Footer newsletter | Subscribe Now |
| WhatsApp float | Chat with Us |

---

## 7. Bolt.dev Prompt (Paste This)

> Build a complete furniture e-commerce landing page for a brand called **Homelux** with the tagline *"Elevate Every Room"*. The site targets Nairobi, Kenya customers. Use React + Tailwind CSS.
>
> **Design aesthetic:** Warm, premium, editorial. Off-white background (`#FAF8F5`), deep charcoal headings (`#1A1A1A`), warm gold accent (`#C8A96E`). Google Fonts: Cormorant Garamond (headings) + DM Sans (body).
>
> **Sections in order:**
> 1. Sticky Navbar — logo left, links center, icons right (search, account, cart)
> 2. Hero Banner — full-width lifestyle image, H1 headline, subtext, gold "Shop Now →" CTA button, stats bar (875+ Pieces · 400+ Designs · 800+ Happy Clients) overlapping into next section
> 3. About Strip — two-column, "About Us" label left, brand quote right
> 4. Our Collections — H2 heading with ← → arrows, 3-column product grid (6 cards), each card has image, badge (Best Price/Top Rated), product name, KES price, cart icon
> 5. Lifestyle Banner — full-width dark image, text overlay bottom-left, "Explore Now →" button right
> 6. Shop by Category — left: clickable category list (Living Room, Dining Room, Office Room, Kitchen Room); right: 2×2 product grid; "Show More →" button below
> 7. Pre-Order Banner — dark full-width section, large white heading, "Pre-Order Now →" gold CTA
> 8. Footer — newsletter email input + Subscribe button; Contact (email + social icons); Location (Westlands, Nairobi); Quick links; HOMELUX watermark text at bottom
> 9. Floating WhatsApp button — fixed bottom-right, green, "Chat with us" label
>
> **Conversion elements:** Trust bar with delivery/payment/support icons below navbar or in hero. Hover effects on product cards (scale + shadow). Sticky navbar transition on scroll. Mobile-responsive (hamburger menu on mobile).
>
> Use realistic Unsplash furniture image URLs as placeholders. Display all prices in KES format. Make it pixel-perfect, warm, and luxurious — not generic.

---

*Brief prepared for Homelux · April 2026*
*Reference design: Okana furniture template*
