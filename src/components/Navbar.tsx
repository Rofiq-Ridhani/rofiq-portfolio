import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 bg-[#F2F0E9] border-b border-[#151515]">
      <div className="font-black text-xl uppercase tracking-tighter">Rofiq Portfolio</div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 uppercase text-xs font-black">
        <a href="#about" className="hover:bg-[#C5F467] px-2 py-1 border border-transparent hover:border-black transition-colors">About</a>
        <a href="#skills" className="hover:bg-[#C5F467] px-2 py-1 border border-transparent hover:border-black transition-colors">Skills</a>
        <a href="#projects" className="hover:bg-[#C5F467] px-2 py-1 border border-transparent hover:border-black transition-colors">Projects</a>
        <a href="#contact" className="hover:bg-[#C5F467] px-2 py-1 border border-transparent hover:border-black transition-colors">Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden p-2 border border-black bg-[#C5F467]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Links Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F2F0E9] border-b border-black flex flex-col p-6 gap-4 md:hidden">
          <a href="#about" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase border-b border-black/20 pb-2">About</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase border-b border-black/20 pb-2">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase border-b border-black/20 pb-2">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase border-b border-black/20 pb-2">Contact</a>
        </div>
      )}
    </nav>
  );
}
