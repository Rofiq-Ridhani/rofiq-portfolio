import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, ArrowRight, X, Layout, Cpu, Database, Mail } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: any) => void;
}

export default function CommandCenter({ isOpen, onClose, onSelectProject }: CommandCenterProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigationItems = [
    { title: 'Navigate to About', type: 'nav', href: '#about', icon: Cpu },
    { title: 'Navigate to Skills', type: 'nav', href: '#skills', icon: Database },
    { title: 'Navigate to Projects', type: 'nav', href: '#projects', icon: Layout },
    { title: 'Navigate to Contact', type: 'nav', href: '#contact', icon: Mail },
  ];

  const projectItems = PROJECTS.map(p => ({
    title: `Project: ${p.name} (${p.category})`,
    type: 'project',
    project: p,
    icon: Terminal
  }));

  const allItems = [...navigationItems, ...projectItems].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(allItems.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % Math.max(allItems.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected) {
          if (selected.type === 'nav') {
            window.location.href = selected.href!;
            onClose();
          } else if (selected.type === 'project') {
            onSelectProject(selected.project);
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-[#101715]/80 backdrop-blur-md flex items-start justify-center pt-20 md:pt-32 p-4 font-mono"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#14251F] border border-[#B7F36B] shadow-2xl overflow-hidden hud-glow"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Search Input */}
          <div className="flex items-center px-6 py-4 border-b border-[#B7F36B]/20 bg-[#101715]">
            <Search className="text-[#B7F36B] mr-4" size={20} />
            <input 
              autoFocus
              type="text"
              placeholder="Type a command or search archives (e.g., STARS, About)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent text-[#EAECE4] placeholder-[#527A63] outline-none text-sm md:text-base uppercase"
            />
            <button onClick={onClose} className="text-[#527A63] hover:text-[#B7F36B] p-1">
              <X size={20} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {allItems.length === 0 ? (
              <div className="text-center py-8 text-[#527A63] uppercase text-xs">
                // No matching command or archive found.
              </div>
            ) : (
              allItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (item.type === 'nav') {
                        window.location.href = item.href!;
                        onClose();
                      } else {
                        onSelectProject(item.project);
                        onClose();
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors border ${
                      isSelected 
                        ? 'bg-[#B7F36B] text-[#101715] border-[#B7F36B]' 
                        : 'bg-[#101715]/40 text-[#EAECE4] border-[#B7F36B]/10 hover:border-[#B7F36B]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isSelected ? 'text-[#101715]' : 'text-[#B7F36B]'} />
                      <span className="text-xs md:text-sm uppercase font-bold">{item.title}</span>
                    </div>
                    <ArrowRight size={14} className={isSelected ? 'text-[#101715]' : 'text-[#527A63]'} />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Helper */}
          <div className="px-6 py-3 border-t border-[#B7F36B]/20 bg-[#101715] flex justify-between items-center text-[10px] text-[#527A63] uppercase">
            <span>[↑↓] Navigate</span>
            <span>[ENTER] Select</span>
            <span>[ESC] Close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
