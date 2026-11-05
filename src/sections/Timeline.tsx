import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Terminal, Cpu, Zap, Activity } from 'lucide-react';

interface Chapter {
  id: string;
  number: string;
  title: string;
  status: string;
  description: string;
  highlights?: string[];
  icon: any;
}

const CHAPTERS: Chapter[] = [
  {
    id: "01",
    number: "CHAPTER 01",
    title: "THE BEGINNING",
    status: "MISSION COMPLETED",
    description: "Started my journey into programming through Software Engineering education at SMK Telkom Banjarbaru.",
    icon: Compass
  },
  {
    id: "02",
    number: "CHAPTER 02",
    title: "FIRST LINES OF CODE",
    status: "MISSION COMPLETED",
    description: "Learned the fundamentals of web development: HTML, CSS, JavaScript, and PHP.",
    icon: Terminal
  },
  {
    id: "03",
    number: "CHAPTER 03",
    title: "BACKEND EXPLORATION",
    status: "MISSION COMPLETED",
    description: "Deepened knowledge in backend development, Laravel, databases, APIs, and how applications work behind the scenes.",
    icon: Cpu
  },
  {
    id: "04",
    number: "CHAPTER 04",
    title: "BUILDING PROJECTS",
    status: "MISSION COMPLETED",
    description: "Applied knowledge through various independent projects.",
    highlights: ["Vieron — E-commerce Platform", "STARS — School Payment System", "Codio — Mobile Portfolio Application"],
    icon: Zap
  },
  {
    id: "05",
    number: "CHAPTER 05",
    title: "REAL-WORLD EXPERIENCE",
    status: "MISSION COMPLETED",
    description: "Gained team experience through internship at Diskominfo and involvement in real-world application development.",
    highlights: ["Amigo — Real-time Messaging Application", "WADAHKISAH — Complaint Management System"],
    icon: ShieldCheck
  },
  {
    id: "06",
    number: "CHAPTER 06",
    title: "BEYOND DEVELOPMENT",
    status: "MISSION COMPLETED",
    description: "Explored technologies beyond web development: Linux, Networking, WebSockets, Python, and AI/ML.",
    icon: Activity
  },
  {
    id: "07",
    number: "CHAPTER 07",
    title: "STILL BUILDING...",
    status: "CURRENT JOURNEY",
    description: "Continuously developing personal projects, exploring new technologies, and improving skills as a developer.",
    icon: Compass
  }
];

export default function Timeline() {
  const [activeChapter, setActiveChapter] = useState<string | null>("07");

  return (
    <section id="journey" className="border-t border-[#B7F36B]/20 pt-24 pb-12 font-mono">
      <div className="text-[#B7F36B] font-mono text-xs mb-2">02.5 / MISSION_LOG // JOURNEY_PROGRESSION</div>
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">Developer Journey</h2>

      <div className="relative border-l-2 border-[#B7F36B]/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {CHAPTERS.map((ch) => {
          const Icon = ch.icon;
          const isActive = activeChapter === ch.id;
          const isCurrent = ch.status === "CURRENT JOURNEY";

          return (
            <motion.div 
              key={ch.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveChapter(isActive ? null : ch.id)}
              className={`relative group cursor-pointer border p-6 md:p-8 transition-all ${
                isCurrent 
                  ? 'bg-[#14251F] border-[#B7F36B] hud-glow' 
                  : isActive 
                    ? 'bg-[#14251F]/60 border-[#B7F36B]/60' 
                    : 'bg-[#14251F]/20 border-[#B7F36B]/20 hover:border-[#B7F36B]/40'
              }`}
            >
              {/* Timeline Node Dot */}
              <div className={`absolute -left-[31px] md:-left-[47px] top-8 w-4 h-4 rounded-full border-2 border-[#B7F36B] transition-all ${
                isCurrent ? 'bg-[#B7F36B] animate-ping' : isActive ? 'bg-[#B7F36B]' : 'bg-[#101715]'
              }`} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#101715] border border-[#B7F36B]/30 text-[#B7F36B]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#B7F36B] uppercase tracking-widest block">{ch.number}</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#EAECE4]">{ch.title}</h3>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 uppercase w-fit border ${
                  isCurrent ? 'bg-[#B7F36B] text-[#101715] border-[#B7F36B]' : 'bg-[#101715] text-[#527A63] border-[#B7F36B]/20'
                }`}>
                  [{ch.status}]
                </span>
              </div>

              <p className="text-sm md:text-base text-[#929A91] font-bold uppercase leading-relaxed mb-4">
                {ch.description}
              </p>

              {ch.highlights && (
                <div className="mt-4 pt-4 border-t border-[#B7F36B]/10 space-y-2">
                  <div className="text-[10px] text-[#B7F36B] font-bold uppercase">// Notable Operations:</div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {ch.highlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#EAECE4] bg-[#101715] border border-[#B7F36B]/20 px-3 py-2 uppercase">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
