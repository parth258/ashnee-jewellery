import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gem } from "lucide-react";
import { Diamond, DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { JewelFrame } from "@/components/JewelFrame";
import { ProductCard } from "@/components/ProductCard";
import { GOLD_PRODUCTS, SILVER_PRODUCTS } from "@/data/products";

const HERO_IMG =
  "https://images.unsplash.com/photo-1721807551235-4072be6913c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxnb2xkJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwamV3ZWxyeSUyMG1hY3JvfGVufDB8fHx8MTc4NjM2NDUyOHww&ixlib=rb-4.1.0&q=85";
const GOLD_IMG =
  "https://images.unsplash.com/photo-1688382654723-a7366006519b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg2MzY0NTIyfDA&ixlib=rb-4.1.0&q=85";
const SILVER_IMG =
  "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBkaWFtb25kJTIwbmVja2xhY2UlMjBtYWNyb3xlbnwwfHx8fDE3ODYzNjQ1MzN8MA&ixlib=rb-4.1.0&q=85";
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1601121141461-920cb1993441?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxnb2xkJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwamV3ZWxyeSUyMG1hY3JvfGVufDB8fHx8MTc4NjM2NDUyOHww&ixlib=rb-4.1.0&q=85";

const MARQUEE_WORDS = [
  "Exquisite Craftsmanship",
  "Heritage Designs",
  "Timeless Elegance",
  "A Bond of Blessing",
  "Certified Authenticity",
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
            className="inline-flex items-center gap-3 border border-ivory/40 px-7 py-3 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
          >
            {cta}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
      <section ref={heroRef} data-testid="hero-section" className="relative overflow-hidden bg-maroon text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full border border-gold/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full border border-gold/10" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-[18%] text-gold/40"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Diamond className="h-4 w-4" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 md:px-12 lg:grid-cols-2 lg:pb-32 lg:pt-28">
          <div>
            <motion.p
              data-testid="hero-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold"
            >
              <Diamond className="h-2.5 w-2.5" /> A Bond of Blessing
            </motion.p>

            <h1 data-testid="hero-headline" className="mt-8 font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              <MaskedLine delay={0.35}>Timeless Elegance,</MaskedLine>
              <MaskedLine delay={0.5}>
                <span className="italic text-gold">Crafted for You.</span>
              </MaskedLine>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <DiamondDivider testId="hero-divider" className="mt-8 justify-start" />
              <p data-testid="hero-subtext" className="mt-8 max-w-md text-base font-light leading-relaxed text-ivory/80">
                At Ashnee, every piece of jewellery is crafted with love, blessings and
                perfection to be cherished forever.
              </p>
              <Link
                to="/gold-jewellery"
                data-testid="hero-cta-button"
                className="group mt-10 inline-flex items-center gap-3 bg-ivory px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-gold hover:text-charcoal"
              >
                Explore Collections
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          <motion.div style={{ y: parallaxY }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <JewelFrame image={HERO_IMG} label="Signature pendant on silk" arch aspect="aspect-[3/4]" testId="hero-image" className="border-gold/30" />
            </motion.div>
            <motion.div
              data-testid="hero-badge"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="absolute -bottom-6 -left-6 hidden items-center gap-3 border border-gold/30 bg-maroon-deep/90 px-6 py-4 backdrop-blur-sm sm:flex"
            >
              <Gem className="h-5 w-5 text-gold" strokeWidth={1.25} />
              <span className="text-[10px] uppercase leading-relaxed tracking-[0.25em] text-ivory/85">
                BIS Hallmarked
                <span className="block text-ivory/50">18K &amp; 22K Certified</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
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
            Our Collections
          </h2>
          <p className="mt-4 text-sm font-light uppercase tracking-[0.3em] text-clay">Find your perfect sparkle</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <CollectionCard
            title="Gold Jewellery"
            lines={["Gold", "Jewellery"]}
            blurb="Timeless gold jewellery crafted in 18K & 22K gold to celebrate every special moment."
            cta="Explore Gold"
            to="/gold-jewellery"
            image={GOLD_IMG}
            testId="collection-card-gold"
          />
          <CollectionCard
            title="Silver Jewellery"
            lines={["Silver", "Jewellery"]}
            blurb="Elegant silver designs that add grace to your everyday style."
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
            className="inline-flex items-center gap-3 border border-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-maroon hover:text-ivory"
          >
            View All Pieces <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>

      <section data-testid="about-teaser-section" className="bg-sand/60">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:px-12 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <JewelFrame image={ABOUT_IMG} label="Heirloom craftsmanship" arch aspect="aspect-[4/5]" testId="about-teaser-image" />
          </Reveal>
          <Reveal delay={0.15}>
            <span data-testid="about-teaser-number" className="block font-serif text-7xl text-outline-maroon">01</span>
            <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-maroon">Our Story</p>
            <h2 data-testid="about-teaser-heading" className="mt-6 font-serif text-4xl leading-snug tracking-tight text-charcoal sm:text-5xl">
              Every piece carries a blessing.
            </h2>
            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-clay">
              Born from a family of goldsmiths, Ashnee honours the rituals that make
              Indian jewellery sacred — the first earring, the wedding haar, the bangle
              that says you belong. We craft heirlooms, not ornaments.
            </p>
            <Link
              to="/about"
              data-testid="about-teaser-link"
              className="group mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-maroon"
            >
              Read our story
              <span className="h-px w-10 bg-maroon transition-[width] duration-300 group-hover:w-16" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Home;