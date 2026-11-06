# Unity Compass — Enterprise Modernization & Astro Rebuild

This repository contains the completely modernized, high-performance **Astro 5** rebuild of the **Unity Compass** website ([https://unitycompass.com/](https://unitycompass.com/)).

The project transforms the original WordPress/Elementor site into a sophisticated, enterprise-grade digital flagship for a US federal government contracting, consulting, recruitment, and staffing consultancy based in Frederick, Maryland.

---

## 1. Key Objectives & Accomplishments

- **Authentic Brand Identity Preserved**: Retained the original Unity Compass navy blue (`#0C487A`), deep federal slate (`#0A2540`), and brand crimson red (`#FF3130` / `#DC2626`) while purging inconsistent Elementor color pollution.
- **100% Content & Asset Preservation**: Preserved all 11 core pages, all 6 full blog articles, all 44 original imagery assets, federal defense seals (DoD, DHS, NASA, DOC, Raytheon), and the official Capability Statement PDF (`Group-146.pdf`).
- **Linear/Apple Design Discipline**: Clean typographic hierarchy (`Inter`), balanced whitespace, refined card components, restrained elevation shadows, and zero extraneous decorative noise.
- **Verified GovCon Proof Points**: Prominently highlights authentic, audited metrics from the corporate portfolio ($35M+ in awarded value, 12+ federal proposals won, 56 CLINs in GSA OASIS+, NASA SEWP VI, MDA SHIELD, SBIR).
- **Interactive Features**:
  - Accessible, validated Contact & Consultation form.
  - Interactive Careers & Job Board with search, employment-type filtering, security-clearance filtering, Grid/List view switcher, and a Resume Upload application modal enforcing the 1MB PDF/DOC limit.
  - Responsive mobile drawer navigation with zero layout shifts.

---

## 2. Architecture & File Structure

```text
unity-compass/
├── public/
│   ├── documents/
│   │   └── capability-statement.pdf   # Official 2-page capability statement
│   ├── images/                        # All 44 original high-res assets & agency crests
│   ├── favicon.png                    # High-definition brand favicon
│   └── robots.txt                     # Production crawler rules
├── src/
│   ├── components/
│   │   ├── TopBanner.astro            # OASIS+ update banner with direct phone/email
│   │   ├── Header.astro               # Sticky nav with services dropdown & mobile drawer
│   │   ├── Footer.astro               # 4-column enterprise footer with FAR/OASIS+ badges
│   │   ├── Button.astro               # Standardized buttons (primary red, navy, outline)
│   │   ├── SectionHeading.astro       # Consistent section headers with eyebrow pills
│   │   ├── MetricsGrid.astro          # Verified federal track record ($35M+, 12+ bids)
│   │   ├── AgencyLogos.astro          # Defense & civilian agency trust ribbon
│   │   ├── ServiceCard.astro          # GovCon practice cards
│   │   ├── TestimonialCard.astro      # Verbatim client quotes with verified roles
│   │   ├── JobBoard.astro             # Filterable job board with resume upload modal
│   │   └── ContactForm.astro          # Accessible consultation inquiry form
│   ├── data/
│   │   ├── navigation.ts              # Centralized header & footer links
│   │   ├── company.ts                 # Company info, address, phone, verified metrics
│   │   ├── services.ts                # Deep-dive content for all 5 practices
│   │   ├── testimonials.ts            # Client quotes & impact metrics
│   │   ├── blogPosts.ts               # Complete text for all 6 publications
│   │   └── jobs.ts                    # Career roles & clearance levels
│   ├── layouts/
│   │   └── MainLayout.astro           # SEO meta, OpenGraph, JSON-LD schema, global styles
│   ├── pages/
│   │   ├── index.astro                # Modernized Homepage
│   │   ├── about-us.astro             # About Us, Mission, Vision, Team, Standards
│   │   ├── proposal-development-services.astro
│   │   ├── recruitment-services.astro
│   │   ├── staffing.astro
│   │   ├── information-technology-and-business-consulting.astro
│   │   ├── customized-support-services.astro
│   │   ├── career.astro               # Careers page with interactive job board
│   │   ├── blog/
│   │   │   ├── index.astro            # Insights & publications index
│   │   │   └── [slug].astro           # Dynamic article reader for all 6 posts
│   │   ├── contact.astro              # Corporate contact & direct consultation
│   │   └── privacy-policy.astro       # Full 8-section legal privacy policy
│   └── styles/
│       └── global.css                 # Tailwind directives, fonts, design tokens
├── astro.config.mjs                   # Astro 5 configuration with Tailwind & Sitemap
├── tailwind.config.mjs                # Centralized color tokens & shadow system
└── package.json
```

---

## 3. Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher (tested on Node v22.12.0)
- `pnpm` (recommended) or `npm`

### Installation
```bash
cd unity-compass
pnpm install
```

### Development Server
```bash
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Production Build & Preview
```bash
pnpm build
pnpm preview
```
All static HTML pages, assets, and XML sitemaps will be generated into the `dist/` folder.

---

## 4. Design System Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#0C487A` | Primary brand identity, headers, prominent links |
| `brand-deep` | `#0A2540` | Deep slate federal backgrounds, cards |
| `brand-dark` | `#07192C` | High-contrast hero and footer containers |
| `brand-red` | `#FF3130` | Compass star mark, primary conversion buttons, highlights |
| `brand-slate` | `#324A6D` | Subheadings, category badges, neutral accents |
| `brand-surface` | `#F8FAFC` | Subtle contrast section backgrounds |
| `brand-border` | `#E2E8F0` | Clean, subtle card and container dividers |

---

## 5. SEO & Accessibility Standards

- **Open Graph & Twitter Cards**: Implemented across all 17 routes with specific titles, descriptions, and feature images.
- **JSON-LD Structured Data**: Embedded `Organization` and `WebSite` schema.
- **Sitemap**: Automatic XML sitemap generation via `@astrojs/sitemap`.
- **Accessibility**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), keyboard navigation, visible focus rings, ARIA labels, and skip-to-content links.
- **Zero Bloat**: Fast static delivery with minimal client-side JavaScript.

