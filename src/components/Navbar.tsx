import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 bg-[#14251F]/90 backdrop-blur-md border-b border-[#B7F36B]/20">
      <div className="font-black text-xl uppercase tracking-tighter text-[#B7F36B]">Rofiq Portfolio</div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 uppercase text-xs font-black">
        <a href="#about" className="text-[#EAECE4] hover:text-[#B7F36B] transition-colors">About</a>
        <a href="#skills" className="text-[#EAECE4] hover:text-[#B7F36B] transition-colors">Skills</a>
        <a href="#projects" className="text-[#EAECE4] hover:text-[#B7F36B] transition-colors">Projects</a>
        <a href="#contact" className="text-[#EAECE4] hover:text-[#B7F36B] transition-colors">Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden p-2 border border-[#B7F36B]/40 bg-[#14251F] text-[#B7F36B]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
