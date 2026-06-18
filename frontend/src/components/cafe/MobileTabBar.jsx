import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, Phone, MessageCircle, Navigation } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, waLink } from "@/i18n/translations";

const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${BRAND.mapsQuery}`;

export default function MobileTabBar() {
  const { t, lang } = useLang();
  const { pathname } = useLocation();

  const items = [
    { type: "link", to: "/menu", icon: UtensilsCrossed, label: t.nav.menu, active: pathname === "/menu" },
    { type: "a", href: `tel:${BRAND.phoneDisplay.replace(/\s|-/g, "")}`, icon: Phone, label: t.pages.visitanos.callTitle },
    {
      type: "a",
      href: waLink(
        lang === "es"
          ? "¡Hola Dulce Café! Quisiera hacer un pedido 🥐"
          : "Hello Dulce Café! I'd like to place an order 🥐"
      ),
      icon: MessageCircle,
      label: "WhatsApp",
      accent: true,
    },
    { type: "a", href: dirUrl, icon: Navigation, label: t.pages.visitanos.directions },
  ];

  return (
    <nav
      data-testid="mobile-tabbar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 tabbar-safe"
    >
      <div className="mx-3 mb-3 grid grid-cols-4 gap-1 rounded-2xl glass px-2 py-2 shadow-xl">
        {items.map((it, i) => {
          const Inner = (
            <span className="flex flex-col items-center gap-1">
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
                  it.accent
                    ? "bg-[#25D366] text-white"
                    : it.active
                      ? "bg-[#8a987a] text-[#f6efde]"
                      : "text-[#4a5440]"
                }`}
              >
                <it.icon size={18} />
              </span>
              <span className="text-[10px] font-medium text-[#4a5440] leading-none">{it.label}</span>
            </span>
          );
          return it.type === "link" ? (
            <Link key={i} to={it.to} data-testid={`tab-${i}`} className="py-1">
              {Inner}
            </Link>
          ) : (
            <a
              key={i}
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={`tab-${i}`}
              className="py-1"
            >
              {Inner}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
