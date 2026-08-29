import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Instagram, Facebook, Send } from "lucide-react";
import { Diamond } from "./Diamond";
import logo from "@/assets/logo.png";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter`, { email: email.trim() });
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="bg-maroon text-ivory">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3" data-testid="footer-brand-logo">
            <img src={logo} alt="Ashnee" className="h-12 w-auto" />
            <span className="leading-tight">
              <span className="block font-serif text-xl tracking-[0.35em]">ASHNEE</span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-[0.3em] text-ivory/60">
                A Bond of Blessing
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-ivory/70">
            Jewellery that celebrates every bond with love and blessings.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Instagram" data-testid="footer-instagram-link" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold">
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook" data-testid="footer-facebook-link" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold">
              <Facebook className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Quick Links</h4>
          <ul className="mt-6 space-y-3 text-sm font-light text-ivory/75">
            <li><Link data-testid="footer-link-home" className="transition-colors duration-300 hover:text-gold" to="/">Home</Link></li>
            <li><Link data-testid="footer-link-gold" className="transition-colors duration-300 hover:text-gold" to="/gold-jewellery">Gold Jewellery</Link></li>
            <li><Link data-testid="footer-link-silver" className="transition-colors duration-300 hover:text-gold" to="/silver-jewellery">Silver Jewellery</Link></li>
            <li><Link data-testid="footer-link-about" className="transition-colors duration-300 hover:text-gold" to="/about">About Us</Link></li>
            <li><Link data-testid="footer-link-contact" className="transition-colors duration-300 hover:text-gold" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Customer Service</h4>
          <ul className="mt-6 space-y-3 text-sm font-light text-ivory/75">
            <li><a data-testid="footer-link-shipping" className="transition-colors duration-300 hover:text-gold" href="#">Shipping &amp; Delivery</a></li>
            <li><a data-testid="footer-link-returns" className="transition-colors duration-300 hover:text-gold" href="#">Returns &amp; Refunds</a></li>
            <li><a data-testid="footer-link-terms" className="transition-colors duration-300 hover:text-gold" href="#">Terms &amp; Conditions</a></li>
            <li><a data-testid="footer-link-privacy" className="transition-colors duration-300 hover:text-gold" href="#">Privacy Policy</a></li>
            <li><a data-testid="footer-link-faq" className="transition-colors duration-300 hover:text-gold" href="#">FAQ&rsquo;s</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Newsletter</h4>
          <p className="mt-6 text-sm font-light leading-relaxed text-ivory/70">
            Subscribe to get special updates and exclusive offers.
          </p>
          <form onSubmit={subscribe} className="mt-6 flex items-center border border-ivory/25 focus-within:border-gold" data-testid="newsletter-form">
            <input
              data-testid="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-3 text-sm font-light text-ivory placeholder:text-ivory/40 focus:outline-none"
            />
            <button
              data-testid="newsletter-submit-button"
              type="submit"
              disabled={loading}
              aria-label="Subscribe"
              className="flex h-[46px] w-[52px] shrink-0 items-center justify-center bg-gold text-charcoal transition-colors duration-300 hover:bg-ivory disabled:opacity-60"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs font-light text-ivory/50 sm:flex-row md:px-12">
          <span data-testid="footer-copyright">&copy; 2026 Ashnee. All Rights Reserved.</span>
          <span className="flex items-center gap-2">
            Crafted with blessings <Diamond className="h-2 w-2 text-gold" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
