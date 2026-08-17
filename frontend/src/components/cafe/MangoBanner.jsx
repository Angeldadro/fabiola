import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { addToCartGlobal } from "./cartStore";

const ORDER_PRODUCTS = {
  torta: { id: "torta-mango", cat: "torta" },
  pan: { id: "panjamon", cat: "pan" },
  tartaleta: { id: "tartaleta-de-limon", cat: "postre" },
};

function handleOrderNow(product, e) {
  addToCartGlobal(product.id);
  window.location.href = `/menu?cart=1&cat=${product.cat}`;
}

const CARDS_SLIDE_1 = [
  { id: "corona-blanca-y-dorada", name: "Corona Blanca y Dorada", nameEn: "White & Gold Crown", image: "/images/productos/torta__corona-blanca-y-dorada__torta-minimalista-blanca-con-corona-y-perlas-doradas__blanco-dorado.webp", category: "torta" },
  { id: "kpop-demon-hunters", name: "Kpop Demon Hunters", nameEn: "Kpop Demon Hunters", image: "/images/productos/torta__kpop-demon-hunters__torta-morada-con-decoracion-de-estrellas-y-logo-kpop-demon-hunters__morado-rosa-azul-negro.webp", category: "torta" },
  { id: "tropical-rosa-y-menta", name: "Tropical Rosa y Menta", nameEn: "Tropical Pink & Mint", image: "/images/productos/torta__tropical-rosa-y-menta__torta-colorida-con-flores-y-decoracion-tropical__menta-rosa-lila-amarillo.webp", category: "torta" },
];

const CARDS_SLIDE_2 = [
  { id: "pan-relleno-dorado", name: "Pan Relleno Dorado", nameEn: "Golden Filled Bread", image: "/images/productos/pan__pan-relleno-dorado__panes-largos-horneados-con-acabado-brillante__dorado-marron-beige.webp", category: "panes" },
  { id: "cachitos", name: "Cachitos de Jamón", nameEn: "Ham Cachitos", image: "/images/productos/pan__pan-relleno-de-jamon-y-aceitunas__pan-horneado-relleno-de-jamon-y-aceitunas__dorado-rosa-verde-marron.webp", category: "panes" },
  { id: "pan-de-salchicha", name: "Pan de Salchicha", nameEn: "Sausage Bread", image: "/images/productos/pan__pan-de-salchicha__panes-horneados-rellenos-de-salchicha-con-ajonjoli__dorado-marron-beige-rojo.webp", category: "panes" },
];

const CARDS_SLIDE_3 = [
  { id: "tartaleta-tropical-de-mango", name: "Tartaleta Tropical de Mango", nameEn: "Tropical Mango Tartlet", image: "/images/productos/postre__tartaleta-tropical-de-mango__tartaleta-individual-con-mango-y-fresa__amarillo-naranja-rojo-crema.webp", category: "postre" },
  { id: "flan-brownie-caramelo", name: "Flan Brownie Caramelo", nameEn: "Flan Brownie Caramel", image: "/images/productos/postre__flan-brownie-caramelo__mini-postres-de-flan-y-brownie__amarillo-caramelo-chocolate.webp", category: "postre" },
  { id: "tartaleta-de-fresas", name: "Tartaleta de Fresas", nameEn: "Strawberry Tartlet", image: "/images/productos/postre__tartaleta-de-fresas__tartaletas-con-fresas-glaseadas-y-crema__rojo-blanco-crema.webp", category: "postre" },
];

