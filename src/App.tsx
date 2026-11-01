import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';
import { PROJECTS, SKILLS } from './data/portfolio';
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
    <div className="fixed inset-0 z-[100] bg-[#101715] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-lg border border-[#B7F36B]/30 p-8 hud-glow relative bg-[#14251F]">
        <div className="flex justify-between text-[#B7F36B] mb-4 text-xs uppercase tracking-widest">
          <span>System Awakening</span>
          <span>Status: INITIALIZING</span>
        </div>
        <div className="h-4 w-full bg-[#101715] border border-[#B7F36B]/20 mb-8 overflow-hidden">
          <div className="h-full bg-[#B7F36B]" style={{ width: `${percent}%` }} />
        </div>
        <div className="h-48 overflow-hidden text-[10px] md:text-xs text-[#527A63] uppercase space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? 'text-[#B7F36B]' : ''}>{log}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <span className="text-[#B7F36B] text-xs uppercase">Loading Cinematic HUD...</span>
          <span className="text-[#B7F36B] font-black text-2xl">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

const HUDPanel = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`border border-[#B7F36B]/30 p-4 bg-[#14251F]/50 backdrop-blur-sm relative group ${className}`}>
    <div className="absolute -top-3 left-4 bg-[#101715] px-2 text-[10px] uppercase font-bold text-[#B7F36B] tracking-tighter border border-[#B7F36B]/20">
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
    <div className="min-h-screen bg-[#101715] text-[#EAECE4] selection:bg-[#B7F36B] selection:text-[#101715] relative overflow-x-hidden font-mono">
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
          <div className="hidden lg:flex fixed bottom-6 left-6 z-30 items-center gap-6 bg-[#14251F]/80 backdrop-blur-md border border-[#B7F36B]/20 px-4 py-2">
            <RealClock />
            <div className="h-3 w-[1px] bg-[#B7F36B]/20" />
            <div className="flex items-center gap-1 text-[10px] text-[#527A63]">
              <MapPin size={10} /> EARTH / ID
            </div>
          </div>

          <main className="flex-1 p-6 md:p-16 space-y-32 max-w-7xl mx-auto w-full pt-24">
            {/* HERO */}
            <section id="hero" className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center pt-8 md:pt-12">
              <div className="inline-block border border-[#B7F36B]/30 px-3 py-1 bg-[#14251F] text-[#B7F36B] text-[10px] mb-4 w-fit">COMMANDER: RIDHANI // SYS_ID: 2.0.26</div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black leading-[0.9] uppercase tracking-tighter mb-8"
              >
                Muhammad<br /><span className="text-[#B7F36B]">Rofiq</span><br />Ridhani
              </motion.h1>
              <p className="text-lg lg:text-xl text-[#929A91] font-bold uppercase mb-12">Backend Developer · Full-Stack Builder</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsCommandCenterOpen(true)}
                  className="px-8 py-4 bg-[#B7F36B] text-[#101715] font-black uppercase text-xs tracking-widest hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(20,37,31,1)]"
                >
                  Explore Portfolio [Ctrl+K]
                </button>
              </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="border-t border-[#B7F36B]/20 pt-24">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <HUDPanel title="Intel Profile" className="aspect-[4/5] bg-[#14251F] p-0 overflow-hidden">
                    <img src="/images/profile/profile.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }} />
                  </HUDPanel>
                </div>
                <div className="lg:col-span-7 space-y-8 text-lg font-bold uppercase text-[#929A91]">
                  <h2 className="text-5xl font-black uppercase text-[#EAECE4] tracking-tighter">About Me</h2>
                  <p>Hey, I'm Muhammad Rofiq Ridhani. Backend engineering enthusiast.</p>
                  <p>I use AI for debugging and <span className="text-[#B7F36B]">vibe coding</span>.</p>
                </div>
              </div>
            </section>

            <Timeline />
            <Skills />

            {/* PROJECTS — HOLOGRAPHIC CARDS */}
            <section id="projects" className="border-t border-[#B7F36B]/20 pt-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-16">Archives</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <motion.div 
                    key={project.id} 
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveProject(project)} 
                    className="group border border-[#B7F36B]/30 bg-[#14251F]/40 p-6 cursor-pointer hover:border-[#B7F36B] hover:shadow-[0_0_20px_rgba(183,243,107,0.15)] transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#B7F36B]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <img src={Object.values(project.images)[0]} className="w-full aspect-video object-cover mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#B7F36B] uppercase">{project.category}</span>
                      <span className="text-[10px] text-[#527A63] uppercase group-hover:text-[#B7F36B] transition-colors">// VIEW PROJECT</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{project.name}</h3>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
