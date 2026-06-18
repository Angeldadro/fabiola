import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { MENU_ITEMS } from "@/data/menu";
import { useSeo } from "@/hooks/useSeo";
import PageHeader from "@/components/cafe/PageHeader";

export default function MenuPage() {
  const { t, lang } = useLang();
  const [active, setActive] = useState("all");
  useSeo({
    title:
      lang === "es"
        ? "Menú · Dulce Café — Panadería y Pastelería en Panamá"
        : "Menu · Dulce Café — Bakery & Pastry in Panama",
    description:
      lang === "es"
        ? "Carta completa de Dulce Café: cachitos, pan de jamón, tequeños, golfeados, tres leches, tortas por encargo y café. Pide por WhatsApp en PH Central Park, Panamá."
        : "Full Dulce Café menu: cachitos, pan de jamón, tequeños, golfeados, tres leches, custom cakes and coffee. Order on WhatsApp at PH Central Park, Panama.",
  });

  const cats = [
    { id: "all", label: t.menu.all },
    { id: "panaderia", label: t.menu.categories.panaderia },
    { id: "pasteleria", label: t.menu.categories.pasteleria },
    { id: "salados", label: t.menu.categories.salados },
    { id: "cafe", label: t.menu.categories.cafe },
  ];

  const items =
    active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active);

  return (
    <>
      <PageHeader
        overline={t.pages.menu.overline}
        title={t.pages.menu.title}
        subtitle={t.pages.menu.subtitle}
      />

      <section data-testid="menu-page" className="relative bg-[#f6efde] py-12 sm:py-16 overflow-hidden">
        <div className="tex-paper" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div
            data-testid="menu-tabs"
            className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap pb-1"
          >
            {cats.map((c) => (
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
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
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
            </AnimatePresence>
          </motion.div>

          <p className="mt-10 text-center text-sm text-[#758269]">{t.pages.menu.note}</p>
        </div>
      </section>
    </>
  );
}
