import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Diamond } from "./Diamond";
import logo from "@/assets/logo.png";

const LINKS = [
  { to: "/", label: "Home", testId: "nav-link-home" },
  { to: "/gold-jewellery", label: "Gold Jewellery", testId: "nav-link-gold-jewellery" },
  { to: "/silver-jewellery", label: "Silver Jewellery", testId: "nav-link-silver-jewellery" },
  { to: "/about", label: "About Us", testId: "nav-link-about-us" },
  { to: "/contact", label: "Contact Us", testId: "nav-link-contact-us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header data-testid="site-header" className="sticky top-0 z-50 border-b border-gold/20 bg-maroon/95 text-ivory backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-3">
          <img src={logo} alt="Ashnee" className="h-12 w-auto" />
          <span className="leading-tight">
            <span className="block font-serif text-xl tracking-[0.35em]">ASHNEE</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.3em] text-ivory/60">
              A Bond of Blessing
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" data-testid="desktop-nav">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.testId}
              className={({ isActive }) =>
                `relative pb-1 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-300 ${
                  isActive ? "text-gold after:w-full" : "text-ivory/75 after:w-0 hover:text-ivory hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button data-testid="nav-search-button" aria-label="Search" className="text-ivory/75 transition-colors duration-300 hover:text-gold">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button data-testid="nav-account-button" aria-label="Account" className="text-ivory/75 transition-colors duration-300 hover:text-gold">
            <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          {/* <button data-testid="nav-cart-button" aria-label="Shopping bag" className="relative text-ivory/75 transition-colors duration-300 hover:text-gold">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span data-testid="nav-cart-count" className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-charcoal">
              0
            </span>
          </button> */}
        </div>

        <button
          data-testid="nav-menu-button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="text-ivory lg:hidden"
        >
          {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <nav data-testid="mobile-nav" className="border-t border-gold/20 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-${l.testId}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-xs uppercase tracking-[0.25em] ${isActive ? "text-gold" : "text-ivory/80"}`
                }
              >
                <Diamond className="h-2 w-2 text-gold/70" />
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
