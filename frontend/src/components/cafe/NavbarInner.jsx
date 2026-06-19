import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang, setLang } from "../../i18n/lang";
import { waLink } from "../../i18n/translations";

const LINKS = [
  { to: "/", labelES: "Inicio", labelEN: "Home" },
  { to: "/menu", labelES: "Menú", labelEN: "Menu" },
  { to: "/nosotros", labelES: "Historia", labelEN: "Story" },
  { to: "/visitanos", labelES: "Visítanos", labelEN: "Visit Us" },
  { to: "/#eventos", labelES: "Eventos Especiales", labelEN: "Special Events" },
];

const waOrder =
  "https://wa.me/50767453546?text=%C2%A1Hola%20Dulce%20Caf%C3%A9!%20Quisiera%20hacer%20un%20pedido%20%F0%9F%A5%90";

export default function NavbarInner() {
  const { lang, toggle: toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    headerRef.current = document.getElementById("navbar-header");
  }, []);

  // Scroll-aware: hide on scroll down, show on scroll up, white bg when scrolled
  useEffect(() => {
    const update = () => {
      const el = headerRef.current;
      if (!el) return;
      const currentY = window.scrollY;
      const isScrolled = currentY > 24;
      const goingDown = currentY > lastScrollY.current;

      // White background when scrolled, transparent at top
      if (isScrolled) {
        el.classList.add("bg-white", "border-b", "border-brand-border/40");
        el.classList.remove("bg-transparent");
      } else {
        el.classList.remove("bg-white", "border-b", "border-brand-border/40");
        el.classList.add("bg-transparent");
      }

      // Hide on scroll down, show on scroll up
      if (isScrolled && goingDown) {
        el.classList.add("-translate-y-full");
      } else if (!goingDown) {
        el.classList.remove("-translate-y-full");
      }

      // Always visible at top
      if (currentY <= 24) {
        el.classList.remove("-translate-y-full");
      }

      lastScrollY.current = currentY;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        data-testid="lang-toggle"
        aria-label="Toggle language"
        className="relative h-9 w-[74px] rounded-full border border-brand-border bg-brand-cream/60 text-xs font-semibold overflow-hidden shrink-0"
      >
        {/* Sliding pill */}
        <motion.span
          className="absolute top-1 bottom-1 w-[34px] rounded-full bg-brand-sage z-0"
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
        className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-sage px-5 py-2.5 text-sm font-medium text-brand-cream hover:bg-brand-sage-dark transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        <span>{lang === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp"}</span>
      </a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid="mobile-menu-toggle"
        aria-label="Menu"
        className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-brand-border text-brand-olive"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        )}
      </button>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
            className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Close X button */}
            <button
              onClick={() => setOpen(false)}
              data-testid="mobile-menu-close"
              aria-label="Cerrar menú"
              className="absolute top-5 right-5 h-12 w-12 grid place-items-center rounded-full border border-brand-border text-brand-olive hover:bg-brand-cream transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {/* Centered links */}
            <div className="flex flex-col items-center gap-8 px-6">
              {LINKS.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-link-${l.to === "/" ? "home" : l.to === "/#eventos" ? "eventos" : l.to.slice(1)}`}
                  className="font-display text-3xl sm:text-4xl text-brand-olive hover:text-brand-sage transition-colors text-center"
                >
                  {lang === "es" ? l.labelES : l.labelEN}
                </a>
              ))}
              <a
                href={waOrder}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-sage px-8 py-3.5 text-base font-medium text-brand-cream hover:bg-brand-sage-dark transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                {lang === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
