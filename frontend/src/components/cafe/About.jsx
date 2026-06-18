import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Croissant, Flame, Coffee } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMAGES } from "@/data/menu";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
      className="relative py-24 md:py-32 bg-[#f6efde]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* image */}
        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ y: yImg }}
            className="arch overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3] aspect-[4/5]"
          >
            <img
              src={IMAGES.cafeCozy}
              alt="Interior Dulce Café"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -bottom-6 -right-2 sm:right-6 bg-[#2c3425] text-[#f6efde] rounded-2xl px-6 py-4 shadow-xl"
          >
            <p className="font-display text-3xl leading-none">2024</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#bec8a1] mt-1">
              Central Park · PTY
            </p>
          </motion.div>
        </div>

        {/* text */}
        <div className="lg:col-span-7 lg:pl-6">
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
            className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]"
          >
            {t.about.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 text-lg leading-relaxed text-[#4a5440] max-w-xl"
          >
            {t.about.p1}
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-base leading-relaxed text-[#758269] max-w-xl"
          >
            {t.about.p2}
          </motion.p>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i + 4}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl bg-[#eae2cc]/50 border border-[#d8cdb3] p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8a987a] text-[#f6efde]">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-xl text-[#2c3425]">{f.title}</h3>
                <p className="mt-1.5 text-sm text-[#758269] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
