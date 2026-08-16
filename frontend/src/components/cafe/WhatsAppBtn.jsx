import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const waHref =
  "https://wa.me/50767453546?text=%C2%A1Hola%20Dulce%20Caf%C3%A9!%20Quisiera%20hacer%20un%20pedido%20%F0%9F%A5%90";

export default function WhatsAppBtn() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onCartUpdate = (e) => {
      if (e.detail?.count > 0) setVisible(false);
    };
    window.addEventListener("dulce-cafe:cart-update", onCartUpdate);
    return () => window.removeEventListener("dulce-cafe:cart-update", onCartUpdate);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end gap-3">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-lg max-w-[200px]"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-muted text-white text-[10px] grid place-items-center hover:bg-brand-olive transition-colors"
            >
              ✕
            </button>
            <p className="text-xs text-brand-olive leading-snug">
              ¡Hola, Soy Fabi!<br />¿Quieres hacer un pedido o consulta?
            </p>
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white rotate-45 rounded-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp"
        aria-label="WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="wa-pulse h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl grid"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden>
          <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.59h.01c7.06 0 12.8-5.74 12.8-12.8s-5.75-12.67-12.81-12.67zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.58 10.58 0 0 1-1.62-5.62c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.53c0 5.87-4.78 10.64-10.65 10.64zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </motion.a>
    </div>
  );
}
