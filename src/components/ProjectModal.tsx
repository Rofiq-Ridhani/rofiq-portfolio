import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { ProjectData } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const mainImage = Object.values(project.images)[0];

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
          className="max-w-6xl w-full bg-[#14251F] border border-[#B7F36B] p-6 md:p-10 relative hud-glow max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-[#B7F36B] text-[#101715] font-black p-3 uppercase hover:bg-white transition-colors flex items-center gap-2 text-sm z-10"
          >
            <X size={20} /> Close
          </button>

          {/* Header Metadata */}
          <div className="mb-8">
            <span className="text-xs font-bold text-[#B7F36B] bg-[#101715] px-3 py-1 uppercase border border-[#B7F36B]/20 inline-block mb-3">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#EAECE4] tracking-tighter">
              {project.name}
            </h2>
          </div>

          {/* Single Full Image Showcase (No crop) */}
          <div className="mb-8">
            <div className="relative aspect-video bg-[#101715] border border-[#B7F36B]/30 overflow-hidden flex items-center justify-center">
              <img 
                src={mainImage} 
                alt={`${project.name} screenshot`} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Case Study Grid */}
          <div className="grid md:grid-cols-12 gap-8 mb-8 border-t border-[#B7F36B]/20 pt-8">
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-2">// Overview</h4>
                <p className="text-sm md:text-base text-[#929A91] font-bold uppercase leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#B7F36B] uppercase mb-2">// Objectives</h4>
                <p className="text-xs md:text-sm text-[#EAECE4] leading-relaxed">
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
