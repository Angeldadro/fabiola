import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, MessageCircle, Car, Truck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, waLink } from "@/i18n/translations";
import { DAY_KEYS } from "@/data/menu";
import { useSeo } from "@/hooks/useSeo";
import PageHeader from "@/components/cafe/PageHeader";

const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${BRAND.mapsQuery}`;
const wazeUrl = "https://waze.com/ul?q=PH%20Central%20Park%20Transistmica%20Panama&navigate=yes";

export default function VisitanosPage() {
  const { t, lang } = useLang();
  const p = t.pages.visitanos;
  useSeo({
    title:
      lang === "es"
        ? "Visítanos · Dulce Café — PH Central Park, Transístmica, Panamá"
        : "Visit Us · Dulce Café — PH Central Park, Transístmica, Panama",
    description:
      lang === "es"
        ? "Ubicación, horario y cómo llegar a Dulce Café en PH Central Park, Transístmica, Panamá. Abierto todos los días 6:00 a.m. – 10:00 p.m. Pedidos por WhatsApp."
        : "Location, hours and directions to Dulce Café at PH Central Park, Transístmica, Panama. Open daily 6:00 a.m. – 10:00 p.m. Orders via WhatsApp.",
  });

  const infoCards = [
    {
      icon: Phone,
      title: p.callTitle,
      value: BRAND.phoneDisplay,
      href: `tel:${BRAND.phoneDisplay.replace(/\s|-/g, "")}`,
    },
    { icon: Truck, title: p.deliveryTitle, value: p.deliveryDesc },
    { icon: Car, title: p.parkingTitle, value: p.parkingDesc },
  ];

  return (
    <>
      <PageHeader overline={p.overline} title={p.title} subtitle={p.subtitle} />

      <section data-testid="visitanos-page" className="relative bg-[#f6efde] py-12 sm:py-16 overflow-hidden">
        <div className="tex-paper" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* map + directions */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden ring-1 ring-[#d8cdb3] shadow-xl h-[320px] sm:h-[420px]"
            >
              <iframe
                title="Mapa Dulce Café"
                data-testid="visitanos-map"
                src={`https://www.google.com/maps?q=${BRAND.mapsQuery}&output=embed`}
                className="h-full w-full"
                style={{ border: 0, filter: "saturate(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={dirUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="directions-google"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#2c3425] px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#4a5440] transition-colors"
              >
                <Navigation size={17} />
                {p.directions}
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="directions-waze"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-6 py-3.5 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
              >
                <MapPin size={17} />
                {p.waze}
              </a>
            </div>
          </div>

          {/* address + hours + info */}
          <div>
            <div className="rounded-3xl glass p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8a987a] text-[#f6efde] shrink-0">
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a987a]">
                    {t.contact.addressLabel}
                  </p>
                  <p className="text-base sm:text-lg text-[#2c3425]">{t.contact.address}</p>
                </div>
              </div>
            </div>

            {/* hours table */}
            <div className="mt-5 rounded-3xl glass p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#8a987a]" />
                <h2 className="font-display text-xl text-[#2c3425]">{p.hoursTitle}</h2>
              </div>
              <ul className="mt-4 divide-y divide-[#d8cdb3]/60">
                {DAY_KEYS.map((d) => (
                  <li key={d} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-[#4a5440]">{t.days[d]}</span>
                    <span className="text-[#758269]">{p.hoursValue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* info cards */}
            <div className="mt-5 grid gap-4">
              {infoCards.map((c) => (
                <div key={c.title} className="flex items-start gap-4 rounded-2xl paper p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eae2cc] text-[#6c7a5d] shrink-0">
                    <c.icon size={19} />
                  </span>
                  <div>
                    <p className="font-display text-lg text-[#2c3425]">{c.title}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-[#8a987a] hover:underline">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[#758269] leading-relaxed">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={waLink(
                lang === "es"
                  ? "¡Hola Dulce Café! Quisiera coordinar un pedido 🥐"
                  : "Hello Dulce Café! I'd like to arrange an order 🥐"
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="visitanos-whatsapp"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#8a987a] px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#6c7a5d] transition-colors"
            >
              <MessageCircle size={17} />
              {t.contact.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
