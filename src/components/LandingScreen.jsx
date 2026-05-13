import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/35f7f965de88ecd8174371ab9698c7c29a20c26e2c37b5022fd3c115fce3eeac.png';
const SCIENTIST_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';
const MICROSCOPE_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/beeae114543efbdd3ae63f4e4ea773594112e315c7e6dabe96525fcf07073d56.png';

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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #111 0%, #0a0a0a 70%)' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Warning stripes */}
      <div className="absolute top-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)' }}
      />

      {/* Side Graphics - Hidden on mobile to avoid overlap */}
      <motion.div
        className="absolute left-4 lg:left-16 bottom-12 pointer-events-none hidden md:block opacity-40 lg:opacity-80"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <img src={SCIENTIST_URL} alt="Micra" style={{ width: 'clamp(100px, 15vw, 180px)', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(34,197,94,0.2))' }} />
      </motion.div>

      <motion.div
        className="absolute right-4 lg:right-16 bottom-12 pointer-events-none hidden md:block opacity-40 lg:opacity-80"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <img src={MICROSCOPE_URL} alt="Scope" style={{ width: 'clamp(100px, 15vw, 160px)', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.2))' }} />
      </motion.div>

      {/* Main Logo Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 relative z-10"
      >
        <img
          src={LOGO_URL}
          alt="Micropia Logo"
          className="w-32 md:w-44 h-auto mx-auto filter drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]"
        />
      </motion.div>

      {/* Titles */}
      <div className="relative z-10 max-w-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-black tracking-tighter mb-2"
          style={{
            fontSize: 'clamp(2rem, 12vw, 5rem)',
            color: '#facc15',
            textShadow: '0 0 10px #facc15, 0 0 30px #facc15, 0 0 60px rgba(250,204,21,0.5)',
            lineHeight: 0.9
          }}
        >
          Micropia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs md:text-sm font-black tracking-[0.4em] uppercase text-white/40 mb-12"
        >
          El Zoo Invisible
        </motion.p>
      </div>

      {/* Interaction Area */}
      <div className="relative z-10 w-full max-w-xs md:max-w-sm">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.button
              key="scanBtn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={startScan}
              className="w-full py-4 border-2 border-green-500/40 bg-green-500/5 text-green-400 font-black tracking-widest uppercase hover:bg-green-500 hover:text-black transition-all rounded-2xl text-xs"
            >
              ▶ Acceder al Laboratorio
            </motion.button>
          )}

          {phase === 'scanning' && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="text-[9px] font-black text-green-500 tracking-[0.4em] animate-pulse uppercase">Escaneando Biometría: {scanProgress}%</div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                {scanProgress > 50 ? 'Clearance Omega Confirmado' : 'Analizando Retina...'}
              </p>
            </motion.div>
          )}

          {phase === 'authorized' && (
            <motion.div key="auth" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-green-500 font-black tracking-[0.2em] uppercase">
              <div className="text-lg mb-1">Acceso Autorizado</div>
              <div className="text-[10px] opacity-60 italic">Bienvenido, Nando</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 opacity-20">
         <p className="text-[8px] font-black tracking-[0.5em] uppercase text-red-500 animate-pulse">
            ⚠ Instalación BSL-4 • Protocolo de Contención Activo ⚠
         </p>
      </div>

      {/* Ambient particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-green-500/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}
    </motion.div>
  );
}