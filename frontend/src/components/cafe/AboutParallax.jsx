import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IMAGES } from "../../data/menu";

export default function AboutParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="lg:col-span-5 relative order-2 lg:order-1">
      <motion.div
        style={{ y: yImg }}
        className="arch overflow-hidden shadow-2xl ring-1 ring-[#d8cdb3] aspect-[4/5] max-w-sm mx-auto lg:max-w-none"
      >
        <img src={IMAGES.cafeCozy} alt="Interior Dulce Café" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -bottom-5 right-4 sm:right-10 lg:right-2 glass-dark text-[#f6efde] rounded-2xl px-5 py-3.5"
      >
        <p className="font-display text-2xl sm:text-3xl leading-none">2024</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#bec8a1] mt-1">Central Park · PTY</p>
      </motion.div>
    </div>
  );
}
