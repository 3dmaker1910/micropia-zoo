import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BiohazardIcon from './BiohazardIcon';

export default function LandingScreen({ onEnter }) {
  const [phase, setPhase] = useState('idle');
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setPhase('scanning');
    setScanProgress(0);
  };

  useEffect(() => {
    if (phase !== 'scanning') return;
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('authorized');
          setTimeout(() => onEnter(), 1200);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [phase, onEnter]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #111 0%, #0a0a0a 70%)' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)' }}
      />

      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 border-2 border-emergency opacity-40`}
          style={{
            borderTop: pos.includes('top') ? '2px solid #facc15' : 'none',
            borderBottom: pos.includes('bottom') ? '2px solid #facc15' : 'none',
            borderLeft: pos.includes('left') ? '2px solid #facc15' : 'none',
            borderRight: pos.includes('right') ? '2px solid #facc15' : 'none',
          }}
        />
      ))}

      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-emergency mb-8"
      >
        <BiohazardIcon size={140} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold tracking-wider mb-2"
        style={{ color: '#facc15', textShadow: '0 0 30px rgba(250, 204, 21, 0.3)' }}
      >
        MICROPIA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl tracking-[0.3em] uppercase mb-1 text-neutral-400"
      >
        El Zoo Invisible
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs tracking-[0.5em] uppercase mb-12 text-red-500/70"
      >
        ⚠ Instalación BSL-4 • Acceso Restringido ⚠
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="scanBtn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 1 }}
            onClick={startScan}
            className="relative group cursor-pointer"
          >
            <div className="px-10 py-4 border-2 border-bio-green/40 bg-bio-green/5 text-bio-green font-bold tracking-[0.2em] uppercase text-sm hover:border-bio-green hover:bg-bio-green/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-300">
              ▶ ENTRADA AL LABORATORIO
            </div>
            <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-neutral-600 tracking-widest">
              PRESIONE PARA ESCANEO DE SEGURIDAD
            </div>
          </motion.button>
        )}

        {phase === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-72 md:w-96">
            <div className="text-center text-bio-green text-xs tracking-[0.3em] mb-4" style={{ animation: 'flicker 0.5s infinite' }}>
              ◉ ESCANEANDO AUTORIZACIÓN...
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mb-3">
              <motion.div className="h-full rounded-full" style={{ width: `${scanProgress}%`, background: 'linear-gradient(90deg, #22c55e, #86efac)', boxShadow: '0 0 10px #22c55e' }} />
            </div>
            <div className="text-[10px] text-neutral-500 space-y-1 font-mono">
              {scanProgress > 10 && <p className="text-bio-green/60">✓ Huella dactilar verificada</p>}
              {scanProgress > 30 && <p className="text-bio-green/60">✓ Retina escaneada</p>}
              {scanProgress > 50 && <p className="text-bio-green/60">✓ Nivel de clearance: OMEGA</p>}
              {scanProgress > 70 && <p className="text-bio-green/60">✓ Protocolos de contención activos</p>}
              {scanProgress > 90 && <p className="text-emergency/80">⚡ Despresurizando cámara...</p>}
            </div>
          </motion.div>
        )}

        {phase === 'authorized' && (
          <motion.div key="authorized" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="text-3xl text-bio-green font-bold tracking-widest mb-2" style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>
              ACCESO AUTORIZADO
            </div>
            <div className="text-xs text-neutral-500 tracking-[0.3em]">BIENVENIDO AL NIVEL BSL-4</div>
          </motion.div>
        )}
      </AnimatePresence>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-bio-green/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </motion.div>
  );
}
