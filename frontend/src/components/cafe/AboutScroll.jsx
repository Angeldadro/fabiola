import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const FEATURE_ICONS = {
  croissant:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  flame:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  coffee:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>',
};

export default function AboutScroll({ t, features, images }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Image exits left (0 → 0.35)
  const imgX = useTransform(scrollYProgress, [0, 0.35], ["0%", "-120%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Scene 2: Text shifts left (0.3 → 0.65)
  const textX = useTransform(scrollYProgress, [0.3, 0.65], ["0%", "-72%"]);

  // Scene 3: chica slides in from right (0.55 → 0.75)
  const chicaX = useTransform(scrollYProgress, [0.55, 0.75], ["120%", "0%"]);

  return (
    <section
      ref={sectionRef}
      id="historia"
      data-testid="about-section"
      class="relative bg-brand-cream"
      style={{ height: isMobile ? "auto" : "300vh" }}
    >
      {isMobile ? (
        /* Mobile: static stacked layout */
        <div class="relative py-16 sm:py-20 md:py-28 bg-brand-cream overflow-hidden">
          <div class="tex-paper absolute inset-0" aria-hidden />
          <div className="absolute top-10 -left-24 w-[360px] h-[360px] rounded-full bg-[#bec8a1]/40 blur-[120px] pointer-events-none" aria-hidden />
          <div className="absolute -bottom-16 right-0 w-[300px] h-[300px] rounded-full bg-[#8a987a]/18 blur-[120px] pointer-events-none" aria-hidden />

          <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <RenderText t={t} features={features} />
            <div class="overflow-hidden shadow-2xl ring-1 ring-brand-border aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-[1.8rem]">
              <img src="/images/dulcecafeadentro.jpeg" alt="Dulce Café" class="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ) : (
        /* Desktop: sticky scroll sequence */
        <div class="sticky top-0 h-screen overflow-hidden bg-brand-cream">
          <div class="tex-paper absolute inset-0" aria-hidden />
          <div className="absolute top-10 -left-24 w-[360px] h-[360px] rounded-full bg-[#bec8a1]/40 blur-[120px] pointer-events-none" aria-hidden />
          <div className="absolute -bottom-16 right-0 w-[300px] h-[300px] rounded-full bg-[#8a987a]/18 blur-[120px] pointer-events-none" aria-hidden />

          <div class="relative z-10 h-full flex items-center max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
            <div class="relative w-full" style={{ height: "70vh" }}>
              {/* Image — exits left */}
              <motion.div
                style={{ x: imgX, y: "-50%", opacity: imgOpacity }}
                class="absolute left-0 top-1/2 w-[42%]"
              >
                <div class="overflow-hidden shadow-2xl ring-1 ring-brand-border aspect-[4/5] rounded-[1.8rem]">
                  <img src="/images/dulcecafeadentro.jpeg" alt="Dulce Café" class="h-full w-full object-cover" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  class="absolute -bottom-5 right-4 glass-dark text-brand-cream rounded-2xl px-5 py-3.5"
                >
                  <p class="font-display text-2xl sm:text-3xl leading-none">2024</p>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-brand-pale-sage mt-1">Central Park · PTY</p>
                </motion.div>
              </motion.div>

              {/* Text — shifts left */}
              <motion.div
                style={{ x: textX, y: "-50%" }}
                class="absolute left-[42%] top-1/2 w-[58%] pl-8"
              >
                <RenderText t={t} features={features} />
              </motion.div>

              {/* foto del equipo — enters from right, centered in its container */}
              <motion.div
                style={{ x: chicaX, y: "-50%" }}
                class="absolute right-0 top-1/2 w-[42%] flex items-center justify-center"
              >
                <div class="overflow-hidden shadow-2xl ring-1 ring-brand-border aspect-[4/5] max-w-sm w-full rounded-[1.8rem]">
                  <img src="/images/foto-equipo-dulce-cafe.png" alt="Equipo Dulce Café" class="h-full w-full object-cover" />
                </div>
                <div class="absolute -bottom-5 left-4 glass-dark text-brand-cream rounded-2xl px-5 py-3.5">
                  <p class="font-display text-2xl sm:text-3xl leading-none">+500</p>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-brand-pale-sage mt-1">Clientes Felices</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function RenderText({ t, features }) {
  return (
    <>
      <span class="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-brand-sage">
        — {t.about.overline}
      </span>
      <h2 class="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-brand-olive tracking-tight leading-[1.05]">
        {t.about.title}
      </h2>
      <p class="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-brand-olive-2 max-w-xl">
        {t.about.p1}
      </p>
      <p class="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-brand-muted max-w-xl">
        {t.about.p2}
      </p>
      <div class="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {features.map((f, i) => (
          <div class="flex sm:flex-col items-center sm:items-start gap-4 rounded-2xl p-4 sm:p-5 bg-white/60 backdrop-blur border border-[#e5dcc8] hover:-translate-y-1 transition-transform">
            <span
              class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8a987a] text-[#f6efde]"
              dangerouslySetInnerHTML={{ __html: FEATURE_ICONS[f.icon] }}
            />
            <div>
              <h3 class="font-display text-lg sm:text-xl text-[#2c3425]">{f.title}</h3>
              <p class="mt-1 text-sm text-[#8a8a7a] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
