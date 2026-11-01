import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Skills from './sections/Skills';
import Navbar from './components/Navbar';
import { PROJECTS } from './data/portfolio';

export default function App() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="min-h-screen selection:bg-acid selection:text-black relative">
      <Navbar />

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center px-8 pt-24 relative bg-off-white">
        <div className="absolute top-[20%] right-12 w-32 h-32 border border-black rounded-full flex items-center justify-center animate-spin-slow">
            <span className="text-[10px] uppercase font-bold text-center">Backend • Tech • Fullstack • </span>
        </div>
        <h1 className="text-[10vw] md:text-[12vw] font-black leading-[0.85] uppercase -ml-[0.5vw] tracking-tighter mt-8">
          Muhammad<br />Rofiq<br />Ridhani
        </h1>
        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <p className="text-2xl max-w-lg uppercase font-bold leading-tight">
            Backend Developer<br />
            Tech Enthusiast<br />
            Full-Stack Builder
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/Rofiq-Ridhani" target="_blank" rel="noreferrer" className="px-10 py-5 bg-acid border border-black uppercase font-black hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-0">GitHub</a>
            <a href="#contact" className="px-10 py-5 border border-black uppercase font-black hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-0">Contact</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8 border-t border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 text-8xl font-black uppercase tracking-tighter">01 /<br />ABOUT</div>
          <div className="md:col-span-8 text-3xl md:text-5xl leading-[1.1] font-bold uppercase tracking-tight">
            Hey, I'm Muhammad Rofiq Ridhani. I'm a tech enthusiast interested in web development, backend engineering, and AI.
            <br /><br />
            I use AI for debugging, learning, experimenting, and occasionally vibe coding.
            <br /><br />
            <span className="bg-acid px-4 py-2 border border-black inline-block transform -rotate-1">Trying to get better, not perfect.</span>
          </div>
        </div>
      </section>

      <Skills />

      {/* Projects */}
      <section id="projects" className="py-32 border-t border-black bg-off-white">
        <div className="px-8 mb-24">
          <h2 className="text-8xl font-black uppercase tracking-tighter">03 / PROJECTS</h2>
        </div>
        
        <div className="flex flex-col">
          {PROJECTS.map((project, idx) => {
            const firstImg = Object.values(project.images)[0];
            return (
              <div key={project.id} className={`border-b border-black py-20 px-8 flex flex-col md:flex-row gap-16 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div 
                  onClick={() => setActiveImage(firstImg)}
                  className="flex-1 w-full bg-gray/5 aspect-[16/10] border border-black flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-acid transition-colors"
                >
                  <img 
                    src={firstImg} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black uppercase text-sm tracking-wider">
                    [ ZOOM ]
                  </div>
                  <div className="absolute top-4 right-4 bg-black text-off-white px-3 py-1 text-xs font-bold uppercase">{project.category}</div>
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-black text-gray/30">{project.id}</span>
                      <h3 className="text-6xl font-black uppercase tracking-tighter">{project.name}</h3>
                  </div>
                  <p className="text-xl font-bold uppercase mb-8 leading-tight">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] border border-black px-2 py-1 uppercase font-bold bg-white">{t}</span>
                    ))}
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="w-fit px-8 py-4 border border-black uppercase font-black hover:bg-black hover:text-white transition-colors">View Repository</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="bg-black text-off-white py-32 px-8">
        <div className="flex flex-col gap-12">
            <h2 className="text-[10vw] font-black uppercase leading-[0.85] tracking-tighter">LET'S<br />CONNECT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/20 pt-12">
                <div>
                    <p className="text-2xl uppercase font-bold mb-8">Always open to new opportunities and collaborations.</p>
                    <a href="mailto:hello@rofiq.dev" className="text-4xl md:text-6xl font-black uppercase underline hover:text-acid transition-colors">Send Email</a>
                </div>
                <div className="flex flex-col justify-between items-start md:items-end uppercase font-bold gap-4">
                    <a href="https://github.com/Rofiq-Ridhani" target="_blank" rel="noreferrer" className="text-2xl hover:line-through">GitHub</a>
                    <a href="#" className="text-2xl hover:line-through">LinkedIn</a>
                    <div className="mt-12 text-xs text-gray-500">© 2026 Muhammad Rofiq Ridhani. ALL RIGHTS RESERVED.</div>
                </div>
            </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        >
          <div className="relative max-w-6xl w-full max-h-full flex flex-col items-center">
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 bg-[#C5F467] text-black font-black px-4 py-2 uppercase border border-black"
            >
              Close [X]
            </button>
            <img 
              src={activeImage} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] object-contain border-4 border-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
