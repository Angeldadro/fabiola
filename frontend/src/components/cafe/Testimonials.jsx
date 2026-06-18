import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { REVIEWS } from "@/data/menu";

function Card({ r, lang }) {
  return (
    <figure className="w-[270px] sm:w-[340px] shrink-0 rounded-3xl bg-[#f6efde] border border-[#d8cdb3] p-6 sm:p-7 mx-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <Quote className="text-[#bec8a1]" size={26} />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < r.rating ? "fill-[#8a987a] text-[#8a987a]" : "text-[#d8cdb3]"}
            />
          ))}
        </div>
      </div>
      <blockquote className="mt-3 sm:mt-4 font-display text-lg sm:text-xl leading-snug text-[#2c3425]">
        “{r[lang]}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#8a987a] text-[#f6efde] font-display text-lg">
          {r.name.charAt(0)}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-[#2c3425]">{r.name}</p>
          <p className="text-[11px] text-[#758269]">{r.source}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { t, lang } = useLang();
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="opiniones"
      data-testid="reviews-section"
      className="relative py-16 sm:py-20 md:py-28 bg-[#eae2cc]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]"
        >
          — {t.reviews.overline}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight"
        >
          {t.reviews.title}
        </motion.h2>
        <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-full bg-[#f6efde] border border-[#d8cdb3] px-4 py-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-[#8a987a] text-[#8a987a]" />
            ))}
          </div>
          <span className="text-sm font-medium text-[#4a5440]">{t.reviews.subtitle}</span>
        </div>
      </div>

      <div className="marquee-pause mt-10 sm:mt-14 flex w-max animate-marquee" style={{ "--marquee-duration": "46s" }}>
        {loop.map((r, i) => (
          <Card key={i} r={r} lang={lang} />
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 left-0 h-full w-12 sm:w-24 bg-gradient-to-r from-[#eef0e4] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 sm:w-24 bg-gradient-to-l from-[#eef0e4] to-transparent" />
    </section>
  );
}
