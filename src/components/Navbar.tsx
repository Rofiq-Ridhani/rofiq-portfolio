import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full p-4 md:p-6 lg:p-8 flex justify-between items-center z-40 bg-[#14251F]/90 backdrop-blur-md border-b border-[#B7F36B]/20">
      <div className="font-black text-xl md:text-2xl uppercase tracking-tighter text-[#B7F36B]">Rofiq Portfolio</div>
      
      {/* Desktop Search */}
      <div className="hidden md:flex items-center gap-6">
        <button 
          onClick={onOpenSearch}
          className="flex items-center gap-2 bg-[#B7F36B]/10 border border-[#B7F36B]/30 px-3 py-1.5 text-[#B7F36B] hover:bg-[#B7F36B] hover:text-[#101715] transition-all uppercase text-xs font-black"
        >
          <Search size={14} /> <span className="text-[10px]">CTRL + K</span>
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden items-center gap-4">
        <button 
          onClick={onOpenSearch}
          className="p-2 border border-[#B7F36B]/40 bg-[#14251F] text-[#B7F36B]"
          aria-label="Open command center"
        >
          <Search size={20} />
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 border border-[#B7F36B]/40 bg-[#14251F] text-[#B7F36B]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Links Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#101715] border-b border-[#B7F36B]/20 flex flex-col p-6 gap-4 md:hidden">
          <a href="#about" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase text-[#EAECE4] border-b border-[#B7F36B]/10 pb-2">About</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase text-[#EAECE4] border-b border-[#B7F36B]/10 pb-2">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase text-[#EAECE4] border-b border-[#B7F36B]/10 pb-2">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase text-[#EAECE4] border-b border-[#B7F36B]/10 pb-2">Contact</a>
        </div>
      )}
    </nav>
  );
}
