import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretDown,
  Quotes,
  Star,
  ShieldCheck,
  CaretLeft,
  CaretRight,
  UserCircle,
} from "@phosphor-icons/react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Chip Seal Operations",
    question: "What is the true difference between a chip seal and traditional hot-mix asphalt paving?",
    answer:
      "A chip seal (or seal coat with aggregate) is an engineered layer of high-viscosity polymer asphalt emulsion directly covered with clean, fractured granite or basalt stone chips and compacted with pneumatic rollers. It costs approximately 30% to 50% of 2-inch hot-mix asphalt while providing an all-weather, high-friction, waterproof wear surface that extends base life by 8 to 12 years. It is the premier choice for rural ranch roads, long private driveways, and winery properties.",
  },
  {
    category: "Paving Fabric",
    question: "How does paving fabric prevent reflective cracking in asphalt overlays?",
    answer:
      "When an asphalt overlay is paved directly over cracked pavement, seasonal thermal movement causes the old cracks to quickly telegraph upward (reflective cracking). Non-woven polypropylene geotextile paving fabric is saturated with a heavy tack coat binder (0.20–0.25 gal/yd²). It creates a flexible, waterproof tensile membrane that absorbs horizontal shear stresses and stops moisture from penetrating into the structural road subbase.",
  },
  {
    category: "Dust Control",
    question: "Is your agricultural dust control safe for grapevines, nut orchards, and livestock?",
    answer:
      "Yes. We utilize environmentally certified dust palliatives—including lignin sulfonates (natural tree binder derivatives) and high-purity magnesium chloride. They are non-toxic, non-corrosive when applied per spec, and safe for adjacent vineyards, almond and walnut canopies, horses, and livestock. Furthermore, our dust control satisfies San Joaquin Valley Air Pollution Control District (SJVAPCD) fugitive PM10 dust compliance standards.",
  },
  {
    category: "Operations & Timing",
    question: "How soon can vehicles drive on a newly applied chip seal or oil spread road?",
    answer:
      "For private chip seals, light traffic can typically resume within 4 to 6 hours after pneumatic rolling and initial binder set. We recommend keeping speeds under 15 MPH for the first 48 hours while the embedment fully interlocks. Sweeping of excess loose stone is conducted within 48 to 72 hours. For tack coat applications, fresh asphalt paver crews can roll in as soon as the emulsion breaks (changes from brown to black, usually 20 to 45 minutes).",
  },
  {
    category: "Service Area & Bidding",
    question: "What areas in California do you service, and how do we schedule an on-site bid?",
    answer:
      "We serve Central and Northern California, including Fresno, Madera, Visalia, Modesto, Stockton, Greater Sacramento, Napa/Sonoma Wine Country, and Monterey/San Benito counties. Danielle Dormire personally coordinates project scheduling and on-site assessments. Call Danielle directly at (559) 314-4226 or submit a bid request online.",
  },
];

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  facility: string;
  location: string;
  service: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      "Danielle and the Pale Horse crew delivered phenomenal chip seal work on our winery access corridor. Our tasting room guests love the rustic stone appearance, and our vineyard managers are thrilled that harvest dust clouds on the vines are completely eliminated.",
    author: "Marcus Sterling",
    role: "Vineyard Operations Director",
    facility: "Estate Winery & Tasting Pavilion",
    location: "St. Helena, Napa Valley, CA",
    service: "Double Chip Seal Surface Treatment",
  },
  {
    quote:
      "We manage a 4-mile private ranch road system in the Sierra foothills. Every winter storm washed out our aggregate until Pale Horse engineered our chip seal. Two seasons with zero washouts and zero mud. Danielle’s communication from day one was unmatched.",
    author: "Elena & Tom Vance",
    role: "Private Ranch Owners",
    facility: "Rancho Del Cielo Estate",
    location: "Madera / Fresno Foothills, CA",
    service: "Heavy-Duty Private Chip Seal",
  },
  {
    quote:
      "Finding a reliable subcontractor who can spray tack coat and oil distributor passes on our tight commercial schedules was tough until we connected with Pale Horse. Their computerized Bearcat truck hit exact Caltrans spray tolerances with zero overspray.",
    author: "Brad Kowalski",
    role: "Senior Project Super",
    facility: "General Engineering & Paving",
    location: "Modesto / Central Valley, CA",
    service: "Computerized Tack Coat Subcontract",
  },
];

export const FaqAndReviews: React.FC<{
  onOpenQuote: (servicePrefill?: string) => void;
}> = ({ onOpenQuote }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevReview = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextReview = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const t = testimonials[currentTestimonial];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split: Reviews & Client Feedback Carousel */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Quotes size={16} weight="fill" />
              <span>Verified Client Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              Trusted by Estates, Wineries & Growers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl border border-slate-800 p-8 sm:p-12 relative shadow-2xl overflow-hidden">
            <div className="absolute top-6 right-8 text-amber-500/10 pointer-events-none">
              <Quotes size={120} weight="fill" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} weight="fill" />
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-300 ml-2">
                    5.0 STAR RATED WORK
                  </span>
                </div>

                <p className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <UserCircle size={28} weight="fill" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white uppercase">
                        {t.author}
                      </div>
                      <div className="text-xs text-amber-400 font-mono">
                        {t.role} • {t.facility}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                      {t.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Controls */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-900">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentTestimonial
                        ? "w-8 bg-amber-500"
                        : "w-2 bg-slate-800 hover:bg-slate-700"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500 transition-colors"
                  aria-label="Previous review"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500 transition-colors"
                  aria-label="Next review"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split: Engineering FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck size={16} weight="fill" />
              <span>Technical Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Everything you need to know about chip seals, paving fabric specifications, and agricultural dust control palliatives.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-900/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold uppercase text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-amber-500 text-slate-950" : "bg-slate-900 text-amber-400"
                      }`}
                    >
                      <CaretDown size={18} weight="bold" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-900">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 p-6 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-base font-bold uppercase text-white mb-1">
              Have specific site or Caltrans spec questions?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Danielle Dormire provides direct technical engineering answers for property owners and paving contractors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:5593144226"
                className="px-5 py-2.5 rounded-md bg-slate-900 text-white border border-slate-700 hover:border-amber-500 text-xs font-bold uppercase tracking-wider"
              >
                Call: (559) 314-4226
              </a>
              <button
                onClick={() => onOpenQuote("Technical Specification Inquiry")}
                className="px-5 py-2.5 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Send Technical Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
