import React from "react";
import {
  ShieldCheck,
  Sparkle,
  Drop,
  Truck,
  ArrowsClockwise,
  CaretRight,
} from "@phosphor-icons/react";

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  icon: React.ElementType;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "chip-seal",
    title: "Private Chip Seal",
    tagline: "Durable, weather-resistant surface protection",
    image: "/assets/chip-seal-crew.jpg",
    icon: ShieldCheck,
    description: "A dependable aggregate-and-emulsion treatment for private roads, ranches, and estate driveways.",
  },
  {
    id: "asphalt-paving",
    title: "Asphalt Paving Services",
    tagline: "Smooth, lasting paved surfaces",
    image: "/assets/asphalt-roller.jpg",
    icon: Truck,
    description: "Professional paving support for roadways and surfaces built for reliable everyday use.",
  },
  {
    id: "paving-fabric",
    title: "Paving Fabric Installation",
    tagline: "A protective interlayer for asphalt overlays",
    image: "/assets/paving-fabric.jpg",
    icon: Sparkle,
    description: "Geotextile paving fabric installation helps resist reflective cracking and protect new overlays.",
  },
  {
    id: "dust-control",
    title: "Dust Control Services",
    tagline: "Stabilization for unpaved roads",
    image: "/assets/dust-control.jpg",
    icon: Drop,
    description: "Carefully applied dust treatments help stabilize agricultural roads, haul lanes, and access routes.",
  },
  {
    id: "tack-coat",
    title: "Tack Coat Application",
    tagline: "Consistent bonding between asphalt layers",
    image: "/assets/tack-coat.jpg",
    icon: ArrowsClockwise,
    description: "Uniform tack coat distribution helps create a strong bond between existing pavement and new asphalt.",
  },
  {
    id: "oil-spreading",
    title: "Oil Spreading Services",
    tagline: "Reliable oil distribution for paving crews",
    image: "/assets/oil-spreader-fleet.jpg",
    icon: Truck,
    description: "Oil distributor trucks support paving operations and preventative road maintenance treatments.",
  },
];

export const ServiceShowcase: React.FC<{
  onOpenQuote: (servicePrefill?: string) => void;
}> = ({ onOpenQuote }) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-900 relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              Specialized Operations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              Asphalt Engineering Services
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base mt-4 md:mt-0">
            Tailored specifically for high-expectation California estates, commercial facilities, agricultural growers, and general paving contractors.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/40 bg-slate-950/90 text-amber-400">
                    <Icon size={22} weight="fill" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-black uppercase leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono uppercase tracking-wide text-amber-400">
                    {service.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenQuote(service.title)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110 active:scale-[0.98]"
                  >
                    <span>Enquire Now</span>
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
