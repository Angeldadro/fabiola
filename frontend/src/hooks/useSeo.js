import { useEffect } from "react";

const DEFAULTS = {
  title: "Dulce Café · Panadería y Pastelería Venezolana en Panamá",
  description:
    "Dulce Café — Panadería y pastelería venezolana artesanal en PH Central Park, Transístmica, Panamá. Cachitos, pan de jamón, tequeños, tortas y café recién hecho. Pide por WhatsApp.",
};

export function useSeo({ title, description } = {}) {
  useEffect(() => {
    document.title = title || DEFAULTS.title;
    const desc = description || DEFAULTS.description;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", desc);
    return () => {
      document.title = DEFAULTS.title;
    };
  }, [title, description]);
}
