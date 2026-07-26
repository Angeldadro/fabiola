# communication
- Communicate in Spanish. Confidence: 0.85

# architecture
- Prefer lean architectures — drop unused dependencies, dead code, and disconnected backends. Confidence: 0.80
- Preserve visual design/aesthetic during migrations, improving progressively rather than perfect one-shot rewrites. Confidence: 0.70

# astro
- Use Astro for the Dulce Café site migration from CRA. Confidence: 0.70
- Centralize shared client-side DOM behavior (IntersectionObserver, class toggling) in BaseLayout with astro:after-swap — avoid duplicating scripts across components when using View Transitions, as duplicate observers conflict during crossfade DOM coexistence. Confidence: 0.75

# ui
- Avoid hero parallax/fade effects — keep hero sections simple and static. Confidence: 0.85
- Prefer actual media assets (videos, GIFs, images) for dynamic backgrounds over programmatic CSS particle systems — CSS particles are perceived as low-quality. Confidence: 0.75
- Use GSAP (not Framer Motion) for scroll-driven fade/opacity animations — avoid requestAnimationFrame + getBoundingClientRect workarounds. Confidence: 0.75

# astro
- Use Astro for the Dulce Café site migration from CRA. Confidence: 0.70
- Centralize shared client-side DOM behavior (IntersectionObserver, class toggling) in BaseLayout with astro:after-swap — avoid duplicating scripts across components when using View Transitions, as duplicate observers conflict during crossfade DOM coexistence. Confidence: 0.75
- For sharing reactive state across Astro islands, use an event-based system (CustomEvent + window.dispatchEvent) instead of React Context — each client:load island is an independent React root and contexts don't cross island boundaries. Confidence: 0.70

# npm
- Resolve npm peer dependency conflicts by aligning package versions instead of using --legacy-peer-deps or --force. Confidence: 0.65

# assets
- Optimize all images to WebP format. Confidence: 0.70
- Download remote/hotlinked images into public/ to self-host locally. Confidence: 0.70
