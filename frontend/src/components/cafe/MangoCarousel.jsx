import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CREAM_BG = "#f6efde";
const DARK_BG = "#3b2417";
const CIRCLE_LIGHT = "#F6E6AE";
const CIRCLE_DARK = "#6b4a2a";

const CARDS_SLIDE_1 = [
  { id: "corona-blanca-y-dorada", name: "Corona Blanca y Dorada", image: "/images/productos/torta__corona-blanca-y-dorada__torta-minimalista-blanca-con-corona-y-perlas-doradas__blanco-dorado.webp", category: "torta" },
  { id: "kpop-demon-hunters", name: "Kpop Demon Hunters", image: "/images/productos/torta__kpop-demon-hunters__torta-morada-con-decoracion-de-estrellas-y-logo-kpop-demon-hunters__morado-rosa-azul-negro.webp", category: "torta" },
  { id: "tropical-rosa-y-menta", name: "Tropical Rosa y Menta", image: "/images/productos/torta__tropical-rosa-y-menta__torta-colorida-con-flores-y-decoracion-tropical__menta-rosa-lila-amarillo.webp", category: "torta" },
];

const CARDS_SLIDE_2 = [
  { id: "pan-relleno-dorado", name: "Pan Relleno Dorado", image: "/images/productos/pan__pan-relleno-dorado__panes-largos-horneados-con-acabado-brillante__dorado-marron-beige.webp", category: "panes" },
  { id: "cachitos", name: "Cachitos de Jamón", image: "/images/productos/pan__pan-relleno-de-jamon-y-aceitunas__pan-horneado-relleno-de-jamon-y-aceitunas__dorado-rosa-verde-marron.webp", category: "panes" },
  { id: "pan-de-salchicha", name: "Pan de Salchicha", image: "/images/productos/pan__pan-de-salchicha__panes-horneados-rellenos-de-salchicha-con-ajonjoli__dorado-marron-beige-rojo.webp", category: "panes" },
];

export default function MangoCarousel() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Slide 1 (Mango) — exits: fades out + gentle zoom-in
  const s1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55, 0.65], [1, 1, 0, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.65], [1, 1.06]);

  // Slide 2 (Pan de Jamón) — enters: fades in from a slightly zoomed state, settles
  const s2Opacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const s2Scale = useTransform(scrollYProgress, [0.45, 0.6], [1.08, 1]);
  const s2Y = useTransform(scrollYProgress, [0.45, 0.6], [48, 0]);

  return (
    <section
      ref={sectionRef}
      data-testid="mango-carousel"
      className="relative bg-brand-cream"
      style={{ height: isMobile ? "auto" : "300vh" }}
    >
      {isMobile ? (
        <MobileLayout />
      ) : (
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* ── SLIDE 1 · MANGO (full scene) ── */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: s1Opacity, scale: s1Scale }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: CREAM_BG }} />
            <div className="absolute -right-[22%] top-1/2 -translate-y-1/2 w-[70%] max-w-[760px] aspect-square rounded-full bg-[#F6E6AE]" />

            <div className="relative z-10 h-full flex items-center max-w-[1400px] mx-auto px-6">
              <div className="w-[42%] relative">
                <Blob className="absolute -left-16 top-8 w-80 h-80 bg-[#EFD88B] opacity-90" />
                <div className="relative">
                  <Slide1Text />
                </div>
                <SlideCards cards={CARDS_SLIDE_1} />
              </div>
              <div className="w-[58%] flex items-center justify-center">
                <img
                  src="/images/tortatropicalbanner.png"
                  alt="Torta Tropical de Mango"
                  className="h-[500px] w-auto object-contain rounded-[2rem] rotate-[25deg] drop-shadow-[0_30px_40px_rgba(44,52,37,0.28)]"
                />
              </div>
            </div>
          </motion.div>

          {/* ── SLIDE 2 · PAN DE JAMÓN (full scene) ── */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: s2Opacity, scale: s2Scale, y: s2Y }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: DARK_BG }} />
            <div className="absolute -right-[22%] top-1/2 -translate-y-1/2 w-[70%] max-w-[760px] aspect-square rounded-full bg-[#6b4a2a]" />
            <div className="absolute -left-24 top-10 w-80 h-80 rounded-full bg-[#7a5a3a]/40 blur-[120px] pointer-events-none" />

            <div className="relative z-10 h-full flex items-center max-w-[1400px] mx-auto px-6">
              <div className="w-[42%] relative">
                <div className="relative">
                  <Slide2Text />
                </div>
                <SlideCards cards={CARDS_SLIDE_2} dark />
              </div>
              <div className="w-[58%] flex items-center justify-center">
                <img
                  src="/images/Pandejamon.png"
                  alt="Pan de Jamón"
                  className="h-[500px] w-auto object-contain rounded-[2rem] rotate-[25deg] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ───────────────────────────────────────────── */

