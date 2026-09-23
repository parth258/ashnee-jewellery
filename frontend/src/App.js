import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
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
const scrollPositions = new Map();

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
const ScrollManager = ({ lenisRef }) => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      const y = lenisRef.current ? lenisRef.current.scroll : window.scrollY;
      scrollPositions.set(location.pathname, y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, lenisRef]);

useEffect(() => {
  const savedY = scrollPositions.get(location.pathname);
  const shouldRestore = navigationType === "POP" && savedY !== undefined;
  const target = shouldRestore ? savedY : 0;

  console.log("SCROLL DEBUG:", JSON.stringify({ pathname: location.pathname, navigationType, savedY, target }));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(target, { immediate: true });
      } else {
        window.scrollTo(0, target);
      }
    });
  });
  }, [location.pathname, navigationType]);

    return null;
};
function App() {
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return (
    <BrowserRouter>
      <ScrollManager lenisRef={lenisRef} />
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