import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { GALLERY } from "@/data/menu";

export default function Gallery() {
  const { t } = useLang();

  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="relative py-24 md:py-32 bg-[#f6efde]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="max-w-2xl mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
            — {t.gallery.overline}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]">
            {t.gallery.title}
          </h2>
          <p className="mt-5 text-lg text-[#4a5440]">{t.gallery.subtitle}</p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              data-testid={`gallery-item-${i}`}
              className="grain relative overflow-hidden rounded-2xl ring-1 ring-[#d8cdb3] break-inside-avoid group"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full object-cover transition-transform [transition-duration:1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2c3425]/0 group-hover:bg-[#2c3425]/15 transition-colors duration-500 z-[2]" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
