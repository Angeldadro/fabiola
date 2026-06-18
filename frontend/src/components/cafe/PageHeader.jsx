import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { ParallaxBlob } from "./Parallax";

export default function PageHeader({ overline, title, subtitle }) {
  const { t } = useLang();
  return (
    <section className="relative mesh-bg overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="tex-paper" aria-hidden />
      <ParallaxBlob className="-top-20 -right-16" color="#8a987a" size={360} blur={120} opacity={0.3} speed={70} />
      <ParallaxBlob className="bottom-0 -left-16" color="#bec8a1" size={300} blur={120} opacity={0.4} speed={-60} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-[#758269]">
          <Link to="/" className="hover:text-[#2c3425] transition-colors">
            {t.nav.home}
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#4a5440] font-medium">{title}</span>
        </nav>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 block text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#8a987a]"
        >
          — {overline}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-3 font-display fluid-hero text-[#2c3425] tracking-tight max-w-4xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-5 fluid-body text-[#4a5440] max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
