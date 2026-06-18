import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import MenuPage from "@/pages/MenuPage";
import NosotrosPage from "@/pages/NosotrosPage";
import VisitanosPage from "@/pages/VisitanosPage";

function App() {
  return (
    <LanguageProvider>
      <div className="App" data-testid="app-root">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/visitanos" element={<VisitanosPage />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
