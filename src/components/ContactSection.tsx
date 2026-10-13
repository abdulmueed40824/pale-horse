import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  X,
  PaperPlaneTilt,
} from "@phosphor-icons/react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicePrefill?: string;
  notesPrefill?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  servicePrefill = "",
  notesPrefill = "",
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Winery / Vineyard");
  const [service, setService] = useState(servicePrefill || "Private Chip Seals");
  const [estimatedSqFt, setEstimatedSqFt] = useState("");
  const [details, setDetails] = useState(notesPrefill);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (servicePrefill) setService(servicePrefill);
    if (notesPrefill) setDetails(notesPrefill);
  }, [servicePrefill, notesPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-xl border border-amber-500/30 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close quote modal"
            >
              <X size={20} weight="bold" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle size={36} weight="fill" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">
                  Bid Request Received
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong>{fullName}</strong>. Danielle Dormire at Pale Horse Asphalt Engineering will review your specifications and follow up at <strong>{phone}</strong> / <strong>{email}</strong> within 1 business day.
                </p>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-left text-xs font-mono text-slate-300 max-w-md mx-auto mb-6 space-y-1.5">
                  <div>
                    <span className="text-slate-400">Direct Contact:</span> Danielle Dormire
                  </div>
                  <div>
                    <span className="text-slate-400">Dispatch Phone:</span> (559) 314-4226
                  </div>
                  <div>
                    <span className="text-slate-400">Official Email:</span> Danielle@palehorseae.com
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-md bg-amber-500 text-slate-950 font-bold uppercase text-xs tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block mb-1">
                    Direct Estimating Desk
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                    Request Project Proposal
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Direct communication with Danielle Dormire for estate chip seals, dust suppression, paving fabric, or tack spreading.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-fullname" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        id="modal-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Robert Gallagher"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-phone" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(559) 000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Email Address *
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@estatewinery.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-location" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        City / County in CA *
                      </label>
                      <input
                        id="modal-location"
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. St. Helena, Fresno, Modesto"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="modal-service" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Service Needed
                      </label>
                      <select
                        id="modal-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Private Chip Seals">Private Chip Seals</option>
                        <option value="Paving Fabric Interlayer">Paving Fabric</option>
                        <option value="Agricultural Dust Control">Dust Control</option>
                        <option value="Tack & Bond Coating">Tack & Bond Coating</option>
                        <option value="Custom Oil Spreading">Oil Spreading Fleet</option>
                        <option value="Comprehensive Surface Review">Full Review</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modal-property" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Property Class
                      </label>
                      <select
                        id="modal-property"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Winery / Vineyard">Winery / Vineyard</option>
                        <option value="Private Ranch Estate">Private Ranch Estate</option>
                        <option value="Agricultural / Orchard">Farming / Orchard</option>
                        <option value="HOA Community">HOA Community Road</option>
                        <option value="Commercial Contractor">Paving Contractor</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modal-sqft" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                        Est. Sq Ft / Length
                      </label>
                      <input
                        id="modal-sqft"
                        type="text"
                        value={estimatedSqFt}
                        onChange={(e) => setEstimatedSqFt(e.target.value)}
                        placeholder="e.g. 20,000 sq ft or 1/2 mile"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-details" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                      Project Notes / Special Conditions
                    </label>
                    <textarea
                      id="modal-details"
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Describe current road condition, timeline, truck traffic, or access needs..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <PaperPlaneTilt size={18} weight="bold" />
                      <span>Transmit Request to Danielle Dormire</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ContactSection: React.FC<{
  onOpenQuote: (servicePrefill?: string) => void;
}> = ({ onOpenQuote }) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="absolute inset-0 tarmac-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Direct Communication Desk
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Ready to Upgrade Your Roadway Surface?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect directly with Danielle Dormire for rapid project scoping, Caltrans material specification matching, and guaranteed on-site scheduling across Central and Northern California.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <a
                href="tel:5593144226"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone size={24} weight="fill" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Direct Phone Line
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white group-hover:text-amber-400 font-mono transition-colors">
                    (559) 314-4226
                  </div>
                </div>
              </a>

              <a
                href="mailto:Danielle@palehorseae.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <EnvelopeSimple size={24} weight="fill" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Primary Email
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 font-mono transition-colors">
                    Danielle@palehorseae.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin size={24} weight="fill" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Operating Footprint
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    Central Valley & Northern California Corridors
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block">
                  Quick Proposal Request
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                  Get An Official Project Bid
                </h3>
              </div>
              <ShieldCheck size={32} weight="fill" className="text-amber-500" />
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle size={28} weight="fill" />
                </div>
                <h4 className="text-xl font-black uppercase text-white mb-2">Bid Request Received</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Danielle Dormire will review your request and follow up within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-fullname" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Robert Gallagher"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(559) 000-0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@estatewinery.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-location" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                      City / County in CA *
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. St. Helena, Fresno"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                    Project Notes / Special Conditions
                  </label>
                  <textarea
                    id="contact-details"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describe current road condition, timeline, truck traffic, or access needs..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-md bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <PaperPlaneTilt size={18} weight="bold" />
                    <span>Transmit Request to Danielle Dormire</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <CheckCircle size={14} weight="fill" />
                <span>Prompt Response Guaranteed</span>
              </div>
              <p>
                Every proposal inquiry is reviewed directly by company leadership to ensure exact Caltrans emulsion grading and accurate aggregate calculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
