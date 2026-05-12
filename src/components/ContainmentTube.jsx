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
      className="cursor-pointer group"
    >
      <div className="relative w-full max-w-[260px] mx-auto">
        {/* ID label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] text-neutral-600 tracking-[0.3em]">
            MUESTRA #{String(microbe.id).padStart(3, '0')}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: colorDim }}>
            {microbe.type}
          </span>
        </div>

        {/* Glass dome / tube container */}
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500
                     group-hover:shadow-[0_0_40px_var(--glow)]"
          style={{
            '--glow': glowColor,
            background: `linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(10,10,10,0.95) 100%)`,
            border: `1px solid ${color}25`,
          }}
        >
          {/* Glass dome top — slides up when revealed */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)',
              borderBottom: `1px solid ${color}15`,
            }}
            animate={isRevealed ? { y: '-100%', opacity: 0.3 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-2xl" />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
          />

          {/* Microbe display area */}
          <div className="relative h-48 flex items-center justify-center overflow-hidden">
            {/* Glow backdrop — pulses with microbe color */}
            <motion.div
              className="absolute w-28 h-28 rounded-full blur-2xl"
              style={{ background: glowColor }}
              animate={{
                scale: [1, 1.35, 0.95, 1.2, 1],
                opacity: [0.35, 0.65, 0.4, 0.6, 0.35],
              }}
              transition={{ duration: swimDuration, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* SVG glow filter */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id={`glow-${microbe.id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor={color} floodOpacity="0.7" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
                  <feMerge>
                    <feMergeNode in="colorBlur" />
                    <feMergeNode in="colorBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Microbe organism — "video" horror effect with hue-rotate, contrast, pulse */}
            <motion.div
              className="relative z-10 select-none"
              style={{
                width: isRevealed ? '140px' : '96px',
                height: isRevealed ? '140px' : '96px',
              }}
              animate={isRevealed ? {
                scale: [1.2, 1.35, 1.2],
                rotate: [0, 3, -3, 0],
              } : {
                scale:  [1, scaleMax, scaleMin, scaleMax * 0.97, 1],
                rotate: [0, rotateAmp, -rotateAmp * 0.7, rotateAmp * 0.4, 0],
                x:      [0, driftX, -driftX * 0.8, driftX * 0.3, 0],
                y:      [0, -driftY, driftY * 0.9, -driftY * 0.4, 0],
              }}
              transition={isRevealed ? {
                duration: 1.5, repeat: Infinity, ease: 'easeInOut',
              } : {
                duration: swimDuration, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror',
              }}
            >
              {/* Horror "video" CSS animation wrapper */}
              <motion.div
                style={{
                  filter: `url(#glow-${microbe.id}) drop-shadow(0 0 12px ${color}90)`,
                }}
                animate={{
                  filter: isRevealed ? [
                    `url(#glow-${microbe.id}) drop-shadow(0 0 20px ${color}) hue-rotate(0deg) contrast(1.3)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 30px ${color}) hue-rotate(30deg) contrast(1.5)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 20px ${color}) hue-rotate(-20deg) contrast(1.2)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 25px ${color}) hue-rotate(15deg) contrast(1.4)`,
                  ] : [
                    `url(#glow-${microbe.id}) drop-shadow(0 0 12px ${color}90) hue-rotate(0deg) contrast(1.1)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 18px ${color}90) hue-rotate(10deg) contrast(1.25)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 12px ${color}90) hue-rotate(-8deg) contrast(1.05)`,
                    `url(#glow-${microbe.id}) drop-shadow(0 0 15px ${color}90) hue-rotate(5deg) contrast(1.15)`,
                  ],
                }}
                transition={{ duration: hueSpeed, repeat: Infinity, ease: 'easeInOut' }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain"
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span
                  className="text-6xl flex items-center justify-center w-full h-full"
                  style={{ display: image ? 'none' : 'flex' }}
                >
                  {icon}
                </span>
              </motion.div>
            </motion.div>

            {/* Glass impact flashes */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 rounded-full"
              style={{ background: color }}
              animate={{
                opacity: [0, 0, 1, 0],
                scale: [0.5, 0.5, 1.5, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 + index }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full"
              style={{ background: color }}
              animate={{
                opacity: [0, 1, 0, 0],
                scale: [0.5, 1.2, 0.5, 0.5],
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 2 + index }}
            />

            {/* Revealed state label */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  className="absolute bottom-2 left-0 right-0 text-center z-30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold px-2 py-1 rounded"
                    style={{
                      background: `${color}20`,
                      color: color,
                      border: `1px solid ${color}40`,
                      textShadow: `0 0 8px ${color}`,
                    }}
                  >
                    ⚠ DOMO ABIERTO — TOCA PARA EXPEDIENTE
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info bar */}
          <div className="relative px-4 pb-4 pt-2"
            style={{ borderTop: `1px solid ${color}15` }}
          >
            <h3 className="font-bold text-sm tracking-wide mb-0.5" style={{ color }}>
              {name}
            </h3>
            <p className="text-[11px] text-neutral-500 italic">{scientific}</p>

            {/* Mini stat bars */}
            <div className="mt-3 space-y-1.5">
              {[
                { label: 'LET', value: stats.letal },
                { label: 'CON', value: stats.contagio },
                { label: 'RES', value: stats.resistencia },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-[9px] text-neutral-600 w-6">{stat.label}</span>
                  <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-[9px] text-neutral-600 w-6 text-right">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hover prompt (only when not revealed) */}
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 
                          group-hover:bg-black/40 transition-all duration-300 rounded-2xl">
              <motion.span
                className="text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 text-white font-bold"
                style={{ textShadow: `0 0 10px ${color}` }}
              >
                ▶ ABRIR DOMO
              </motion.span>
            </div>
          )}
        </div>

        {/* Bottom containment indicator */}
        <div className="flex items-center justify-center mt-2 gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isRevealed ? '#ef4444' : color }}
            animate={isRevealed ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] } : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: isRevealed ? 0.5 : 2, repeat: Infinity, delay: index * 0.2 }}
          />
          <span className="text-[9px] tracking-[0.2em]"
            style={{ color: isRevealed ? '#ef4444' : '#525252' }}
          >
            {isRevealed ? '⚠ ABIERTO' : 'CONTENIDO'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
