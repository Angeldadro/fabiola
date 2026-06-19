import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const LS_KEY = "dc_flash_offer_seen";

export default function FlashOfferPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(LS_KEY)) return;
    const timer = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Focus trap: cycle Tab inside modal
  useEffect(() => {
    if (!show || !modalRef.current) return;
    const el = modalRef.current;
    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem(LS_KEY, "submitted");
    setSubmitted(true);
    setTimeout(() => setShow(false), 2000);
  };

  const handleClose = () => {
    localStorage.setItem(LS_KEY, "closed");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Ofertas flash"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-brand-border"
          >
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-full text-brand-muted hover:bg-brand-cream transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-sage text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <h3 className="font-display text-2xl text-brand-olive">Gracias!</h3>
                <p className="mt-2 text-sm text-brand-muted">Te avisaremos de nuestras ofertas flash.</p>
              </div>
            ) : (
              <>
                <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-brand-cream flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-sage"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>

                <h2 className="text-center font-display text-2xl sm:text-3xl text-brand-olive tracking-tight">
                  Listo para una oferta flash?
                </h2>
                <p className="mt-3 text-center text-sm text-brand-muted leading-relaxed">
                  Promociones y sorpresas que duran poco. Djanos tus datos y no te pierdas ninguna.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div>
                    <label htmlFor="flash-name" className="sr-only">Tu nombre</label>
                    <input
                      id="flash-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-brand-border bg-brand-cream-2/50 px-4 py-3 text-sm text-brand-olive placeholder-brand-muted outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="flash-email" className="sr-only">Tu correo electrónico</label>
                    <input
                      id="flash-email"
                      type="email"
                      required
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-brand-border bg-brand-cream-2/50 px-4 py-3 text-sm text-brand-olive placeholder-brand-muted outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-sage py-3 text-sm font-semibold text-brand-cream hover:bg-brand-sage-dark transition-colors"
                  >
                    Quiero recibir ofertas
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] text-brand-muted/60 leading-relaxed">
                  No enviaremos spam, solo informacin de valor. Puedes cancelar en cualquier momento.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
