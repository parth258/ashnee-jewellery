import { Link, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight, Gem, HandHeart, ShieldCheck, Truck } from "lucide-react";
import { DiamondDivider, Diamond } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { JewelFrame } from "@/components/JewelFrame";
import { ProductCard } from "@/components/ProductCard";
import { findProduct, ALL_PRODUCTS } from "@/data/products";

const ASSURANCES = [
  { icon: Gem, text: "BIS hallmarked & certified", testId: "assurance-certified" },
  { icon: HandHeart, text: "Handcrafted by master karigars", testId: "assurance-handcrafted" },
  { icon: ShieldCheck, text: "Secure, insured delivery", testId: "assurance-delivery" },
  { icon: Truck, text: "7-day easy exchange", testId: "assurance-exchange" },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = findProduct(id);

  if (!product) {
    return (
      <main data-testid="product-not-found" className="mx-auto max-w-7xl px-6 py-32 text-center md:px-12">
        <DiamondDivider className="text-charcoal" />
        <h1 className="mt-8 font-serif text-4xl text-charcoal">This piece has found a home.</h1>
        <p className="mt-4 text-sm font-light text-clay">The jewellery you are looking for is no longer listed.</p>
        <Link
          to="/gold-jewellery"
          data-testid="not-found-back-link"
          className="mt-10 inline-flex items-center gap-3 border border-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-maroon hover:text-ivory"
        >
          Browse Collections <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </main>
    );
  }

  const collectionPath = product.purity.includes("Sterling") ? "/silver-jewellery" : "/gold-jewellery";
  const collectionName = product.purity.includes("Sterling") ? "Silver Jewellery" : "Gold Jewellery";
  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main data-testid="product-page">
      <section className="bg-maroon text-ivory">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          <nav data-testid="product-breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
            <Link to="/" className="transition-colors duration-300 hover:text-gold" data-testid="product-breadcrumb-home">Home</Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <Link to={collectionPath} className="transition-colors duration-300 hover:text-gold" data-testid="product-breadcrumb-collection">{collectionName}</Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <span className="text-gold">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-16 md:px-12 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <JewelFrame label={product.category} aspect="aspect-[4/5]" testId="product-detail-image" className="shadow-[0_24px_70px_-20px_rgba(150,62,53,0.25)]" />
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col justify-center">
          <p data-testid="product-detail-category" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-maroon">
            <Diamond className="h-2.5 w-2.5 text-gold" /> {product.category}
          </p>
          <h1 data-testid="product-detail-name" className="mt-6 font-serif text-4xl tracking-tight text-charcoal sm:text-5xl">
            {product.name}
          </h1>
          <DiamondDivider className="mt-8 justify-start text-charcoal" />
          <p data-testid="product-detail-description" className="mt-8 max-w-lg text-base font-light leading-relaxed text-clay">
            {product.description}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay">Purity</dt>
              <dd data-testid="product-detail-purity" className="mt-2 text-sm text-charcoal">{product.purity}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay">Weight</dt>
              <dd data-testid="product-detail-weight" className="mt-2 text-sm text-charcoal">{product.weight}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay">Detailing</dt>
              <dd data-testid="product-detail-stones" className="mt-2 text-sm text-charcoal">{product.stones}</dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap gap-5">
            <Link
              to="/contact"
              data-testid="product-enquire-button"
              className="inline-flex items-center gap-3 bg-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:bg-maroon-dark"
            >
              Enquire About This Piece <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              to={collectionPath}
              data-testid="product-back-link"
              className="inline-flex items-center gap-3 border border-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-maroon hover:text-ivory"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to {collectionName}
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-5">
            {ASSURANCES.map((a) => (
              <li key={a.text} data-testid={a.testId} className="flex items-center gap-3 text-xs font-light text-clay">
                <a.icon className="h-4 w-4 shrink-0 text-maroon" strokeWidth={1.25} />
                {a.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section data-testid="related-section" className="border-t border-hairline bg-sand/50">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:py-24">
            <Reveal className="text-center">
              <DiamondDivider testId="related-divider" className="text-charcoal" />
              <h2 data-testid="related-heading" className="mt-6 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
                You May Also Adore
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;