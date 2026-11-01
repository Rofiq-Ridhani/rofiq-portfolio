import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { MapPin, Wifi } from 'lucide-react';
import { PROJECTS, SKILLS } from './data/portfolio';
import Navbar from './components/Navbar';
import CommandCenter from './components/CommandCenter';
import ProjectModal from './components/ProjectModal';

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
        <div className="mt-8 text-center text-[#B7F36B] font-black text-2xl">
          {percent}%
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

          <main className="flex-1 p-6 md:p-16 space-y-32 max-w-7xl mx-auto w-full pt-24">
            {/* HERO */}
            <section id="hero" className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center">
              <div className="inline-block border border-[#B7F36B]/30 px-3 py-1 bg-[#14251F] text-[#B7F36B] text-[10px] mb-4 w-fit">COMMANDER: RIDHANI // SYS_ID: 2.0.26</div>
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black leading-[0.9] uppercase tracking-tighter mb-8">
                Muhammad<br /><span className="text-[#B7F36B]">Rofiq</span><br />Ridhani
              </h1>
              <p className="text-lg lg:text-xl text-[#929A91] font-bold uppercase mb-12">Backend Developer · Full-Stack Builder</p>
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

            {/* PROJECTS */}
            <section id="projects" className="border-t border-[#B7F36B]/20 pt-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-16">Archives</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <div key={project.id} onClick={() => setActiveProject(project)} className="group border border-[#B7F36B]/20 p-6 cursor-pointer hover:border-[#B7F36B]">
                    <img src={Object.values(project.images)[0]} className="w-full aspect-video object-cover mb-4 grayscale group-hover:grayscale-0" />
                    <h3 className="text-2xl font-black uppercase">{project.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
