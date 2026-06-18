# PRD — Dulce Café Landing Page

## Original Problem Statement
Build a landing page for "Dulce Café" (Venezuelan-style bakery & pastry shop). Read the brand documentation (Google Maps listing) and provided files (Instagram @dulcecafepty + color palette PDF + logo). Download/recreate several Instagram product images. User priorities: **beauty above all** — visually tremendous, with parallax and preferably 3D. Show menu products and drive customers to WhatsApp. Include testimonials. No backend. Bilingual ES/EN.

## Architecture
- **Stack:** React 19 (CRA + craco) frontend ONLY. No backend, no DB (static marketing site).
- **Libraries:** framer-motion (parallax/reveal), lenis (smooth scroll), three + @react-three/fiber (3D floating coffee beans in hero), tailwindcss, lucide-react, shadcn/ui (available).
- **i18n:** Custom lightweight context (`src/i18n/`) with ES/EN toggle. ES default.
- **Note:** User preferred Astro; environment is React-native so built in React (delivers same parallax + 3D + reliable deploy).

## Brand
- Colors: sage #8A987A, cream #F6EFDE, pale sage #BEC8A1, accent #C49A6C, olive text #2C3425.
- Fonts: Playfair Display (display) + Outfit (body).
- Logo: client circular badge (used in nav + footer). Real contact from Google Maps.

## Contact (real data)
- Address: PH Central Park, Transístmica, Panamá
- Phone/WhatsApp: +507 6745-3546
- Hours: Daily 6:00 a.m. – 10:00 p.m.
- Instagram: @dulcecafepty ; Google rating 4.5★

## Implemented (2026-06-18)
- Sticky glass Navbar with ES/EN toggle, anchor nav, WhatsApp CTA, mobile menu.
- Hero: 2.5D parallax (Framer Motion useScroll) + 3D floating coffee-bean field (R3F), animated headline, stats, floating product cards.
- About/Story: arched image, parallax, 3 feature cards.
- Menu: category tabs (All/Panadería/Pastelería/Salados/Café) with animated filtering; each item has a WhatsApp "order" deep link prefilled with item name.
- Gallery: masonry grid with grain overlay + hover zoom.
- Testimonials: marquee of Google reviews (real: Elvis Coronado, Mitzel Serrano + extras), 4.5★ badge.
- Contact/Footer: dark olive section, address/phone/hours, Instagram, WhatsApp CTA, embedded Google Map, logo.
- Floating WhatsApp button (pulsing).
- Product imagery: AI-generated authentic Venezuelan items (cachitos, pan de jamón, tequeños, golfeados, tres leches, quesillo, etc.) + curated stock photos. (Instagram could not be scraped, so images were recreated to match brand.)

## Backlog
- P1: Add favicon/og-image using the brand logo for social sharing.
- P1: Persist language choice (localStorage) + auto-detect browser language.
- P2: Optional online order form (if user later wants backend).
- P2: Replace placeholder testimonials with more verified Google reviews.

## Next Tasks
- Run testing agent (frontend) to verify nav, language toggle, menu filtering, WhatsApp links, map, responsiveness.
