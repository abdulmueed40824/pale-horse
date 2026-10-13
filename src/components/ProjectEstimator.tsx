import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  CaretRight,
  ShieldCheck,
  CheckCircle,
  FileText,
  ArrowsClockwise,
} from "@phosphor-icons/react";

interface EstimatorProps {
  onOpenQuote: (servicePrefill?: string, notes?: string) => void;
}

export const ProjectEstimator: React.FC<EstimatorProps> = ({ onOpenQuote }) => {
  const [serviceType, setServiceType] = useState<
    "chip-seal" | "paving-fabric" | "dust-control" | "tack-coat" | "oil-spread"
  >("chip-seal");
  const [areaSqFt, setAreaSqFt] = useState<number>(15000);
  const [propertyType, setPropertyType] = useState<
    "estate" | "winery" | "farm" | "hoa" | "commercial"
  >("winery");
  const [surfaceCondition, setSurfaceCondition] = useState<
    "unpaved" | "aged-asphalt" | "cracked-failing" | "new-base"
  >("aged-asphalt");

  // Dynamic pricing calculation heuristic
  const rates = {
    "chip-seal": { low: 0.65, high: 1.15, label: "Private Chip Seal System" },
    "paving-fabric": { low: 0.55, high: 0.95, label: "Paving Fabric Geotextile Interlayer" },
    "dust-control": { low: 0.25, high: 0.55, label: "Agricultural Dust Control Treatment" },
    "tack-coat": { low: 0.2, high: 0.45, label: "Tack & Bond Coat Spray" },
    "oil-spread": { low: 0.35, high: 0.75, label: "Custom Distributor Oil Spreading" },
  };

  const currentRate = rates[serviceType];
  const sqYards = Math.round(areaSqFt / 9);

  // Condition modifier
  let conditionFactor = 1.0;
  if (surfaceCondition === "cracked-failing") conditionFactor = 1.15;
  if (surfaceCondition === "unpaved") conditionFactor = 1.08;

  const estimatedMin = Math.round(areaSqFt * currentRate.low * conditionFactor);
  const estimatedMax = Math.round(areaSqFt * currentRate.high * conditionFactor);

  // Approximate materials estimate
  const approxEmulsionGals = Math.round(sqYards * 0.35);
  const approxAggregateTons = Math.round(sqYards * 0.015);

  const handleTransferToQuote = () => {
    const summary = `Estimator calculation: ${areaSqFt.toLocaleString()} sq ft (${sqYards.toLocaleString()} sq yds) for ${currentRate.label}. Property type: ${propertyType}. Existing surface: ${surfaceCondition}. Est. Budget: $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}`;
    onOpenQuote(currentRate.label, summary);
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-slate-950 relative border-t border-b border-slate-800">
      <div className="absolute inset-0 tarmac-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator size={16} weight="fill" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            Calculate Your Surface Investment
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Instant square footage & material estimator for Central & Northern California ranch estates, vineyards, farm roads, and commercial properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            {/* Step 1: Service Selection */}
            <div className="mb-6">
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 tracking-wider mb-3">
                1. Select Application Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: "chip-seal", label: "Private Chip Seal", sub: "Stone + Polymer binder" },
                  { id: "paving-fabric", label: "Paving Fabric", sub: "Crack retardant membrane" },
                  { id: "dust-control", label: "Dust Control", sub: "Lignin / MgCl treatment" },
                  { id: "tack-coat", label: "Tack & Bond Coat", sub: "Subcontract emulsion spray" },
                  { id: "oil-spread", label: "Custom Oil Spreading", sub: "Bulk distributor tanker" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceType(s.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      serviceType === s.id
                        ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold uppercase flex items-center justify-between">
                      <span>{s.label}</span>
                      {serviceType === s.id && (
                        <CheckCircle size={16} weight="fill" className="text-amber-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Square Footage Slider */}
            <div className="mb-6 bg-slate-950/60 p-5 rounded-lg border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                  2. Project Surface Area
                </label>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {areaSqFt.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono ml-1">SQ FT</span>
                  <span className="text-xs text-slate-500 block">
                    (~{sqYards.toLocaleString()} SQ YDS)
                  </span>
                </div>
              </div>

              <input
                id="estimator-slider"
                aria-label="Project surface area slider in square feet"
                type="range"
                min="2500"
                max="100000"
                step="2500"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                <span>2,500 SQ FT (Driveway)</span>
                <span>25,000 SQ FT (Acre)</span>
                <span>100,000 SQ FT (Corridor / Ranch)</span>
              </div>
            </div>

            {/* Step 3: Property Type & Surface Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="property-class-select" className="block text-xs font-mono font-bold uppercase text-slate-300 tracking-wider mb-2">
                  3. Facility / Property Class
                </label>
                <select
                  id="property-class-select"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="winery">Winery / Vineyard Estate</option>
                  <option value="estate">Luxury Private Residence / Ranch</option>
                  <option value="farm">Agricultural Orchard / Farming Road</option>
                  <option value="hoa">HOA Housing Community Road Network</option>
                  <option value="commercial">Commercial / Industrial Distribution Yard</option>
                </select>
              </div>

              <div>
                <label htmlFor="surface-condition-select" className="block text-xs font-mono font-bold uppercase text-slate-300 tracking-wider mb-2">
                  4. Current Surface Condition
                </label>
                <select
                  id="surface-condition-select"
                  value={surfaceCondition}
                  onChange={(e) => setSurfaceCondition(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="aged-asphalt">Oxidized / Weathered Asphalt</option>
                  <option value="cracked-failing">Alligatored / Severe Cracking</option>
                  <option value="unpaved">Compacted Dirt / Gravel Roadbed</option>
                  <option value="new-base">Fresh Aggregate Base (New Construction)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-widest block">
                  Budget Estimator Summary
                </span>
                <h3 className="text-xl font-black uppercase text-white">
                  Preliminary Project Scope
                </h3>
              </div>
              <ShieldCheck size={28} weight="fill" className="text-amber-500" />
            </div>

            {/* Estimated Price Range */}
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 mb-6 text-center">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Estimated Project Cost Range
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                *Subject to on-site evaluation, haul distance & Caltrans spec requirements
              </span>
            </div>

            {/* Scope Details List */}
            <div className="space-y-3 mb-8 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Selected Service:</span>
                <span className="font-bold text-amber-300 text-right">{currentRate.label}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Total Area:</span>
                <span className="font-bold text-white">{areaSqFt.toLocaleString()} sq ft</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Estimated Emulsion:</span>
                <span className="font-bold text-white">~{approxEmulsionGals.toLocaleString()} Gallons</span>
              </div>
              {serviceType === "chip-seal" && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Aggregate Rock Chips:</span>
                  <span className="font-bold text-white">~{approxAggregateTons} Tons (Fractured)</span>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Service Area:</span>
                <span className="font-bold text-amber-400">Central & Northern CA</span>
              </div>
            </div>

            {/* Primary Action Button to lock in estimate */}
            <button
              onClick={handleTransferToQuote}
              className="w-full py-4 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <FileText size={18} weight="bold" />
              <span>Lock In Bid with Danielle Dormire</span>
              <CaretRight size={16} weight="bold" />
            </button>

            <div className="text-center mt-4">
              <a
                href="tel:5593144226"
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                Or call direct for emergency or immediate bids:{" "}
                <strong className="text-amber-400">(559) 314-4226</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
