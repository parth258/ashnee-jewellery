import { useRef, useState } from "react";
import { Diamond } from "./Diamond";

export const ProductGallery = ({ images = [], label, testId }) => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef(null);
  const hasImages = images && images.length > 0;
  const current = hasImages ? images[active] : null;

  const handleMouseMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const getTouchOrigin = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const handleTouchStart = (e) => {
    if (hovering) {
      setHovering(false);
      return;
    }
    setOrigin(getTouchOrigin(e));
    setHovering(true);
  };

  const handleTouchMove = (e) => {
    if (!hovering) return;
    e.preventDefault();
    setOrigin(getTouchOrigin(e));
  };

  return (
    <div data-testid={testId}>
      <div
        ref={frameRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="relative aspect-[4/5] overflow-hidden border border-hairline bg-sand shadow-[0_24px_70px_-20px_rgba(150,62,53,0.25)]"
      >
        {current ? (
          <img
            src={current}
            alt={label || "Ashnee jewellery"}
            style={{
              transform: hovering ? "scale(2.2)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
            className={`h-full w-full object-cover ${hovering ? "cursor-zoom-out" : "cursor-zoom-in"} transition-transform duration-300 ease-out`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_28%,#F6EDE2_0%,#E8DCD0_72%)]">
            <Diamond className="h-6 w-6 text-maroon/30" />
            {label && (
              <span className="px-4 text-center text-[10px] uppercase tracking-[0.3em] text-clay/70">{label}</span>
            )}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(246,237,226,0.35)]" />
      </div>

      {hasImages && images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              data-testid={`${testId}-thumb-${i}`}
              aria-label={`View image ${i + 1}`}
              className={`aspect-square w-16 shrink-0 overflow-hidden border transition-colors duration-300 sm:w-20 ${
                active === i ? "border-maroon" : "border-hairline hover:border-maroon/50"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};