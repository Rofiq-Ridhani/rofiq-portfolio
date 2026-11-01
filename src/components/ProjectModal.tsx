import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectData } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const imageEntries = Object.entries(project.images);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % imageEntries.length);
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + imageEntries.length) % imageEntries.length);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-[#101715]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto font-mono"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-5xl w-full bg-[#14251F] border border-[#B7F36B] p-6 md:p-10 relative hud-glow max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#B7F36B] text-[#101715] font-black p-2 uppercase hover:bg-white transition-colors flex items-center gap-1 text-xs"
          >
            <X size={16} /> Close
          </button>

          {/* Header Metadata */}
          <div className="mb-8">
            <span className="text-xs font-bold text-[#B7F36B] bg-[#101715] px-3 py-1 uppercase border border-[#B7F36B]/20 inline-block mb-3">
              {project.category}
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-[#EAECE4] tracking-tighter">
              {project.name}
            </h2>
          </div>

          {/* Image Showcase Gallery */}
          <div className="mb-8 space-y-4">
            <div className="relative aspect-video bg-[#101715] border border-[#B7F36B]/30 overflow-hidden group">
              <img 
                src={imageEntries[activeImageIndex][1]} 
                alt={`${project.name} screenshot`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {imageEntries.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#101715]/80 text-[#B7F36B] border border-[#B7F36B]/40 hover:bg-[#B7F36B] hover:text-[#101715] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#101715]/80 text-[#B7F36B] border border-[#B7F36B]/40 hover:bg-[#B7F36B] hover:text-[#101715] transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {imageEntries.length > 1 && (
              <div className="flex gap-4">
                {imageEntries.map(([key, url], idx) => (
                  <button 
                    key={key} 
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-1 h-20 border overflow-hidden transition-all ${
                      idx === activeImageIndex ? 'border-[#B7F36B] opacity-100 scale-105' : 'border-[#B7F36B]/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={key} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Case Study Grid */}
          <div className="grid md:grid-cols-12 gap-8 mb-8 border-t border-[#B7F36B]/20 pt-8">
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-2">// Overview</h4>
                <p className="text-base text-[#929A91] font-bold uppercase leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-2">// Objectives</h4>
                <p className="text-sm text-[#EAECE4] leading-relaxed">
                  {project.objectives}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-3">// Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-[#EAECE4]">
                      <CheckCircle2 size={14} className="text-[#B7F36B] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-3">// Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs border border-[#B7F36B]/30 bg-[#101715] text-[#EAECE4] px-3 py-1 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.github && (
                <div className="pt-4 border-t border-[#B7F36B]/20">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#B7F36B] text-[#101715] font-black uppercase text-xs tracking-widest hover:bg-white transition-colors"
                  >
                    <Github size={18} /> Sync Repository <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
