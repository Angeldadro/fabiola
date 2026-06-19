import { useState, useRef, useEffect } from "react";
import { TOP_PRODUCTS, CATEGORIES } from "../../data/top";
import { useLang } from "../../i18n/lang";
import { waLink } from "../../i18n/translations";

export default function TopCarousel() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState("all");
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const [contentFits, setContentFits] = useState(true);
  const [spacerW, setSpacerW] = useState(0);

  const tabs = [
    { key: "all", labelES: "Todos los productos", labelEN: "All products" },
    ...CATEGORIES.map((c) => ({
      key: c.key,
      labelES: c.labelES,
      labelEN: c.labelEN,
    })),
  ];

  const filtered =
    activeTab === "all"
      ? TOP_PRODUCTS
      : TOP_PRODUCTS.filter((p) => p.category === activeTab);

  // Detect if all items fit in the viewport (center group) or overflow (scroll from left)
  useEffect(() => {
    const calc = () => {
      if (!scrollRef.current) return;
      const cw = scrollRef.current.clientWidth;
      const gap = 24; // gap-6
      const itemW = cw < 640 ? 260 : cw < 768 ? 300 : 320;

      const itemCount = filtered.length + (activeTab === "all" ? 1 : 0);
      const totalContentW = itemCount * itemW + (itemCount - 1) * gap;

      setContentFits(totalContentW <= cw);
      setSpacerW(Math.max(0, (cw - itemW) / 2 - gap / 2));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [filtered.length, activeTab]);

  // Keyboard navigation for the carousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "ArrowRight") scroll("right");
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.5;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const waOrder = (product) => {
    const name = lang === "es" ? product.es.name : product.en.name;
    return waLink(`¡Hola Dulce Café! Quisiera ordenar: ${name} 🥐`);
  };

  return (
    <div ref={trackRef}>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-brand-sage text-brand-cream shadow-sm"
                : "bg-white/70 text-brand-olive-2 hover:bg-white border border-brand-border"
            }`}
          >
            {lang === "es" ? tab.labelES : tab.labelEN}
          </button>
        ))}
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Left arrow (desktop) — hidden when content fits */}
        {!contentFits && (
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-brand-border text-brand-olive-2 hover:bg-brand-cream transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        )}

        {/* Right arrow (desktop) — hidden when content fits */}
        {!contentFits && (
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-brand-border text-brand-olive-2 hover:bg-brand-cream transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        )}

        {/* Scrollable track — centered when content fits, left-aligned when overflowing */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Productos destacados"
          className={`flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar cursor-grab active:cursor-grabbing select-none ${contentFits ? "justify-center" : ""}`}
          style={{ touchAction: "pan-x" }}
        >

          {filtered.map((product) => (
            <div
              key={product.id}
              className="snap-center shrink-0 w-[260px] sm:w-[300px] md:w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-brand-cream">
                <img
                  src={product.image}
                  alt={lang === "es" ? product.es.name : product.en.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  draggable="false"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl text-brand-olive">
                  {lang === "es" ? product.es.name : product.en.name}
                </h3>
                <p className="mt-1.5 text-sm text-brand-muted leading-relaxed line-clamp-2 flex-1">
                  {lang === "es" ? product.es.desc : product.en.desc}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xl font-bold text-brand-sage">
                    ${product.price}
                  </span>
                  <a
                    href={waOrder(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-sage px-4 py-2 text-xs font-semibold text-brand-cream hover:bg-brand-sage-dark transition-colors shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <span>{lang === "es" ? "Pedir" : "Order"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* "Todos los productos" card */}
          {activeTab === "all" && (
            <a
              href="/menu"
              className="snap-center shrink-0 w-[260px] sm:w-[300px] md:w-[320px] bg-white/50 rounded-2xl border-2 border-dashed border-brand-sage/40 flex items-center justify-center hover:bg-white/80 transition-colors group"
            >
              <div className="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-brand-sage mb-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                <span className="text-base font-medium text-brand-olive-2">
                  {lang === "es" ? "Ver menú completo" : "View full menu"}
                </span>
              </div>
            </a>
          )}

          {/* Right spacer to center last item on scroll (only when overflowing) */}
          {!contentFits && spacerW > 0 && <div className="shrink-0" style={{ width: spacerW }} />}
        </div>
      </div>
    </div>
  );
}
