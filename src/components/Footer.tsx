import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Phone, EnvelopeSimple, MapPin, ShieldCheck } from "@phosphor-icons/react";

export const Footer: React.FC<{
  onOpenQuote: (servicePrefill?: string) => void;
  onOpenEstimator: () => void;
}> = ({ onOpenQuote, onOpenEstimator }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mt-4">
              <strong>Pale Horse Asphalt Engineering</strong> delivers exceptional asphalt preservation and heavy-duty surface treatments to Central and Northern California client markets.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} weight="fill" className="text-amber-500" />
                <span>Licensed California Small Business Enterprise</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} weight="fill" className="text-amber-500" />
                <span>Central Valley Base • Northern CA Dispatch</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3">
              Explore Pale Horse
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#missions" className="hover:text-amber-400 transition-colors">Missions</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">Video Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct Dispatch */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3">
              Client & Project Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 block font-mono">Lead Estimator / Dispatch:</span>
                <strong className="text-white text-sm">Danielle Dormire</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono">Direct Phone:</span>
                <a
                  href="tel:5593144226"
                  className="text-amber-400 hover:underline font-mono text-base font-bold"
                >
                  (559) 314-4226
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-mono">Official Email:</span>
                <a
                  href="mailto:Danielle@palehorseae.com"
                  className="text-slate-200 hover:text-amber-400 font-mono"
                >
                  Danielle@palehorseae.com
                </a>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="px-3.5 py-2 rounded bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Request Project Bid
                </button>
                <button
                  onClick={onOpenEstimator}
                  className="px-3.5 py-2 rounded bg-slate-900 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all"
                >
                  Calculator Tool
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Pale Horse Asphalt Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Specializing in Chip Seals, Paving Fabric, Dust Control & Oil Spreading</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
