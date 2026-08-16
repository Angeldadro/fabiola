import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS } from "../../data/menu";
import { PRODUCTOS } from "../../data/productos";
import { useLang } from "../../i18n/lang";
import { waLink } from "../../i18n/translations";
import { loadCart, saveCart } from "./cartStore";

const CATS = [
  { id: "all", labelES: "Todos", labelEN: "All" },
  { id: "panes", labelES: "Panes", labelEN: "Breads" },
  { id: "cafe", labelES: "Café", labelEN: "Coffee" },
  { id: "torta", labelES: "Tortas", labelEN: "Cakes" },
  { id: "postre", labelES: "Postres", labelEN: "Desserts" },
  { id: "galletas", labelES: "Galletas", labelEN: "Cookies" },
  { id: "combo", labelES: "Combos", labelEN: "Combos" },
];

// Categorías agrupadas bajo una misma pestaña en el filtro.
const CAT_GROUPS = {
  panes: ["pan", "panaderia", "salados"],
};

const ALL_ITEMS = [...MENU_ITEMS, ...PRODUCTOS];

const COFFEE_ITEMS = ALL_ITEMS.filter((i) => i.category === "cafe");

const ALL_COLORS = [
  { id: "rosado", label: "Rosado", hex: "#f4c2c2" },
  { id: "rosa", label: "Rosa", hex: "#FFB6C1" },
  { id: "fucsia", label: "Fucsia", hex: "#FF00FF" },
  { id: "marron", label: "Marrón", hex: "#8B4513" },
  { id: "negro", label: "Negro", hex: "#333333" },
  { id: "naranja", label: "Naranja", hex: "#FFA500" },
  { id: "dorado", label: "Dorado", hex: "#DAA520" },
  { id: "blanco", label: "Blanco", hex: "#F5F5F5" },
  { id: "crema", label: "Crema", hex: "#FFFDD0" },
  { id: "chocolate", label: "Chocolate", hex: "#7B3F00" },
  { id: "amarillo", label: "Amarillo", hex: "#FFD700" },
  { id: "verde", label: "Verde", hex: "#90EE90" },
  { id: "rojo", label: "Rojo", hex: "#DC143C" },
  { id: "azul", label: "Azul", hex: "#4169E1" },
  { id: "celeste", label: "Celeste", hex: "#87CEEB" },
  { id: "turquesa", label: "Turquesa", hex: "#40E0D0" },
  { id: "lila", label: "Lila", hex: "#C8A2C8" },
  { id: "morado", label: "Morado", hex: "#800080" },
  { id: "malva", label: "Malva", hex: "#E0B0FF" },
  { id: "menta", label: "Menta", hex: "#98FF98" },
  { id: "beige", label: "Beige", hex: "#F5F5DC" },
  { id: "caramelo", label: "Caramelo", hex: "#C68E17" },
  { id: "coral", label: "Coral", hex: "#FF7F50" },
  { id: "gris", label: "Gris", hex: "#808080" },
  { id: "plateado", label: "Plateado", hex: "#C0C0C0" },
  { id: "hielo", label: "Hielo", hex: "#E0FFFF" },
  { id: "neon", label: "Neón", hex: "#39FF14" },
  { id: "multicolor", label: "Multicolor", hex: "#FF69B4" },
  { id: "oscuro", label: "Oscuro", hex: "#444444" },
  { id: "pastel", label: "Pastel", hex: "#EEDDFF" },
];

const ALL_FLAVORS = [
  { id: "chocolate", label: "Chocolate" },
  { id: "vainilla", label: "Vainilla" },
  { id: "fresa", label: "Fresa" },
];

const DRINK_OPTIONS = [
  { id: "cafe", label: "Café" },
  { id: "ninguno", label: "Ninguno" },
];

function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function getGallery(item) {
  return item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];
}

