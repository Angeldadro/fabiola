/// <reference types="astro/client" />

interface Window {
  __lenis?: import("lenis").Lenis;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

