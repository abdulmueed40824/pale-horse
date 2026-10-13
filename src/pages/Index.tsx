import React, { useState } from "react";
import { usePageMeta } from "@/lib/seo";

import { Navbar } from "@/components/Navbar";
import { BrandPreloader } from "@/components/BrandPreloader";
import { HeroSection } from "@/components/HeroSection";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { PinnedScrollProcess } from "@/components/PinnedScrollProcess";
import { ProjectEstimator } from "@/components/ProjectEstimator";
import { AsphaltCoreModel } from "@/components/AsphaltCoreModel";
import { FleetAndServiceMap } from "@/components/FleetAndServiceMap";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FaqAndReviews } from "@/components/FaqAndReviews";
import { ContactSection, QuoteModal } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SmoothScrollManager } from "@/components/SmoothScrollManager";
import {
  Phone,
  Calculator,
  ShieldCheck,
  CheckCircle,
  CaretRight,
  ArrowUp,
} from "@phosphor-icons/react";

const Index = () => {
  usePageMeta({
    title:
      "Pale Horse Asphalt Engineering | Chip Seals, Paving Fabric, Dust Control & Tack Spreading",
    description:
      "Specialized asphalt engineering in Central & Northern California. Private chip seals, paving fabric, agricultural dust control, and computerized tack oil spreading. Danielle Dormire (559) 314-4226.",
  });

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefillService, setQuotePrefillService] = useState("");
  const [quotePrefillNotes, setQuotePrefillNotes] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenQuote = (service?: string, notes?: string) => {
    setQuotePrefillService(service || "");
    setQuotePrefillNotes(notes || "");
    setQuoteModalOpen(true);
  };

  const handleOpenEstimator = () => {
    const el = document.getElementById("estimator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Brand Preloader & Smooth Scroll Engine */}
      <BrandPreloader />
      <SmoothScrollManager />

      {/* Sticky Main Navigation */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenEstimator={handleOpenEstimator}
      />
      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenQuote={handleOpenQuote}
          onOpenEstimator={handleOpenEstimator}
        />

        <section id="missions" className="py-20 lg:py-28 bg-slate-950 relative border-b border-slate-800">
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  Missions
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-6">
                  Built on reliability, hard work, and quality.
                </h2>
                <div className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed">
                  <p>
                    At Pale Horse Asphalt Engineering, our mission is to deliver dependable, high-quality oil distribution services that keep paving projects moving and roads built to last. With our fleet of oil distributor trucks working alongside paving operations and preventative maintenance treatments, we specialize in chip seal applications, paving fabric, and tack oil distribution, done right the first time, on schedule, and to specification.
                  </p>
                  <p>
                    We are built on hard work, reliability, and a genuine commitment to quality. Our crews show up ready, communicate clearly, and take pride in every application, because we know that a strong road starts with a strong team. When contractors and agencies partner with Pale Horse, they can count on us to be there when it matters.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 h-full">
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl h-full lg:min-h-[420px]">
                  <img
                    src="/assets/mission-oil-truck.png"
                    alt="Oil distributor truck on a road project"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Specialized Services Showcase */}
        <ServiceShowcase onOpenQuote={handleOpenQuote} />
        {/* 6. Visual Photo Gallery & Case Studies */}
        <ProjectGallery />
        {/* 8. Contact & Proposal Section */}
        <ContactSection onOpenQuote={handleOpenQuote} />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={handleOpenQuote}
        onOpenEstimator={handleOpenEstimator}
      />

      {/* Bottom to Top Button in Bottom Left Corner */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top of page"
        className={`fixed bottom-20 left-4 z-40 p-3 sm:px-4 sm:py-3 rounded-full bg-slate-900/95 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-slate-700/80 hover:border-amber-400 shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 flex items-center gap-2 group ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} weight="bold" className="transition-transform group-hover:-translate-y-0.5" />
        <span className="hidden sm:inline text-xs font-mono font-bold tracking-wider uppercase">
          TOP
        </span>
      </button>

      {/* Floating Fast Action Mobile Dispatch Button */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href="tel:5593144226"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all border border-amber-300"
          aria-label="Direct Call to Danielle Dormire"
        >
          <Phone size={18} weight="fill" />
          <span className="hidden sm:inline">Call Dispatch:</span>
          <span>(559) 314-4226</span>
        </a>
      </div>

      {/* Interactive Quote / Proposal Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        servicePrefill={quotePrefillService}
        notesPrefill={quotePrefillNotes}
      />
    </div>
  );
};

export default Index;
