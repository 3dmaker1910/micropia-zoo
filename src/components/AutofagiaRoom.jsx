import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THEORIES = [
  {
    id: 'ohsumi',
    title: 'Yoshinori Ohsumi: La Teoría del Reciclaje Master',
    year: 'Premio Nobel 2016',
    content: 'La autofagia es el mecanismo natural de regeneración que ocurre a nivel celular. Ohsumi descubrió que las células degradan y reciclan sus propios componentes dañados a través de las vacuolas. Es, literalmente, el sistema de limpieza de basura de nuestro cuerpo.',
    impact: 'Crucial para entender el envejecimiento, el cáncer y enfermedades neurodegenerativas.',
    icon: '🧬'
  },
  {
    id: 'process',
    title: 'El Ciclo del Autofagosoma',
    year: 'Mecánica Biológica',
    content: '1. Secuestro: Una membrana doble envuelve los desechos. 2. Fusión: Se une con un lisosoma. 3. Degradación: Enzimas descomponen el material. 4. Reciclaje: Los nutrientes regresan al citoplasma.',
    impact: 'Optimiza la supervivencia celular durante el ayuno o el estrés.',
    icon: '♻️'
  }
];

export default function AutofagiaRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div className="min-h-screen bg-[#050a0a] text-white p-8 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-12 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">♻️</span>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-emerald-400">Sala de Autofagia</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">◀ PABELLÓN</button>
      </header>

      <div className="flex-1 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {THEORIES.map(theory => (
            <motion.div 
              key={theory.id}
              onClick={() => setSelected(theory)}
              className={`p-6 rounded-3xl cursor-pointer border-2 transition-all ${selected?.id === theory.id ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-white/5 border-white/10 hover:border-emerald-500/50'}`}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl">{theory.icon}</span>
                <h3 className="font-black uppercase text-sm">{theory.title}</h3>
              </div>
              <p className="text-[9px] font-bold opacity-60 mb-2 tracking-widest">{theory.year}</p>
              <p className="text-[11px] leading-relaxed line-clamp-2">{theory.content}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div 
              key={selected.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 rounded-[3rem] bg-emerald-900/10 border-2 border-emerald-500/30 backdrop-blur-xl flex flex-col justify-center"
            >
              <span className="text-6xl mb-6">{selected.icon}</span>
              <h2 className="text-3xl font-black uppercase italic mb-4 leading-none">{selected.title}</h2>
              <p className="text-sm text-white/80 leading-relaxed mb-6">{selected.content}</p>
              <div className="p-4 bg-emerald-400 text-black rounded-2xl">
                <p className="text-[10px] font-black uppercase mb-1 tracking-widest">Impacto Científico</p>
                <p className="text-[11px] font-bold leading-tight">{selected.impact}</p>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] text-center italic">Selecciona un informe <br/> de investigación <br/> para visualizar la teoría</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-12 opacity-10">
        <p className="text-[8px] font-black tracking-[1em] uppercase">Bio-Recycling Research Unit • Micropia v11.4</p>
      </div>
    </motion.div>
  );
}