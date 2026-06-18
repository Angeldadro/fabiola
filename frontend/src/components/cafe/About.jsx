import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Croissant, Flame, Coffee } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMAGES } from "@/data/menu";
import { ParallaxBlob } from "./Parallax";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const features = [
    { icon: Croissant, title: t.about.f1Title, desc: t.about.f1Desc },
    { icon: Flame, title: t.about.f2Title, desc: t.about.f2Desc },
    { icon: Coffee, title: t.about.f3Title, desc: t.about.f3Desc },
  ];

  return (
    <section
      id="historia"
      data-testid="about-section"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-28 bg-[#f6efde] overflow-hidden"
    >
      <div className="tex-paper" aria-hidden />
      <ParallaxBlob className="top-10 -left-24 -z-0" color="#bec8a1" size={360} blur={120} opacity={0.4} speed={80} />
      <ParallaxBlob className="-bottom-16 right-0 -z-0" color="#8a987a" size={300} blur={120} opacity={0.18} speed={-60} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* IMAGE */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <motion.div
            style={{ y: yImg }}
            className="arch overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3] aspect-[4/5] max-w-sm mx-auto lg:max-w-none"
          >
            <img src={IMAGES.cafeCozy} alt="Interior Dulce Café" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -bottom-5 right-4 sm:right-10 lg:right-2 glass-dark text-[#f6efde] rounded-2xl px-5 py-3.5"
          >
            <p className="font-display text-2xl sm:text-3xl leading-none">2024</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#bec8a1] mt-1">
              Central Park · PTY
            </p>
          </motion.div>
        </div>

        {/* TEXT */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]"
          >
            — {t.about.overline}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]"
          >
            {t.about.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#4a5440] max-w-xl"
          >
            {t.about.p1}
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#758269] max-w-xl"
          >
            {t.about.p2}
          </motion.p>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i + 4}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="flex sm:flex-col items-center sm:items-start gap-4 rounded-2xl paper p-4 sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8a987a] text-[#f6efde]">
                  <f.icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-[#2c3425]">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#758269] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
