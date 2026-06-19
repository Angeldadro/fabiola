import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { to: "/", labelES: "Inicio", labelEN: "Home" },
  { to: "/menu", labelES: "Menú", labelEN: "Menu" },
  { to: "/nosotros", labelES: "Historia", labelEN: "Story" },
  { to: "/visitanos", labelES: "Visítanos", labelEN: "Visit Us" },
];

const waOrder =
  "https://wa.me/50767453546?text=%C2%A1Hola%20Dulce%20Caf%C3%A9!%20Quisiera%20hacer%20un%20pedido%20%F0%9F%A5%90";

const getInitialLang = () => {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("dc_lang");
  return saved === "en" ? "en" : "es";
};

export default function NavbarInner() {
  const [lang, setLang] = useState(getInitialLang);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    headerRef.current = document.getElementById("navbar-header");
  }, []);

  // Scroll-aware navbar: glass when scrolled, transparent at top
  useEffect(() => {
    const update = () => {
      const el = headerRef.current;
      if (!el) return;
      const scrolled = window.scrollY > 24;
      el.className = scrolled
        ? "fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass border-b border-[#d8cdb3]/40 py-3"
        : "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-5";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    localStorage.setItem("dc_lang", lang);
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "es" ? "en" : "es"));
  }, []);

  const shareSite = useCallback(async () => {
    const text =
      lang === "es"
        ? "¡Mira Dulce Café! Panadería y pastelería venezolana en PH Central Park, Panamá 🥐☕"
        : "Check out Dulce Café! Venezuelan bakery & pastry shop in PH Central Park, Panama 🥐☕";
    const url = window.location.origin + "/";
    if (navigator.share) {
      try { await navigator.share({ title: "Dulce Café", text, url }); return; }
      catch { /* fall through */ }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank", "noopener");
  }, [lang]);

  return (
    <>
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        data-testid="lang-toggle"
        aria-label="Toggle language"
        className="relative h-9 w-[74px] rounded-full border border-[#d8cdb3] bg-[#f6efde]/60 text-xs font-semibold overflow-hidden shrink-0"
      >
        {/* Sliding pill */}
        <motion.span
          className="absolute top-1 bottom-1 w-[34px] rounded-full bg-[#8a987a] z-0"
          animate={{ left: lang === "es" ? 2 : 38 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
        {/* Labels */}
        <span className="relative z-10 flex h-full items-center justify-around px-1">
          <span
            className="flex-1 text-center leading-none"
            style={{ color: lang === "es" ? "#f6efde" : "#8a987a" }}
          >
            ES
          </span>
          <span
            className="flex-1 text-center leading-none"
            style={{ color: lang === "en" ? "#f6efde" : "#8a987a" }}
          >
            EN
          </span>
        </span>
      </button>

      {/* Order CTA (desktop) */}
      <a
        href={waOrder}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="nav-whatsapp-cta"
        className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#8a987a] px-5 py-2.5 text-sm font-medium text-[#f6efde] hover:bg-[#6c7a5d] transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        <span>{lang === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp"}</span>
      </a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid="mobile-menu-toggle"
        aria-label="Menu"
        className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-[#d8cdb3] text-[#2c3425]"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        )}
      </button>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
            className="lg:hidden overflow-hidden glass border-t border-[#d8cdb3]/40 absolute top-full left-0 right-0"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className="font-display text-2xl text-[#2c3425]"
                >
                  {lang === "es" ? l.labelES : l.labelEN}
                </a>
              ))}
              <a
                href={waOrder}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#8a987a] px-5 py-3 text-sm font-medium text-[#f6efde]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                {lang === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp"}
              </a>
              <button
                onClick={() => { setOpen(false); shareSite(); }}
                data-testid="mobile-share"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-5 py-3 text-sm font-medium text-[#2c3425]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                {lang === "es" ? "Compartir" : "Share"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
