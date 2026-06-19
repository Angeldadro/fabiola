import { MENU_ITEMS, IMAGES as MENU_IMAGES } from "./menu";

// Re-export IMAGES from menu (single source of truth)
export const IMAGES = MENU_IMAGES;

const TOP_IDS = [
  "cachitos", "golfeados", "tequenos", "tresleches",
  "marquesa", "cappuccino", "panjamon", "quesillo", "espresso",
];

const TOP_CATEGORIES = [
  "best-seller", "best-seller", "best-seller",
  "trending", "trending", "trending",
  "top", "top", "top",
];

export const TOP_PRODUCTS = TOP_IDS.map((id, i) => {
  const item = MENU_ITEMS.find((m) => m.id === id);
  return item ? { ...item, category: TOP_CATEGORIES[i] } : null;
}).filter(Boolean);

export const CATEGORIES = [
  { key: "top", labelES: "Top", labelEN: "Top" },
  { key: "best-seller", labelES: "Los que más se vende", labelEN: "Best Sellers" },
  { key: "trending", labelES: "Tendencia", labelEN: "Trending" },
];