// Estética por paso del stepper (índice = paso). Para un slide futuro: agrega
// un objeto y una opacidad en `slideOpacities` dentro del componente.
const SLIDE_THEMES = [
  {
    // Paso 0: Torta — usa el fondo base de la tarjeta (brand-cream-2).
    bg: null,
    fadeFrom: "#eae2cc", // brand-cream-2
    disc: null,
    circles: [],
  },
  {
    // Paso 1: Pan de Jamón — fondo perlado + círculos marrón oscuro.
    bg: "#f6f2e8",
    fadeFrom: "#f6f2e8",
    disc: "#4a2f1d",
    circles: [
      "absolute -right-24 -top-24 w-[26rem] h-[26rem] rounded-full blur-2xl bg-[#4a2f1d]/15",
      "absolute -left-20 top-14 w-64 h-64 rounded-full bg-[#4a2f1d]/20",
      "absolute right-12 bottom-0 w-56 h-56 rounded-full bg-[#4a2f1d]/20",
      "absolute left-[42%] bottom-28 w-40 h-40 rounded-full bg-[#4a2f1d]/20",
    ],
  },
  {
    // Paso 2: Tartaleta de Lima — fondo lima pálido + círculos verdes cítricos.
    bg: "#edf3e2",
    fadeFrom: "#edf3e2",
    disc: "#6c7a5d",
    circles: [
      "absolute -right-20 -top-20 w-[24rem] h-[24rem] rounded-full blur-2xl bg-[#8a987a]/20",
      "absolute -left-16 top-14 w-60 h-60 rounded-full bg-[#a8bd7a]/25",
      "absolute right-10 bottom-24 w-52 h-52 rounded-full bg-[#7a8a5e]/25",
      "absolute left-[42%] bottom-32 w-40 h-40 rounded-full bg-[#6c7a5d]/20",
    ],
  },
];

