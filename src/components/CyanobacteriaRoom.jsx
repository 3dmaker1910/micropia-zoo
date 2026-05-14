import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMAGEN DE FONDO ACUÁTICA DE ALTA RESOLUCIÓN
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

function Stromatolite({ id, x, y, label, onBurst }) {
  const [isGlowing, setIsGlowing] = useState(false);
  return (
    <motion.div className="absolute cursor-pointer z-20"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onClick={() => { setIsGlowing(true); onBurst(); setTimeout(() => setIsGlowing(false), 1500); }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div className="w-24 h-24 rounded-[3rem] border-4 flex items-center justify-center shadow-2xl relative"
        style={{ background: isGlowing ? 'radial-gradient(circle, #06b6d4, #083344)' : 'radial-gradient(circle, #083344, #020617)', borderColor: isGlowing ? '#22d3ee' : '#0e7490' }}
        animate={isGlowing ? { scale: [1, 1.2, 1], boxShadow: '0 0 50px #22d3ee' } : { y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-4xl">🪨</span>
        {isGlowing && <motion.div className="absolute inset-0 rounded-full border-2 border-cyan-400" animate={{ scale: [1, 2.5], opacity: [1, 0] }} />}
      </motion.div>
      <div className="mt-4 text-center">
         <p className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">{label}</p>
         <p className="text-[8px] text-white/30 uppercase tracking-tighter italic">Produciendo Oxígeno</p>
      </div>
    </motion.div>
  );
}

export default function CyanobacteriaRoom({ onNavigate }) {
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    const initialBubbles = Array.from({ length: 20 }).map((_, i) => makeBubble(i, Math.random() * 100, Math.random() * 100));
    setBubbles(initialBubbles);
  }, []);

  return (
    <motion.div className="min-h-screen bg-[#020617] text-white overflow-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={AQUATIC_BG} alt="Deep Ocean" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-[#020617]" />

      <div className="relative z-10 flex flex-col h-full p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-cyan-400 italic uppercase tracking-tighter">El Primer Aliento</h1>
          <p className="text-xs text-white/40 tracking-[0.4em] uppercase">Isla de Cianobacterias • 3.5 BDA</p>
        </header>

        <div className="flex-1 relative">
          {bubbles.map(b => <Bubble key={b.id} b={b} />)}
          
          <Stromatolite x="30%" y="60%" label="Estromatólito Alfa" onBurst={() => {}} />
          <Stromatolite x="70%" y="70%" label="Nodo Primordial" onBurst={() => {}} />
          <Stromatolite x="50%" y="40%" label="Formación Arcaica" onBurst={() => {}} />
        </div>

        <footer className="flex justify-center mt-10">
          <button onClick={() => onNavigate('hall')} className="px-10 py-3 bg-cyan-600 rounded-full font-black text-[10px] tracking-widest hover:bg-cyan-400 transition-all uppercase">◀ VOLVER AL PABELLÓN</button>
        </footer>
      </div>
    </motion.div>
  );
}