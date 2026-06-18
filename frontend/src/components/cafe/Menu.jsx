import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { MENU_ITEMS } from "@/data/menu";
import { ParallaxBlob } from "./Parallax";

const MAX = 6;

export default function Menu() {
  const { t, lang } = useLang();
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const cats = [
    { id: "all", label: t.menu.all },
    { id: "panaderia", label: t.menu.categories.panaderia },
    { id: "pasteleria", label: t.menu.categories.pasteleria },
    { id: "salados", label: t.menu.categories.salados },
    { id: "cafe", label: t.menu.categories.cafe },
  ];

  const select = (id) => {
    setActive(id);
    setExpanded(false);
  };

  const filtered =
    active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active);
  const showToggle = active === "all" && filtered.length > MAX;
  const items = showToggle && !expanded ? filtered.slice(0, MAX) : filtered;

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="relative py-16 sm:py-20 md:py-28 bg-[#eae2cc]/40 overflow-hidden"
    >
      <div className="tex-paper" aria-hidden />
      <ParallaxBlob className="-top-24 -right-16 -z-0" color="#bec8a1" size={360} blur={110} opacity={0.45} speed={90} />
      <ParallaxBlob className="bottom-10 -left-20 -z-0" color="#8a987a" size={300} blur={120} opacity={0.22} speed={-70} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="max-w-2xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
            — {t.menu.overline}
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]">
            {t.menu.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4a5440]">{t.menu.subtitle}</p>
        </div>

        <div
          data-testid="menu-tabs"
          className="mt-8 flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap pb-1"
        >
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => select(c.id)}
              data-testid={`menu-tab-${c.id}`}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border ${
                active === c.id
                  ? "bg-[#2c3425] text-[#f6efde] border-[#2c3425]"
                  : "glass text-[#4a5440] border-transparent hover:text-[#2c3425]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const data = item[lang];
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 26, rotate: i % 2 ? 1.5 : -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
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
                    <h3 className="font-display text-xl sm:text-2xl text-[#2c3425] leading-tight">
                      {data.name}
                    </h3>
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
          </AnimatePresence>
        </motion.div>

        {showToggle && (
          <div className="mt-9 flex justify-center">
            <button
              onClick={() => setExpanded((e) => !e)}
              data-testid="menu-view-toggle"
              className="group inline-flex items-center gap-2 rounded-full border border-[#8a987a] px-6 py-3 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
            >
              {expanded ? t.menu.viewLess : t.menu.viewAll}
              <ChevronDown
                size={17}
                className={`transition-transform ${expanded ? "rotate-180" : ""} group-hover:translate-y-0.5`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
