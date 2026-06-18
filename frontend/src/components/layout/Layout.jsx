import { Outlet } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/cafe/Navbar";
import Contact from "@/components/cafe/Contact";
import WhatsAppButton from "@/components/cafe/WhatsAppButton";
import MobileTabBar from "@/components/cafe/MobileTabBar";
import ScrollToTop from "@/components/cafe/ScrollToTop";

export default function Layout() {
  useSmoothScroll();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Contact />
      <WhatsAppButton />
      <MobileTabBar />
    </>
  );
}
