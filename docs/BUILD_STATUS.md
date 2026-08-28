# 📋 Portfolio Build Status & Roadmap

> **Project:** portfolio-reyhan  
> **Owner:** Reyhan Albar Fahryan  
> **Live URL:** [portfolio-reyhan-two.vercel.app](https://portfolio-reyhan-two.vercel.app/)  
> **Repository:** [github.com/Reyyy-05/portfolio-reyhan](https://github.com/Reyyy-05/portfolio-reyhan)  
> **Last Updated:** August 2026

---

## 1. Design Concept Summary

| Aspect | Detail |
|--------|--------|
| **Concept** | Build Log × Editorial Portfolio |
| **Visual Direction** | Inspired by Framer-style editorial portfolios (Majd reference) — large typography, premium spacing, rounded cards, clean section transitions |
| **Tone** | Calm, precise, technical-but-warm, premium |
| **Identity** | Reyhan Albar Fahryan — Informatics Student & Digital Product Builder |
| **Focus Areas** | Full-stack web, mobile app, data-oriented systems, digital product prototyping |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro | ^6.4.7 |
| Styling | Tailwind CSS | ^4.3.1 |
| Language | TypeScript | — |
| PostCSS | postcss | ^8.5.15 |
| Hosting | Vercel | — |
| VCS | GitHub | — |

---

## 3. Current Architecture

### File Structure

```
portfolio-reyhan/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── profilpicture.jpeg
├── src/
│   ├── components/         # 12 Astro components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── ProjectCard.astro
│   │   ├── Experience.astro
│   │   ├── Capabilities.astro
│   │   ├── Timeline.astro
│   │   ├── BuildNotes.astro
│   │   ├── ResumeCTA.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/               # Static content data
│   │   ├── projects.ts     # 4 featured + 6 other projects
│   │   ├── experience.ts   # 5 experiences + 5 timeline milestones
│   │   └── skills.ts       # 6 skill groups
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro     # Single-page portfolio
│   └── styles/
│       └── global.css       # Design system + animations
├── docs/
│   └── BUILD_STATUS.md      # ← This file
├── package.json
├── astro.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

### Page Section Order

```
Navbar → Hero → About → Projects → Experience → Capabilities → Timeline → BuildNotes → ResumeCTA → Contact → Footer
```

---

## 4. What Has Been Built ✅

### Phase 1: Initial Build
- [x] Project scaffolding with Astro + TypeScript + Tailwind CSS v4
- [x] Custom dark design system (colors, fonts, spacing tokens in `global.css`)
- [x] Base layout with SEO meta tags (`BaseLayout.astro`)
- [x] Responsive Navbar with mobile hamburger menu
- [x] Hero section with Project Operating Board concept
- [x] About section with positioning copy
- [x] Projects section with featured/secondary hierarchy
- [x] ProjectCard component with CSS-only mockups (browser, phone, data grid)
- [x] Experience section
- [x] Capabilities section (skill groups)
- [x] Timeline section (milestone progression)
- [x] BuildNotes section
- [x] ResumeCTA section
- [x] Contact section with email + GitHub links
- [x] Footer with navigation directory
- [x] Scroll reveal animations (IntersectionObserver)
- [x] Deployment to Vercel (CI/CD via GitHub)
- [x] Professional README.md

### Phase 2: Editorial Redesign (Majd Reference Alignment)
- [x] Asymmetric 3-column Hero layout (Bio | Portrait | Operating Board)
- [x] Profile picture integration (`profilpicture.jpeg`) with premium card frame
- [x] Large editorial typography (`font-editorial-heading`, tight tracking)
- [x] Horizontal capabilities list with row hover states
- [x] Decoupled project mockup from metadata/CTA for editorial clarity
- [x] Split-layout Contact section with GitHub + Email quick-cards
- [x] Giant low-contrast "REYHAN" text in footer background
- [x] Premium card system (`editorial-card`, teal/blue glow effects)
- [x] Running meta ticker strip below hero
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Custom scrollbar styling

### Phase 3: Placeholder Cleanups
- [x] Real email address set (`rayhanalbar75@gmail.com`)
- [x] LinkedIn links hidden (not available)
- [x] Resume CTA redirected to `#contact` (PDF not yet available)
- [x] Build verified (`npm run build` — success)

---

## 5. What's Missing / Needs Development 🔧

### Priority 1 — Essential for Production Portfolio

| # | Task | Details | Effort |
|---|------|---------|--------|
| 1 | **Preview Screenshot** | Generate or capture a screenshot and save as `public/preview.png` for README display and social sharing (OG image) | 🟢 Quick |
| 2 | **Resume PDF** | Create and place `public/cv-reyhan.pdf`, then update `ResumeCTA.astro` to link directly to `/cv-reyhan.pdf` instead of `#contact` | 🟢 Quick |
| 3 | **OG / Social Meta Tags** | Add Open Graph and Twitter Card meta tags in `BaseLayout.astro` for proper link previews on social media, WhatsApp, etc. | 🟢 Quick |
| 4 | **Favicon Update** | Replace default Astro favicon with a custom personal branding favicon (SVG or PNG) | 🟢 Quick |
| 5 | **LinkedIn Integration** | Once a LinkedIn profile is set up, unhide LinkedIn links in Contact and Footer | 🟢 Quick |
| 6 | **404 Page** | Create `src/pages/404.astro` with a styled "Page Not Found" design consistent with the portfolio theme | 🟡 Medium |
| 7 | **Accessibility Audit** | Verify proper aria labels, heading hierarchy, color contrast ratios, keyboard navigation on all interactive elements | 🟡 Medium |
| 8 | **Performance Optimization** | Optimize profile image (WebP conversion), lazy-load below-fold images, check Lighthouse scores | 🟡 Medium |

### Priority 2 — Feature Enhancements

| # | Task | Details | Effort |
|---|------|---------|--------|
| 9 | **Individual Project Pages** | Create dynamic routes (`src/pages/projects/[slug].astro`) for detailed project case studies with full descriptions, screenshots, architecture diagrams | 🔴 Large |
| 10 | **Blog / Writing Section** | Add a blog using Astro Content Collections (`src/content/blog/`) for technical articles, build logs, and learning notes | 🔴 Large |
| 11 | **Contact Form** | Replace mailto link with a working contact form using Formspree, Resend, or Netlify Forms | 🟡 Medium |
| 12 | **Project Screenshots / Images** | Add real screenshots or mockup images to project cards (currently using CSS-only mockups) | 🟡 Medium |
| 13 | **Dark/Light Mode Toggle** | Add a theme switcher with localStorage persistence, since the portfolio is currently dark-mode only | 🟡 Medium |
| 14 | **Smooth Page Transitions** | Add ViewTransitions API or animated page transitions between routes (when individual pages exist) | 🟡 Medium |
| 15 | **Analytics Integration** | Add Vercel Analytics, Google Analytics, or Umami for visitor tracking | 🟢 Quick |

### Priority 3 — Polish & Advanced Features

| # | Task | Details | Effort |
|---|------|---------|--------|
| 16 | **Multi-language Support** | Add English/Indonesian toggle for content (currently mixed language) | 🔴 Large |
| 17 | **Testimonials / Endorsements** | Add a testimonials section with quotes from collaborators or supervisors | 🟡 Medium |
| 18 | **Interactive Skill Visualization** | Replace static skill lists with interactive charts, radar graphs, or animated skill bars | 🟡 Medium |
| 19 | **GitHub Activity Feed** | Fetch and display recent GitHub commits or contributions dynamically | 🟡 Medium |
| 20 | **Sitemap & robots.txt** | Add sitemap generation and robots.txt for search engine indexing | 🟢 Quick |
| 21 | **Structured Data (JSON-LD)** | Add schema.org Person/Portfolio markup for enhanced SEO | 🟢 Quick |
| 22 | **Loading / Splash Animation** | Add a branded loading screen or skeleton animation on first visit | 🟡 Medium |
| 23 | **Cursor / Scroll Effects** | Add premium micro-interactions (custom cursor, parallax scrolling, magnetic hover) | 🟡 Medium |
| 24 | **Custom Domain** | Set up a custom domain (e.g., `reyhan.dev` or similar) on Vercel | 🟢 Quick |

---

## 6. Known Issues & Technical Debt

| Issue | Description | Status |
|-------|-------------|--------|
| Mixed language content | Some sections use Indonesian, others English — needs a consistent language strategy | ⚠️ Open |
| Resume CTA fallback | Currently points to `#contact` because `cv-reyhan.pdf` doesn't exist yet | ⚠️ Open |
| No preview.png | README references `public/preview.png` but the file doesn't exist | ⚠️ Open |
| Default Astro favicon | Using the default Astro favicon instead of personal branding | ⚠️ Open |
| No individual project detail pages | All project info is on a single page — no deep-link routes for case studies | ℹ️ Enhancement |
| CSS-only project mockups | Project cards use CSS shapes instead of real screenshots | ℹ️ Enhancement |

---

## 7. Design System Reference

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0A0B0D` | Page background |
| `--color-bg-alt` | `#0F1115` | Alternate section bg |
| `--color-surface` | `#15171C` | Card backgrounds |
| `--color-surface-hover` | `#1B1E24` | Card hover state |
| `--color-border` | `#232730` | Default borders |
| `--color-border-strong` | `#2E333D` | Emphasized borders |
| `--color-text` | `#F2F3F5` | Primary text |
| `--color-text-muted` | `#B8BCC4` | Secondary text |
| `--color-text-dim` | `#6B7078` | Tertiary / labels |
| `--color-accent` | `#5EEAD4` | Primary accent (teal) |
| `--color-accent-secondary` | `#7C9CFF` | Secondary accent (blue) |
| `--color-success` | `#4ADE80` | Status: production |

### Typography

| Token | Font Stack |
|-------|-----------|
| `--font-sans` | Inter, system UI |
| `--font-display` | Inter Tight, Inter |
| `--font-mono` | JetBrains Mono, Geist Mono |

### Animations

| Class | Effect |
|-------|--------|
| `.reveal` + `.visible` | Scroll-triggered fade-up (IntersectionObserver) |
| `.animate-float` | Subtle floating (6s loop) |
| `.animate-float-delayed` | Floating with 1.5s delay |
| `.animate-float-slow` | Slow floating (8s loop) |
| `.animate-pulse-dot` | Status dot pulse |
| `.editorial-card:hover` | Lift + border transition |
| `.card-teal-glow:hover` | Teal box-shadow glow |
| `.card-blue-glow:hover` | Blue box-shadow glow |

---

## 8. Recommended Next Steps (Quick Wins)

If you want to move the portfolio closer to "production-ready" quickly, start with these:

1. **📸 Screenshot** — Visit the live site, take a full-page screenshot, save as `public/preview.png`
2. **📄 Resume PDF** — Export CV as PDF, save as `public/cv-reyhan.pdf`, update `ResumeCTA.astro`
3. **🔗 OG Tags** — Add `og:image`, `og:title`, `og:description` meta tags in `BaseLayout.astro`
4. **🎨 Favicon** — Design a minimal personal favicon, replace `favicon.svg`
5. **📊 Analytics** — Add Vercel Analytics (one-line config change)

These five tasks can be completed in under 2 hours and will dramatically improve the portfolio's professional presence.

---

## 9. Deployment Checklist

Before each push to production:

- [ ] `npm run build` passes without errors
- [ ] All placeholder content is replaced with real data
- [ ] Links (GitHub repos, email, social) are correct and working
- [ ] Mobile layout renders correctly (test at 375px, 768px, 1024px)
- [ ] Lighthouse audit score ≥ 90 on Performance, Accessibility, SEO
- [ ] OG meta tags generate correct social previews

---

*This document serves as the single source of truth for the portfolio's build progress. Update it as features are completed or new requirements emerge.*
