import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { MENU_ITEMS } from "@/data/menu";
import { ParallaxBlob } from "./Parallax";

const FEATURED = MENU_ITEMS.filter((i) => i.featured).slice(0, 6);

export default function Menu() {
  const { t, lang } = useLang();

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="relative py-16 sm:py-20 md:py-28 bg-[#eae2cc]/40 overflow-hidden"
    >
      <div className="tex-paper" aria-hidden />
      <ParallaxBlob className="-top-24 -right-16" color="#bec8a1" size={360} blur={110} opacity={0.45} speed={90} />
      <ParallaxBlob className="bottom-10 -left-20" color="#8a987a" size={300} blur={120} opacity={0.22} speed={-70} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
              — {t.menu.overline}
            </span>
            <h2 className="mt-3 sm:mt-4 font-display fluid-h2 text-[#2c3425] tracking-tight">
              {t.menu.title}
            </h2>
            <p className="mt-4 fluid-body text-[#4a5440]">{t.menu.subtitle}</p>
          </div>
          <Link
            to="/menu"
            data-testid="menu-view-all-link"
            className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-full border border-[#8a987a] px-5 py-3 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
          >
            {t.menu.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURED.map((item, i) => {
            const data = item[lang];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                data-testid={`menu-item-${item.id}`}
                className="group relative overflow-hidden rounded-3xl glass hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={item.image}
                    alt={data.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#f6efde]/85 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#6c7a5d]">
                    {t.menu.categories[item.category]}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl sm:text-2xl text-[#2c3425] leading-tight">
                      {data.name}
                    </h3>
                    <span className="shrink-0 font-display text-lg text-[#8a987a]">
                      {item.from ? `${t.menu.from} ` : ""}${item.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#758269] leading-relaxed">{data.desc}</p>
                  <a
                    href={waLink(
                      lang === "es"
                        ? `¡Hola Dulce Café! Quisiera pedir: ${data.name} 🥐`
                        : `Hello Dulce Café! I'd like to order: ${data.name} 🥐`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`menu-order-${item.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8a987a]/15 px-4 py-2 text-sm font-medium text-[#6c7a5d] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
                  >
                    <MessageCircle size={15} />
                    {t.menu.order}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-9 flex justify-center md:hidden">
          <Link
            to="/menu"
            data-testid="menu-view-all-link-mobile"
            className="inline-flex items-center gap-2 rounded-full border border-[#8a987a] px-6 py-3 text-sm font-medium text-[#2c3425]"
          >
            {t.menu.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
