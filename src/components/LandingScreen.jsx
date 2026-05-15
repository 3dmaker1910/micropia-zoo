import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// NUEVO LOGO PNG (FONDO ELIMINADO)
const LOGO_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/39d8731abc91224ee53e584feab3dd1f493c41813a4cb4d7f8283d065e6a9a3f.png';
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
          setTimeout(() => onEnter(), 1000);
          return 100;
        }
        return p + 4;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase, onEnter]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white p-6"
      exit={{ opacity: 0, scale: 1.1 }}
    >
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 to-black pointer-events-none" />

      {/* Side Graphics */}
      <motion.div
        className="absolute left-4 lg:left-16 bottom-12 pointer-events-none hidden md:block opacity-40 lg:opacity-80"
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 0.8, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
      >
        <img src={SCIENTIST_URL} alt="Micra" style={{ width: 'clamp(100px, 15vw, 180px)', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(34,197,94,0.2))' }} />
      </motion.div>

      <motion.div
        className="absolute right-4 lg:right-16 bottom-12 pointer-events-none hidden md:block opacity-40 lg:opacity-80"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 0.8, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
      >
        <img src={MICROSCOPE_URL} alt="Scope" style={{ width: 'clamp(100px, 15vw, 160px)', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.2))' }} />
      </motion.div>

      {/* LOGO PNG ANIMADO - EL VIRUS QUIERE SALIR */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 relative"
      >
        {/* EFECTO DE PULSO DETRÁS DEL LOGO */}
        <motion.div 
          className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.img 
          src={LOGO_URL} 
          alt="Micropia" 
          className="w-40 md:w-56 h-auto relative z-10"
          style={{ filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.3))' }}
          animate={{
            scale: [1, 1.05, 0.98, 1.02, 1], // El virus empuja el logo
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-yellow-400 italic uppercase leading-none mb-4">
          Micropia
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-[0.6em] text-white/30 uppercase">
          El Zoo Invisible
        </p>
      </div>

      <div className="w-full max-w-xs relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.button
              key="btn"
              onClick={startScan}
              className="w-full py-5 bg-yellow-400 text-black font-black tracking-[0.3em] uppercase rounded-2xl hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.2)]"
            >
              ▶ Acceder BSL-4
            </motion.button>
          )}

          {phase === 'scanning' && (
            <div className="space-y-4">
              <div className="flex justify-between text-[9px] font-black text-yellow-400 tracking-widest uppercase">
                 <span>Escaneando Biométrica</span>
                 <span>{scanProgress}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div className="h-full bg-yellow-400" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          )}

          {phase === 'authorized' && (
            <div className="text-center text-green-500 font-black tracking-widest uppercase">
               Acceso Autorizado
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}