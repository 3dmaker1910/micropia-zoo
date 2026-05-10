import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Seeded pseudo-random so each microbe has consistent but unique swimming params
function seededRand(seed, offset = 0) {
  const x = Math.sin(seed + offset) * 10000;
  return x - Math.floor(x);
}

export default function ContainmentTube({ microbe, index, onClick }) {
  const { name, scientific, icon, image, color, colorDim, glowColor, stats } = microbe;

  // Per-microbe unique swim parameters based on id seed
  const seed = microbe.id * 7.3;
  const swimDuration = 3.5 + seededRand(seed, 1) * 2.5;      // 3.5 – 6s
  const rotateAmp   = 8  + seededRand(seed, 2) * 14;           // 8 – 22°
  const scaleMin    = 0.88 + seededRand(seed, 3) * 0.07;       // 0.88 – 0.95
  const scaleMax    = 1.08 + seededRand(seed, 4) * 0.12;       // 1.08 – 1.20
  const driftX      = 6  + seededRand(seed, 5) * 10;           // 6 – 16 px
  const driftY      = 4  + seededRand(seed, 6) * 8;            // 4 – 12 px

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={onClick}
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

        {/* Glass tube container */}
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500
                     group-hover:shadow-[0_0_40px_var(--glow)]"
          style={{
            '--glow': glowColor,
            background: `linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(10,10,10,0.95) 100%)`,
            border: `1px solid ${color}25`,
          }}
        >
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
          <div className="relative h-48 flex items-center justify-center">
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

            {/* SVG glow filter definition — unique per microbe */}
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

            {/* Microbe organism — hyper-realistic image with swimming animation */}
            <motion.div
              className="relative z-10 w-24 h-24 select-none"
              animate={{
                scale:  [1,       scaleMax, scaleMin, scaleMax * 0.97, 1],
                rotate: [0,       rotateAmp, -rotateAmp * 0.7, rotateAmp * 0.4, 0],
                x:      [0,       driftX,   -driftX * 0.8,  driftX * 0.3,   0],
                y:      [0,       -driftY,   driftY * 0.9, -driftY * 0.4,  0],
              }}
              transition={{
                duration: swimDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
              }}
              style={{
                filter: `url(#glow-${microbe.id}) drop-shadow(0 0 12px ${color}90)`,
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-contain"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              {/* Emoji fallback */}
              <span
                className="text-6xl flex items-center justify-center w-full h-full"
                style={{ display: image ? 'none' : 'flex' }}
              >
                {icon}
              </span>
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

          {/* Hover prompt */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 
                        group-hover:bg-black/40 transition-all duration-300 rounded-2xl">
            <motion.span
              className="text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 text-white font-bold"
              style={{ textShadow: `0 0 10px ${color}` }}
            >
              ▶ ABRIR EXPEDIENTE
            </motion.span>
          </div>
        </div>

        {/* Bottom containment indicator */}
        <div className="flex items-center justify-center mt-2 gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
          <span className="text-[9px] text-neutral-600 tracking-[0.2em]">CONTENIDO</span>
        </div>
      </div>
    </motion.div>
  );
}
