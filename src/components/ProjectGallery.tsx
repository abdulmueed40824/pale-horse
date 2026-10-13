import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
} from "@phosphor-icons/react";

interface ProjectCase {
  id: string;
  title: string;
  category: "chip-seal" | "paving-fabric" | "dust-control" | "tack-coat";
  videoId: string;
  thumbnail: string;
}

const projects: ProjectCase[] = [
  {
    id: "p1",
    title: "Oil Distribution & Tack Spread Operation",
    category: "tack-coat",
    videoId: "mEJHpLX9-Xg",
    thumbnail: "https://img.youtube.com/vi/mEJHpLX9-Xg/hqdefault.jpg",
  },
  {
    id: "p2",
    title: "Chip Seal Application in Motion",
    category: "chip-seal",
    videoId: "plGFDBTuEQY",
    thumbnail: "https://img.youtube.com/vi/plGFDBTuEQY/hqdefault.jpg",
  },
  {
    id: "p3",
    title: "Distributor Fleet on the Road",
    category: "tack-coat",
    videoId: "Uj0GFTkhhB4",
    thumbnail: "https://img.youtube.com/vi/Uj0GFTkhhB4/hqdefault.jpg",
  },
  {
    id: "p4",
    title: "Asphalt Surface Treatment Workflow",
    category: "paving-fabric",
    videoId: "itB1FUg36m0",
    thumbnail: "https://img.youtube.com/vi/itB1FUg36m0/hqdefault.jpg",
  },
  {
    id: "p5",
    title: "Dust Control & Surface Stabilization",
    category: "dust-control",
    videoId: "DIXuPRz39QY",
    thumbnail: "https://img.youtube.com/vi/DIXuPRz39QY/hqdefault.jpg",
  },
  {
    id: "p6",
    title: "Paving & Roadway Maintenance Showcase",
    category: "chip-seal",
    videoId: "73ewe22LWXo",
    thumbnail: "https://img.youtube.com/vi/73ewe22LWXo/hqdefault.jpg",
  },
];

export const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(
    null
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              Field Execution
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              Project Case Studies & Gallery
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base mt-4 md:mt-0">
            Real California field executions across private ranches, world-class wineries, commercial corridors, and agricultural operations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 p-3 shadow-lg shadow-amber-500/20">
                    <Play size={20} weight="fill" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 rounded-xl border border-amber-500/30 max-w-2xl w-full shadow-2xl p-6 sm:p-8 relative"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                  aria-label="Close project modal"
                >
                  <X size={20} weight="bold" />
                </button>

                <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&rel=0`}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
