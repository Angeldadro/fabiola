import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, waLink } from "@/i18n/translations";

const LOGO = `${process.env.PUBLIC_URL}/logo-dulce.png`;

export default function Contact() {
  const { t, lang } = useLang();

  const rows = [
    { icon: MapPin, label: t.contact.addressLabel, value: t.contact.address },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: BRAND.phoneDisplay,
      href: `tel:${BRAND.phoneDisplay.replace(/\s|-/g, "")}`,
    },
    { icon: Clock, label: t.contact.hoursLabel, value: t.contact.hours },
  ];

  return (
    <footer
      id="contacto"
      data-testid="contact-section"
      className="relative bg-[#2c3425] text-[#f6efde] pt-16 sm:pt-20 md:pt-28 overflow-hidden"
    >
      <div
        className="absolute -top-32 right-0 h-[360px] w-[360px] rounded-full bg-[#8a987a]/20 blur-[120px]"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* left */}
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#bec8a1]">
              — {t.contact.overline}
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-[2.1rem] sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              {t.contact.title}
            </h2>

            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f6efde]/10 text-[#bec8a1] shrink-0">
                    <r.icon size={19} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#bec8a1]">
                      {r.label}
                    </p>
                    {r.href ? (
                      <a
                        href={r.href}
                        data-testid="contact-phone"
                        className="text-base sm:text-lg text-[#f6efde] hover:text-[#bec8a1] transition-colors"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg text-[#f6efde]">{r.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={waLink(
                  lang === "es"
                    ? "¡Hola Dulce Café! Quisiera más información 🥐"
                    : "Hello Dulce Café! I'd like more information 🥐"
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8a987a] px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#6c7a5d] transition-colors"
              >
                <MessageCircle size={17} />
                {t.contact.cta}
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-instagram"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f6efde]/25 px-6 py-3.5 text-sm font-medium text-[#f6efde] hover:bg-[#f6efde]/10 transition-colors"
              >
                <Instagram size={17} />
                {BRAND.instagramHandle}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden ring-1 ring-[#f6efde]/15 shadow-2xl h-[300px] sm:h-[380px] lg:h-[440px]"
          >
            <iframe
              title="Mapa Dulce Café"
              data-testid="contact-map"
              src={`https://www.google.com/maps?q=${BRAND.mapsQuery}&output=embed`}
              className="h-full w-full"
              style={{ border: 0, filter: "saturate(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* bottom */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-[#f6efde]/10 flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="Dulce Café" className="h-16 w-auto object-contain" />
            <div className="leading-tight">
              <p className="font-display text-2xl">Dulce Café</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#bec8a1]">
                {t.contact.tagline}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#bec8a1] text-center sm:text-right">
            © {new Date().getFullYear()} Dulce Café. {t.contact.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
