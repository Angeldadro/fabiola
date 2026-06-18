const IMG =
  "https://static.prod-images.emergentagent.com/jobs/8be50655-77d3-448b-94db-944416a05378/images";

export const IMAGES = {
  cachitos: `${IMG}/d35ef4eb415fdced0b6839cd9edd9a86a2361c4c27252f90a90324e6c6058d5d.png`,
  quesillo: `${IMG}/a9e032cf8452e3abe9b9b2d048d3f04713226c892d4d7d7c37c0c9ed9a0f531f.png`,
  tresLeches: `${IMG}/6c8f85682fe4fcf8c75f7907be522cb4573b673de5ce3047e2a7c970f53b477a.png`,
  tequenos: `${IMG}/cdb27600f768eb6c36fc26dbc6f1c8c00fb44d8754e0b738bac928a6ce50f683.png`,
  panDeJamon: `${IMG}/f6451552f092da442844ca9e473db9cc4285a04404081f081759c90a95e96a8d.png`,
  golfeados: `${IMG}/a7088feba7fcd7bf9c720c8c9d7f30cbfce38921f1577fa38c4f4fa87fa912a2.png`,
  heroFlatlay: `${IMG}/ccd6c7a1ca2a9c4ef694b5853486dd546b5ca3ff7ab6a397dbc9cf6ea0c35dd4.png`,
  coffeeCup: `${IMG}/4bcc9499914bc3256152c9d3539c2f0682ab156940cc94ba8b89149a866712ba.png`,
  celebrationCake: `${IMG}/f3c8664e687907da59215cf95f94fd5522587d185daca04e8d5b14ce3a35d0d4.png`,
  savoryPastries: `${IMG}/0e897279b08adb6de679737b33b9801334a4c6fe32fbcf54f69ff9175e3bcc04.png`,
  breadBoard:
    "https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  sourdough:
    "https://images.unsplash.com/photo-1549413468-cd78edb7e75c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  cafeInterior:
    "https://images.unsplash.com/photo-1718552160371-82f3b1cf6e09?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  cafeCozy:
    "https://images.unsplash.com/photo-1761695939616-1c03087c1ce4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  pastryDisplay:
    "https://images.unsplash.com/photo-1546237769-6f84ec1a512a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  cappuccino:
    "https://images.unsplash.com/photo-1608262541233-0a3ec300e032?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  chocoCake:
    "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
};