export default function MangoBanner() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Stepper: three "clicks" — torta → pan de jamón → tartaleta de lima ──
  const step = useTransform(scrollYProgress, (v) => (v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2));
  const stepSpring = useSpring(step, { stiffness: 220, damping: 10, mass: 0.4 });

  // Disc rotation — one mechanical "click" (180°) per step, with a short overshoot.
  const discRotate = useTransform(stepSpring, (s) => s * 180);

  // Products counter-rotate so they stay upright while riding the disc edge.
  const productCounterRotate = useTransform(stepSpring, (s) => -s * 180);

  // Crossfades around each "click": torta (0→1), pan (1→2), tartaleta (2).
  const tortaOpacity = useTransform(stepSpring, (s) => {
    if (s <= 0.45) return 1;
    if (s <= 1.45) return Math.max(0, 1 - (s - 0.45) / 0.5);
    return 0;
  });
  const panOpacity = useTransform(stepSpring, (s) => {
    if (s <= 0.45) return 0;
    if (s <= 1.45) return Math.min(1, (s - 0.45) / 0.5);
    if (s <= 2.45) return Math.max(0, 1 - (s - 1.45) / 0.5);
    return 0;
  });
  const limaOpacity = useTransform(stepSpring, (s) => {
    if (s <= 1.45) return 0;
    return Math.min(1, (s - 1.45) / 0.5);
  });

  // ── Mango text exits as the disc clicks to step 1 ──
  const mangoTextOpacity = tortaOpacity;
  const mangoTextY = useTransform(stepSpring, (s) => -Math.min(s, 1) * 28);

  // ── Pan text appears in sync with the disc step ──
  const panTextOpacity = panOpacity;
  const panTextY = useTransform(stepSpring, (s) => (1 - Math.min(s, 1)) * 28);

  // ── Tartaleta text appears in sync with the third step ──
  const limaTextOpacity = limaOpacity;
  const limaTextY = useTransform(stepSpring, (s) => (2 - Math.min(s, 2)) * 28);

  // ── Cards crossfade follows the same steps ──
  const mangoCardsOpacity = tortaOpacity;
  const panCardsOpacity = panOpacity;
  const limaCardsOpacity = limaOpacity;

  // Los slides superpuestos (texto y cards) quedan unos encima de otros en el
  // DOM; al estar invisibles siguen capturando clics, así que desactivamos los
  // pointer-events de los que no están visibles.
  const panTextPointer = useTransform(panTextOpacity, (o) => (o > 0.01 ? "auto" : "none"));
  const limaTextPointer = useTransform(limaTextOpacity, (o) => (o > 0.01 ? "auto" : "none"));
  const panCardsPointer = useTransform(panCardsOpacity, (o) => (o > 0.01 ? "auto" : "none"));
  const limaCardsPointer = useTransform(limaCardsOpacity, (o) => (o > 0.01 ? "auto" : "none"));

  // ── Blob fades with the Mango scene ──
  const blobOpacity = tortaOpacity;

  // ── Opacidad por paso para la estética del fondo (debe coincidir con el stepper) ──
  const slideOpacities = [tortaOpacity, panOpacity, limaOpacity];

  return (
    <section ref={sectionRef} data-testid="mango-banner" className="relative bg-brand-cream">
      {/* Móvil y tablet — carrusel con flechas */}
      <div className="pt-10 pb-4 sm:py-14 relative xl:hidden">
        <MobileSlider />
      </div>
      {/* Desktop (xl+) — stepper por scroll */}
      <div className="hidden xl:block h-[190vh]">
        <div className="sticky top-[5vh] h-[95vh] flex items-center justify-center">
          <div className="relative h-full w-full rounded-[2.5rem] sm:rounded-[3rem] bg-brand-cream-2 shadow-2xl shadow-brand-olive/10 overflow-hidden mx-3 sm:mx-6 lg:mx-10">
            {/* Overlay de fondo + círculos por paso (configurado en SLIDE_THEMES) */}
            {SLIDE_THEMES.map((theme, i) =>
              theme.bg || theme.circles.length > 0 ? (
                <motion.div
                  key={`slide-bg-${i}`}
                  className="absolute inset-0"
                  style={{ opacity: slideOpacities[i] ?? 0 }}
                >
                  {theme.bg && (
                    <div className="absolute inset-0" style={{ backgroundColor: theme.bg }} />
                  )}
                  {theme.circles.map((cls, j) => (
                    <div key={j} className={cls} aria-hidden />
                  ))}
                </motion.div>
              ) : null
            )}
            <div className="relative z-10 flex flex-col lg:flex-row h-full w-full">
              {/* ── LEFT column ~40% ── */}
                <div className="lg:w-[42%] pl-8 lg:pl-14 pr-6 py-6 flex flex-col justify-center relative">
                  <motion.div
                    style={{
                      opacity: blobOpacity,
                      borderRadius: "42% 58% 55% 45% / 45% 42% 58% 55%",
                      transform: "rotate(-18deg)",
                    }}
                    className="absolute -left-16 top-8 w-80 h-80 bg-[#EFD88B]"
                  />

                  {/* Text: Mango exits, Pan de Jamón appears, Tartaleta de Lima follows */}
                  <div className="relative">
                    <motion.div
                      style={{ opacity: mangoTextOpacity, y: mangoTextY }}
                      className="relative"
                    >
                      <Slide1Text />
                    </motion.div>
                    <motion.div
                      style={{ opacity: panTextOpacity, y: panTextY, pointerEvents: panTextPointer }}
                      className="absolute inset-0"
                    >
                      <Slide2Text />
                    </motion.div>
                    <motion.div
                      style={{ opacity: limaTextOpacity, y: limaTextY, pointerEvents: limaTextPointer }}
                      className="absolute inset-0"
                    >
                      <Slide3Text />
                    </motion.div>
                  </div>

                  {/* Cards crossfade */}
                  <div className="relative mt-6">
                    <motion.div
                      style={{ opacity: mangoCardsOpacity }}
                      className="grid grid-cols-3 gap-2.5 sm:gap-4"
                    >
                      <SlideCards cards={CARDS_SLIDE_1} />
                    </motion.div>
                    <motion.div
                      style={{ opacity: panCardsOpacity, pointerEvents: panCardsPointer }}
                      className="absolute inset-0 grid grid-cols-3 gap-2.5 sm:gap-4"
                    >
                      <SlideCards cards={CARDS_SLIDE_2} />
                    </motion.div>
                    <motion.div
                      style={{ opacity: limaCardsOpacity, pointerEvents: limaCardsPointer }}
                      className="absolute inset-0 grid grid-cols-3 gap-2.5 sm:gap-4"
                    >
                      <SlideCards cards={CARDS_SLIDE_3} />
                    </motion.div>
                  </div>
                </div>

                {/* ── RIGHT column ~58% ── */}
                <div className="lg:w-[58%] relative py-8">
                  {/* ── Stepper disc: big, cut by the bottom + right edges ── */}
                  <motion.div
                    className="absolute bottom-[-22%] right-[-20%] w-[440px] xl:w-[520px] aspect-square rounded-full bg-[#F6E6AE] shadow-xl shadow-brand-olive/10"
                    style={{ rotate: discRotate }}
                  >
                    {/* Color del disco por paso (según SLIDE_THEMES) */}
                    {SLIDE_THEMES.map((theme, i) =>
                      theme.disc ? (
                        <motion.div
                          key={`disc-bg-${i}`}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: theme.disc, opacity: slideOpacities[i] ?? 0 }}
                        />
                      ) : null
                    )}
                    {/* Torta — rides the edge at 135° (up-left), wheels out on the next step */}
                    <motion.div
                      className="absolute left-[14.65%] top-[14.65%] z-10 w-[68%]"
                      style={{ x: "-50%", y: "-50%", rotate: productCounterRotate, opacity: tortaOpacity }}
                    >
                      <img
                        src="/images/tortatropicalbanner.png"
                        alt="Torta Tropical de Mango"
                        className="w-full h-auto object-contain drop-shadow-[0_25px_30px_rgba(44,52,37,0.28)]"
                      />
                    </motion.div>
                    {/* Pan de Jamón — opposite edge (315°), comes up on the next step */}
                    <motion.div
                      className="absolute left-[85.35%] top-[85.35%] z-10 w-[68%]"
                      style={{ x: "-50%", y: "-50%", rotate: productCounterRotate, opacity: panOpacity }}
                    >
                      <img
                        src="/images/Pandejamon.png"
                        alt="Pan de Jamón"
                        className="w-full h-auto object-contain drop-shadow-[0_25px_30px_rgba(44,52,37,0.3)]"
                      />
                    </motion.div>
                    {/* Tartaleta de Lima — rides the same edge as the torta (135°), after two clicks */}
                    <motion.div
                      className="absolute left-[14.65%] top-[14.65%] z-10 w-[68%]"
                      style={{ x: "-50%", y: "-50%", rotate: productCounterRotate, opacity: limaOpacity }}
                    >
                      <img
                        src="/images/TartaletaDeLima.png"
                        alt="Tartaleta de Lima"
                        className="w-full h-auto object-contain drop-shadow-[0_25px_30px_rgba(44,52,37,0.3)]"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
            {/* Fade inferior hacia la próxima sección (color por paso según SLIDE_THEMES) */}
            {SLIDE_THEMES.map((theme, i) => (
              <motion.div
                key={`slide-fade-${i}`}
                className="absolute bottom-0 inset-x-0 h-20 sm:h-24 pointer-events-none rounded-b-[2.5rem] sm:rounded-b-[3rem]"
                style={{
                  opacity: slideOpacities[i] ?? 0,
                  background: `linear-gradient(to bottom, ${theme.fadeFrom}, #f6efde)`,
                }}
              />
            ))}
          </div>
        </div>
    </section>
  );
}

