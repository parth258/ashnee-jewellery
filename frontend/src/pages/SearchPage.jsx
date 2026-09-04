import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ALL_PRODUCTS } from "@/data/products";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <main data-testid="search-page">
      <section className="bg-maroon text-ivory">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-12 lg:py-20">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Find Your Piece</p>
            <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              Search <span className="italic text-gold">Ashnee</span>
            </h1>
            <DiamondDivider className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-12">
        <Reveal>
          <div className="flex items-center border-b border-hairline focus-within:border-maroon">
            <SearchIcon className="h-4 w-4 shrink-0 text-clay" strokeWidth={1.5} />
            <input
              data-testid="search-input"
              type="text"
              autoFocus
              value={query}
              onChange={handleChange}
              placeholder="Search by product name (e.g. Gold Ring, Silver Bangles)"
              className="w-full bg-transparent px-4 py-4 text-base font-light text-charcoal placeholder:text-clay/50 focus:outline-none"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:pb-32">
        {query.trim() === "" ? (
          <p data-testid="search-empty-state" className="text-center text-sm font-light text-clay">
            Start typing to search our collections.
          </p>
        ) : results.length > 0 ? (
          <>
            <p data-testid="search-results-count" className="mb-10 text-xs uppercase tracking-[0.25em] text-clay">
              {results.length} {results.length === 1 ? "Result" : "Results"} for &ldquo;{query}&rdquo;
            </p>
            <div data-testid="search-results-grid" className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </>
        ) : (
          <div data-testid="search-no-results" className="text-center">
            <DiamondDivider className="text-charcoal" />
            <p className="mt-6 font-serif text-2xl text-charcoal">No pieces found for &ldquo;{query}&rdquo;</p>
            <p className="mt-3 text-sm font-light text-clay">Try a different name, like &ldquo;Ring&rdquo; or &ldquo;Necklace&rdquo;.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchPage;