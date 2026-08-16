import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function NosotrosParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yFrame = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yAccent = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={ref}
      className="lg:col-span-6 order-1 lg:order-2 relative flex items-center justify-center py-10 sm:py-14"
    >
      <motion.div
        style={{ y: yAccent }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute top-6 left-6 w-40 h-40 sm:w-52 sm:h-52 rounded-[2rem] bg-brand-pale-sage/40 border border-brand-border pointer-events-none"
        aria-hidden
      />
      <motion.div
        style={{ y: yFrame }}
        initial={{ opacity: 0, y: 40, rotate: -12, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 -rotate-2 w-full max-w-[340px] sm:max-w-[400px]"
      >
        <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-brand-sage/50 pointer-events-none" aria-hidden />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-[1.6rem] bg-brand-cream p-3.5 sm:p-5 shadow-2xl ring-1 ring-brand-border"
        >
          <div className="overflow-hidden rounded-[1.2rem] aspect-[4/5]">
            <img
              src="/images/foto-equipo-dulce-cafe.png"
              alt="Equipo Dulce Café"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-3.5 flex items-center justify-between gap-2 px-1">
            <p className="font-display text-sm sm:text-base text-brand-olive tracking-wide">
              Dulce Café · 2024
            </p>
            <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: yBadge }}
        initial={{ opacity: 0, y: 24, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="absolute bottom-10 -right-1 sm:right-4 glass-dark text-brand-cream rounded-2xl px-5 py-3.5 z-20"
      >
        <motion.p
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-display text-2xl sm:text-3xl leading-none text-brand-pale-sage"
        >
          ✦
        </motion.p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 mt-1.5">
          Hecho con amor
        </p>
      </motion.div>
    </div>
  );
}