function MobileLayout() {
  return (
    <div className="relative">
      {/* ── Mango slide (mobile) ── */}
      <div className="relative pt-12 pb-6 overflow-visible">
        <div className="float-cake absolute -top-8 right-3 z-20 w-40 sm:w-48">
          <img
            src="/images/tortatropicalbanner.png"
            alt="Torta Tropical de Mango"
            className="w-full h-auto object-contain rounded-[1.25rem] drop-shadow-[0_20px_25px_rgba(44,52,37,0.25)]"
          />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-brand-cream-2 flex flex-col shadow-2xl shadow-brand-olive/10">
            <div className="absolute -right-[22%] top-1/2 -translate-y-1/2 w-[70%] max-w-[760px] aspect-square rounded-full bg-[#F6E6AE]"></div>
            <div className="relative z-10 p-7 sm:p-10">
              <Blob className="absolute -left-16 top-8 w-64 h-64 bg-[#EFD88B] opacity-90" />
              <div className="relative">
                <Slide1Text />
              </div>
              <SlideCards cards={CARDS_SLIDE_1} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Pan de Jamón slide (mobile) ── */}
      <div className="relative bg-[#3b2417] pt-12 pb-10">
        <div className="absolute -left-20 top-16 w-64 h-64 rounded-full bg-[#7a5a3a]/50 blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-[#4a2f1b] flex flex-col shadow-2xl shadow-black/40">
            <div className="absolute -right-[22%] top-1/2 -translate-y-1/2 w-[70%] max-w-[760px] aspect-square rounded-full bg-[#6b4a2a]"></div>
            <div className="relative z-10 p-7 sm:p-10">
              <div className="relative">
                <Slide2Text />
              </div>
              <SlideCards cards={CARDS_SLIDE_2} dark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Blob({ className }) {
  return (
    <div
      className={className}
      style={{ borderRadius: "42% 58% 55% 45% / 45% 42% 58% 55%", transform: "rotate(-18deg)" }}
    />
  );
}

function Slide1Text() {
  return (
    <>
      <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-sage">
        Pastelería
      </span>
      <ThreeLines className="text-neutral-400" />
      <h2 className="mt-4 font-display uppercase tracking-tight text-brand-olive text-6xl sm:text-7xl lg:text-8xl leading-none">
        Mango
      </h2>
      <p className="mt-3 text-lg sm:text-xl font-bold text-brand-olive-2">
        La torta tropical que conquista
      </p>
      <p className="mt-3 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed">
        Deliciosa torta húmeda de mango con capas cremosas, un toque de vainilla y un acabado
        dorado que enamora a primera vista. El dulce perfecto para cualquier ocasión.
      </p>
      <Buttons />
    </>
  );
}

function Slide2Text() {
  return (
    <>
      <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-pale-sage">
        Panadería
      </span>
      <ThreeLines className="text-brand-cream/70" />
      <h2 className="mt-4 font-display uppercase tracking-tight text-brand-cream text-6xl sm:text-7xl lg:text-8xl leading-none">
        Pan de Jamón
      </h2>
      <p className="mt-3 text-lg sm:text-xl font-bold text-brand-cream/90">
        El clásico venezolano de las fiestas
      </p>
      <p className="mt-3 max-w-md text-sm sm:text-base text-brand-cream/75 leading-relaxed">
        Masa dorada y hojaldrada rellena de jamón, pasas y aceitunas. Cada bocado guarda el sabor
        tradicional que se disfruta en las mejores mesas venezolanas.
      </p>
      <Buttons dark />
    </>
  );
}

function ThreeLines({ className }) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <span className={`h-[3px] w-4 rounded-full bg-current ${className}`}></span>
      <span className={`h-[3px] w-4 rounded-full bg-current ${className}`}></span>
      <span className={`h-[3px] w-4 rounded-full bg-current ${className}`}></span>
    </div>
  );
}

function Buttons({ dark }) {
  const primary = dark
    ? "bg-brand-cream text-brand-olive hover:bg-white shadow-lg shadow-black/30"
    : "bg-brand-olive text-brand-cream hover:bg-brand-olive-2 shadow-lg shadow-brand-olive/25";
  const secondary = dark
    ? "border-brand-cream/50 text-brand-cream hover:border-brand-cream hover:bg-brand-cream/10"
    : "border-brand-olive/40 text-brand-olive hover:border-brand-olive hover:bg-brand-olive/5";
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <a
        href="/menu"
        className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${primary}`}
      >
        Ordenar ahora
      </a>
      <a
        href="/menu"
        className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition-all ${secondary}`}
      >
        Ver más
      </a>
    </div>
  );
}

function SlideCards({ cards, dark }) {
  const cardClass = dark
    ? "bg-[#3b2417]/60 ring-[#f6efde]/15"
    : "bg-white/70 ring-brand-border/30";
  const textClass = dark ? "text-brand-cream/90" : "text-brand-olive-2";
  return (
    <div className="relative mt-9 grid grid-cols-3 gap-2.5 sm:gap-4">
      {cards.map((card) => (
        <a
          key={card.id}
          href={`/menu?cat=${card.category}`}
          className={`group flex flex-col items-center rounded-2xl backdrop-blur p-2.5 sm:p-3 shadow-md shadow-brand-olive/5 ring-1 transition-all hover:-translate-y-1 hover:shadow-lg ${cardClass}`}
        >
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
            <img
              src={card.image}
              alt={card.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <span
            className={`mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight ${textClass}`}
          >
            {card.name}
          </span>
        </a>
      ))}
    </div>
  );
}
