import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BiohazardIcon from './BiohazardIcon';

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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #111 0%, #0a0a0a 70%)' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Warning stripes */}
      <div className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          background: 'repeating-linear-gradient(90deg, #facc15, #facc15 20px, #0a0a0a 20px, #0a0a0a 40px)',
        }}
      />

      {/* Corner markers */}
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

      {/* Scientist Portrait — left side */}
      <motion.div
        className="absolute left-4 sm:left-8 lg:left-16 bottom-12 pointer-events-none"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="relative">
          <img
            src={SCIENTIST_URL}
            alt="Doctora Micra"
            style={{
              width: 'clamp(80px, 18vw, 200px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))',
              opacity: 0.85,
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <p className="text-bio-green/40 text-center mt-1 tracking-[0.2em] uppercase"
          style={{ fontSize: 'clamp(0.45rem, 1vw, 0.6rem)' }}
        >
          Dra. Micra
        </p>
      </motion.div>

      {/* Microscope — right side */}
      <motion.div
        className="absolute right-4 sm:right-8 lg:right-16 bottom-12 pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="relative">
          <img
            src={MICROSCOPE_URL}
            alt="Microscopio"
            style={{
              width: 'clamp(70px, 16vw, 180px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.3))',
              opacity: 0.8,
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(250,204,21,0.08) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <p className="text-emergency/40 text-center mt-1 tracking-[0.2em] uppercase"
          style={{ fontSize: 'clamp(0.45rem, 1vw, 0.6rem)' }}
        >
          Microscopio BSL-4
        </p>
      </motion.div>

      {/* Official Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-6"
        style={{
          filter: 'drop-shadow(0 0 24px rgba(250, 204, 21, 0.45))',
        }}
      >
        <img
          src={LOGO_URL}
          alt="Micropia Logo"
          style={{
            width: '180px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Title — bold neon yellow glow */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-bold tracking-wider mb-2"
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 5rem)',
          color: '#facc15',
          textShadow:
            '0 0 8px #facc15, 0 0 24px #facc15, 0 0 48px #fde047, 0 0 80px rgba(250, 204, 21, 0.6)',
          WebkitTextStroke: '0.5px #fef08a',
        }}
      >
        Micropia
      </motion.h1>

      {/* Slogan — clearly visible */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-bold tracking-wide mb-3 text-center"
        style={{
          fontSize: 'clamp(1rem, 4vw, 1.4rem)',
          color: '#e5e5e5',
          textShadow: '0 0 12px rgba(255,255,255,0.25)',
          letterSpacing: '0.08em',
        }}
      >
        Un mundo dentro de tu mundo
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="tracking-[0.3em] uppercase mb-1 text-neutral-400"
        style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1.05rem)' }}
      >
        El Zoo Invisible
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="tracking-[0.5em] uppercase mb-12 text-red-500/70"
        style={{ fontSize: 'clamp(0.6rem, 1.8vw, 0.8rem)' }}
      >
        \u26a0 Instalaci\u00f3n BSL-4 \u2022 Acceso Restringido \u26a0
      </motion.div>

      {/* Scan button / progress */}
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
            <div className="px-10 py-4 border-2 border-bio-green/40 bg-bio-green/5 
                          text-bio-green font-bold tracking-[0.2em] uppercase
                          hover:border-bio-green hover:bg-bio-green/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]
                          transition-all duration-300"
              style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)' }}
            >
              \u25b6 ENTRADA AL LABORATORIO
            </div>
            <div className="absolute -bottom-6 left-0 right-0 text-center text-neutral-600 tracking-widest"
              style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)' }}
            >
              PRESIONE PARA ESCANEO DE SEGURIDAD
            </div>
          </motion.button>
        )}

        {phase === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-72 md:w-96"
          >
            <div className="text-center text-bio-green tracking-[0.3em] mb-4"
              style={{ animation: 'flicker 0.5s infinite', fontSize: 'clamp(0.65rem, 2vw, 0.8rem)' }}
            >
              \u25c9 ESCANEANDO AUTORIZACI\u00d3N...
            </div>

            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${scanProgress}%`,
                  background: 'linear-gradient(90deg, #22c55e, #86efac)',
                  boxShadow: '0 0 10px #22c55e',
                }}
              />
            </div>

            <div className="text-neutral-500 space-y-1 font-mono"
              style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)' }}
            >
              {scanProgress > 10 && <p className="text-bio-green/60">\u2713 Huella dactilar verificada</p>}
              {scanProgress > 30 && <p className="text-bio-green/60">\u2713 Retina escaneada</p>}
              {scanProgress > 50 && <p className="text-bio-green/60">\u2713 Nivel de clearance: OMEGA</p>}
              {scanProgress > 70 && <p className="text-bio-green/60">\u2713 Protocolos de contenci\u00f3n activos</p>}
              {scanProgress > 90 && <p className="text-emergency/80">\u26a1 Despresurizando c\u00e1mara...</p>}
            </div>
          </motion.div>
        )}

        {phase === 'authorized' && (
          <motion.div
            key="authorized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="font-bold tracking-widest mb-2 text-bio-green"
              style={{
                fontSize: 'clamp(1.2rem, 5vw, 2rem)',
                textShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
              }}
            >
              ACCESO AUTORIZADO
            </div>
            <div className="text-neutral-500 tracking-[0.3em]"
              style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
            >
              BIENVENIDO AL NIVEL BSL-4
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-bio-green/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>
  );
}