/* ─────────────────────────── MOBILE ─────────────────────────── */

const MOBILE_SLIDES = [
  {
    text: <Slide1Text />,
    cards: CARDS_SLIDE_1,
    image: "/images/tortatropicalbanner.png",
    alt: "Torta Tropical de Mango",
  },
  {
    text: <Slide2Text />,
    cards: CARDS_SLIDE_2,
    image: "/images/Pandejamon.png",
    alt: "Pan de Jamón",
  },
  {
    text: <Slide3Text />,
    cards: CARDS_SLIDE_3,
    image: "/images/TartaletaDeLima.png",
    alt: "Tartaleta de Lima",
  },
];

function MobileSlider() {
  const [step, setStep] = useState(0);
  const count = MOBILE_SLIDES.length;
  const next = () => setStep((s) => (s + 1) % count);
  const prev = () => setStep((s) => (s + count - 1) % count);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-brand-cream-2 shadow-2xl shadow-brand-olive/10 p-3 sm:p-4">
          {/* Móvil: imagen que sobresale a la derecha, fuera del viewport con clip */}
          <div className="relative sm:hidden pointer-events-none z-20">
            {MOBILE_SLIDES.map((slide, i) => (
              <img
                key={i}
                src={slide.image}
                alt={slide.alt}
                className="float-product absolute -top-12 -right-9 w-48 aspect-square object-contain drop-shadow-[0_15px_25px_rgba(44,52,37,0.25)] transition-opacity duration-500"
                style={{ opacity: i === step ? 1 : 0 }}
              />
            ))}
          </div>
          {/* Viewport: corta horizontalmente (un slide a la vez) y deja sobresalir la imagen por arriba */}
          <div className="overflow-x-clip overflow-y-visible rounded-[2.5rem] sm:rounded-[3rem]">
            <div
              className="flex"
              style={{
                transform: `translateX(-${step * 100}%)`,
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {MOBILE_SLIDES.map((slide, i) => {
                const theme = SLIDE_THEMES[i];
                const imgBig =
                  "w-64 sm:w-80 aspect-square object-contain drop-shadow-[0_20px_30px_rgba(44,52,37,0.25)]";
                return (
                  <div key={i} className="w-full shrink-0">
                    <div
                      className="h-full px-6 py-8 sm:px-10 sm:py-10 rounded-[2.5rem] sm:rounded-[3rem] transition-colors duration-500"
                      style={theme.bg ? { backgroundColor: theme.bg } : undefined}
                    >
                      {/* Móvil: título/texto/botones toman todo el ancho */}
                      <div className="sm:hidden">
                        <div>{slide.text}</div>
                      </div>
                      {/* Tablet+: imagen grande a la izquierda */}
                      <div className="hidden sm:flex sm:items-center gap-10">
                        <div className="flex justify-center sm:w-[42%] shrink-0">
                          <img src={slide.image} alt={slide.alt} className={imgBig} />
                        </div>
                        <div className="sm:flex-1">{slide.text}</div>
                      </div>
                      <div className="relative mt-8 grid grid-cols-3 gap-2.5 sm:gap-4">
                        <SlideCards cards={slide.cards} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Indicador de pasos */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {MOBILE_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? "w-6 bg-brand-olive" : "w-2 bg-brand-olive/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Flechas de navegación */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-olive shadow-xl shadow-brand-olive/15 ring-1 ring-brand-border/40 transition active:scale-90"
      >
        <Chevron dir="left" />
      </button>
      <button
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-olive shadow-xl shadow-brand-olive/15 ring-1 ring-brand-border/40 transition active:scale-90"
      >
        <Chevron dir="right" />
      </button>
    </>
  );
}

function Chevron({ dir }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

function Slide1Text() {
  return (
    <>
      <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-sage">
        <span data-lang="es">Pastelería</span><span data-lang="en">Pastry</span>
      </span>
      {/* Rayas decorativas eliminadas */}
      <h2 className="mt-4 font-display uppercase tracking-tight text-brand-olive text-6xl sm:text-7xl lg:text-8xl leading-none">
        Mango
      </h2>
      <p className="mt-3 text-lg sm:text-xl font-bold text-brand-olive-2">
        <span data-lang="es">La torta tropical que conquista</span><span data-lang="en">The tropical cake that wins hearts</span>
      </p>
      <p className="mt-3 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed text-left">
        <span data-lang="es">
          Deliciosa torta húmeda de mango con capas cremosas, un toque de vainilla y un acabado
          dorado que enamora a primera vista. El dulce perfecto para cualquier ocasión.
        </span>
        <span data-lang="en">
          A delicious moist mango cake with creamy layers, a touch of vanilla and a golden
          finish that captivates at first sight. The perfect sweet for any occasion.
        </span>
      </p>
      <Buttons product={ORDER_PRODUCTS.torta} />
    </>
  );
}

function Slide2Text() {
  return (
    <>
      <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-sage">
        <span data-lang="es">Panadería</span><span data-lang="en">Bakery</span>
      </span>
      {/* Rayas decorativas eliminadas */}
      <h2 className="mt-4 font-display uppercase tracking-tight text-brand-olive text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl leading-none whitespace-normal sm:whitespace-nowrap">
        <span data-lang="es">Pan de Jamón</span><span data-lang="en">Ham Bread</span>
      </h2>
      <p className="mt-3 text-lg sm:text-xl font-bold text-brand-olive-2">
        <span data-lang="es">El clásico venezolano de las fiestas</span><span data-lang="en">The Venezuelan holiday classic</span>
      </p>
      <p className="mt-3 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed text-left">
        <span data-lang="es">
          Masa dorada y hojaldrada rellena de jamón, pasas y aceitunas. Cada bocado guarda el
          sabor tradicional que se disfruta en las mejores mesas venezolanas.
        </span>
        <span data-lang="en">
          Golden flaky dough filled with ham, raisins and olives. Every bite holds the
          traditional flavor enjoyed at the finest Venezuelan tables.
        </span>
      </p>
      <Buttons product={ORDER_PRODUCTS.pan} />
    </>
  );
}

function Slide3Text() {
  return (
    <>
      <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-sage">
        <span data-lang="es">Pastelería</span><span data-lang="en">Pastry</span>
      </span>
      {/* Rayas decorativas eliminadas */}
      <h2 className="mt-4 font-display uppercase tracking-tight text-brand-olive text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl leading-none whitespace-normal sm:whitespace-nowrap">
        <span data-lang="es">Tartaleta <span className="sm:hidden"><br /></span>de Lima</span><span data-lang="en">Lime Tartlet</span>
      </h2>
      <p className="mt-3 text-lg sm:text-xl font-bold text-brand-olive-2">
        <span data-lang="es">Frescura cítrica en cada bocado</span><span data-lang="en">Citrus freshness in every bite</span>
      </p>
      <p className="mt-3 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed text-left">
        <span data-lang="es">
          Delicada base crujiente con crema de lima, donde el dulce y el ácido se equilibran a
          la perfección. El toque refrescante ideal para acompañar el café.
        </span>
        <span data-lang="en">
          A delicate crunchy base with lime cream, where sweet and tangy balance perfectly.
The ideal refreshing touch to go with your coffee.
        </span>
      </p>
      <Buttons product={ORDER_PRODUCTS.tartaleta} />
    </>
  );
}

function Buttons({ product }) {
  return (
    <div className="mt-7 flex flex-nowrap items-center gap-2 sm:gap-3">
      <a
        href={`/menu?cart=1&cat=${product?.cat ?? ""}`}
        onClick={(e) => {
          if (!product) return;
          e.preventDefault();
          handleOrderNow(product);
        }}
        className="inline-flex items-center justify-center rounded-full bg-brand-olive px-4 py-2.5 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-semibold whitespace-nowrap text-brand-cream shadow-lg shadow-brand-olive/25 transition-all hover:bg-brand-olive-2 hover:-translate-y-0.5"
      >
        <span data-lang="es">Ordenar ahora</span><span data-lang="en">Order now</span>
      </a>
      <a
        href="/menu"
        className="inline-flex items-center justify-center rounded-full border border-brand-olive/40 bg-transparent px-4 py-2.5 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-semibold whitespace-nowrap text-brand-olive transition-all hover:border-brand-olive hover:bg-brand-olive/5"
      >
        <span data-lang="es">Ver más</span><span data-lang="en">See more</span>
      </a>
    </div>
  );
}

function SlideCards({ cards }) {
  return (
    <>
      {cards.map((card) => (
        <a
          key={card.id}
          href={`/menu?cat=${card.category}`}
          className="group flex flex-col items-center rounded-2xl bg-white/70 backdrop-blur p-2.5 sm:p-3 shadow-md shadow-brand-olive/5 ring-1 ring-brand-border/30 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
            <img
              src={card.image}
              alt={card.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <span className="mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight text-brand-olive-2">
            <span data-lang="es">{card.name}</span><span data-lang="en">{card.nameEn}</span>
          </span>
        </a>
      ))}
    </>
  );
}