// category: panaderia | pasteleria | salados | cafe
export const MENU_ITEMS = [
  {
    id: "cachitos",
    category: "panaderia",
    image: IMAGES.cachitos,
    es: { name: "Cachitos de Jamón", desc: "El clásico venezolano: pan suave relleno de jamón." },
    en: { name: "Ham Cachitos", desc: "The Venezuelan classic: soft bread filled with ham." },
  },
  {
    id: "panjamon",
    category: "panaderia",
    image: IMAGES.panDeJamon,
    es: { name: "Pan de Jamón", desc: "Jamón, pasas y aceitunas enrollados en masa dorada." },
    en: { name: "Pan de Jamón", desc: "Ham, raisins and olives rolled in golden dough." },
  },
  {
    id: "sourdough",
    category: "panaderia",
    image: IMAGES.sourdough,
    es: { name: "Pan Artesanal", desc: "Masa madre de corteza crujiente y miga aireada." },
    en: { name: "Artisan Bread", desc: "Sourdough with a crisp crust and airy crumb." },
  },
  {
    id: "tresleches",
    category: "pasteleria",
    image: IMAGES.tresLeches,
    es: { name: "Tres Leches", desc: "Bizcocho húmedo bañado en tres leches y canela." },
    en: { name: "Tres Leches", desc: "Moist sponge soaked in three milks and cinnamon." },
  },
  {
    id: "quesillo",
    category: "pasteleria",
    image: IMAGES.quesillo,
    es: { name: "Quesillo", desc: "Flan venezolano sedoso con caramelo dorado." },
    en: { name: "Quesillo", desc: "Silky Venezuelan flan with golden caramel." },
  },
  {
    id: "golfeados",
    category: "pasteleria",
    image: IMAGES.golfeados,
    es: { name: "Golfeados", desc: "Rollos de papelón y canela con queso rallado." },
    en: { name: "Golfeados", desc: "Papelón & cinnamon rolls topped with grated cheese." },
  },
  {
    id: "torta",
    category: "pasteleria",
    image: IMAGES.celebrationCake,
    es: { name: "Tortas por Encargo", desc: "Tortas personalizadas para tus celebraciones." },
    en: { name: "Custom Cakes", desc: "Personalized cakes for your celebrations." },
  },
  {
    id: "tequenos",
    category: "salados",
    image: IMAGES.tequenos,
    es: { name: "Tequeños", desc: "Dedos de queso crocantes con guasacaca." },
    en: { name: "Tequeños", desc: "Crispy cheese sticks served with guasacaca." },
  },
  {
    id: "pastelitos",
    category: "salados",
    image: IMAGES.savoryPastries,
    es: { name: "Pastelitos & Empanadas", desc: "Hojaldre dorado relleno y bien crujiente." },
    en: { name: "Pastelitos & Empanadas", desc: "Golden, crispy filled pastries." },
  },
  {
    id: "espresso",
    category: "cafe",
    image: IMAGES.coffeeCup,
    es: { name: "Café de la Casa", desc: "Espresso intenso de granos seleccionados." },
    en: { name: "House Coffee", desc: "Bold espresso from selected beans." },
  },
  {
    id: "cappuccino",
    category: "cafe",
    image: IMAGES.cappuccino,
    es: { name: "Cappuccino", desc: "Espresso, leche cremosa y arte en cada taza." },
    en: { name: "Cappuccino", desc: "Espresso, creamy milk and art in every cup." },
  },
];

export const GALLERY = [
  { src: IMAGES.heroFlatlay, span: "tall", alt: "Mesa con café y panes" },
  { src: IMAGES.golfeados, span: "wide", alt: "Golfeados" },
  { src: IMAGES.cachitos, span: "normal", alt: "Cachitos de jamón" },
  { src: IMAGES.celebrationCake, span: "tall", alt: "Torta decorada" },
  { src: IMAGES.pastryDisplay, span: "wide", alt: "Vitrina de pastelería" },
  { src: IMAGES.tresLeches, span: "normal", alt: "Tres leches" },
  { src: IMAGES.savoryPastries, span: "normal", alt: "Pastelitos" },
  { src: IMAGES.cafeCozy, span: "tall", alt: "Interior del café" },
  { src: IMAGES.tequenos, span: "wide", alt: "Tequeños" },
];

export const REVIEWS = [
  {
    name: "Elvis Coronado",
    rating: 4,
    es: "Buen servicio, ambiente venezolano, dulces buenos y panes sabrosos.",
    en: "Great service, Venezuelan vibe, good sweets and tasty breads.",
    source: "Google",
  },
  {
    name: "Mitzel Serrano",
    rating: 5,
    es: "¡Excelente! Todo riquísimo y la atención de primera. Volveré sin duda.",
    en: "Excellent! Everything delicious and top-notch service. I'll be back for sure.",
    source: "Google",
  },
  {
    name: "Andreína P.",
    rating: 5,
    es: "Los cachitos y el café me recuerdan a casa. Mi parada favorita en Transístmica.",
    en: "The cachitos and coffee remind me of home. My favorite stop on Transístmica.",
    source: "Google",
  },
  {
    name: "Luis G.",
    rating: 5,
    es: "Las tortas por encargo quedaron espectaculares. Sabor y presentación 10/10.",
    en: "The custom cakes turned out spectacular. Flavor and presentation 10/10.",
    source: "Google",
  },
  {
    name: "María José",
    rating: 5,
    es: "El pan de jamón es el mejor que he probado en Panamá. Muy recomendado.",
    en: "The pan de jamón is the best I've had in Panama. Highly recommended.",
    source: "Google",
  },
];
