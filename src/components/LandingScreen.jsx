import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/35f7f965de88ecd8174371ab9698c7c29a20c26e2c37b5022fd3c115fce3eeac.png';
const TB_ICON = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/06d93f48666142058f6cb005b94542ae_ChatGPT%20Image%2011%20may%202026%2C%2006_53_36%20p.m..png';
const FLU_ICON = 'https://images.unsplash.com/photo-1604105038794-702630644a1a?q=80&w=400&auto=format&fit=crop';

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
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 to-black pointer-events-none" />

      {/* Main Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <img src={LOGO_URL} alt="Micropia" className="w-40 md:w-56 h-auto filter drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]" />
      </motion.div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-yellow-400 italic uppercase leading-none mb-4">
          Micropia
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-[0.6em] text-white/30 uppercase">
          El Zoo Invisible
        </p>
      </div>

      {/* Dossier Folders (Nando's Request) */}
      <div className="grid grid-cols-2 gap-4 mb-16 w-full max-w-sm">
        <motion.div 
          className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
        >
          <img src={TB_ICON} className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/30" alt="TB" />
          <p className="text-[9px] font-black text-emerald-400 tracking-widest uppercase">Tuberculosis</p>
        </motion.div>
        <motion.div 
          className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
        >
          <img src={FLU_ICON} className="w-16 h-16 rounded-2xl object-cover border border-blue-500/30" alt="Flu" />
          <p className="text-[9px] font-black text-blue-400 tracking-widest uppercase">Gripe Española</p>
        </motion.div>
      </div>

      {/* Access Area */}
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

      <div className="mt-16 opacity-20">
        <p className="text-[8px] font-black tracking-[1em] text-red-500 uppercase">⚠ Instalación de Máxima Seguridad ⚠</p>
      </div>
    </motion.div>
  );
}