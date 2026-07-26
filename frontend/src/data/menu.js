export const IMAGES = {
  heroFlatlay: "/images/heroFlatlay.webp",
  cachitos: "/images/cachitos.webp",
  panDeJamon: "/images/panDeJamon.webp",
  golfeados: "/images/golfeados.webp",
  tresLeches: "/images/tresLeches.webp",
  tequenos: "/images/tequenos.webp",
  coffeeCup: "/images/coffeeCup.webp",
};

// category: panaderia | pasteleria | salados | cafe
export const MENU_ITEMS = [
  // ── panaderia ──
  {
    id: "cachitos",
    category: "panaderia",
    image: IMAGES.cachitos,
    price: "1.75",
    featured: true,
    es: { name: "Cachitos de Jamón", desc: "El clásico venezolano: pan suave relleno de jamón recién horneado." },
    en: { name: "Ham Cachitos", desc: "The Venezuelan classic: soft bread filled with ham, fresh from the oven." },
  },
  {
    id: "panjamon",
    category: "panaderia",
    image: IMAGES.panDeJamon,
    price: "3.50",
    featured: true,
    es: { name: "Pan de Jamón", desc: "Jamón, pasas y aceitunas enrollados en masa dorada." },
    en: { name: "Pan de Jamón", desc: "Ham, raisins and olives rolled in golden dough." },
  },
  // ── pasteleria ──
  {
    id: "golfeados",
    category: "pasteleria",
    image: IMAGES.golfeados,
    price: "2.50",
    featured: true,
    es: { name: "Golfeados", desc: "Pan dulce de papelón con canela y queso blanco rallado." },
    en: { name: "Golfeados", desc: "Sweet papelón rolls finished with cinnamon and grated white cheese." },
  },
  {
    id: "tresleches",
    category: "pasteleria",
    image: IMAGES.tresLeches,
    price: "3.50",
    featured: true,
    es: { name: "Tres Leches", desc: "Bizcocho húmedo bañado en tres leches y un toque de canela." },
    en: { name: "Tres Leches", desc: "Moist sponge soaked in three milks and a touch of cinnamon." },
  },
  // ── salados ──
  {
    id: "tequenos",
    category: "salados",
    image: IMAGES.tequenos,
    price: "5.50",
    featured: true,
    es: { name: "Tequeños (6u)", desc: "Dedos de queso crujientes, recién horneados." },
    en: { name: "Tequeños (6pc)", desc: "Crispy baked cheese sticks, served warm." },
  },
  // ── cafe ──
  {
    id: "espresso",
    category: "cafe",
    image: IMAGES.coffeeCup,
    price: "1.50",
    featured: true,
    es: { name: "Café de la Casa", desc: "Espresso de la casa, recién hecho cada mañana." },
    en: { name: "House Coffee", desc: "Our house espresso, brewed fresh every morning." },
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

/** @type {readonly Array<"mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun">} */
export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
