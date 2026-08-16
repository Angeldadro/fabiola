export const IMAGES = {
  heroFlatlay: "/images/heroFlatlay.webp",
  cachitos: "/images/productos/pan__pan-relleno-de-jamon-y-aceitunas__pan-horneado-relleno-de-jamon-y-aceitunas__dorado-rosa-verde-marron.webp",
  panDeJamon: "/images/Pandejamon.png",
  golfeados: "/images/productos/pan__rollo-de-caramelo-y-canela__rollo-dulce-con-caramelo-y-anis-estrellado__caramelo-dorado-marron.webp",
  tresLeches: "/images/Porcion de torta de chocolate.webp",
  tequenos: "/images/productos/pan__pan-horneado-artesanal__panes-largos-con-corteza-dorada-y-brillante__dorado-caramelo-marron.webp",
  coffeeCup: "/images/heroFlatlay.webp",
};

const COLORS = {
  dorado: "dorado",
  marron: "marrón",
  negro: "negro",
  naranja: "naranja",
  rosado: "rosado",
  blanco: "blanco",
  crema: "crema",
  verde: "verde",
  chocolate: "chocolate",
  amarrillo: "amarillo",
};

// category: panaderia | pasteleria | salados | cafe
export const MENU_ITEMS = [
  // ── panaderia ──
  {
    id: "cachitos",
    category: "panaderia",
    image: IMAGES.cachitos,
    price: 1.75,
    featured: true,
    isSavory: true,
    isDessert: false,
    colors: [COLORS.dorado, COLORS.marron],
    es: { name: "Cachitos de Jamón", desc: "El clásico venezolano: pan suave relleno de jamón recién horneado." },
    en: { name: "Ham Cachitos", desc: "The Venezuelan classic: soft bread filled with ham, fresh from the oven." },
  },
  {
    id: "panjamon",
    category: "panaderia",
    image: IMAGES.panDeJamon,
    price: 3.50,
    featured: true,
    isSavory: true,
    isDessert: false,
    colors: [COLORS.dorado, COLORS.marron],
    es: { name: "Pan de Jamón", desc: "Jamón, pasas y aceitunas enrollados en masa dorada." },
    en: { name: "Pan de Jamón", desc: "Ham, raisins and olives rolled in golden dough." },
  },
  // ── pan ──
  {
    id: "golfeados",
    category: "pan",
    image: IMAGES.golfeados,
    price: 2.50,
    featured: true,
    isSavory: false,
    isDessert: false,
    colors: [COLORS.dorado, COLORS.marron],
    flavors: [],
    es: { name: "Golfeados", desc: "Pan dulce de papelón con canela y queso blanco rallado." },
    en: { name: "Golfeados", desc: "Sweet papelón rolls finished with cinnamon and grated white cheese." },
  },
  {
    id: "torta-chocolate",
    category: "torta",
    image: IMAGES.tresLeches,
    price: 25.00,
    featured: true,
    isSavory: false,
    isDessert: true,
    colors: [COLORS.chocolate, COLORS.marron, COLORS.negro],
    flavors: ["chocolate"],
    weightOptions: [1, 2, 3, 4],
    es: { name: "Torta de Chocolate", desc: "Torta húmeda de chocolate con cubierta de ganache." },
    en: { name: "Chocolate Cake", desc: "Moist chocolate cake with ganache frosting." },
  },
];

export const GALLERY = [
  { src: IMAGES.heroFlatlay, alt: "Dulce Café" },
  { src: IMAGES.cachitos, alt: "Cachitos de jamón" },
  { src: IMAGES.panDeJamon, alt: "Pan de jamón" },
  { src: IMAGES.golfeados, alt: "Golfeados" },
  { src: IMAGES.tresLeches, alt: "Tres leches" },
  { src: IMAGES.tequenos, alt: "Tequeños" },
  { src: IMAGES.coffeeCup, alt: "Café de la casa" },
];

export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
