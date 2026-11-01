import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Layout, Mail, Github, Menu, X, Wifi, Battery, MapPin, Search } from 'lucide-react';
import { PROJECTS, SKILLS } from './data/portfolio';

// --- COMPONENTS ---

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logMessages = [
    "INITIALIZING KERNEL v2.0.26...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING NEURAL INTERFACE...",
    "DECRYPTING MISSION DATA: STARS",
    "DECRYPTING MISSION DATA: AMIGO",
    "SYNCING LOCAL REPOSITORIES...",
    "SYSTEM STATUS: OPTIMAL",
    "AUTHENTICATION SUCCESSFUL",
    "WELCOME COMMANDER RIDHANI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    logMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, i * 300);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#101715] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-lg border border-[#B7F36B]/30 p-8 hud-glow relative bg-[#14251F]">
        <div className="flex justify-between text-[#B7F36B] mb-4 text-xs uppercase tracking-widest">
          <span>Boot Sequence</span>
          <span>System Status: 72%</span>
        </div>
        <div className="h-4 w-full bg-[#101715] border border-[#B7F36B]/20 mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-[#B7F36B]"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
          />
        </div>
        <div className="h-48 overflow-hidden text-[10px] md:text-xs text-[#527A63] uppercase space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? 'text-[#B7F36B]' : ''}>{log}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-[#B7F36B] font-black text-2xl">
          {percent}%
        </div>
      </div>
    </div>
  );
};

