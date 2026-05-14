import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AQUATIC_BG = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2034&auto=format&fit=crop';

function makeBubble(id, originX, originY) {
  const spread = 60;
  return { id, x: originX + (Math.random() - 0.5) * spread, startY: originY ?? 80 + Math.random() * 15, size: 4 + Math.random() * 12, duration: 4 + Math.random() * 6, delay: Math.random() * 0.5, opacity: 0.4 + Math.random() * 0.4, wobble: (Math.random() - 0.5) * 50 };
}

function Bubble({ b }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width: b.size, height: b.size, left: `${b.x}%`, bottom: `${b.startY}%`, background: 'radial-gradient(circle at 30% 30%, rgba(100,255,255,0.8), rgba(0,150,255,0.2))', boxShadow: `0 0 ${b.size * 3}px rgba(0,255,255,${b.opacity * 0.5})` }}
      initial={{ y: 0, opacity: 0 }} animate={{ y: -800, x: [0, b.wobble, -b.wobble, 0], opacity: [0, b.opacity, 0] }}
      transition={{ duration: b.duration, delay: b.delay, ease: 'linear', repeat: Infinity }}
    />
  );
}

export default function CyanobacteriaRoom({ onNavigate }) {
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [isAtmosphereBlue, setIsAtmosphereBlue] = useState(false);

  const addOxygen = () => {
    setOxygenLevel(prev => {
      const newLevel = Math.min(prev + 10, 100);
      if (newLevel >= 100) setIsAtmosphereBlue(true);
      return newLevel;
    });
    setBubbles(prev => [...prev, makeBubble(Date.now(), 50, 50)]);
  };

  return (
    <motion.div className="min-h-screen transition-colors duration-[3000ms] overflow-hidden relative"
      style={{ background: isAtmosphereBlue ? '#082f49' : '#1e1b4b' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={AQUATIC_BG} alt="Deep Ocean" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      
      {/* HUD Barra de Oxigenación */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6">
        <div className="flex justify-between items-end mb-2">
           <span className="text-[10px] font-black tracking-widest text-cyan-400">NIVEL DE OXÍGENO ATMOSFÉRICO</span>
           <span className="text-xl font-black text-cyan-400 italic">{oxygenLevel}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
           <motion.div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300" animate={{ width: `${oxygenLevel}%` }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-8 pt-24 items-center justify-center">
        {bubbles.map(b => <Bubble key={b.id} b={b} />)}

        {/* Estromatólitos Interactivos */}
        <div className="relative w-full max-w-4xl flex justify-around items-end h-64">
           {[1, 2, 3].map(i => (
             <motion.button key={i} onClick={addOxygen} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="group relative">
                <div className="w-24 h-24 bg-gradient-to-t from-cyan-900 to-slate-800 border-4 border-cyan-700/50 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:border-cyan-400">
                   <span className="text-4xl">🪨</span>
                </div>
                <p className="mt-4 text-[9px] font-black text-cyan-500/50 tracking-widest uppercase">Tocar para producir O₂</p>
             </motion.button>
           ))}
        </div>

        <AnimatePresence>
           {isAtmosphereBlue && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-6 bg-cyan-400 text-black rounded-[2.5rem] font-black text-center shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                <h2 className="text-2xl uppercase italic">¡EL GRAN EVENTO DE OXIGENACIÓN!</h2>
                <p className="text-xs mt-2">Gracias a Nando, la atmósfera ahora es respirable. <br/> Has desbloqueado la vida compleja.</p>
             </motion.div>
           )}
        </AnimatePresence>

        <button onClick={() => onNavigate('hall')} className="mt-16 px-10 py-3 border border-white/20 rounded-full font-black text-[9px] tracking-widest hover:bg-white hover:text-black transition-all uppercase opacity-40">◀ VOLVER AL PABELLÓN</button>
      </div>
    </motion.div>
  );
}