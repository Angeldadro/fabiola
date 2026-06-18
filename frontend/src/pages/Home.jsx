import { useSeo } from "@/hooks/useSeo";
import Hero from "@/components/cafe/Hero";
import About from "@/components/cafe/About";
import Menu from "@/components/cafe/Menu";
import Gallery from "@/components/cafe/Gallery";
import Testimonials from "@/components/cafe/Testimonials";

export default function Home() {
  useSeo();
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Testimonials />
    </>
  );
}
