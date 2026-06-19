import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS } from "../../data/menu";
import { waLink } from "../../i18n/translations";

const CATS = [
  { id: "all", labelES: "Todos", labelEN: "All" },
  { id: "panaderia", labelES: "Panadería", labelEN: "Bakery" },
  { id: "pasteleria", labelES: "Pastelería", labelEN: "Pastry" },
  { id: "salados", labelES: "Salados", labelEN: "Savory" },
  { id: "cafe", labelES: "Café", labelEN: "Coffee" },
];

export default function MenuFilter({ lang = "es", note }) {
  const [active, setActive] = useState("all");

  const items = active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active);
  const t = (key) => CATS.find((c) => c.id === key)?.[lang === "es" ? "labelES" : "labelEN"];

  return (
    <>
      {/* Tabs */}
      <div
        data-testid="menu-tabs"
        className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap pb-1"
      >
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            data-testid={`menu-tab-${c.id}`}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border ${
              active === c.id
                ? "bg-[#2c3425] text-[#f6efde] border-[#2c3425]"
                : "glass text-[#4a5440] border-transparent hover:text-[#2c3425]"
            }`}
          >
            {c.id === "all" ? t("all") : t(c.id)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const data = item[lang];
            const catLabel = lang === "es"
              ? ({ panaderia: "Panadería", pasteleria: "Pastelería", salados: "Salados", cafe: "Café" })[item.category]
              : ({ panaderia: "Bakery", pasteleria: "Pastry", salados: "Savory", cafe: "Coffee" })[item.category];

            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
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
                    {catLabel}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl sm:text-2xl text-[#2c3425] leading-tight">{data.name}</h3>
                    <span className="shrink-0 font-display text-lg text-[#8a987a]">
                      {item.from ? "Desde " : ""}${item.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#758269] leading-relaxed">{data.desc}</p>
                  <a
                    href={waLink(lang === "es"
                      ? `¡Hola Dulce Café! Quisiera pedir: ${data.name} 🥐`
                      : `Hello Dulce Café! I'd like to order: ${data.name} 🥐`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`menu-order-${item.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8a987a]/15 px-4 py-2 text-sm font-medium text-[#6c7a5d] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {lang === "es" ? "Pedir" : "Order"}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center text-sm text-[#758269]">{note}</p>
    </>
  );
}