const HUDPanel = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`hud-border p-4 bg-[#14251F]/50 backdrop-blur-sm relative group ${className}`}>
    <div className="absolute -top-3 left-4 bg-[#101715] px-2 text-[10px] uppercase font-bold text-[#B7F36B] tracking-tighter border border-[#B7F36B]/20">
      {title}
    </div>
    {children}
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-[#101715] text-[#EAECE4] selection:bg-[#B7F36B] selection:text-[#101715] relative overflow-x-hidden grid-bg font-mono">
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <div className="flex flex-col min-h-screen relative">
          
          {/* HEADER / STATUS BAR */}
          <header className="h-16 border-b border-[#B7F36B]/20 flex items-center justify-between px-6 md:px-12 bg-[#14251F]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B7F36B] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B7F36B]">Mission Control</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-[10px] text-[#527A63] font-bold uppercase border-l border-[#B7F36B]/10 pl-6">
                <div className="flex items-center gap-1"><MapPin size={10} /> EARTH / ID</div>
                <div className="flex items-center gap-1"><Wifi size={10} /> LINK OPTIMAL</div>
              </div>
            </div>
            
            <nav className="flex items-center gap-6 text-xs font-bold uppercase">
              <a href="#about" className="hover:text-[#B7F36B] transition-colors">About</a>
              <a href="#skills" className="hover:text-[#B7F36B] transition-colors">Skills</a>
              <a href="#projects" className="hover:text-[#B7F36B] transition-colors">Projects</a>
              <a href="#contact" className="hover:text-[#B7F36B] transition-colors">Contact</a>
            </nav>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6 md:p-16 space-y-32 max-w-7xl mx-auto w-full">
            
            {/* HERO SECTION */}
                <section id="hero" className="min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center relative">
                  <div className="inline-block border border-[#B7F36B]/30 px-3 py-1 bg-[#14251F] text-[#B7F36B] text-[10px] font-mono mb-4 w-fit">
                    COMMANDER: RIDHANI // SYS_ID: 2.0.26
                  </div>
                  <h1 className="text-[16vw] sm:text-[12vw] md:text-[8vw] font-black leading-[0.9] uppercase tracking-tighter mb-8">
                    Muhammad<br />
                    <span className="text-[#B7F36B]">Rofiq</span><br />
                    Ridhani
                  </h1>
              <p className="text-lg md:text-2xl text-[#929A91] font-bold uppercase mb-12 max-w-2xl leading-tight">
                Backend Developer · Tech Enthusiast · Full-Stack Builder
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-[#B7F36B] text-[#101715] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[4px_4px_0px_0px_rgba(20,37,31,1)]">
                  Initialize Comm
                </a>
                <a href="https://github.com/Rofiq-Ridhani" target="_blank" rel="noreferrer" className="px-8 py-4 border border-[#B7F36B]/40 text-[#B7F36B] font-black uppercase tracking-widest hover:bg-[#B7F36B]/10 transition-colors">
                  Access Repo
                </a>
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="border-t border-[#B7F36B]/20 pt-24">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <HUDPanel title="Intel Profile" className="aspect-[4/5] bg-[#14251F] flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 rounded-full border-2 border-[#B7F36B] mx-auto mb-4 flex items-center justify-center text-3xl font-black text-[#B7F36B]">
                        MRR
                      </div>
                      <div className="text-xs text-[#527A63] font-mono uppercase tracking-widest">CLEARANCE: LEVEL 5</div>
                    </div>
                  </HUDPanel>
                </div>
                <div className="lg:col-span-7 space-y-8 text-lg md:text-xl font-bold uppercase leading-relaxed text-[#929A91]">
                  <div className="text-[#B7F36B] font-mono text-xs">01 / MISSION_INTEL</div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase text-[#EAECE4] tracking-tighter">About Me</h2>
                  <p>Hey, I'm Muhammad Rofiq Ridhani. Tech enthusiast interested in web dev, backend, and AI.</p>
                  <p>I use AI for debugging, learning, experimenting, and vibe coding.</p>
                  <div className="p-6 border-l-4 border-[#B7F36B] bg-[#14251F] text-[#B7F36B]">
                    "Trying to get better, not perfect."
                  </div>
                </div>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="border-t border-[#B7F36B]/20 pt-24">
              <div className="text-[#B7F36B] font-mono text-xs mb-2">02 / SKILL_MODULES</div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">Inventory</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SKILLS.map((skill, idx) => (
                  <HUDPanel key={skill} title={`MOD_0${idx + 1}`} className="hover:border-[#B7F36B] transition-colors bg-[#14251F]/40 p-6">
                    <div className="text-lg font-black uppercase text-[#EAECE4]">{skill}</div>
                  </HUDPanel>
                ))}
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="border-t border-[#B7F36B]/20 pt-24">
              <div className="text-[#B7F36B] font-mono text-xs mb-2">03 / PROJECT_ARCHIVES</div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">Archives</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => setActiveProject(project)}
                    className="group border border-[#B7F36B]/20 bg-[#14251F]/30 hover:border-[#B7F36B] transition-all cursor-pointer p-6 relative overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden mb-6 border border-[#B7F36B]/10">
                      <img 
                        src={Object.values(project.images)[0] as string} 
                        alt={project.name}
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#B7F36B] bg-[#101715] px-2 py-1 uppercase mb-2 inline-block border border-[#B7F36B]/20">{project.category}</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">{project.name}</h3>
                    <p className="text-xs text-[#929A91] font-bold uppercase line-clamp-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="border-t border-[#B7F36B]/20 pt-24 pb-12">
              <div className="text-[#B7F36B] font-mono text-xs mb-2">04 / COMM_CHANNEL</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">Connect</h2>
              <p className="text-xl text-[#929A91] font-bold uppercase max-w-xl mb-12">
                Always open to new opportunities and collaborations.
              </p>
              <a href="mailto:mridhani51@gmail.com" className="text-4xl md:text-6xl font-black uppercase text-[#B7F36B] underline hover:text-white transition-colors text-glow">
                Send Email
              </a>
            </section>

          </main>

          {/* FOOTER */}
          <footer className="border-t border-[#B7F36B]/20 py-8 px-6 text-center text-xs text-[#527A63] font-mono uppercase">
            © 2026 Muhammad Rofiq Ridhani. All rights reserved.
          </footer>

        </div>
      )}

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-[#101715]/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setActiveProject(null)}>
          <div className="max-w-4xl w-full bg-[#14251F] border border-[#B7F36B] p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveProject(null)} className="absolute -top-4 -right-4 bg-[#B7F36B] text-[#101715] font-black px-4 py-2 uppercase">
              Close [X]
            </button>
            <span className="text-xs font-bold text-[#B7F36B] uppercase mb-2 inline-block">{activeProject.category}</span>
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">{activeProject.name}</h3>
            <div className="aspect-video overflow-hidden border border-[#B7F36B]/20 mb-6">
              <img src={Object.values(activeProject.images)[0] as string} alt={activeProject.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-lg text-[#EAECE4] font-bold uppercase mb-6">{activeProject.description}</p>
            {activeProject.github && (
              <a href={activeProject.github} target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-[#B7F36B] text-[#101715] font-black uppercase tracking-widest">
                View Repository
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
