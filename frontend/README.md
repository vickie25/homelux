# 🏛️ Homelux: Premium E-commerce Experience

**Homelux** is a high-fidelity, luxury furniture landing page built for speed, accessibility, and visual excellence. Featuring a cutting-edge **"Liquid Glass"** aesthetic, the application provides a seamless, artistic browsing experience powered by modern web technologies.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Development
Run the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/` (or the next available port).

### Build
Generate a production-ready bundle:
```bash
npm run build
```

---

## 🎨 Design Philosophy: "Liquid Glass"
The user interface is built on the **Liquid Glass** design pattern, characterized by:
- **Depth**: Multi-layered backdrop-blur effects (`backdrop-blur-xl`).
- **Motion**: Morphing SVG background blobs and fluid Framer Motion transitions.
- **Branding**: A curated palette of **Deep Navy (#1A1A4B)**, **Earthy Brown (#8B5E3C)**, and **Accent Gold (#F99D1C)**.
- **Typography**: Editorial-grade pairing of **Playfair Display** (Headings) and **Inter** (Body).

---

## 🛠️ Technology Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first, zero-runtime)
- **State management**: [Zustand](https://github.com/pmndrs/zustand) (Functional Cart state)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)

---

## 🧩 Key Features
- **Functional Shopping Cart**: Real-time state management for product selection and cart counting.
- **Immersive Video Banners**: High-impact visual storytelling sections with interactive play button patterns.
- **Responsive Layout**: Fluid transition from high-density desktop views to optimized mobile-first navigation.
- **Accessibility (A11y)**: WCAG 2.1 compliant with discernible text for all interactive elements and semantic HTML5 structure.

---

## 📂 Project Structure
```text
├── src/
│   ├── components/
│   │   ├── landing/    # Page-specific sections (Hero, Banners, etc.)
│   │   └── shared/     # Reusable UI (Navbar, ProductCard, Footer)
│   ├── data/           # Mock data and constants
│   ├── hooks/          # Custom hooks and Zustand stores
│   ├── lib/            # Utility functions (cn, etc.)
│   └── index.css       # Global styles and Tailwind v4 configuration
```

---

## 🏺 Architectural Guardrails
This project follows the **Universal AI Architect** provisioning protocol. Detailed design tokens and UI inventory can be found in the `homelux-context` directory.

---
*Built with excellence by Antigravity.*
