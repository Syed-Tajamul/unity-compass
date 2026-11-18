# Unity Compass — Enterprise Modernization & Astro 5 Rebuild

[![Astro](https://img.shields.io/badge/Astro-5.4-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-0C487A?style=for-the-badge)](LICENSE)

> **Live Production URL:** [https://unitycompass.com](https://unitycompass.com)  
> **Headquarters:** Frederick, Maryland, USA  
> **Industry:** Federal Government Contracting (GovCon) Advisory, Capture & Proposal Support, Cleared Staffing & IT Modernization

---

## 1. Executive Summary

This repository contains the complete enterprise modernization and rebuild of **Unity Compass LLC**. Transitioned away from legacy WordPress/Elementor bloat, the new platform is engineered on **Astro 5** with hybrid static rendering, zero-JS baseline delivery, Tailwind CSS design tokens, and a resilient Supabase database integration.

The digital flagship showcases Unity Compass's verified **\$35M+ federal contract value**, **12+ federal proposal wins**, and deep domain capability across defense, civilian, and intelligence markets.

### Key Highlights
- **100% Performance & Core Web Vitals**: Near-instant TTFB, sub-second LCP, zero CLS, and static route pre-rendering.
- **Strict Brand Design System**: Executive Navy (`#0C487A`, `#0B2553`), Federal Slate (`#243A5E`), and Brand Accent Red (`#FF3130`) with Plus Jakarta Sans and Outfit typography.
- **Zero-Dependency Fast Icon Engine**: Inlined Lucide SVG paths compiled in under 1ms (`Icon.astro`), eliminating client bundle overhead.
- **Dynamic GovCon Careers Portal**: Interactive job listings with clearance filters, employment type filters, keyword search, and a direct resume upload modal.
- **Publications & Thought Leadership**: Dynamic markdown/database blog engine with reading time estimates, category filters, and rich metadata.
- **Enterprise Contact & Consultation System**: Dual contact options linking to direct HubSpot meeting calendars and validated serverless inquiry forms.
- **Verified Federal Trust Ecosystem**: Defense agency emblems (DoD, DHS, NASA, DOC), corporate teaming partners, and verified contract award metrics.

---

## 2. Architecture & File Structure

```text
unity-compass/
├── public/
│   ├── documents/
│   │   └── capability-statement.pdf   # Official 2-page Corporate Capability Statement
│   ├── images/                        # High-resolution agency crests, photography & brand assets
│   ├── favicon.png                    # High-definition brand favicon
│   └── robots.txt                     # Production crawler rules
├── src/
│   ├── components/
│   │   ├── Header.astro               # Sticky glassmorphic navbar with animated mobile drawer
│   │   ├── Footer.astro               # 5-column enterprise footer with FAR/OASIS+ & social links
│   │   ├── Hero.astro                 # Homepage hero with radiant animated text & floating compass
│   │   ├── HomeIntroBanner.astro      # Parallax corporate intro showcase
│   │   ├── HomeServicesGrid.astro     # Core practice areas with 3D tilt interaction
│   │   ├── MetricsGrid.astro          # Verified federal track record ($35M+, 12+ bids)
│   │   ├── AgencyLogos.astro          # Defense & civilian agency trust ribbon
│   │   ├── TestimonialCard.astro      # Verbatim client quotes with verified executive roles
│   │   ├── JobBoard.astro             # Filterable career portal with resume application modal
│   │   ├── ContactForm.astro          # Accessible inquiry form with zero-reload feedback
│   │   ├── FloatingContactWidget.astro# Bottom-right quick advisory trigger
│   │   ├── AnimatedCursor.astro       # Subtle, accessible custom desktop cursor
│   │   ├── WaveDivider.astro          # Organic pure-SVG canvas transition dividers
│   │   ├── Icon.astro                 # Ultra-fast inlined SVG icon renderer
│   │   └── aboutIconPaths.json        # Compiled Lucide SVG geometric paths
│   ├── data/
│   │   ├── navigation.ts              # Global header and footer navigation models
│   │   ├── company.ts                 # Verified metrics, corporate address, social URLs
│   │   ├── services.ts                # Deep-dive scope for all 5 core practices
│   │   ├── testimonials.ts            # Authentic client reviews & mission feedback
│   │   ├── blogPosts.ts               # Local fallback publications & guides
│   │   └── jobs.ts                    # Career roles, clearance tiers & labor categories
│   ├── layouts/
│   │   └── MainLayout.astro           # Meta SEO, OpenGraph, JSON-LD Schema.org, global fonts
│   ├── lib/
│   │   └── supabaseClient.ts          # Authenticated Supabase database connection
│   ├── pages/
│   │   ├── index.astro                # Modernized Corporate Homepage
│   │   ├── about-us.astro             # Corporate Overview, Leadership, Standards, Values
│   │   ├── proposal-development-services.astro   # RFP, RFI, Capture & Compliance
│   │   ├── recruitment-services.astro # Cleared Talent & Defense Staffing
│   │   ├── staffing.astro             # Agile Workforce & Federal Augmentation
│   │   ├── information-technology-and-business-consulting.astro # IT Modernization
│   │   ├── customized-support-services.astro     # Bespoke Advisory & Strategy
│   │   ├── career.astro               # Careers index & filterable job board
│   │   ├── career/
│   │   │   └── [id].astro             # Dynamic single job description & application page
│   │   ├── blog/
│   │   │   ├── index.astro            # Insights & intelligence archive
│   │   │   └── [slug].astro           # Dynamic article reader with share CTAs
│   │   ├── contact.astro              # Executive contact, office directions & meetings
│   │   ├── privacy-policy.astro       # 8-section legal privacy policy
│   │   ├── admin/
│   │   │   └── index.astro            # Secure internal dashboard
│   │   └── api/
│   │       ├── contact.ts             # Serverless consultation inquiry endpoint
│   │       ├── careers/               # Job application submission handlers
│   │       └── cron/                  # Scheduled sync tasks
│   └── styles/
│       └── global.css                 # Custom keyframes, typography rules & design tokens
├── astro.config.mjs                   # Astro 5 configuration with Vercel adapter & Sitemap
├── tailwind.config.mjs                # Brand color tokens, shadow elevations & fonts
├── tsconfig.json                      # Strict TypeScript compiler options
└── package.json
```

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | [Astro 5.4](https://astro.build/) | Static site generation (SSG) with serverless API routes |
| **Styling & Design** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first styling with unified design tokens |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety across components, models, and data sets |
| **Database & API** | [Supabase](https://supabase.com/) | Real-time storage for career postings and blog articles |
| **Icons** | Inlined Lucide SVGs | Zero bundle bloat, hardware-accelerated icon rendering |
| **Deployment** | [Vercel](https://vercel.com/) | Edge network delivery with `@astrojs/vercel` adapter |
| **SEO & Structured Data** | Schema.org JSON-LD | Rich search results for Organization, JobPosting & Blog |

---

## 4. Design System & Brand Tokens

The visual design system reflects a premier federal consultancy: calm authority, crisp readability, and deliberate accent placement.

### Primary Color Tokens
| Token | Hex Value | Role & Usage |
|---|---|---|
| `primary-navy` | `#0C487A` | Core brand identity, prominent titles, interactive outlines |
| `deep-navy` | `#0B2553` / `#0A2540` | Authority headlines, primary hero buttons, dominant cards |
| `fed-navy` | `#07192C` | High-contrast dark sections, footer background |
| `brand-red` | `#FF3130` | Precision accent, compass star mark, form required indicators |
| `brand-red-hover` | `#E02625` | Hover transitions for primary accent elements |
| `light-bg` | `#F4F8FC` | Hero canvases, alternating section gradient start |
| `neutral-slate` | `#243A5E` / `#475569` | High-contrast body typography, descriptions |
| `brand-border` | `#E2E8F0` | Structural card borders and subtle dividers |

### Typography
- **Headings & Display**: `Plus Jakarta Sans`, `Outfit` (font weights 700 to 900)
- **Body & Captions**: `Inter`, `Plus Jakarta Sans` (font weights 400 to 600, line-height 1.75 to 1.82)
- **Fluid Sizing**: Built using Tailwind responsive breakpoints (`xs:`, `sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

---

## 5. Site Pages & Routing Map

| Route | Title | Purpose |
|---|---|---|
| `/` | Home | Corporate overview, verified track record, services preview |
| `/about-us` | About Us | Company heritage, leadership standards, core values & metrics |
| `/proposal-development-services` | Proposal Services | RFP/RFI capture, compliance matrices, color team reviews |
| `/recruitment-services` | Cleared Recruitment | Security-cleared talent sourcing (Secret, TS/SCI, Polygraph) |
| `/staffing` | Staffing Solutions | Flexible workforce augmentation, temp-to-perm, prime subcontracts |
| `/information-technology-and-business-consulting` | IT Consulting | Modernization, Cloud, Cybersecurity & Enterprise Architecture |
| `/customized-support-services` | Custom Support | Tailored capture, NDA reviews, advisory roadmaps |
| `/career` | Careers & Jobs | Filterable job board, clearance filters, resume modal |
| `/career/[id]` | Job Detail | Deep-dive job requisitions with direct apply workflow |
| `/blog` | Insights & Intel | Federal contracting publications, guides, and analysis |
| `/blog/[slug]` | Article Reader | Individual publication reader with reading progress & share links |
| `/contact` | Contact Us | Executive advisory contact, office map, HubSpot scheduler |
| `/privacy-policy` | Privacy Policy | Formal 8-section legal and data protection disclosure |

---

## 6. Getting Started & Development

### Prerequisites
- **Node.js**: `v18.20.0` or higher (tested on Node `v20.x` & `v22.x`)
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/unitycompassLLC/-first-Repository.git
cd unity-compass
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Site Configuration
PUBLIC_SITE_URL=https://unitycompass.com
```

### 4. Run Development Server
```bash
pnpm dev
# or
npm run dev
```
Navigate to [http://localhost:4321](http://localhost:4321) to inspect the site.

### 5. Production Build & Verification
```bash
pnpm build
# or
npm run build
```
Generates production-optimized server and static assets into `.vercel/output` and `dist/`.

To preview the build locally:
```bash
pnpm preview
# or
npm run preview
```

---

## 7. Official Company Profile & Verification

- **Legal Entity**: Unity Compass LLC
- **Headquarters**: 2153 Wainwright Ct, Unit 1B, Frederick, MD 21702-6418, USA
- **Phone**: [+1 (800) 979-1514](tel:+18009791514)
- **Direct Federal Inquiries**: [sales@unitycompass.com](mailto:sales@unitycompass.com)
- **General Inquiries**: [info@unitycompass.com](mailto:info@unitycompass.com)
- **Google Maps / Business Profile**: [Unity Compass on Google Maps](https://share.google/DQsOhO1JoMnk4z5Ms)
- **Official Social Channels**:
  - **LinkedIn**: [linkedin.com/company/unity-compass](https://www.linkedin.com/company/unity-compass/)
  - **X (Twitter)**: [x.com/unitycompassllc](https://x.com/unitycompassllc?s=11)
  - **Facebook**: [facebook.com/UnitycompassLLC](https://www.facebook.com/UnitycompassLLC)
  - **Instagram**: [instagram.com/unitycompassllc](https://www.instagram.com/unitycompassllc/)

---

## 8. SEO, Performance & Compliance

- **Google Lighthouse**: Engineered to achieve 95+ scores across Performance, Accessibility, Best Practices, and SEO.
- **Section 508 & WCAG 2.1 AA**: Semantic landmark hierarchy, accessible skip-to-content links, explicit form labels, ARIA controls, and keyboard navigation.
- **Structured Data**: Inlined Schema.org JSON-LD across layouts with `Organization`, `PostalAddress`, `hasMap`, and `sameAs` social validation.
- **Automated Sitemap**: XML sitemap dynamically built on compile via `@astrojs/sitemap`.

---

## 9. License

Copyright © 2026 Unity Compass LLC. All rights reserved.  
Proprietary software. Unauthorized copying, distribution, or deployment without written authorization is prohibited.
