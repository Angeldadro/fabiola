import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { MENU_ITEMS } from "@/data/menu";

export default function Menu() {
  const { t, lang } = useLang();
  const [active, setActive] = useState("all");

  const cats = [
    { id: "all", label: t.menu.all },
    { id: "panaderia", label: t.menu.categories.panaderia },
    { id: "pasteleria", label: t.menu.categories.pasteleria },
    { id: "salados", label: t.menu.categories.salados },
    { id: "cafe", label: t.menu.categories.cafe },
  ];

  const items =
    active === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === active);

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="relative py-24 md:py-32 bg-[#eae2cc]/40"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]">
              — {t.menu.overline}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-[#2c3425] tracking-tight leading-[1.05]">
              {t.menu.title}
            </h2>
            <p className="mt-5 text-lg text-[#4a5440]">{t.menu.subtitle}</p>
          </div>
        </div>

        {/* category tabs */}
        <div
          data-testid="menu-tabs"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              data-testid={`menu-tab-${c.id}`}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border ${
                active === c.id
                  ? "bg-[#2c3425] text-[#f6efde] border-[#2c3425]"
                  : "bg-transparent text-[#4a5440] border-[#d8cdb3] hover:border-[#8a987a]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const data = item[lang];
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, rotate: 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  data-testid={`menu-item-${item.id}`}
                  className="group relative overflow-hidden rounded-3xl bg-[#f6efde] border border-[#d8cdb3] shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={data.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c3425]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-3 left-3 rounded-full bg-[#f6efde]/85 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#6c7a5d]">
                      {t.menu.categories[item.category]}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl text-[#2c3425] leading-tight">
                          {data.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#758269] leading-relaxed">
                          {data.desc}
                        </p>
                      </div>
                    </div>
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
      </div>
    </section>
  );
}
