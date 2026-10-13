import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  ArrowsHorizontal,
  Flame,
  Truck,
  CheckCircle,
  ClockAfternoon,
  Sparkle,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  specs: string[];
  duration: string;
  equipment: string;
  image: string;
  metric: string;
  metricLabel: string;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    phase: "Sub-Base Diagnostics & Sweeping",
    title: "High-Velocity Rotary Sweeping & Surface Prep",
    subtitle:
      "Precision mechanical removal of loose silt, agricultural soil, and oxidation prior to hot emulsion or geotextile placement.",
    specs: [
      "Steel broom mechanical sweepers with vacuum filtration",
      "Air-lance vegetative root expulsion & crack cleaning",
      "Surface moisture meter verification under Caltrans standards",
    ],
    duration: "Hours 0 – 3",
    equipment: "Tymco / Schwarze Mechanical Sweepers",
    image: "/assets/asphalt-roller.jpg",
    metric: "100%",
    metricLabel: "Loose Particle Clearance",
  },
  {
    step: "02",
    phase: "Subsurface Membrane / Tack Application",
    title: "Computerized Tack Coat & Geotextile Interlayer",
    subtitle:
      "Application of calibrated polymer emulsion at 0.25–0.30 gal/sq yd followed by paving fabric tension laying to stop water intrusion.",
    specs: [
      "BearCat / Rosco computerized rate distributors",
      "Continuous tension roll deployment without fabric wrinkling",
      "Reflective cracking bridge tested to 25,000+ axle passes",
    ],
    duration: "Hours 3 – 6",
    equipment: "Computerized Asphalt Distributor Fleet",
    image: "/assets/paving-fabric.jpg",
    metric: "0.28 gal",
    metricLabel: "Per Sq Yd Rate Precision",
  },
  {
    step: "03",
    phase: "Clean Fracture Aggregate Chip Spreading",
    title: "Synchronized Hot Emulsion & Clean Aggregate Lock",
    subtitle:
      "Rapid-set polymer modified emulsion (PMRE) immediately followed by 3/8\" or 1/2\" washed, 100% fractured volcanic basalt chips.",
    specs: [
      "Variable-width chip spreaders synced with tank spray bar",
      "Zero aggregate delay preventing asphalt skin formation",
      "High-contrast color selections (Granite Black, Sierra Gold)",
    ],
    duration: "Hours 6 – 10",
    equipment: "Hydrostatic Variable Chip Spreaders",
    image: "/assets/chip-seal-crew.jpg",
    metric: "100% Fractured",
    metricLabel: "Crushed Basalt Aggregate",
  },
  {
    step: "04",
    phase: "Pneumatic Compaction & Rolling",
    title: "Multi-Tire Pneumatic Interlock Kneading",
    subtitle:
      "Rubber-tired pneumatic rollers knead and orient stone chips flat into the hot emulsion without crushing individual rock facets.",
    specs: [
      "Multi-wheel 15-ton pneumatic tire kneading action",
      "Flat mosaic stone facet orientation for smooth tire contact",
      "Complete elimination of loose stone windshield hazards",
    ],
    duration: "Hours 10 – 14",
    equipment: "Ingersoll Rand / CAT Pneumatic Rollers",
    image: "/assets/oil-spreader-fleet.jpg",
    metric: "15 Tons",
    metricLabel: "Dynamic Compaction Force",
  },
  {
    step: "05",
    phase: "Cure Verification & Final Sweep",
    title: "Fog Seal Armor & Client Hand-off",
    subtitle:
      "Secondary locking fog coat application (optional) followed by suction sweeping. Roadway returned to full traffic within 24–48 hours.",
    specs: [
      "Jet-black asphalt armor fog seal for maximum UV lock",
      "Final high-efficiency vacuum sweep of unbonded stone",
      "Written 5 to 10-year durability warranty hand-off",
    ],
    duration: "Hours 24 – 48",
    equipment: "High-Vacuum Suction & Fog Distributors",
    image: "/assets/luxury-driveway.jpg",
    metric: "10+ Years",
    metricLabel: "Engineered Surface Longevity",
  },
];

export const PinnedScrollProcess: React.FC<{ onOpenQuote: (service?: string) => void }> = ({
  onOpenQuote,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Only run horizontal pinning on screens wider than 1024px
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1.1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });

        // Parallax image card movement within each slide
        gsap.utils.toArray<HTMLElement>(".process-card-image").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.15, filter: "brightness(0.7)" },
            {
              scale: 1,
              filter: "brightness(0.9)",
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="engineering-process"
      className="relative bg-slate-950 border-t border-slate-800/90 overflow-hidden"
    >
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 tarmac-grid opacity-20 pointer-events-none" />

      {/* Top Section Header with Scrub Progress Counter */}
      <div className="pt-8 pb-4 lg:pt-10 lg:pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={15} weight="fill" />
              <span>Awwwards Execution Sequence // 5 Calibrated Phases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
              Pinned Scroll <span className="text-gradient-amber">Engineering Protocol</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Scroll through the step-by-step mechanized installation sequence that Pale Horse uses to seal luxury ranch roads, agricultural avenues, and estate entrances.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ArrowsHorizontal size={15} className="text-amber-500 motion-safe:animate-pulse" />
              <span>SCROLL DOWN TO ADVANCE TIMELINE</span>
            </div>
            <div className="w-56 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                ref={progressBarRef}
                className="h-full bg-amber-500 rounded-full transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Track - Horizontal on Desktop (pinned), Vertical Stacking on Mobile */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 pt-2 pb-6 lg:pb-8 relative z-10 will-change-transform"
      >
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="w-full lg:w-[560px] xl:w-[600px] shrink-0 rounded-xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 hover:border-amber-500/50 shadow-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-amber-500 tracking-tighter">
                    {item.step}
                  </span>
                  <div className="h-5 w-px bg-slate-800" />
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                    {item.phase}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400 font-bold">
                  <ClockAfternoon size={13} />
                  <span>{item.duration}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight mb-1.5">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                {item.subtitle}
              </p>

              {/* Specifications List */}
              <div className="space-y-1.5 mb-2">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle size={15} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Image Container with Parallax Effect */}
            <div className="relative h-36 sm:h-40 overflow-hidden border-y border-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="process-card-image w-full h-full object-cover transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Telemetry Metric Overlay */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <div className="px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-amber-500/40">
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block">
                    {item.metricLabel}
                  </span>
                  <span className="text-amber-400 font-mono font-bold text-xs sm:text-sm">
                    {item.metric}
                  </span>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5">
                  <Truck size={13} className="text-amber-400" />
                  <span className="truncate max-w-[130px] sm:max-w-none">{item.equipment}</span>
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="p-3 sm:p-4 bg-slate-950/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Phase {idx + 1} of 5 · Caltrans Standard
              </span>
              <button
                onClick={() => onOpenQuote(`Phase ${item.step}: ${item.title}`)}
                className="px-3.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Schedule Step
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
