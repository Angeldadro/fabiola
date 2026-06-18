import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { GALLERY } from "@/data/menu";
import { ParallaxBlob } from "./Parallax";

// curated, capped sample set (no endless grid)
const TILES = GALLERY.slice(0, 6);

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
];

export default function Gallery() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // interspersed parallax (image drifts inside its frame, alternating direction)
  const up = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const down = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="relative py-16 sm:py-20 md:py-28 bg-[#f6efde] overflow-hidden"
    >
      <div className="tex-paper" aria-hidden />
      <ParallaxBlob className="top-1/3 -right-24 -z-0" color="#bec8a1" size={380} blur={120} opacity={0.4} speed={-80} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
            — {t.gallery.overline}
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4a5440]">{t.gallery.subtitle}</p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[210px] gap-2.5 sm:gap-4 grid-flow-dense"
        >
          {TILES.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07 }}
              data-testid={`gallery-item-${i}`}
              className={`grain relative overflow-hidden rounded-2xl ring-1 ring-[#d8cdb3] group ${SPANS[i % SPANS.length]}`}
            >
              <motion.img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                style={{ y: i % 2 === 0 ? up : down }}
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="absolute -inset-x-0 -top-[14%] h-[128%] w-full object-cover"
              />
              <div className="absolute inset-0 z-[2] bg-[#2c3425]/0 group-hover:bg-[#2c3425]/15 transition-colors duration-500" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
