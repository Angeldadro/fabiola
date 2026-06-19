import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IMAGES } from "../../data/menu";

export default function NosotrosParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-2 gap-4">
      <motion.img
        style={{ y: y1 }}
        src={IMAGES.cafeCozy}
        alt="Interior Dulce Café"
        className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full row-span-2 aspect-[3/4]"
      />
      <motion.img
        style={{ y: y2 }}
        src={IMAGES.cachitos}
        alt="Cachitos"
        className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full aspect-square"
      />
      <motion.img
        style={{ y: y3 }}
        src={IMAGES.golfeados}
        alt="Golfeados"
        className="rounded-3xl ring-1 ring-[#d8cdb3] object-cover h-full w-full aspect-square"
      />
    </div>
  );
}
