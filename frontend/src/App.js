import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import CollectionPage from "@/pages/CollectionPage";
import ProductPage from "@/pages/ProductPage";
import SearchPage from "@/pages/SearchPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-ivory font-sans text-charcoal antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-multiply"
          style={{ backgroundImage: `url("${GRAIN}")` }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gold-jewellery" element={<CollectionPage key="gold" metal="gold" />} />
          <Route path="/silver-jewellery" element={<CollectionPage key="silver" metal="silver" />} />
	  <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}
export default App;
