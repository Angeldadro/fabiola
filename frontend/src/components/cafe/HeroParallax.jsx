import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IMAGES } from "../../data/menu";
import CoffeeScene3D from "./CoffeeScene3D.jsx";

function Reveal({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroParallax({ t }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track scroll relative to the FULL hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text: fades out and moves up as hero scrolls out (clamped to prevent rebound)
  const yText = useTransform(scrollYProgress, [0, 0.8], [0, isMobile ? -60 : -130], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true });

  // Images: parallax at different speeds (coffee cup moves more than golfeados)
  const yCup = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 180], { clamp: true });
  const yFloat = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 110 : 240], { clamp: true });

  // Scroll indicator fades on first scroll
  const scrollDots = useTransform(scrollYProgress, [0, 0.2], [1, 0], { clamp: true });

  const orderHref = `https://wa.me/50767453546?text=${encodeURIComponent("¡Hola Dulce Café! Quisiera hacer un pedido 🥐")}`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex items-center pt-24 pb-12 sm:pt-28"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 8%, #eae2cc 0%, #f6efde 45%, #f6efde 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 -z-10 rounded-full float-blob" style={{ width: "460px", height: "460px", background: "#bec8a1", filter: "blur(90px)", opacity: 0.45 }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 -z-10 rounded-full float-blob" style={{ width: "380px", height: "380px", background: "#8a987a", filter: "blur(100px)", opacity: 0.25 }} />

      {/* 3D decorative background */}
      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-60 pointer-events-none">
        <CoffeeScene3D count={13} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* TEXT COLUMN — fades + moves on scroll */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7 order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#d8cdb3] bg-[#f6efde]/70 backdrop-blur px-3.5 py-2 text-xs sm:text-sm font-medium text-[#6c7a5d]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#8a987a]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span data-lang="es">{t.hero.badge}</span>
            <span data-lang="en">Since 2024 · PH Central Park, Panama</span>
          </motion.span>

          <h1 className="mt-5 sm:mt-6 font-display text-[#2c3425] text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-8xl tracking-tight">
            <Reveal delay={0.3}>
              <span data-lang="es">{t.hero.titleA}</span>
              <span data-lang="en">The authentic taste</span>
            </Reveal>
            <Reveal delay={0.45}>
              <span className="italic text-[#8a987a]">
                <span data-lang="es">{t.hero.titleB}</span>
                <span data-lang="en">of Venezuela</span>
              </span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-[#4a5440]"
          >
            <span data-lang="es">{t.hero.subtitle}</span>
            <span data-lang="en">Artisanal bakery &amp; pastry shop, baked fresh every day. Crusty bread, irresistible sweets and the best coffee on Transístmica.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3"
          >
            <a href="/menu" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2c3425] px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#4a5440] transition-colors">
              <span data-lang="es">{t.hero.ctaMenu}</span>
              <span data-lang="en">Explore the menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <a href={orderHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-6 py-3.5 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <span data-lang="es">{t.hero.ctaOrder}</span>
              <span data-lang="en">Order on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-9 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-md"
          >
            <Stat value="4.5" label={t.hero.stat1} labelEn="Google rating" />
            <Stat value="100%" label={t.hero.stat2} labelEn="Baked fresh" />
            <Stat value="🇻🇪" label={t.hero.stat3} labelEn="Taste of home" />
          </motion.div>
        </motion.div>

        {/* IMAGES COLUMN — parallax at different speeds */}
        <div className="lg:col-span-5 order-2">
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-md lg:max-w-none h-[400px] sm:h-[480px] lg:h-[600px]">
            {/* Main coffee cup — scrolls down faster */}
            <motion.div
              style={{ y: yCup }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 w-[74%] aspect-[3/4] rounded-[1.8rem] overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3]"
            >
              <img src={IMAGES.coffeeCup} alt="Café Dulce Café" className="h-full w-full object-cover" />
            </motion.div>

            {/* Golfeados — scrolls down slower */}
            <motion.div
              style={{ y: yFloat }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute left-0 bottom-4 w-28 sm:w-36 lg:w-44 aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#d8cdb3] -rotate-6"
            >
              <img src={IMAGES.golfeados} alt="Golfeados" className="h-full w-full object-cover" />
            </motion.div>

            {/* Cachitos badge — static */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="absolute left-1 top-6 flex items-center gap-2.5 rounded-2xl glass px-3 py-2.5"
            >
              <span className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-[#d8cdb3] shrink-0">
                <img src={IMAGES.cachitos} alt="" className="h-full w-full object-cover" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base sm:text-lg text-[#2c3425]">Cachitos</p>
                <p className="text-[10px] sm:text-[11px] text-[#758269]">
                  <span data-lang="es">Recién horneados</span>
                  <span data-lang="en">Fresh baked</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollDots }}
        className="hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#758269]"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">
          <span data-lang="es">{t.hero.scroll}</span>
          <span data-lang="en">Scroll to discover</span>
        </span>
        <span className="h-9 w-5 rounded-full border border-[#8a987a] flex justify-center pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-[#8a987a]"
          />
        </span>
      </motion.div>
    </section>
  );
}

function Stat({ value, label, labelEn }) {
  return (
    <div className="rounded-2xl glass px-2.5 py-3 text-center">
      <p className="flex items-center justify-center gap-1 font-display text-2xl sm:text-3xl text-[#2c3425]">{value}</p>
      <p className="text-[10px] sm:text-xs text-[#758269] mt-1 leading-tight">
        <span data-lang="es">{label}</span>
        <span data-lang="en">{labelEn}</span>
      </p>
    </div>
  );
}
