import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Diamond, DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import heroBanner from "@/assets/hero/hero-banner.jpeg";
import bondOfBlessing from "@/assets/story/bond-of-blessing.jpeg";
import showcase1 from "@/assets/videos/showcase-1.mp4";
import showcase2 from "@/assets/videos/showcase-2.mp4";
import showcase3 from "@/assets/videos/showcase-3.mp4";
import showcase4 from "@/assets/videos/showcase-4.mp4";
import showcase5 from "@/assets/videos/showcase-5.mp4";
import showcase6 from "@/assets/videos/showcase-6.mp4";
import showcase7 from "@/assets/videos/showcase-7.mp4";
import showcase8 from "@/assets/videos/showcase-8.mp4";

const SHOWCASE_VIDEOS = [showcase1, showcase2, showcase3, showcase4, showcase5, showcase6, showcase7, showcase8];

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

const ShowcaseVideo = ({ src }) => {
  const ref = useRef(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.muted = true;
          const playPromise = el.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => setNeedsTap(true));
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.muted = true;
      el.play().then(() => setNeedsTap(false)).catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal" onClick={handleTap}>
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full cursor-pointer object-cover"
      />
      {needsTap && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-charcoal/30">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-maroon">
            <Play className="ml-0.5 h-5 w-5" strokeWidth={1.5} />
          </span>
        </span>
      )}
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 110]);

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
            Explore Collection
          </h2>
          <p className="mt-4 text-base font-light capitalize tracking-[0.3em] text-clay">Made for the moments you'll remember</p>
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
          <p className="mt-4 text-base font-light capitalize tracking-[0.3em] text-clay">Handpicked pieces, blessed beginnings</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {SHOWCASE_VIDEOS.map((src, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <ShowcaseVideo src={src} />
            </Reveal>
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