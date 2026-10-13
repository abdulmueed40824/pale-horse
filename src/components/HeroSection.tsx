import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CaretRight,
  PhoneCall,
  ShieldCheck,
  CheckCircle,
  Truck,
  Drop,
  Sparkle,
  Calculator,
} from "@phosphor-icons/react";

interface HeroSectionProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onOpenEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuote,
  onOpenEstimator,
}) => {
  const reduce = useReducedMotion();

  // Infinite typing animation texts
  const typingWords = [
    "Private Estate Chip Seals",
    "Paving Fabric Interlayers",
    "Vineyard Dust Control",
    "Caltrans-Spec Tack & Oil Spreading",
    "Agricultural Road Stabilization",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = typingWords[currentWordIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === fullWord) {
      // Pause at full word before deleting
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && currentText === "") {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? fullWord.substring(0, prev.length - 1)
          : fullWord.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950 py-16 lg:py-24 border-b border-slate-800">
      {/* Background Hero Layer with High-Resolution Asphalt Photo & Ambient Engineering Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-oil-distributor.png"
          alt="Oil distributor truck applying treatment on a roadway"
          className="w-full h-full object-cover"
        />
        {/* Layered brand scrim for 100% text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/70" />
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-10 pointer-events-none" />
        <div className="absolute inset-0 tarmac-grid opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-lg shadow-amber-500/10 mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 motion-safe:animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300">
              Central & Northern California Engineering
            </span>
          </motion.div>

          {/* Main H1 Headline */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] mb-5 text-balance"
          >
            Paving, Chip Seals &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Dust Control
            </span>{" "}
            Engineered To Last.
          </motion.h1>

          {/* Infinite Typing Animation Effect right before paragraph */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-sm sm:text-base md:text-lg mb-6 shadow-inner"
          >
            <span className="text-amber-500 font-semibold tracking-wider text-xs sm:text-sm uppercase">
              Specializing In:
            </span>
            <div className="flex items-center text-amber-300 font-bold min-h-[1.5rem]">
              <span>{currentText}</span>
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 bg-amber-400 motion-safe:animate-pulse align-middle" />
            </div>
          </motion.div>

          {/* Subheadline with clear target audience and outcomes */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-9"
          >
            Specialized asphalt preservation and heavy-duty surface treatments for{" "}
            <span className="text-white font-semibold">wineries, private ranch estates, agricultural growers, and HOA communities</span>.
            From tack coat and custom oil spreading to Caltrans-spec chip seals.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            {/* Primary CTA */}
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border border-amber-300/40"
            >
              <span>Request Project Bid</span>
              <CaretRight
                size={18}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Estimator CTA */}

            {/* Direct Phone Call Button */}
            <a
              href="tel:5593144226"
              className="w-full sm:w-auto px-6 py-4 rounded-md bg-slate-900/80 text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall size={18} weight="fill" className="text-amber-500" />
              <span>(559) 314-4226</span>
            </a>
          </motion.div>

          {/* Quick Point-of-Contact Direct Line Banner */}

          {/* Trust Badges Bar */}
        </div>
      </div>
    </section>
  );
};
