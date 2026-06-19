import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GALLERY } from "../../data/menu";

const TILES = GALLERY.slice(0, 6);
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
];

export default function GalleryParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const up = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const down = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[210px] gap-2.5 sm:gap-4 grid-flow-dense">
      {TILES.map((g, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.07 }}
          data-testid={`gallery-item-${i}`}
          className={`grain relative overflow-hidden rounded-2xl ring-1 ring-brand-border group ${SPANS[i % SPANS.length]}`}
        >
          <motion.img
            src={g.src}
            alt={g.alt}
            loading="lazy"
            style={{ y: i % 2 === 0 ? up : down }}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="absolute -inset-x-0 -top-[14%] h-[128%] w-full object-cover"
          />
          <div className="absolute inset-0 z-[2] bg-brand-olive/0 group-hover:bg-brand-olive/15 transition-colors duration-500" />
        </motion.figure>
      ))}
    </div>
  );
}
