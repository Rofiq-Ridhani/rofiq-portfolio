import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';
import { PROJECTS } from './data/portfolio';
import Navbar from './components/Navbar';
import CommandCenter from './components/CommandCenter';
import ProjectModal from './components/ProjectModal';
import Cursor from './components/Cursor';
import { RealClock, ScrollProgressBar } from './components/LivingHUD';

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
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    logMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, i * 250);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#F5F7F2] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-lg border border-[#145C3A]/30 p-8 hud-glow relative bg-[#FFFFFF]">
        <div className="flex justify-between text-[#145C3A] mb-4 text-xs uppercase tracking-widest">
          <span>System Awakening</span>
          <span>Status: INITIALIZING</span>
        </div>
        <div className="h-4 w-full bg-[#F5F7F2] border border-[#145C3A]/20 mb-8 overflow-hidden">
          <div className="h-full bg-[#145C3A]" style={{ width: `${percent}%` }} />
        </div>
        <div className="h-48 overflow-hidden text-[10px] md:text-xs text-[#4A5568] uppercase space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? 'text-[#145C3A]' : ''}>{log}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <span className="text-[#145C3A] text-xs uppercase">Loading Cinematic HUD...</span>
          <span className="text-[#145C3A] font-black text-2xl">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

const HUDPanel = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`border border-[#145C3A]/30 p-4 bg-white shadow-sm relative group ${className}`}>
    <div className="absolute -top-3 left-4 bg-[#F5F7F2] px-2 text-[10px] uppercase font-bold text-[#145C3A] tracking-tighter border border-[#145C3A]/20">
      {title}
    </div>
    {children}
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);


  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Command Center Shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F2] text-[#17251F] selection:bg-[#145C3A] selection:text-white relative overflow-x-hidden font-mono">
      <Cursor />
      <ScrollProgressBar />

      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <div className="flex flex-col min-h-screen relative">
          <Navbar onOpenSearch={() => setIsCommandCenterOpen(true)} />
          <CommandCenter 
            isOpen={isCommandCenterOpen} 
            onClose={() => setIsCommandCenterOpen(false)} 
            onSelectProject={setActiveProject}
          />
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

          {/* Living HUD Floating Header info */}
          <div className="hidden lg:flex fixed bottom-6 left-6 z-30 items-center gap-6 bg-white/80 backdrop-blur-md border border-[#145C3A]/20 px-4 py-2 shadow-md">
            <RealClock />
            <div className="h-3 w-[1px] bg-[#145C3A]/20" />
            <div className="flex items-center gap-1 text-[10px] text-[#4A5568]">
              <MapPin size={10} /> EARTH / ID
            </div>
          </div>

          <main className="flex-1 p-6 md:p-16 space-y-32 max-w-7xl mx-auto w-full pt-24">
            {/* HERO */}
            <section id="hero" className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center pt-8 md:pt-12">
              <div className="inline-block border border-[#145C3A]/30 px-3 py-1 bg-white text-[#145C3A] text-[10px] mb-4 w-fit shadow-xs">COMMANDER: RIDHANI // SYS_ID: 2.0.26</div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black leading-[0.9] uppercase tracking-tighter mb-8 text-[#17251F]"
              >
                Muhammad<br /><span className="text-[#145C3A]">Rofiq</span><br />Ridhani
              </motion.h1>
              <p className="text-lg lg:text-xl text-[#4A5568] font-bold uppercase mb-12">Backend Developer · Full-Stack Builder</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsCommandCenterOpen(true)}
                  className="px-8 py-4 bg-[#145C3A] text-white font-black uppercase text-xs tracking-widest hover:bg-[#17251F] transition-colors shadow-[4px_4px_0px_0px_rgba(20,92,58,0.3)]"
                >
                  Explore Portfolio [Ctrl+K]
                </button>
              </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="border-t border-[#145C3A]/20 pt-24">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <HUDPanel title="Intel Profile" className="aspect-[4/5] bg-white p-0 overflow-hidden shadow-sm">
                    <img src="/images/profile/profile.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }} />
                  </HUDPanel>
                </div>
                <div className="lg:col-span-7 space-y-8 text-lg font-bold uppercase text-[#4A5568]">
                  <h2 className="text-5xl font-black uppercase text-[#17251F] tracking-tighter">About Me</h2>
                  <p>Hey, I'm Muhammad Rofiq Ridhani. Backend engineering enthusiast.</p>
                  <p>I use AI for debugging and <span className="text-[#145C3A]">vibe coding</span>.</p>
                </div>
              </div>
            </section>

            <Timeline />
            <Skills />

            {/* PROJECTS */}
            <section id="projects" className="border-t border-[#145C3A]/20 pt-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 text-[#17251F]">Archives</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <motion.div 
                    key={project.id} 
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveProject(project)} 
                    className="group border border-[#145C3A]/30 bg-white p-6 cursor-pointer hover:border-[#145C3A] hover:shadow-xl transition-all relative overflow-hidden shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#145C3A]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <img src={Object.values(project.images)[0]} className="w-full aspect-video object-cover mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#145C3A] uppercase">{project.category}</span>
                      <span className="text-[10px] text-[#4A5568] uppercase group-hover:text-[#145C3A] transition-colors">// VIEW PROJECT</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#17251F]">{project.name}</h3>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="border-t border-[#145C3A]/20 pt-24 pb-12">
              <div className="text-[#145C3A] font-mono text-xs mb-2">04 / COMM_CHANNEL</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-[#17251F]">Connect</h2>
              <p className="text-xl text-[#4A5568] font-bold uppercase max-w-xl mb-12">
                Always open to new opportunities and collaborations.
              </p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mridhani51@gmail.com" target="_blank" rel="noreferrer" className="text-4xl md:text-6xl font-black uppercase text-[#145C3A] underline hover:text-[#17251F] transition-colors">
                Send Email
              </a>
            </section>
          </main>

          <footer className="border-t border-[#145C3A]/20 py-8 px-6 text-center text-xs text-[#4A5568] font-mono uppercase bg-[#E6EAE3]">
            © 2026 Muhammad Rofiq Ridhani. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}
