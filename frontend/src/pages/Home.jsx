import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gem } from "lucide-react";
import { Diamond, DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { JewelFrame } from "@/components/JewelFrame";
import { ProductCard } from "@/components/ProductCard";
import { GOLD_PRODUCTS, SILVER_PRODUCTS } from "@/data/products";
import heroBanner from "@/assets/hero/hero-banner.jpeg";
import bondOfBlessing from "@/assets/story/bond-of-blessing.jpeg";

const HERO_IMG = heroBanner;
const GOLD_IMG =
  "https://images.unsplash.com/photo-1688382654723-a7366006519b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg2MzY0NTIyfDA&ixlib=rb-4.1.0&q=85";
const SILVER_IMG =
  "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBkaWFtb25kJTIwbmVja2xhY2UlMjBtYWNyb3xlbnwwfHx8fDE3ODYzNjQ1MzN8MA&ixlib=rb-4.1.0&q=85";
const BOND_IMG = bondOfBlessing;
  

const MARQUEE_WORDS = [
  "Diamond",
  "Silver",
  "Gemstones",
  "Fine Jewellary",
  "Solitaire",
  "Handcrafted jewellery",
  "Heirloom pieces",
];

const MaskedLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const CollectionCard = ({ title, lines, blurb, cta, to, image, testId }) => (
  <Reveal testId={testId} className="h-full">
    <div className="group grid overflow-hidden border border-hairline bg-maroon text-ivory shadow-[0_10px_40px_-10px_rgba(150,62,53,0.15)] sm:grid-cols-2 lg:min-h-[470px]">
            <div className="flex h-full flex-col gap-5 p-10 lg:p-12">
        <h3 className="font-serif text-3xl leading-tight">
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h3>

        <DiamondDivider
          testId={`${testId}-divider`}
          className="justify-start text-ivory"
        />

        <p className="text-sm font-light leading-relaxed text-ivory/75">
          {blurb}
        </p>

        <div className="mt-auto pt-5">
          <Link
              to={to}
              data-testid={`${testId}-cta`}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-8 py-3 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              {cta}
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
        </div>
      </div>

      <div className="relative min-h-[280px] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-maroon/10" />
      </div>
    </div>
  </Reveal>
);

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  const featured = [GOLD_PRODUCTS[0], GOLD_PRODUCTS[1], GOLD_PRODUCTS[3], SILVER_PRODUCTS[2]];

  return (
    <main data-testid="home-page">
            <section ref={heroRef} data-testid="hero-section" className="relative w-full overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="relative">
          <img
            src={HERO_IMG}
            alt="Ashnee jewellery — made to feel special, made to last forever"
            className="h-auto w-full object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent" />
      </section>

      <section data-testid="editorial-marquee" className="overflow-hidden border-b border-hairline bg-ivory py-7">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {MARQUEE_WORDS.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center gap-12 pr-12 text-xs uppercase tracking-[0.4em] text-maroon/70">
                  {w}
                  <Diamond className="h-2.5 w-2.5 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section data-testid="collections-section" className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:px-12 lg:pt-32 lg:pb-20">
        <Reveal className="text-center">
          <DiamondDivider testId="collections-divider" className="text-charcoal" />
          <h2 data-testid="collections-heading" className="mt-6 font-serif text-4xl tracking-tight text-charcoal sm:text-5xl">
            EXPLORE COLLECTION
          </h2>
          <p className="mt-4 text-sm font-light uppercase tracking-[0.3em] text-clay">Made for the moments you’ll remember</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <CollectionCard
            title="Gold Jewellery"
            lines={["Gold", "Jewellery"]}
            blurb="Gold that carries memories from one generation to the next."
            cta="Explore Gold"
            to="/gold-jewellery"
            image={GOLD_IMG}
            testId="collection-card-gold"
          />
          <CollectionCard
            title="Silver Jewellery"
            lines={["Silver", "Jewellery"]}
            blurb="Silver that becomes part of your everyday story."
            cta="Explore Silver"
            to="/silver-jewellery"
            image={SILVER_IMG}
            testId="collection-card-silver"
          />
        </div>
      </section>

      <section data-testid="featured-section" className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:px-12 lg:pt-20 lg:pb-32">
        <Reveal className="text-center">
          <DiamondDivider testId="featured-divider" className="text-charcoal" />
          <h2 data-testid="featured-heading" className="mt-6 font-serif text-4xl tracking-tight text-charcoal sm:text-5xl">
            The Signature Edit
          </h2>
          <p className="mt-4 text-sm font-light uppercase tracking-[0.3em] text-clay">Handpicked pieces, blessed beginnings</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 text-center">
       <Link
        to="/gold-jewellery"
        data-testid="featured-view-all-button"
        className="inline-flex items-center gap-2 rounded-full border border-maroon px-8 py-2.5 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-maroon hover:text-ivory"
      >
        View All Pieces <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </Link>
        </Reveal>
      </section>

      <section data-testid="about-teaser-section" className="relative w-full overflow-hidden">
        <img
          src={BOND_IMG}
          alt="Ashnee craftsman setting a ruby and diamond piece by hand"
          className="h-auto w-full object-cover"
        />
      </section>
    </main>
  );
};

export default Home;