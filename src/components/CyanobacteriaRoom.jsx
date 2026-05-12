import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function makeBubble(id, originX, originY) {
  const spread = 60;
  return { id, x: originX + (Math.random() - 0.5) * spread, startY: originY ?? 80 + Math.random() * 15, size: 3 + Math.random() * 8, duration: 3 + Math.random() * 4, delay: Math.random() * 0.3, opacity: 0.3 + Math.random() * 0.5, wobble: (Math.random() - 0.5) * 30 };
}

function Bubble({ b }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none" style={{ width: b.size, height: b.size, left: `${b.x}%`, bottom: `${b.startY}%`, background: 'radial-gradient(circle at 30% 30%, rgba(120,255,200,0.7), rgba(0,255,180,0.15))', boxShadow: `0 0 ${b.size * 2}px rgba(0,255,160,${b.opacity * 0.4})` }} initial={{ y: 0, opacity: 0, scale: 0.3 }} animate={{ y: -(300 + Math.random() * 400), x: [0, b.wobble, -b.wobble * 0.5, 0], opacity: [0, b.opacity, b.opacity, 0], scale: [0.3, 1, 1.1, 0.6] }} transition={{ duration: b.duration, delay: b.delay, ease: 'easeOut' }} />
  );
}

function AmbientBubbles() {
  const [bubbles, setBubbles] = useState([]);
  const counterRef = useRef(0);
  useEffect(() => { const interval = setInterval(() => { counterRef.current += 1; setBubbles(prev => [...prev.slice(-25), makeBubble(`amb-${counterRef.current}`, 10 + Math.random() * 80, null)]); }, 600); return () => clearInterval(interval); }, []);
  return bubbles.map(b => <Bubble key={b.id} b={b} />);
}

function Stromatolite({ id, x, y, label, onBurst }) {
  const [isGlowing, setIsGlowing] = useState(false);
  const handleClick = () => { setIsGlowing(true); onBurst(x, y); setTimeout(() => setIsGlowing(false), 1200); };
  return (
    <motion.div className="absolute cursor-pointer z-20" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }} onClick={handleClick} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
      <motion.div className="absolute rounded-full" style={{ width: 90, height: 90, left: -45, top: -45, background: 'radial-gradient(circle, rgba(0,255,160,0.15), transparent 70%)' }} animate={isGlowing ? { scale: [1, 2.5], opacity: [0.8, 0] } : { scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }} transition={isGlowing ? { duration: 1 } : { duration: 3, repeat: Infinity }} />
      <motion.div className="relative flex items-center justify-center rounded-2xl" style={{ width: 72, height: 72, marginLeft: -36, marginTop: -36, background: isGlowing ? 'radial-gradient(ellipse at 50% 60%, rgba(0,255,160,0.35), rgba(0,80,60,0.6))' : 'radial-gradient(ellipse at 50% 60%, rgba(0,180,120,0.2), rgba(0,50,40,0.5))', border: `2px solid ${isGlowing ? 'rgba(0,255,160,0.7)' : 'rgba(0,180,120,0.3)'}`, borderRadius: '40% 45% 50% 38% / 50% 40% 55% 45%', boxShadow: isGlowing ? '0 0 40px rgba(0,255,160,0.5)' : '0 0 20px rgba(0,180,120,0.15)', transition: 'all 0.4s ease' }} animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <span style={{ fontSize: '2rem', filter: isGlowing ? 'brightness(1.5)' : 'none' }}>🪨</span>
      </motion.div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap mt-2">
        <p className="font-bold tracking-wider text-center uppercase" style={{ fontSize: '0.5rem', color: isGlowing ? '#00ffaa' : '#00c896', textShadow: '0 0 8px rgba(0,255,160,0.5)' }}>{label}</p>
        <p className="tracking-wider text-center mt-0.5" style={{ fontSize: '0.45rem', color: 'rgba(0,255,160,0.5)' }}>▸ TOCA PARA LIBERAR O₂</p>
      </div>
    </motion.div>
  );
}