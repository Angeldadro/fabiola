import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { Menu as MenuIcon, X, MessageCircle, Share2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink, shareSite } from "@/i18n/translations";

const LOGO = `${process.env.PUBLIC_URL}/logo-dulce.png`;

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/menu", label: t.nav.menu },
    { to: "/nosotros", label: t.nav.story },
    { to: "/visitanos", label: t.nav.contact },
  ];

  const orderMsg =
    lang === "es"
      ? "¡Hola Dulce Café! Quisiera hacer un pedido 🥐"
      : "Hello Dulce Café! I'd like to place an order 🥐";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-[#d8cdb3]/40 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between gap-4">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="h-11 w-11 md:h-12 md:w-12 shrink-0 grid place-items-center">
            <img
              src={LOGO}
              alt="Dulce Café"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl text-[#2c3425] tracking-tight">Dulce Café</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8a987a]">
              {t.contact.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              data-testid={`nav-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-[#8a987a] after:transition-all ${
                  isActive
                    ? "text-[#2c3425] after:w-full"
                    : "text-[#4a5440] hover:text-[#2c3425] after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            data-testid="lang-toggle"
            aria-label="Toggle language"
            className="relative h-9 w-[68px] rounded-full border border-[#d8cdb3] bg-[#f6efde]/60 text-xs font-semibold text-[#2c3425] overflow-hidden"
          >
            <motion.span
              className="absolute top-1 bottom-1 w-[30px] rounded-full bg-[#8a987a]"
              animate={{ left: lang === "es" ? 4 : 34 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <span className="relative z-10 flex h-full items-center justify-between px-3">
              <span className={lang === "es" ? "text-[#f6efde]" : "text-[#8a987a]"}>ES</span>
              <span className={lang === "en" ? "text-[#f6efde]" : "text-[#8a987a]"}>EN</span>
            </span>
          </button>

          <a
            href={waLink(orderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-whatsapp-cta"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#8a987a] px-5 py-2.5 text-sm font-medium text-[#f6efde] hover:bg-[#6c7a5d] transition-colors shadow-sm"
          >
            <MessageCircle size={16} />
            {t.nav.order}
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
            className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-[#d8cdb3] text-[#2c3425]"
          >
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
            className="lg:hidden overflow-hidden glass border-t border-[#d8cdb3]/40"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className="font-display text-2xl text-[#2c3425]"
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={waLink(orderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#8a987a] px-5 py-3 text-sm font-medium text-[#f6efde]"
              >
                <MessageCircle size={16} />
                {t.nav.order}
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  shareSite(t.contact.shareText);
                }}
                data-testid="mobile-share"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-5 py-3 text-sm font-medium text-[#2c3425]"
              >
                <Share2 size={16} />
                {t.nav.share}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
