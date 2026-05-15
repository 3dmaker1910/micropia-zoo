import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BG_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/71f522967cc95495f6409cff931d20ad91eac92efde685b34f6e86a3dd46b2e2.png';

export default function HolobionteRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  const zones = [
    { id: 'stomach', name: 'Estómago', fact: 'El ácido gástrico es una barrera protectora, pero aquí viven bacterias como H. pylori.', icon: '🧪' },
    { id: 'intestine', name: 'Intestino', fact: 'Aquí residen 39 billones de bacterias que ayudan a digerir y protegen tu sistema inmune.', icon: '🦠' },
    { id: 'connection', name: 'Vínculo Cerebro', fact: 'Tu microbiota produce el 90% de la serotonina, ¡la hormona de la felicidad!', icon: '🧠' },
  ];

  return (
    <motion.div className="min-h-screen bg-[#0a0502] text-white overflow-hidden relative font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img src={BG_IMG} alt="Gut Microbiota" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a0a] via-transparent to-black" />

      <div className="relative z-10 flex flex-col h-full p-8 items-center justify-center">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-orange-400 italic uppercase tracking-tighter shadow-2xl">El Holobionte</h1>
          <p className="text-sm text-orange-200/50 tracking-[0.5em] uppercase mt-2">Tu Zoo Personal • Microbiota Evolutiva</p>
        </header>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
           {zones.map(zone => (
             <motion.div 
               key={zone.id}
               onClick={() => setSelected(zone)}
               whileHover={{ y: -10, scale: 1.02 }}
               className="p-8 rounded-[3rem] bg-orange-950/20 border-2 border-orange-500/20 backdrop-blur-xl cursor-pointer text-center group active:bg-orange-500/20"
             >
                <span className="text-5xl mb-6 block group-hover:scale-125 transition-transform">{zone.icon}</span>
                <h3 className="font-black uppercase italic text-orange-400 mb-2">{zone.name}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed">Toca para analizar conexión</p>
             </motion.div>
           ))}
        </div>

        <AnimatePresence>
           {selected && (
             <motion.div 
               initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
               className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xl p-8 bg-black border-2 border-orange-400/50 rounded-[3.5rem] shadow-2xl z-50"
             >
                <div className="flex items-center gap-6">
                   <span className="text-5xl">{selected.icon}</span>
                   <div>
                      <h2 className="text-2xl font-black text-orange-400 uppercase italic">{selected.name}</h2>
                      <p className="text-sm text-white/80 leading-relaxed mt-2">{selected.fact}</p>
                   </div>
                </div>
                <button onClick={() => setSelected(null)} className="mt-8 w-full py-2 text-[9px] font-black uppercase text-orange-500/50 tracking-widest hover:text-orange-500">— Cerrar Sincronización —</button>
             </motion.div>
           )}
        </AnimatePresence>

        <button onClick={() => onNavigate('hall')} className="mt-16 px-12 py-4 border border-orange-500/20 rounded-full font-black text-[10px] tracking-widest hover:bg-orange-500 hover:text-black transition-all uppercase">◀ VOLVER AL PABELLÓN</button>
      </div>
    </motion.div>
  );
}