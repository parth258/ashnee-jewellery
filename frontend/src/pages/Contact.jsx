import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ArrowRight, X } from "lucide-react";
import { DiamondDivider } from "@/components/Diamond";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INFO = [
  { icon: MapPin, title: "Visit Us At", lines: ["Aashnee Jewels, Gopal Ji Ka Rasta", "Chora Rasta, Jaipur 302002"], testId: "contact-info-visit" },
  { icon: Phone, title: "Call Us", lines: ["+91 98280 72412"], testId: "contact-info-call" },
  { icon: Mail, title: "Write to Us", lines: ["care@care.aashnee.in"], testId: "contact-info-write" },
  { icon: Clock, title: "Working Hours", lines: ["Monday – Saturday", "10:00 AM – 8:00 PM IST"], testId: "contact-info-hours" },
];

const inputCls =
  "w-full border-b border-hairline bg-transparent py-3 text-base font-light text-charcoal placeholder:text-clay/50 transition-colors duration-300 focus:border-maroon focus:outline-none";

const Contact = () => {
  const location = useLocation();
  const initialProductName = location.state?.productName || "";
  const initialProductImage = location.state?.productImage || "";
  const prefillMessage = initialProductName ? `I'm interested in: ${initialProductName}` : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: prefillMessage,
    productName: initialProductName,
    productImage: initialProductImage,
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const clearProduct = () => {
    setForm((f) => ({ ...f, productName: "", productImage: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        // Convert the bundler's relative asset path into a full URL the
        // email client can actually load.
        productImage: form.productImage
          ? `${window.location.origin}${form.productImage}`
          : "",
      };
      const res = await axios.post(`${API}/contact`, payload);
      toast.success(res.data.message);
      setForm({ name: "", email: "", phone: "", message: "", productName: "", productImage: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send your message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page">
      <section className="bg-maroon text-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-12 lg:py-28">
          <Reveal>
            <h1 data-testid="contact-title" className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Contact <span className="italic text-gold">Us</span>
            </h1>
            <DiamondDivider testId="contact-divider" className="mt-8" />
            <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/75">
              Step in for a consultation or connect with us — we’re here to make every detail feel distinctly yours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-20 px-6 py-24 md:px-12 lg:grid-cols-[1fr_1.2fr] lg:py-32">
        <Reveal>
          <h2 className="font-serif text-3xl tracking-tight text-charcoal">Your vision deserves a personal touch.</h2>
          <p className="mt-4 max-w-sm text-base font-light leading-relaxed text-clay">
            Step in for a consultation or connect with us — we’re here to make every detail feel distinctly yours.
          </p>
          <div className="mt-12 space-y-10">
            {INFO.map((item) => (
              <div key={item.title} className="flex items-start gap-5" data-testid={item.testId}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-maroon">
                  <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" strokeWidth={1.25} />
                </span>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] text-charcoal">{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="mt-1.5 text-sm font-light text-clay">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={submit} data-testid="contact-form" className="border border-hairline bg-sand/40 p-8 sm:p-12">
            <h2 className="font-serif text-2xl tracking-tight text-charcoal">Send an Enquiry</h2>

            {form.productName && (
              <div
                data-testid="contact-product-chip"
                className="mt-6 flex items-center gap-4 border border-maroon/30 bg-ivory px-4 py-3"
              >
                {form.productImage && (
                  <img
                    src={form.productImage}
                    alt={form.productName}
                    className="h-14 w-14 shrink-0 object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-clay">Enquiring about</p>
                  <p className="text-sm text-charcoal">{form.productName}</p>
                </div>
                <button
                  type="button"
                  onClick={clearProduct}
                  data-testid="contact-product-chip-clear"
                  aria-label="Remove product from enquiry"
                  className="shrink-0 text-clay transition-colors duration-300 hover:text-maroon"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            )}

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-[10px] uppercase tracking-[0.3em] text-clay">Full Name</label>
                <input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-[10px] uppercase tracking-[0.3em] text-clay">Email</label>
                <input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-phone" className="text-[10px] uppercase tracking-[0.3em] text-clay">Phone (optional)</label>
                <input id="contact-phone" data-testid="contact-phone-input" value={form.phone} onChange={set("phone")} placeholder="+91" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-[10px] uppercase tracking-[0.3em] text-clay">Message</label>
                <textarea id="contact-message" data-testid="contact-message-input" required rows={4} value={form.message} onChange={set("message")} placeholder="Tell us what you are looking for…" className={`${inputCls} resize-none`} />
              </div>
            </div>
            <button
              data-testid="contact-form-submit-button"
              type="submit"
              disabled={loading}
              className="group mt-12 inline-flex items-center gap-3 bg-maroon px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:bg-maroon-dark disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Message"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
};

export default Contact;