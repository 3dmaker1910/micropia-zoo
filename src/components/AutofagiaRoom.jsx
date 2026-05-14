import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTOFAGIA_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/4aa1afd2503bca161f7b34ce13940a37e0dfa371b9b1672db23d562ed71a281a.png';

const THEORIES = [
  {
    id: 'ohsumi',
    title: 'Yoshinori Ohsumi: La Teoría del Reciclaje',
    year: 'Premio Nobel 2016',
    content: 'La autofagia es el mecanismo natural de regeneración celular. Ohsumi descubrió que las células degradan sus propios componentes dañados a través de las vacuolas. Es el sistema de limpieza vital del cuerpo humano.',
    impact: 'Clave para combatir el envejecimiento y enfermedades celulares.',
    icon: '🧬'
  },
  {
    id: 'process',
    title: 'El Ciclo del Autofagosoma',
    year: 'Mecánica de Renovación',
    content: '1. Secuestro de desechos. 2. Fusión con el Lisosoma. 3. Degradación por enzimas. 4. Reciclaje de nutrientes para energía pura.',
    impact: 'Optimiza la supervivencia celular en condiciones de ayuno.',
    icon: '♻️'
  }
];

export default function AutofagiaRoom({ onNavigate }) {
  const [selected, setSelected] = useState(THEORIES[0]);

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-emerald-500/20 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">♻️</span>
          <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-emerald-400">Sala de Autofagia</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">◀ PABELLÓN</button>
      </header>

      <div className="flex-1 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        
        {/* Left Column: List of Theory Reports */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.4em] mb-4">Informes de Investigación</p>
          {THEORIES.map(theory => (
            <motion.div 
              key={theory.id}
              onClick={() => setSelected(theory)}
              className={`p-6 rounded-[2rem] cursor-pointer border-2 transition-all ${selected.id === theory.id ? 'bg-emerald-600 text-black border-white' : 'bg-white/5 border-white/5 hover:border-emerald-500/30'}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{theory.icon}</span>
                <div>
                  <h3 className="font-black uppercase text-xs">{theory.title}</h3>
                  <p className="text-[9px] opacity-60 tracking-wider">{theory.year}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/10 opacity-20">
             <p className="text-center text-[10px] font-black uppercase tracking-widest">Aguardando Nuevos <br/> Archivos de Nando</p>
          </div>
        </div>

        {/* Right Column: MAIN PANEL (Theory + Photo) */}
        <div className="lg:col-span-3 h-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selected.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="h-full flex flex-col bg-neutral-900/50 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* THE PHOTO */}
              <div className="relative h-64 md:h-80 overflow-hidden group">
                 <img src={AUTOFAGIA_IMG} alt="Autofagia" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 grayscale brightness-75" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-8">
                    <h2 className="text-3xl font-black italic uppercase leading-none text-emerald-400 drop-shadow-2xl">{selected.title}</h2>
                 </div>
              </div>

              {/* THE THEORY CONTENT */}
              <div className="p-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-emerald-500 text-black text-[9px] font-black rounded-full">INFORME TÉCNICO</span>
                    <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.2em]">MICROPIA BSL-4</span>
                 </div>
                 
                 <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                    {selected.content}
                 </p>

                 <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl">
                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Impacto de la Teoría</h4>
                    <p className="text-xs text-white/50 leading-relaxed italic">"{selected.impact}"</p>
                 </div>
              </div>

              <div className="mt-auto p-4 bg-emerald-500/10 text-center">
                 <p className="text-[8px] font-black tracking-[0.6em] text-emerald-500/40 uppercase">Biological Security Level 4 Certification Required</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}