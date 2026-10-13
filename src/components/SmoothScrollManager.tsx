import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Gauge } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollManager: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // Standard window scroll listener ensuring progress bar updates reliably in all environments
    const handleNativeScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
        setScrollPercent(pct);
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    handleNativeScroll();

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((e.scroll / maxScroll) * 100)));
        setScrollPercent(pct);
      }
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animFrameId = requestAnimationFrame(raf);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      cancelAnimationFrame(animFrameId);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Dedicated Fixed High-Visibility Industrial Amber Scroll Progress Bar on Top */}
      <div
        className="fixed top-0 left-0 right-0 h-1 sm:h-1.5 bg-slate-950/80 backdrop-blur-sm z-[9999] pointer-events-none border-b border-amber-500/10"
        role="progressbar"
        aria-valuenow={scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.9)] transition-all duration-75 ease-out relative"
          style={{ width: `${scrollPercent}%` }}
        >
          {/* Leading pulse tip on the progress bar */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-300 rounded-full blur-[2px] opacity-80" />
        </div>
      </div>

      {/* Industrial Telemetry Badge floating bottom-left on desktop */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono font-medium text-slate-300 shadow-xl pointer-events-none">
        <Gauge size={14} weight="fill" className="text-amber-500 animate-spin motion-safe:animate-none" />
        <span className="text-slate-400 uppercase tracking-wider">Depth / Grade:</span>
        <span className="text-amber-400 font-bold tabular-nums">{scrollPercent}%</span>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-slate-400">
          <Compass size={12} weight="bold" className="text-amber-400" />
          <span>NORCAL // CEN-CAL</span>
        </div>
      </div>
    </>
  );
};
