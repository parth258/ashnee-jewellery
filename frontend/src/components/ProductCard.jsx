import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Diamond } from "./Diamond";

export const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

export const ProductCard = ({ product, index = 0 }) => {
  const images = product.images && product.images.length > 0 ? product.images : null;
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);
  const didSwipe = useRef(false);

  const computeZone = (clientX, rect) => {
    const x = clientX - rect.left;
    const zoneWidth = rect.width / images.length;
    return Math.min(images.length - 1, Math.max(0, Math.floor(x / zoneWidth)));
  };

  const handleMouseMove = (e) => {
    if (!images || images.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setActive(computeZone(e.clientX, rect));
  };

  const handleMouseLeave = () => {
    setActive(0);
  };

  // Touch equivalents so the image zone-swap works on phones too.
  const handleTouchStart = (e) => {
    if (!images || images.length < 2) return;
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    setActive(computeZone(e.touches[0].clientX, rect));
  };

  const handleTouchMove = (e) => {
    if (!images || images.length < 2) return;
    if (touchStartX.current !== null && Math.abs(e.touches[0].clientX - touchStartX.current) > 8) {
      didSwipe.current = true;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setActive(computeZone(e.touches[0].clientX, rect));
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // If the finger dragged sideways to preview another photo, treat it as a
  // swipe and cancel the tap so the card doesn't navigate away mid-preview.
  const handleClickCapture = (e) => {
    if (didSwipe.current) {
      e.preventDefault();
      didSwipe.current = false;
    }
  };

  return (
    <motion.article
      data-testid={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <Link
        to={`/product/${product.id}`}
        data-testid={`product-link-${product.id}`}
        className="block"
        onClickCapture={handleClickCapture}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          data-testid={`product-image-${product.id}`}
          className="relative aspect-[4/5] overflow-hidden border border-hairline bg-sand transition-shadow duration-500 group-hover:shadow-[0_18px_50px_-12px_rgba(150,62,53,0.28)] group-active:shadow-[0_18px_50px_-12px_rgba(150,62,53,0.28)]"
        >
          {images ? (
            <img
              src={images[active]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_28%,#F6EDE2_0%,#E8DCD0_72%)]">
              <Diamond className="h-6 w-6 text-maroon/30" />
              <span className="px-4 text-center text-[10px] uppercase tracking-[0.3em] text-clay/70">{product.category}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(246,237,226,0.35)]" />

          {/* {images && images.length > 1 && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    active === i ? "w-4 bg-gold" : "w-1 bg-ivory/70"
                  }`}
                />
              ))}
            </div>
          )} */}
        </div>
        <div className="mt-5 text-center">
          <h3 data-testid={`product-name-${product.id}`} className="font-serif text-lg text-charcoal transition-colors duration-300 group-hover:text-maroon group-active:text-maroon">
            {product.name}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-clay">{product.purity}</p>
        </div>
      </Link>
    </motion.article>
  );
};