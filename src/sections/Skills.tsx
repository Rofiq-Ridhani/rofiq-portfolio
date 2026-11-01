import { SKILLS } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 border-t border-black bg-white">
      <div className="flex flex-col gap-12">
        <h2 className="text-8xl font-black uppercase tracking-tighter">02 / SKILLS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS.map((skill, index) => (
            <div 
              key={skill} 
              className="border border-black p-6 font-mono font-bold flex justify-between items-center hover:bg-[#C5F467] transition-colors cursor-pointer group"
            >
              <span className="text-sm text-gray-500 group-hover:text-black">{(index + 1).toString().padStart(2, '0')}</span>
              <span className="text-xl uppercase">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
