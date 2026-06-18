import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Croissant, Heart, Home as HomeIcon, ArrowRight, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { waLink } from "@/i18n/translations";
import { IMAGES } from "@/data/menu";
import { useSeo } from "@/hooks/useSeo";
import PageHeader from "@/components/cafe/PageHeader";
import { ParallaxBlob } from "@/components/cafe/Parallax";

const ICONS = [Croissant, Heart, HomeIcon];

export default function NosotrosPage() {
  const { t, lang } = useLang();
  const p = t.pages.nosotros;
  useSeo({
    title:
      lang === "es"
        ? "Nosotros · Dulce Café — Panadería Venezolana en Panamá"
        : "About · Dulce Café — Venezuelan Bakery in Panama",
    description:
      lang === "es"
        ? "Conoce la historia de Dulce Café, panadería y pastelería venezolana artesanal en PH Central Park, Transístmica, Panamá. Tradición horneada desde 2024."
        : "Discover the story of Dulce Café, an artisanal Venezuelan bakery in PH Central Park, Transístmica, Panama. Baking tradition since 2024.",
  });

  return (
    <>
      <PageHeader overline={p.overline} title={p.title} subtitle={p.subtitle} />

      {/* story */}
      <section className="relative bg-[#f6efde] py-14 sm:py-20 overflow-hidden">
        <div className="tex-paper" aria-hidden />
        <ParallaxBlob className="top-10 -left-24" color="#bec8a1" size={360} blur={120} opacity={0.4} speed={80} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            {[p.p1, p.p2, p.p3].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`${i === 0 ? "fluid-body text-[#4a5440]" : "text-base text-[#758269]"} leading-relaxed mb-4 max-w-xl`}
              >
                {para}
              </motion.p>
            ))}
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-2 gap-4">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              src={IMAGES.cafeCozy}
              alt="Interior Dulce Café"
              className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full row-span-2 aspect-[3/4]"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              src={IMAGES.cachitos}
              alt="Cachitos"
              className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full aspect-square"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              src={IMAGES.golfeados}
              alt="Golfeados"
              className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full aspect-square"
            />
          </div>
        </div>
      </section>

      {/* quote */}
      <section className="relative bg-[#2c3425] text-[#f6efde] py-16 sm:py-24 overflow-hidden">
        <ParallaxBlob className="-top-20 right-1/4" color="#8a987a" size={340} blur={120} opacity={0.25} speed={70} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-display fluid-h2 leading-tight italic">“{p.quote}”</p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#bec8a1]">Dulce Café · 2024</p>
        </div>
      </section>

      {/* values */}
      <section className="relative bg-[#f6efde] py-14 sm:py-20 overflow-hidden">
        <div className="tex-paper" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <h2 className="font-display fluid-h2 text-[#2c3425] tracking-tight text-center">
            {p.valuesTitle}
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {p.values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl paper p-7 text-center"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#8a987a] text-[#f6efde]">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-[#2c3425]">{v.title}</h3>
                  <p className="mt-2 text-sm text-[#758269] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mesh-bg py-16 sm:py-24 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display fluid-h2 text-[#2c3425] tracking-tight">{p.ctaTitle}</h2>
          <p className="mt-4 fluid-body text-[#4a5440]">{p.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={waLink(
                lang === "es"
                  ? "¡Hola Dulce Café! Quisiera hacer un pedido 🥐"
                  : "Hello Dulce Café! I'd like to place an order 🥐"
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nosotros-whatsapp"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2c3425] px-7 py-4 text-sm font-medium text-[#f6efde] hover:bg-[#4a5440] transition-colors"
            >
              <MessageCircle size={18} />
              {t.nav.order}
            </a>
            <Link
              to="/visitanos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a987a] px-7 py-4 text-sm font-medium text-[#2c3425] hover:bg-[#8a987a] hover:text-[#f6efde] transition-colors"
            >
              {t.nav.contact}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
