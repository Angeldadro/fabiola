import "@/App.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/cafe/Navbar";
import Hero from "@/components/cafe/Hero";
import About from "@/components/cafe/About";
import Menu from "@/components/cafe/Menu";
import Gallery from "@/components/cafe/Gallery";
import Testimonials from "@/components/cafe/Testimonials";
import Contact from "@/components/cafe/Contact";
import WhatsAppButton from "@/components/cafe/WhatsAppButton";

function App() {
  useSmoothScroll();

  return (
    <LanguageProvider>
      <div className="App" data-testid="app-root">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <Testimonials />
        </main>
        <Contact />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
