import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { Wrench, ShieldCheck } from "@phosphor-icons/react";

export const BrandPreloader: React.FC = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(15);

  React.useEffect(() => {
    // Immediate dismiss for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }

    const timer1 = setTimeout(() => setProgress(50), 200);
    const timer2 = setTimeout(() => setProgress(90), 450);
    const timer3 = setTimeout(() => setProgress(100), 700);
    const timer4 = setTimeout(() => setShow(false), 950);
    const fallbackTimer = setTimeout(() => setShow(false), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 px-4 select-none"
        >
          {/* Subtle industrial hazard background texture */}
          <div className="absolute inset-0 opacity-15 hazard-pattern pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center max-w-sm w-full text-center"
          >
            <BrandLogo size="lg" className="mb-6 scale-110" />

            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-amber-400/90 mb-4">
              <Wrench size={16} weight="fill" className="motion-safe:animate-spin text-amber-500" />
              <span>Calibrating Application Systems</span>
            </div>

            {/* Industrial Pressure Gauge Bar */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3.5 p-0.5 overflow-hidden shadow-inner relative mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="w-full flex justify-between items-center text-xs font-mono text-slate-300 px-1">
              <span>OIL SPEC: AR-4000 / PMRE</span>
              <span className="text-amber-400 font-bold">{progress}% READY</span>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck size={14} weight="fill" className="text-amber-500" />
              <span>Central & Northern California Engineered Paving</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