function buildWhatsAppText(cartItems, items, lang) {
  const lines = ["¡Hola Dulce Café! Quisiera hacer un pedido:\n"];
  cartItems.forEach((ci) => {
    const item = items.find((i) => i.id === ci.itemId);
    if (!item) return;
    const data = item[lang];
    const extras = [];
    if (ci.drink && ci.drink !== "ninguno") {
      const d = DRINK_OPTIONS.find((o) => o.id === ci.drink);
      extras.push(d ? d.label : ci.drink);
    }
    if (ci.flavor) extras.push(ci.flavor);
    if (ci.weight) extras.push(`${ci.weight}kg`);
    const extra = extras.length ? ` (${extras.join(", ")})` : "";
    lines.push(`• ${data.name}${extra} x${ci.quantity} — ${formatPrice(item.price * ci.quantity)}`);
  });
  const total = cartItems.reduce((sum, ci) => {
    const item = items.find((i) => i.id === ci.itemId);
    return sum + (item ? item.price * ci.quantity : 0);
  }, 0);
  lines.push(`\nTotal: ${formatPrice(total)}`);
  return waLink(lines.join("\n"));
}

export default function MenuFilter({ lang: propLang, note = "" }) {
  const { lang: ctxLang } = useLang();
  const lang = propLang ?? ctxLang;
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return "all";
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (!cat) return "all";
    if (CATS.some((c) => c.id === cat)) return cat;
    if (["pan", "panaderia", "salados"].includes(cat)) return "panes";
    return "all";
  });
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [cart, setCart] = useState([]);
  const [drinkModal, setDrinkModal] = useState(null);
  const [drinkStep, setDrinkStep] = useState("choose");
  const [selectedCoffee, setSelectedCoffee] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const cartLoadedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar el carrito global persistido (compartido con la página de inicio)
  // la primera vez; a partir de entonces, persistir cada cambio.
  useEffect(() => {
    if (!cartLoadedRef.current) {
      setCart(loadCart());
      cartLoadedRef.current = true;
      return;
    }
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
        return;
      }
      if (e.key === "ArrowRight") {
        setLightbox((lb) =>
          lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb
        );
        return;
      }
      if (e.key === "ArrowLeft") {
        setLightbox((lb) =>
          lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setSearch(q);
    const cat = params.get("cat");
    if (cat) {
      if (CATS.some((c) => c.id === cat)) setActive(cat);
      else if (["pan", "panaderia", "salados"].includes(cat)) setActive("panes");
    }
    if (params.get("cart") === "1") setShowCart(true);
  }, []);

  // Cuando el carrito está abierto, oculta el navbar si queda visible más de 2s
  useEffect(() => {
    if (!showCart) return;
    let timeout;
    const scheduleHide = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const el = document.getElementById("navbar-header");
        if (el && !el.classList.contains("-translate-y-full")) {
          el.classList.add("-translate-y-full");
        }
      }, 2000);
    };
    scheduleHide();
    window.addEventListener("scroll", scheduleHide, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", scheduleHide);
    };
  }, [showCart]);

  const isDessertSearch = useMemo(() => {
    const q = search.toLowerCase();
    return q.includes("postre") || q.includes("torta") || q.includes("cake") || q.includes("pastel");
  }, [search]);

  const filtered = useMemo(() => {
    let items = ALL_ITEMS;
    if (active !== "all") {
      const cats = CAT_GROUPS[active] || [active];
      items = ALL_ITEMS.filter((i) => cats.includes(i.category));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((i) => {
        const name = (i.es.name + " " + i.en.name).toLowerCase();
        const desc = (i.es.desc + " " + i.en.desc).toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    items = items.filter((i) => i.price >= priceMin && i.price <= priceMax);

    if (selectedColors.length > 0) {
      items = items.filter((i) => i.colors && i.colors.some((c) => selectedColors.includes(c)));
    }

    if (isDessertSearch && selectedFlavors.length > 0) {
      items = items.filter(
        (i) => i.flavors && i.flavors.some((f) => selectedFlavors.includes(f))
      );
    }

    if (isDessertSearch && selectedWeight) {
      items = items.filter(
        (i) => i.weightOptions && i.weightOptions.includes(selectedWeight)
      );
    }

    return items;
  }, [active, search, priceMin, priceMax, selectedColors, selectedFlavors, selectedWeight, isDessertSearch]);

  const toggleColor = useCallback((color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }, []);

  const toggleFlavor = useCallback((flavor) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor) ? prev.filter((f) => f !== flavor) : [...prev, flavor]
    );
  }, []);

  const showAddedToast = useCallback((names) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ names, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const addToCart = useCallback((itemId, skipDrink = false) => {
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    const opensDrinkPopup = item.isSavory || item.category === "torta";
    if (opensDrinkPopup && !skipDrink) {
      setDrinkModal(itemId);
      setDrinkStep("choose");
      setSelectedCoffee([]);
    } else {
      setCart((prev) => {
        const key = opensDrinkPopup ? "drink" : "itemId";
        const existing = opensDrinkPopup
          ? prev.find((c) => c.itemId === itemId && c.drink === null)
          : prev.find((c) => c.itemId === itemId && !c.drink);
        if (existing) {
          return prev.map((c) =>
            key === "itemId" && c.itemId === itemId && !c.drink
              ? { ...c, quantity: c.quantity + 1 }
              : c
          );
        }
        return [...prev, { itemId, quantity: 1, drink: null, flavor: null, weight: null }];
      });
      const data = item[lang];
      showAddedToast([data.name]);
    }
  }, [showAddedToast]);

  const confirmDrink = useCallback((drink) => {
    if (drink === "cafe") {
      setDrinkStep("coffee");
      return;
    }
    const itemId = drinkModal;
    const drinkValue = drink === "ninguno" ? null : drink;
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.itemId === itemId && c.drink === drinkValue
      );
      let next = existing
        ? prev.map((c) =>
            c.itemId === itemId && c.drink === drinkValue
              ? { ...c, quantity: c.quantity + 1 }
              : c
          )
        : [
            ...prev,
            { itemId, quantity: 1, drink: drinkValue, flavor: null, weight: null },
          ];

      return next;
    });
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    if (item) showAddedToast([item[lang].name]);
    setDrinkModal(null);
  }, [drinkModal, showAddedToast]);

  const confirmCoffeeDrink = useCallback(() => {
    if (!selectedCoffee || selectedCoffee.length === 0) return;
    const itemId = drinkModal;
    setCart((prev) => {
      const existingSavory = prev.find(
        (c) => c.itemId === itemId && c.drink === "cafe"
      );
      let next = existingSavory
        ? prev.map((c) =>
            c.itemId === itemId && c.drink === "cafe"
              ? { ...c, quantity: c.quantity + 1 }
              : c
          )
        : [
            ...prev,
            { itemId, quantity: 1, drink: "cafe", flavor: null, weight: null },
          ];

      selectedCoffee.forEach((coffee) => {
        const existingCoffee = next.find(
          (c) => c.itemId === coffee.id && !c.drink
        );
        next = existingCoffee
          ? next.map((c) =>
              c.itemId === coffee.id && !c.drink
                ? { ...c, quantity: c.quantity + coffee.quantity }
                : c
            )
          : [
              ...next,
              {
                itemId: coffee.id,
                quantity: coffee.quantity,
                drink: null,
                flavor: null,
                weight: null,
              },
            ];
      });

      return next;
    });
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    const coffeeNames = selectedCoffee
      .map((sc) => {
        const coffee = ALL_ITEMS.find((i) => i.id === sc.id);
        return coffee ? coffee[lang].name : null;
      })
      .filter(Boolean);
    if (item) {
      const names = [item[lang].name, ...coffeeNames];
      showAddedToast(names);
    }
    setDrinkModal(null);
    setDrinkStep("choose");
    setSelectedCoffee([]);
  }, [drinkModal, selectedCoffee, showAddedToast]);

  const removeFromCart = useCallback((cartIdx) => {
    setCart((prev) => prev.filter((_, i) => i !== cartIdx));
  }, []);

  const updateQuantity = useCallback((cartIdx, delta) => {
    setCart((prev) =>
      prev.map((c, i) =>
        i === cartIdx ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c
      )
    );
  }, []);

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, ci) => {
        const item = ALL_ITEMS.find((i) => i.id === ci.itemId);
        return sum + (item ? item.price * ci.quantity : 0);
      }, 0),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((sum, ci) => sum + ci.quantity, 0), [cart]);

  // Notifica a la burbuja de WhatsApp ("¡Hola, Soy Fabi!") para que se oculte
  // una vez que la persona agrega un producto al carrito.
  useEffect(() => {
    if (cartCount === 0) return;
    window.dispatchEvent(
      new CustomEvent("dulce-cafe:cart-update", { detail: { count: cartCount } })
    );
  }, [cartCount]);

  const t = (key) => CATS.find((c) => c.id === key)?.[lang === "es" ? "labelES" : "labelEN"];

  const resetFilters = () => {
    setActive("all");
    setSearch("");
    setPriceMin(0);
    setPriceMax(50);
    setSelectedColors([]);
    setSelectedFlavors([]);
    setSelectedWeight(null);
  };

  const filterContent = (
    <>
      {/* Header + Reset */}
      <div className="flex items-center justify-end">
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-sage-dark hover:text-brand-olive transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {lang === "es" ? "Restablecer" : "Reset"}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={lang === "es" ? "Buscar en el menú..." : "Search the menu..."}
        className="w-full rounded-xl border border-brand-border bg-brand-cream/80 backdrop-blur px-4 py-3 text-sm text-brand-olive placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-sage"
      />

      {/* Categories */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
          {lang === "es" ? "Categorías" : "Categories"}
        </p>
        <div className="space-y-1.5">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              data-testid={`menu-tab-${c.id}`}
              className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === c.id
                  ? "bg-brand-sage text-brand-cream"
                  : "text-brand-olive-2 hover:bg-brand-sage/10 hover:text-brand-olive"
              }`}
            >
              {c.id === "all" ? t("all") : t(c.id)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs font-semibold text-brand-olive mb-3">
          {lang === "es" ? "Precio" : "Price"}
        </p>
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={50}
            step={0.5}
            value={priceMin}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (v <= priceMax) setPriceMin(v);
            }}
            className="w-full accent-brand-sage"
          />
          <input
            type="range"
            min={0}
            max={50}
            step={0.5}
            value={priceMax}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (v >= priceMin) setPriceMax(v);
            }}
            className="w-full accent-brand-sage"
          />
          <p className="text-xs text-brand-muted mt-1">
            {formatPrice(priceMin)} — {formatPrice(priceMax)}
          </p>
        </div>
      </div>

      {/* Colors — only for pasteleria y productos nuevos */}
      {["torta", "postre", "panes", "galletas", "combo"].includes(active) && (
        <div className="glass rounded-2xl p-4">
          <p className="text-xs font-semibold text-brand-olive mb-3">
            {lang === "es" ? "Colores" : "Colors"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleColor(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs border transition-colors ${
                  selectedColors.includes(c.id)
                    ? "bg-brand-olive text-brand-cream border-brand-olive"
                    : "border-brand-border text-brand-olive-2 hover:border-brand-sage"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full inline-block border border-brand-border"
                  style={{ backgroundColor: c.hex }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dessert-specific filters */}
      {isDessertSearch && (
        <>
          {/* Flavors */}
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-semibold text-brand-olive mb-3">
              {lang === "es" ? "Sabores" : "Flavors"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_FLAVORS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggleFlavor(f.id)}
                  className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                    selectedFlavors.includes(f.id)
                      ? "bg-brand-olive text-brand-cream border-brand-olive"
                      : "border-brand-border text-brand-olive-2 hover:border-brand-sage"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-semibold text-brand-olive mb-3">
              {lang === "es" ? "Peso" : "Weight"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeight(selectedWeight === w ? null : w)}
                  className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                    selectedWeight === w
                      ? "bg-brand-olive text-brand-cream border-brand-olive"
                      : "border-brand-border text-brand-olive-2 hover:border-brand-sage"
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );

return (
    <div className="lg:flex lg:gap-8 lg:items-start">
      {/* ─── FILTER SIDEBAR (left, desktop) ─── */}
      <aside className="hidden lg:block lg:w-[270px] shrink-0 lg:sticky lg:top-6 space-y-5">
        <h3 className="text-sm font-semibold text-brand-olive">
          {lang === "es" ? "Filtros" : "Filters"}
        </h3>
        {filterContent}
      </aside>

      {/* Mobile: la barra lateral deja de estar visible, se usa el drawer de filtros */}

      {/* ─── PRODUCT GRID (right) ─── */}
      <div className="flex-1 min-w-0">
        {/* Result count */}
        <p className="text-sm text-brand-muted mb-4">
          {filtered.length}{" "}
          {lang === "es"
            ? filtered.length === 1
              ? "producto"
              : "productos"
            : filtered.length === 1
              ? "product"
              : "products"}
        </p>

      <motion.div layout className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const data = item[lang];
            const catLabel =
              lang === "es"
                ? ({ panes: "Panes", panaderia: "Panes", salados: "Panes", pan: "Panes", cafe: "Café", torta: "Torta", postre: "Postre", galletas: "Galletas", combo: "Combo" })[
                    item.category
                  ]
                : ({ panes: "Breads", panaderia: "Breads", salados: "Breads", pan: "Breads", cafe: "Coffee", torta: "Cake", postre: "Dessert", galletas: "Cookies", combo: "Combo" })[
                    item.category
                  ];

            const inCart = cart.find((c) => c.itemId === item.id);

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
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLightbox({ item, images: getGallery(item), index: 0 })}
                    className="absolute inset-0 z-10 cursor-zoom-in"
                    aria-label={`${lang === "es" ? "Ver imágenes de" : "View images of"} ${data.name}`}
                  />
                  <img
                    src={item.image}
                    alt={data.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-brand-cream/85 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-brand-sage-dark">
                    {catLabel}
                  </span>
                  {getGallery(item).length > 1 && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/45 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white">
                      {getGallery(item).length} 📷
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-sm sm:text-xl text-brand-olive leading-tight">
                      {data.name}
                    </h3>
                    <span className="shrink-0 font-display text-base sm:text-lg text-brand-sage">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-brand-muted leading-relaxed">{data.desc}</p>
                  {inCart ? (
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => {
                          const idx = cart.findIndex(
                            (c) => c.itemId === item.id && c.drink === inCart.drink
                          );
                          if (idx >= 0) updateQuantity(idx, -1);
                        }}
                        className="w-8 h-8 rounded-full border border-brand-sage text-brand-olive text-lg grid place-items-center hover:bg-brand-sage hover:text-brand-cream transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium text-brand-olive">{inCart.quantity}</span>
                      <button
                        onClick={() => addToCart(item.id, true)}
                        className="w-8 h-8 rounded-full border border-brand-sage text-brand-olive text-lg grid place-items-center hover:bg-brand-sage hover:text-brand-cream transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          const idx = cart.findIndex(
                            (c) => c.itemId === item.id && c.drink === inCart.drink
                          );
                          if (idx >= 0) removeFromCart(idx);
                        }}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        {lang === "es" ? "Eliminar" : "Remove"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-sage/15 px-4 py-2 text-sm font-medium text-brand-sage-dark hover:bg-brand-sage hover:text-brand-cream transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      {lang === "es" ? "Agregar al carrito" : "Add to cart"}
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-brand-muted">
          {lang === "es"
            ? "No encontramos productos con esos filtros."
            : "No products match your filters."}
        </p>
      )}
      </div>

      {/* Mobile: botón flotante de filtros (izquierda) */}
      {mounted &&
        createPortal(
          <button
            onClick={() => setShowFilters(true)}
            aria-label={lang === "es" ? "Abrir filtros" : "Open filters"}
            className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-1 rounded-r-2xl bg-brand-olive text-brand-cream py-4 pl-1.5 pr-3 shadow-lg hover:bg-brand-olive-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ writingMode: "vertical-rl" }}>
              {lang === "es" ? "Filtros" : "Filters"}
            </span>
          </button>,
          document.body
        )}

      {/* Mobile: drawer de filtros desde la izquierda */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden fixed inset-0 z-[80] bg-black/40"
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-xs z-[90] bg-brand-cream shadow-2xl flex flex-col"
                >
                  <div className="flex items-center justify-end px-4 pt-4 pb-2">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-9 h-9 rounded-full border border-brand-border grid place-items-center text-brand-olive-2 hover:text-brand-olive"
                    >
                      ✕
                    </button>
                  </div>
                  <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 pb-6 space-y-5 pb-[calc(6rem+env(safe-area-inset-bottom))]">
                    {filterContent}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Cart FAB */}
      {toast &&
        mounted &&
        createPortal(
          <div className="fixed bottom-20 right-5 z-[70] lg:bottom-24 lg:right-6 max-w-[calc(100vw-2.5rem)] sm:max-w-xs">
            <AnimatePresence>
              {toast && (
                <motion.div
                  key={toast.key}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: "spring", damping: 22, stiffness: 250 }}
                  className="flex items-center gap-3 rounded-2xl border border-brand-sage bg-brand-cream px-3.5 py-3 shadow-lg"
                >
              <span className="w-8 h-8 shrink-0 rounded-full bg-brand-sage grid place-items-center text-brand-cream">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-brand-olive">
                  {lang === "es" ? "¡Agregado al carrito!" : "Added to cart!"}
                </p>
                <p className="text-xs text-brand-olive-2 truncate">
                  {toast.names.join(", ")}
                </p>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="shrink-0 text-xs font-semibold text-brand-sage-dark underline decoration-brand-sage underline-offset-2 hover:text-brand-olive"
              >
                {lang === "es" ? "Ver carrito" : "View cart"}
              </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}

      {cartCount > 0 &&
        mounted &&
        createPortal(
          <div className="fixed bottom-20 right-5 z-[60] lg:bottom-24 lg:right-6">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative w-14 h-14 rounded-full bg-brand-olive text-brand-cream shadow-lg hover:bg-brand-olive-2 transition-colors grid place-items-center"
            >
              <motion.span
                key={cartCount}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 14, stiffness: 300 }}
                className="absolute inset-0 rounded-full bg-brand-olive shadow-lg"
              />
              <motion.svg
                key={`icon-${cartCount}`}
                initial={{ scale: 1.35, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 14, stiffness: 300 }}
                className="relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </motion.svg>
              <motion.span
                key={`badge-${cartCount}`}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 400 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-accent text-white text-[10px] font-bold grid place-items-center"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>,
          document.body
        )}

      {/* Cart Drawer */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showCart && (
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-[100] bg-brand-cream shadow-2xl flex flex-col"
              >
            <div className="p-4 sm:p-6 flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-xl text-brand-olive">
                {lang === "es" ? "Tu pedido" : "Your order"}
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 rounded-full border border-brand-border grid place-items-center text-brand-olive-2 hover:text-brand-olive"
              >
                ✕
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 sm:px-6">
              {cart.length === 0 ? (
                <p className="text-sm text-brand-muted">
                  {lang === "es" ? "Carrito vacío" : "Empty cart"}
                </p>
              ) : (
                <ul className="space-y-3 sm:space-y-4">
                  {cart.map((ci, idx) => {
const item = ALL_ITEMS.find((i) => i.id === ci.itemId);
                    if (!item) return null;
                    const data = item[lang];
                    return (
                      <li key={`${ci.itemId}-${ci.drink}-${idx}`} className="glass rounded-2xl p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-brand-olive truncate">
                              {data.name}
                            </p>
                            {ci.drink && ci.drink !== "ninguno" && (
                              <p className="text-xs text-brand-muted mt-0.5">
                                +{" "}
                                {DRINK_OPTIONS.find((d) => d.id === ci.drink)?.label || ci.drink}
                              </p>
                            )}
                            <p className="text-xs text-brand-sage mt-1">
                              {formatPrice(item.price)} c/u
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => updateQuantity(idx, -1)}
                              className="w-6 h-6 rounded-full border border-brand-border grid place-items-center text-xs text-brand-olive-2"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium text-brand-olive w-4 text-center">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(idx, 1)}
                              className="w-6 h-6 rounded-full border border-brand-border grid place-items-center text-xs text-brand-olive-2"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-display text-brand-olive">
                            {formatPrice(item.price * ci.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            {lang === "es" ? "Eliminar" : "Remove"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 px-4 sm:px-6 pt-3 sm:pt-4 border-t border-brand-border bg-brand-cream space-y-2.5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base sm:text-lg text-brand-olive">
                    {lang === "es" ? "Total" : "Total"}
                  </span>
                  <span className="font-display text-base sm:text-lg text-brand-sage">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <a
                  href={buildWhatsAppText(cart, ALL_ITEMS, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mx-auto max-w-[240px] w-full rounded-full bg-[#25D366] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {lang === "es"
                    ? "Procesar pedido por WhatsApp"
                    : "Process order on WhatsApp"}
                </a>
                <button
                  onClick={() => setCart([])}
                  className="w-full text-center text-xs sm:text-sm text-brand-muted hover:text-red-500 transition-colors"
                >
                  {lang === "es"
                    ? "Eliminar todo el pedido"
                    : "Delete entire order"}
                </button>
              </div>
            )}
          </motion.aside>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Drink Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {drinkModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4"
            onClick={() => {
              setDrinkModal(null);
              setDrinkStep("choose");
              setSelectedCoffee([]);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-6 max-w-sm w-full shadow-xl"
            >
              {drinkStep === "choose" && (
                <>
                  <h3 className="font-display text-lg text-brand-olive mb-4">
                    {lang === "es" ? "¿Qué bebida deseas acompañar?" : "Which drink would you like?"}
                  </h3>
                  <div className="space-y-2">
                    {DRINK_OPTIONS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => confirmDrink(d.id)}
                        className="w-full text-left glass rounded-2xl px-4 py-3 text-sm font-medium text-brand-olive hover:bg-brand-sage/20 transition-colors"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setDrinkModal(null);
                      setDrinkStep("choose");
                      setSelectedCoffee([]);
                    }}
                    className="mt-4 w-full rounded-xl border border-brand-sage text-brand-olive py-2.5 text-sm font-medium hover:bg-brand-sage/15 transition-colors"
                  >
                    {lang === "es" ? "Cancelar" : "Cancel"}
                  </button>
                </>
              )}

              {drinkStep === "coffee" && (
                <>
                  <h3 className="font-display text-lg text-brand-olive mb-1">
                    {lang === "es" ? "Elige tu café" : "Choose your coffee"}
                  </h3>
                  <p className="text-xs text-brand-olive-2 mb-4">
                    {lang === "es"
                      ? "Selecciona uno o varios cafés y su cantidad."
                      : "Pick one or more coffees and their quantities."}
                  </p>
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                    {COFFEE_ITEMS.map((c) => {
                      const sel = selectedCoffee.find((s) => s.id === c.id);
                      const data = c[lang];
                      return (
                        <div
                          key={c.id}
                          onClick={() =>
                            setSelectedCoffee((prev) =>
                              prev.some((s) => s.id === c.id)
                                ? prev.filter((s) => s.id !== c.id)
                                : [...prev, { id: c.id, quantity: 1 }]
                            )
                          }
                          className={`flex items-center gap-3 rounded-2xl px-3 py-2 border cursor-pointer transition-colors ${
                            sel
                              ? "bg-brand-sage/20 border-brand-sage"
                              : "border-brand-border hover:border-brand-sage hover:bg-brand-sage/10"
                          }`}
                        >
                          <img
                            src={c.image}
                            alt={data.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-olive truncate">
                              {data.name}
                            </p>
                            <p className="text-xs font-medium text-brand-olive-2">
                              {formatPrice(c.price)} c/u
                            </p>
                          </div>
                          {sel ? (
                            <div
                              className="flex items-center gap-2 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedCoffee((prev) =>
                                    prev.map((s) =>
                                      s.id === c.id
                                        ? { ...s, quantity: Math.max(1, s.quantity - 1) }
                                        : s
                                    )
                                  )
                                }
                                className="w-6 h-6 rounded-full border border-brand-border grid place-items-center text-xs text-brand-olive-2"
                              >
                                −
                              </button>
                              <span className="text-sm font-medium text-brand-olive w-4 text-center">
                                {sel.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedCoffee((prev) =>
                                    prev.map((s) =>
                                      s.id === c.id
                                        ? { ...s, quantity: s.quantity + 1 }
                                        : s
                                    )
                                  )
                                }
                                className="w-6 h-6 rounded-full border border-brand-border grid place-items-center text-xs text-brand-olive-2"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="shrink-0 text-xs font-semibold text-brand-olive px-2 py-1 rounded-lg bg-brand-sage/15">
                              {lang === "es" ? "Elegir" : "Select"}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setDrinkStep("choose");
                        setSelectedCoffee([]);
                      }}
                      className="flex-1 rounded-xl border border-brand-sage text-brand-olive py-2.5 text-sm font-medium hover:bg-brand-sage/15 transition-colors"
                    >
                      {lang === "es" ? "Atrás" : "Back"}
                    </button>
                    <button
                      onClick={() => setDrinkStep("confirm")}
                      disabled={selectedCoffee.length === 0}
                      className="flex-1 rounded-xl bg-brand-olive text-brand-cream py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-olive/90 transition-colors"
                    >
                      {lang === "es" ? "Continuar" : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {drinkStep === "confirm" && selectedCoffee && selectedCoffee.length > 0 && (
                <>
                  <h3 className="font-display text-lg text-brand-olive mb-1">
                    {lang === "es" ? "¿Eso es todo?" : "Is that everything?"}
                  </h3>
                  <p className="text-xs text-brand-olive-2 mb-4">
                    {lang === "es"
                      ? "Confirma tu selección para agregarla al carrito."
                      : "Confirm your selection to add it to the cart."}
                  </p>
                  <div className="mb-4 rounded-2xl border-2 border-dashed border-brand-border bg-white/50 p-4">
                    {(() => {
                      const savory = ALL_ITEMS.find((i) => i.id === drinkModal);
                      if (!savory) return null;
                      const coffeeSubtotal = selectedCoffee.reduce((sum, sc) => {
                        const coffee = ALL_ITEMS.find((i) => i.id === sc.id);
                        return sum + (coffee ? coffee.price * sc.quantity : 0);
                      }, 0);
                      const total = savory.price + coffeeSubtotal;
                      return (
                        <>
                          <div className="flex items-center justify-between gap-3 text-sm text-brand-olive">
                            <span className="truncate font-medium">
                              {savory[lang].name}
                            </span>
                            <span className="shrink-0 font-medium">
                              {formatPrice(savory.price)}
                            </span>
                          </div>
                          {selectedCoffee.map((sc) => {
                            const coffee = ALL_ITEMS.find((i) => i.id === sc.id);
                            if (!coffee) return null;
                            return (
                              <div
                                key={sc.id}
                                className="flex items-center justify-between gap-3 text-sm text-brand-olive mt-1.5"
                              >
                                <span className="truncate font-medium">
                                  {coffee[lang].name} × {sc.quantity}
                                </span>
                                <span className="shrink-0 font-medium">
                                  {formatPrice(coffee.price * sc.quantity)}
                                </span>
                              </div>
                            );
                          })}
                          <div className="mt-3 pt-3 border-t border-dashed border-brand-border flex items-center justify-between">
                            <span className="font-display text-base font-semibold text-brand-olive">
                              {lang === "es" ? "Total" : "Total"}
                            </span>
                            <span className="font-display text-base font-semibold text-brand-olive">
                              {formatPrice(total)}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setDrinkStep("choose");
                        setSelectedCoffee([]);
                      }}
                      className="flex-1 rounded-xl border border-brand-sage text-brand-olive py-2.5 text-sm font-medium hover:bg-brand-sage/15 transition-colors"
                    >
                      {lang === "es" ? "← Atrás" : "← Back"}
                    </button>
                    <button
                      onClick={confirmCoffeeDrink}
                      className="flex-1 rounded-xl bg-brand-olive text-brand-cream py-2.5 text-sm font-medium hover:bg-brand-olive/90 transition-colors"
                    >
                      {lang === "es" ? "Agregar al carrito" : "Add to cart"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Lightbox de imágenes */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                onClick={() => setLightbox(null)}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label={lang === "es" ? "Cerrar" : "Close"}
                  className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl grid place-items-center transition-colors"
                >
                  ✕
                </button>

                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lb) =>
                        lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb
                      );
                    }}
                    aria-label={lang === "es" ? "Anterior" : "Previous"}
                    className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl grid place-items-center transition-colors"
                  >
                    ‹
                  </button>
                )}

                <motion.div
                  key={lightbox.index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-3xl w-full"
                >
                  <img
                    src={lightbox.images[lightbox.index]}
                    alt={lightbox.item ? lightbox.item[lang].name : ""}
                    className="w-full max-h-[70vh] object-contain rounded-2xl bg-black/40"
                  />
                  {lightbox.images.length > 1 && (
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {lightbox.images.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightbox((lb) => (lb ? { ...lb, index: i } : lb));
                          }}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden ring-2 transition-all ${
                            i === lightbox.index
                              ? "ring-brand-sage scale-105"
                              : "ring-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lb) =>
                        lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb
                      );
                    }}
                    aria-label={lang === "es" ? "Siguiente" : "Next"}
                    className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl grid place-items-center transition-colors"
                  >
                    ›
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
