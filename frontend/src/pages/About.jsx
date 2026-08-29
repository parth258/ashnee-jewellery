import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";
import { JewelFrame } from "@/components/JewelFrame";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1601121141461-920cb1993441?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxnb2xkJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwamV3ZWxyeSUyMG1hY3JvfGVufDB8fHx8MTc4NjM2NDUyOHww&ixlib=rb-4.1.0&q=85";
const CRAFT_IMG =
  "https://images.unsplash.com/photo-1721807551235-4072be6913c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxnb2xkJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwamV3ZWxyeSUyMG1hY3JvfGVufDB8fHx8MTc4NjM2NDUyOHww&ixlib=rb-4.1.0&q=85";

const CHAPTERS = [
  {
    num: "01",
    title: "The Origin",
    body: "Ashnee began at a single goldsmith's bench, where a father taught his daughter that jewellery is never just metal — it is a blessing poured into form. Every Ashnee piece still begins the same way: with a prayer, a sketch, and a promise.",
    image: ABOUT_IMG,
    label: "Heirloom gold necklace",
  },
  {
    num: "02",
    title: "The Craft",
    body: "Our karigars shape 18K and 22K gold and 92.5 sterling silver by hand — filing, setting and polishing each stone until it catches light the way a memory catches the heart. No shortcuts, no compromises, only patience.",
    image: CRAFT_IMG,
    label: "Pendant on silk",
    flip: true,
  },
  {
    num: "03",
    title: "The Promise",
    body: "Certified authenticity, transparent pricing, and pieces made to outlive trends. When you gift Ashnee, you gift something meant to be handed down — a bond of blessing, from our family to yours.",
  },
];

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
            At Ashnee, every piece of jewellery is crafted with love, blessings and
            perfection to be cherished forever.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="mx-auto max-w-7xl space-y-28 px-6 py-24 md:px-12 lg:py-32">
      {CHAPTERS.map((c) => (
        <Reveal key={c.num} testId={`chapter-${c.num}`}>
          {c.image ? (
            <div className={`grid items-center gap-14 lg:grid-cols-2 ${c.flip ? "" : ""}`}>
              <div className={c.flip ? "lg:order-2" : ""}>
                <span className="block font-serif text-8xl leading-none text-outline-maroon">{c.num}</span>
                <h2 className="mt-4 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">{c.title}</h2>
                <DiamondDivider className="mt-6 justify-start text-charcoal" />
                <p className="mt-6 max-w-md text-base font-light leading-relaxed text-clay">{c.body}</p>
              </div>
              <div className={c.flip ? "lg:order-1" : ""}>
                <JewelFrame image={c.image} label={c.label} arch aspect="aspect-[4/5]" testId={`chapter-image-${c.num}`} className="mx-auto max-w-md" />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <span className="block font-serif text-8xl leading-none text-outline-maroon">{c.num}</span>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">{c.title}</h2>
              <DiamondDivider className="mt-6 text-charcoal" />
              <p className="mt-6 text-base font-light leading-relaxed text-clay">{c.body}</p>
            </div>
          )}
        </Reveal>
      ))}
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/gold-jewellery"
              data-testid="about-cta-gold"
              className="inline-flex items-center gap-3 bg-ivory px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors duration-300 hover:bg-gold hover:text-charcoal"
            >
              Explore Gold <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/silver-jewellery"
              data-testid="about-cta-silver"
              className="inline-flex items-center gap-3 border border-ivory/40 px-9 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Explore Silver <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default About;
