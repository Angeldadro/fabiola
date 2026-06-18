import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { GALLERY } from "@/data/menu";

// explicit spans -> tight packing, zero dead space (grid-flow-dense)
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
];

export default function Gallery() {
  const { t } = useLang();

  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="relative py-16 sm:py-20 md:py-28 bg-[#f6efde]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
            — {t.gallery.overline}
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4a5440]">{t.gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[200px] gap-2.5 sm:gap-4 grid-flow-dense">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
              data-testid={`gallery-item-${i}`}
              className={`grain relative overflow-hidden rounded-2xl ring-1 ring-[#d8cdb3] group ${SPANS[i % SPANS.length]}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 z-[2] bg-[#2c3425]/0 group-hover:bg-[#2c3425]/15 transition-colors duration-500" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
