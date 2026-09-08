import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import bondOfBlessing from "@/assets/story/bond-of-blessing.jpeg";

const BOND_IMG = bondOfBlessing;

const STATS = [
  { value: "25+", label: "Years of Craft", testId: "stat-years" },
  { value: "10,000+", label: "Designs Created", testId: "stat-designs" },
  { value: "50,000+", label: "Families Blessed", testId: "stat-families" },
];

const About = () => (
  <main data-testid="about-page">
    <section className="bg-maroon text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-12 lg:py-28">
        <Reveal>
          <p data-testid="about-eyebrow" className="text-[11px] uppercase tracking-[0.4em] text-gold">Our Story</p>
          <h1 data-testid="about-title" className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            A Bond of <span className="italic text-gold">Blessing</span>
          </h1>
          <DiamondDivider testId="about-divider" className="mt-8" />
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/75">
            At Ashnee, every piece of jewellery is crafted with love, 
            <br />
            blessings and perfection to be cherished forever.
          </p>
        </Reveal>
      </div>
    </section>

    <section data-testid="bond-of-blessing-section" className="relative w-full overflow-hidden">
      <img
        src={BOND_IMG}
        alt="Ashnee craftsman setting a ruby and diamond piece by hand"
        className="h-auto w-full object-cover"
      />
    </section>

    <section data-testid="about-stats" className="border-y border-hairline bg-sand/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 text-center sm:grid-cols-3 md:px-12">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <span data-testid={s.testId} className="block font-serif text-5xl text-maroon">{s.value}</span>
            <span className="mt-3 block text-[11px] uppercase tracking-[0.3em] text-clay">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="bg-maroon text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-12 lg:py-28">
        <Reveal>
          <h2 data-testid="about-cta-heading" className="font-serif text-4xl tracking-tight sm:text-5xl">
            Find your perfect sparkle
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/gold-jewellery"
              data-testid="about-cta-gold"
              className="inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-2.5 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-gold hover:text-charcoal"
            >
              Explore Gold <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
            <Link
              to="/silver-jewellery"
              data-testid="about-cta-silver"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-8 py-2.5 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Explore Silver <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default About;