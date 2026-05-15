import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function seededRand(seed, offset = 0) {
  const x = Math.sin(seed + offset) * 10000;
  return x - Math.floor(x);
}

export default function ContainmentTube({ microbe, index, onClick }) {
  const { name, scientific, icon, image, color, colorDim, glowColor, stats } = microbe;
  const [isRevealed, setIsRevealed] = useState(false);

  const seed = microbe.id * 7.3;
  const swimDuration = 3.5 + seededRand(seed, 1) * 2.5;
  const rotateAmp   = 8  + seededRand(seed, 2) * 14;
  const scaleMin    = 0.88 + seededRand(seed, 3) * 0.07;
  const scaleMax    = 1.08 + seededRand(seed, 4) * 0.12;
  const driftX      = 6  + seededRand(seed, 5) * 10;
  const driftY      = 4  + seededRand(seed, 6) * 8;
  const hueSpeed = 2 + seededRand(seed, 7) * 3;

  const handleTubeClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 3500);
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={handleTubeClick}
      className="cursor-pointer group relative z-10 hover:z-50"
    >
      <div className="relative w-full max-w-[260px] mx-auto">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] text-neutral-600 tracking-[0.3em]">MUESTRA #{String(microbe.id).padStart(3, '0')}</span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: colorDim }}>{microbe.type}</span>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_60px_var(--glow)] group-hover:scale-110"
          style={{ '--glow': glowColor, background: `linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(10,10,10,0.95) 100%)`, border: `1px solid ${color}25` }}
        >
          <motion.div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)', borderBottom: `1px solid ${color}15` }} animate={isRevealed ? { y: '-100%', opacity: 0.3 } : { y: 0, opacity: 1 }} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-2xl" />

          <div className="relative h-48 flex items-center justify-center overflow-hidden">
            <motion.div className="absolute w-28 h-28 rounded-full blur-2xl" style={{ background: glowColor }} animate={{ scale: [1, 1.35, 0.95, 1.2, 1], opacity: [0.35, 0.65, 0.4, 0.6, 0.35] }} transition={{ duration: swimDuration, repeat: Infinity, ease: 'easeInOut' }} />
            
            {/* THE MICROBE IMAGE WITH LARGE HOVER ZOOM */}
            <motion.div
              className="relative z-10 select-none flex items-center justify-center"
              animate={isRevealed ? { scale: 1.5 } : { scale: [1, scaleMax, scaleMin, 1], rotate: [0, 5, -5, 0] }}
              whileHover={{ scale: 2.2, zIndex: 100 }} // EXTRA LARGE ZOOM ON HOVER
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {image ? (
                <img src={image} alt={name} className="w-24 h-24 object-contain filter drop-shadow(0 0 10px black)" draggable={false} />
              ) : (
                <span className="text-6xl">{icon}</span>
              )}
            </motion.div>
          </div>

          <div className="relative px-4 pb-4 pt-2" style={{ borderTop: `1px solid ${color}15` }}>
            <h3 className="font-black text-sm tracking-wide mb-0.5 uppercase" style={{ color }}>{name}</h3>
            <p className="text-[10px] text-neutral-500 italic">{scientific}</p>
            <div className="mt-3 space-y-1">
              {[{ label: 'LET', val: stats.letal }, { label: 'CON', val: stats.contagio }, { label: 'RES', val: stats.resistencia }].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-[8px] text-neutral-600 w-6">{s.label}</span>
                  <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div className="h-full" style={{ background: color, width: `${s.val}%` }} initial={{ width: 0 }} animate={{ width: `${s.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}