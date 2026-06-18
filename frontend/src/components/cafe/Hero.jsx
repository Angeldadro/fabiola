import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { IMAGES } from "@/data/menu";
import CoffeeScene3D from "./CoffeeScene3D";

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yCup = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden flex items-center"
    >
      {/* layered backgrounds */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 10%, #eae2cc 0%, #f6efde 45%, #f6efde 100%)",
        }}
      />
      <motion.div
        style={{ y: yBg }}
        className="absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[#bec8a1]/40 blur-[90px]"
      />
      <motion.div
        style={{ y: yBg }}
        className="absolute bottom-0 right-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-[#8a987a]/25 blur-[100px]"
      />

      {/* 3D floating coffee beans */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <CoffeeScene3D />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 w-full grid lg:grid-cols-12 gap-10 items-center pt-28 pb-16">
        {/* text */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8cdb3] bg-[#f6efde]/70 backdrop-blur px-4 py-2 text-xs sm:text-sm font-medium text-[#6c7a5d]"
          >
            <Sparkles size={14} className="text-[#c49a6c]" />
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-6 font-display text-[#2c3425] text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
            <Reveal delay={0.3}>{t.hero.titleA}</Reveal>
            <Reveal delay={0.45}>
              <span className="italic text-[#8a987a]">{t.hero.titleB}</span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-[#4a5440]"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#menu"
              data-testid="hero-menu-cta"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2c3425] px-7 py-4 text-sm font-medium text-[#f6efde] hover:bg-[#4a5440] transition-colors"
            >
              {t.hero.ctaMenu}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
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
              className="inline-flex items-center gap-2 rounded-full border border-[#8a987a] px-7 py-4 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
            >
              <MessageCircle size={18} />
              {t.hero.ctaOrder}
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            <Stat value="4.5" extra={<Star size={16} className="fill-[#c49a6c] text-[#c49a6c]" />} label={t.hero.stat1} />
            <span className="w-px bg-[#d8cdb3] self-stretch" />
            <Stat value="100%" label={t.hero.stat2} />
            <span className="w-px bg-[#d8cdb3] self-stretch" />
            <Stat value="🇻🇪" label={t.hero.stat3} />
          </motion.div>
        </motion.div>

        {/* foreground imagery */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] lg:h-[600px]">
          <motion.div
            style={{ y: yCup }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-4 w-[78%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3]"
          >
            <img
              src={IMAGES.coffeeCup}
              alt="Café Dulce Café"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: yFloat1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute left-0 bottom-2 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#d8cdb3] rotate-[-6deg]"
          >
            <img src={IMAGES.golfeados} alt="Golfeados" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{ y: yFloat2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="absolute left-6 top-0 hidden sm:flex items-center gap-3 rounded-2xl bg-[#f6efde]/85 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-[#d8cdb3]"
          >
            <span className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-[#d8cdb3]">
              <img src={IMAGES.cachitos} alt="" className="h-full w-full object-cover" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[#2c3425] text-lg">Cachitos</p>
              <p className="text-[11px] text-[#758269]">Recién horneados</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#758269]"
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
    <span className="block overflow-hidden">
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

function Stat({ value, label, extra }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-display text-3xl text-[#2c3425]">
        {value}
        {extra}
      </p>
      <p className="text-xs text-[#758269] mt-1 max-w-[90px] leading-tight">{label}</p>
    </div>
  );
}
