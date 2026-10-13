import React, { useState, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";
import { Phone, List, X, CaretRight, Calculator } from "@phosphor-icons/react";

interface NavbarProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Missions", href: "#missions" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/40 py-3"
          : "bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                  link.action();
                  const el = document.querySelector(link.href);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-wider relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center gap-4">

          <button
            onClick={() => onOpenQuote()}
            className="relative group overflow-hidden px-5 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Request Bid</span>
              <CaretRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="tel:5593144226"
            className="p-2 rounded-md bg-amber-500/10 border border-amber-500/40 text-amber-400"
            aria-label="Call Danielle Dormire"
          >
            <Phone size={20} weight="fill" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-slate-900 border border-slate-700 text-slate-200 hover:text-amber-400 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-amber-500/20 px-6 py-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-base font-bold text-slate-200 hover:text-amber-400 uppercase tracking-wider py-1 border-b border-slate-900"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold uppercase tracking-wider text-amber-300 border border-amber-500/40 bg-amber-500/10"
              >
                <Calculator size={18} weight="fill" className="text-amber-400" />
                <span>Asphalt Estimator Tool</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3.5 rounded-md bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20"
              >
                Request Priority Project Quote
              </button>

              <div className="text-center text-xs text-slate-400 pt-2">
                Direct Contact: Danielle Dormire <br />
                <a href="tel:5593144226" className="text-amber-400 font-bold text-sm">
                  (559) 314-4226
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
