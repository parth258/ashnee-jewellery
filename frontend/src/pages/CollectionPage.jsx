import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, ArrowDown, RotateCcw } from "lucide-react";
import { DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { GOLD_PRODUCTS, SILVER_PRODUCTS, CATEGORIES } from "@/data/products";

const CONFIG = {
  gold: {
    title: "Gold Jewellery",
    crumb: "Gold Jewellery",
    desc: "Exquisite gold jewellery crafted to celebrate your most precious moments.",
    products: GOLD_PRODUCTS,
    purities: ["18K Gold", "22K Gold"],
    testId: "gold",
  },
  silver: {
    title: "Silver Jewellery",
    crumb: "Silver Jewellery",
    desc: "Classic silver designs that add grace to your everyday style.",
    products: SILVER_PRODUCTS,
    purities: ["92.5 Sterling"],
    testId: "silver",
  },
};

const PAGE_SIZE = 6;

const CollectionPage = ({ metal }) => {
  const cfg = CONFIG[metal];
  const [category, setCategory] = useState("All");
  const [purity, setPurity] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, purity]);

  const categories = useMemo(() => {
    const present = new Set(cfg.products.map((p) => p.category));
    return ["All", ...CATEGORIES.filter((c) => present.has(c))];
  }, [cfg]);

  const filtered = useMemo(() => {
    return cfg.products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (purity.length === 0 || purity.includes(p.purity))
    );
  }, [cfg, category, purity]);

  const shown = filtered.slice(0, visible);

  const togglePurity = (value) =>
    setPurity((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]));

  const hasActiveFilters = category !== "All" || purity.length > 0;

  const resetFilters = () => {
    setCategory("All");
    setPurity([]);
  };

  return (
    <main data-testid={`${cfg.testId}-collection-page`}>
      <section className="bg-maroon text-ivory">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:py-20">
          <Reveal>
            <nav data-testid="breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
              <Link to="/" className="transition-colors duration-300 hover:text-gold" data-testid="breadcrumb-home">Home</Link>
              <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
              <span className="text-gold">{cfg.crumb}</span>
            </nav>
            <h1 data-testid="collection-title" className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {cfg.title}
            </h1>
            <DiamondDivider className="mt-6 justify-start text-ivory" />
            <p data-testid="collection-description" className="mt-6 max-w-lg text-sm font-light leading-relaxed text-ivory/75">
              {cfg.desc}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:px-12 lg:grid-cols-[260px_1fr] lg:py-24">
        <aside
          data-testid="filter-sidebar"
          className="space-y-8 border border-hairline bg-sand/40 p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start"
        >
          <div className="flex items-center justify-between gap-4 border-b border-hairline pb-5">
            <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-charcoal">
              <SlidersHorizontal className="h-3.5 w-3.5 text-maroon" strokeWidth={1.5} /> Filter
            </h3>
            <button
              data-testid="filter-reset"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-clay transition-colors duration-300 hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset All <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="border-b border-hairline pb-8">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-clay">Categories</h4>
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  data-testid={`filter-category-${c.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setCategory(c)}
                  className={`w-full rounded-full border px-8 py-2.5 text-sm font-light transition-colors duration-300 ${
                    category === c
                      ? "border-maroon bg-maroon text-ivory"
                      : "border-maroon/30 text-charcoal hover:border-maroon hover:text-maroon"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-clay">Metal Purity</h4>
            <div className="mt-5 flex flex-wrap gap-3">
              {cfg.purities.map((p) => (
                <label
                  key={p}
                  data-testid={`filter-purity-${p.toLowerCase().replace(/[\s.]+/g, "-")}`}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-5 py-3 text-sm font-light transition-colors duration-300 ${
                    purity.includes(p) ? "border-maroon text-maroon" : "border-maroon/30 text-charcoal"
                  }`}
                >
                  <Checkbox
                    checked={purity.includes(p)}
                    onCheckedChange={() => togglePurity(p)}
                    className="border-maroon/40 data-[state=checked]:bg-maroon data-[state=checked]:text-ivory"
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-hairline pb-6">
            <p data-testid="results-count" className="text-xs uppercase tracking-[0.25em] text-clay">
              {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}
            </p>
          </div>

          {shown.length > 0 ? (
            <div data-testid="product-grid" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-3">
              {shown.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div data-testid="empty-results" className="mt-24 text-center">
              <DiamondDivider className="text-charcoal" />
              <p className="mt-6 font-serif text-2xl text-charcoal">No pieces match your filters.</p>
              <p className="mt-3 text-sm font-light text-clay">Try choosing another category or purity.</p>
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-16 text-center">
              <button
                data-testid="load-more-button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-3 border border-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-maroon hover:text-ivory"
              >
                Load More <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CollectionPage;