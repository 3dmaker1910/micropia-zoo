import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function makeBubble(id, originX, originY) {
  const spread = 60;
  return {
    id,
    x: originX + (Math.random() - 0.5) * spread,
    startY: originY ?? 80 + Math.random() * 15,
    size: 3 + Math.random() * 8,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 0.3,
    opacity: 0.3 + Math.random() * 0.5,
    wobble: (Math.random() - 0.5) * 30,
  };
}

function Bubble({ b }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: b.size,
        height: b.size,
        left: `${b.x}%`,
        bottom: `${b.startY}%`,
        background: 'radial-gradient(circle at 30% 30%, rgba(120,255,200,0.7), rgba(0,255,180,0.15))',
        boxShadow: `0 0 ${b.size * 2}px rgba(0,255,160,${b.opacity * 0.4})`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0.3 }}
      animate={{
        y: -(300 + Math.random() * 400),
        x: [0, b.wobble, -b.wobble * 0.5, 0],
        opacity: [0, b.opacity, b.opacity, 0],
        scale: [0.3, 1, 1.1, 0.6],
      }}
      transition={{ duration: b.duration, delay: b.delay, ease: 'easeOut' }}
    />
  );
}

function AmbientBubbles() {
  const [bubbles, setBubbles] = useState([]);
  const counterRef = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      setBadges(prev => [
        ...prev.slice(-25),
        makeBubble(`amb-${counterRef.current}`, 10 + Math.random() * 80, null)
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);
  return bubbles.map(b => <Bubble key={b.id} b={b} />);
}

function Stromatolite({ id, x, y, label, onBurst }) {
  const [isGlowing, setIsGlowing] = useState(false);
  const handleClick = () => {
    setIsGlowing(true);
    onBurst(x, y);
    setTimeout(() => setIsGlowing(false), 1200);
  };
  return (
    <motion.div
      className="absolute cursor-pointer z-20"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 90,
          height: 90,
          left: -45,
          top: -45,
          background: 'radial-gradient(circle, rgba(0,255,160,0.15), transparent 70%)',
        }}
        animate={isGlowing ? { scale: [1, 2.5], opacity: [0.8, 0] } : { scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
        transition={isGlowing ? { duration: 1 } : { duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: 72,
          height: 72,
          marginLeft: -36,
          marginTop: -36,
          background: isGlowing ? 'radial-gradient(ellipse at 50% 60%, rgba(0,255,160,0.35), rgba(0,80,60,0.6))' : 'radial-gradient(ellipse at 50% 60%, rgba(0,180,120,0.2), rgba(0,50,40,0.5))',
          border: `2px solid ${isGlowing ? 'rgba(0,255,160,0.7)' : 'rgba(0,180,120,0.3)'}`,
          borderRadius: '40% 45% 50% 38% / 50% 40% 55% 45%',
          boxShadow: isGlowing ? '0 0 40px rgba(0,255,160,0.5)' : '0 0 20px rgba(0,180,120,0.15)',
          transition: 'all 0.4s ease',
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ fontSize: '2rem', filter: isGlowing ? 'brightness(1.5)' : 'none' }}>🪨</span>
      </motion.div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap mt-2">
        <p className="font-bold tracking-wider text-center uppercase" style={{ fontSize: '0.5rem', color: isGlowing ? '#00ffaa' : '#00c896', textShadow: '0 0 8px rgba(0,255,160,0.5)' }}>
          {label}
        </p>
        <p className="tracking-wider text-center mt-0.5" style={{ fontSize: '0.45rem', color: 'rgba(0,255,160,0.5)' }}>
          ▸ TOCA PARA LIBERAR O₂
        </p>
      </div>
    </motion.div>
  );
}

export default function CyanobacteriaRoom({ onNavigate }) {
  const [stromatolites, setStromatolites] = useState([
    { id: 1, x: '25%', y: '65%', label: 'Estromatólito Alfa' },
    { id: 2, x: '50%', y: '75%', label: 'Colônia Primordial' },
    { id: 3, x: '75%', y: '60%', label: 'Formación Arcaica' },
  ]);

  const handleBurst = useCallback((x, y) => {
    // Visual effect feedback
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-screen h-screen bg-[#050a14] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 50%, #003344 0%, #050a14 100%)' }} />
      
      <div className="relative z-10 flex flex-col h-full">
        <header className="p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-cyan-400 tracking-tighter uppercase italic">
            Isla de Cianobacterias
          </h1>
          <p className="text-cyan-200/60 mt-2 font-mono uppercase tracking-widest text-sm">
            Origen del Oxígeno • 3,500 Millones de Años AC
          </p>
        </header>

        <div className="flex-1 relative">
          <AmbientBubbles />
          <AnimatePresence>
            {stromatolites.map(st => (
              <Stromatolite key={st.id} {...st} onBurst={handleBurst} />
            ))}
          </AnimatePresence>
        </div>

        <footer className="p-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('hall')}
            className="px-8 py-3 bg-cyan-600 text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-colors"
          >
            Volver al Pabellón
          </motion.button>
        </footer>
      </div>
    </motion.div>
  );
}