import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { IMAGES } from "@/data/menu";
import CoffeeScene3D from "./CoffeeScene3D";

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -40 : -90]);
  const yCup = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 60 : 160]);
  const yFloat = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 90 : 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden flex items-center pt-24 pb-12 sm:pt-28"
    >
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 8%, #eae2cc 0%, #f6efde 45%, #f6efde 100%)",
        }}
      />
      <div className="absolute -top-24 -left-24 -z-10 h-[340px] w-[340px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#bec8a1]/45 blur-[90px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] rounded-full bg-[#8a987a]/25 blur-[100px]" />

      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-60">
        <CoffeeScene3D count={isMobile ? 9 : 13} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* TEXT */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7 order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8cdb3] bg-[#f6efde]/70 backdrop-blur px-3.5 py-2 text-xs sm:text-sm font-medium text-[#6c7a5d]"
          >
            <Sparkles size={14} className="text-[#8a987a]" />
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-5 sm:mt-6 font-display text-[#2c3425] text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-8xl tracking-tight">
            <Reveal delay={0.3}>{t.hero.titleA}</Reveal>
            <Reveal delay={0.45}>
              <span className="italic text-[#8a987a]">{t.hero.titleB}</span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-[#4a5440]"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#menu"
              data-testid="hero-menu-cta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2c3425] px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#4a5440] transition-colors"
            >
              {t.hero.ctaMenu}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink(
                lang === "es"
                  ? "¡Hola Dulce Café! Quisiera hacer un pedido 🥐"
                  : "Hello Dulce Café! I'd like to place an order 🥐"
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-6 py-3.5 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
            >
              <MessageCircle size={18} />
              {t.hero.ctaOrder}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-9 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-md"
          >
            <Stat value="4.5" icon={<Star size={15} className="fill-[#8a987a] text-[#8a987a]" />} label={t.hero.stat1} />
            <Stat value="100%" label={t.hero.stat2} />
            <Stat value="🇻🇪" label={t.hero.stat3} />
          </motion.div>
        </motion.div>

        {/* IMAGERY */}
        <div className="lg:col-span-5 order-2">
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-md lg:max-w-none h-[400px] sm:h-[480px] lg:h-[600px]">
            <motion.div
              style={{ y: yCup }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 w-[74%] aspect-[3/4] rounded-[1.8rem] overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3]"
            >
              <img src={IMAGES.coffeeCup} alt="Café Dulce Café" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              style={{ y: yFloat }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute left-0 bottom-4 w-28 sm:w-36 lg:w-44 aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#d8cdb3] -rotate-6"
            >
              <img src={IMAGES.golfeados} alt="Golfeados" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="absolute left-1 top-6 flex items-center gap-2.5 rounded-2xl bg-[#f6efde]/90 backdrop-blur px-3 py-2.5 shadow-lg ring-1 ring-[#d8cdb3]"
            >
              <span className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-[#d8cdb3] shrink-0">
                <img src={IMAGES.cachitos} alt="" className="h-full w-full object-cover" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base sm:text-lg text-[#2c3425]">Cachitos</p>
                <p className="text-[10px] sm:text-[11px] text-[#758269]">
                  {lang === "es" ? "Recién horneados" : "Fresh baked"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        style={{ opacity }}
        className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#758269]"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">{t.hero.scroll}</span>
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

function Stat({ value, label, icon }) {
  return (
    <div className="rounded-2xl bg-[#eae2cc]/45 border border-[#d8cdb3] px-2.5 py-3 text-center">
      <p className="flex items-center justify-center gap-1 font-display text-2xl sm:text-3xl text-[#2c3425]">
        {value}
        {icon}
      </p>
      <p className="text-[10px] sm:text-xs text-[#758269] mt-1 leading-tight">{label}</p>
    </div>
  );
}
