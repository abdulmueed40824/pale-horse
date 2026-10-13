import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ShieldCheck,
  Truck,
  Flame,
  Gauge,
  CheckCircle,
  PhoneCall,
  Buildings,
  TreeEvergreen,
} from "@phosphor-icons/react";

interface FleetEquipment {
  name: string;
  category: string;
  specs: string;
  description: string;
  badge: string;
}

const fleetItems: FleetEquipment[] = [
  {
    name: "Bearcat Computerized Asphalt Distributors",
    category: "Precision Oil Spreading",
    specs: "3,500 Gallon Tank | 18ft Spray Bar | 0.05-0.60 gal/yd²",
    description:
      "Fully automated computerized rate sync linked to ground speed radar for 100% uniform tack, prime, and asphalt emulsion coverage with zero dry streaks.",
    badge: "Computer-Metered",
  },
  {
    name: "Hydrostatic Self-Propelled Chip Spreaders",
    category: "Chip Seal Operations",
    specs: "Variable Width 10-16ft | 10-Gate Aggregate Feed",
    description:
      "Precision aggregate metering distributes clean fractured rock directly onto hot emulsion before heat dissipation, ensuring maximum stone embedment.",
  badge: "High-Traction",
  },
  {
    name: "Pneumatic Multi-Tire Compactor Rollers",
    category: "Kneading & Embedment",
    specs: "9-Wheel Configuration | 15-Ton Ballast Compaction",
    description:
      "Unlike steel drums that crush fractured rock chips, rubber tires knead aggregate stones firmly into the binder layer without pulverization.",
    badge: "Stone-Safe",
  },
  {
    name: "Specialized Geotextile Paving Fabric Roll Rigs",
    category: "Structural Interlayer",
    specs: "Continuous Tension Bar | 12.5ft & 15ft Roll Widths",
    description:
      "Smooth, wrinkle-free mechanical payout of non-woven polypropylene fabric directly into hot tack oil for maximum shear interlock.",
    badge: "Zero-Wrinkle",
  },
];

const serviceRegions = [
  {
    region: "Central Valley Hub",
    cities: ["Fresno", "Clovis", "Madera", "Visalia", "Hanford", "Tulare"],
    focus: "Agricultural dust control, farm lanes, packing facilities, commercial paving tack",
    icon: Truck,
  },
  {
    region: "Napa & Sonoma Wine Country",
    cities: ["Napa", "Sonoma", "St. Helena", "Healdsburg", "Santa Rosa"],
    focus: "Private winery estate chip seals, tasting room drives, guest parking, dust prevention",
    icon: TreeEvergreen,
  },
  {
    region: "Greater Sacramento & Foothills",
    cities: ["Sacramento", "Roseville", "Auburn", "El Dorado Hills", "Placerville"],
    focus: "Rural residential estates, HOA private road networks, mountain ranch entries",
    icon: Buildings,
  },
  {
    region: "Northern San Joaquin & Modesto",
    cities: ["Modesto", "Stockton", "Turlock", "Tracy", "Lodi"],
    focus: "Almond orchard haul corridors, logistics yards, paving fabric overlays",
    icon: ShieldCheck,
  },
  {
    region: "Central Coast & Monterey Bay",
    cities: ["Salinas", "Monterey", "Carmel Valley", "Paso Robles"],
    focus: "Coastal vineyard access, equestrian estate roadways, private ranch sealing",
    icon: TreeEvergreen,
  },
];

export const FleetAndServiceMap: React.FC<{
  onOpenQuote: (servicePrefill?: string) => void;
}> = ({ onOpenQuote }) => {
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section id="equipment" className="py-20 lg:py-28 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 1: Company Story & Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-slate-800 pb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Independent California Small Business
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Delivering Exceptional Work Across California.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              <strong>Pale Horse Asphalt Engineering</strong> is a small, owner-operated enterprise built on direct accountability, specialized engineering equipment, and pride in execution.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Unlike broad asphalt contractors who sub out their specialty tasks, we own and operate specialized distributor trucks, chip spreading machinery, and geotextile rigs. We work directly with private estate owners, winery general managers, commercial general contractors, and farm operators who expect precision application and clear communication from start to finish.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
                  100%
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300">
                  Owner Accountability
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Direct contact with Danielle Dormire
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
                  Caltrans
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300">
                  Grade Specifications
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  PMRE emulsions & aggregate specs
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:5593144226"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all"
              >
                <PhoneCall size={18} weight="fill" />
                <span>Speak with Danielle: (559) 314-4226</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src="/assets/vineyard-road.jpg"
                alt="Winery vineyard road paved with chip seal"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-slate-950/90 border border-amber-500/30 backdrop-blur-sm">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold mb-1">
                  Estate & Agricultural Excellence
                </div>
                <div className="text-sm font-semibold text-white">
                  Preserving rural California roadways with engineered chip seals that withstand heavy harvest loads and seasonal weather.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Fleet & Equipment Capability */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Gauge size={16} weight="fill" />
              <span>Engineered Machinery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              Our Specialized Equipment Fleet
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              We deploy purpose-built asphalt maintenance and spreading equipment designed to provide exact application rates across every square yard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleetItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 rounded-xl border border-slate-800 p-6 sm:p-7 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 bg-slate-900/90 py-1.5 px-3 rounded border border-slate-800 mb-3">
                    {item.specs}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-900 flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <CheckCircle size={16} weight="fill" className="text-amber-500" />
                  <span>Calibrated & operated by seasoned asphalt engineering crew</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Central & Northern California Service Area */}
        <div id="service-area" className="bg-slate-950 rounded-xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin size={16} weight="fill" />
              <span>Regional Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Central & Northern California Service Footprint
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Based in the Central Valley, we dispatch specialized distribution crews and equipment across Northern California agricultural and wine corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Region Selector Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {serviceRegions.map((sr, idx) => {
                const Icon = sr.icon;
                const isSelected = activeRegion === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveRegion(idx)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base uppercase text-white">
                        <Icon
                          size={18}
                          weight="fill"
                          className={isSelected ? "text-amber-400" : "text-slate-400"}
                        />
                        <span>{sr.region}</span>
                      </div>
                      <span className="text-xs font-mono text-amber-400">
                        {isSelected ? "ACTIVE" : "VIEW"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-sans">
                      {sr.cities.join(" • ")}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Region Detailed Visual Card */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between h-full shadow-inner">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <MapPin size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white">
                      {serviceRegions[activeRegion].region}
                    </h3>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      Specialized Territory Focus
                    </span>
                  </div>
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Targeted Operations in this Region:
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-200">
                      {serviceRegions[activeRegion].focus}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                      Key Cities & Surrounding Rural Counties:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {serviceRegions[activeRegion].cities.map((city, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-amber-300 font-bold"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Have a ranch or commercial road project in this area?
                </div>
                <button
                  onClick={() =>
                    onOpenQuote(
                      `Service Area: ${serviceRegions[activeRegion].region}`
                    )
                  }
                  className="w-full sm:w-auto px-5 py-3 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all text-center"
                >
                  Schedule Site Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
