import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative parallax wrapper. Drifts children on the Y axis as the
 * element scrolls through the viewport. Use for background shapes and
 * accent media — not for primary text blocks.
 */
export function Parallax({ children, speed = 50, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/** Soft floating brand-colored blob with scroll parallax. */
export function ParallaxBlob({ className = "", speed = 80, color = "#bec8a1", size = 360, blur = 100, opacity = 0.4 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        y,
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      className={`pointer-events-none absolute rounded-full ${className}`}
    />
  );
}
