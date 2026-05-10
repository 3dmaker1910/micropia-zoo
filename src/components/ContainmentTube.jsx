import { motion } from 'framer-motion';

export default function ContainmentTube({ microbe, index, onClick }) {
  const { name, scientific, icon, color, colorDim, glowColor, stats } = microbe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative w-full max-w-[260px] mx-auto">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] text-neutral-600 tracking-[0.3em]">MUESTRA #{String(microbe.id).padStart(3, '0')}</span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: colorDim }}>{microbe.type}</span>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_var(--glow)]"
          style={{ '--glow': glowColor, background: 'linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(10,10,10,0.95) 100%)', border: `1px solid ${color}25` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-2xl" />

          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
            style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
          />

          <div className="relative h-48 flex items-center justify-center">
            <motion.div
              className="absolute w-24 h-24 rounded-full blur-xl"
              style={{ background: glowColor }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="relative z-10 text-6xl select-none"
              animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [0, 5, -5, 3, 0], x: [0, 8, -8, 4, 0], y: [0, -6, 4, -3, 0] }}
              transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: `drop-shadow(0 0 15px ${color})` }}
            >
              {icon}
            </motion.div>

            <motion.div
              className="absolute top-4 right-4 w-2 h-2 rounded-full"
              style={{ background: color }}
              animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1.5, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 + index }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full"
              style={{ background: color }}
              animate={{ opacity: [0, 1, 0, 0], scale: [0.5, 1.2, 0.5, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 2 + index }}
            />
          </div>

          <div className="relative px-4 pb-4 pt-2" style={{ borderTop: `1px solid ${color}15` }}>
            <h3 className="font-bold text-sm tracking-wide mb-0.5" style={{ color }}>{name}</h3>
            <p className="text-[11px] text-neutral-500 italic">{scientific}</p>
            <div className="mt-3 space-y-1.5">
              {[{ label: 'LET', value: stats.letal }, { label: 'CON', value: stats.contagio }, { label: 'RES', value: stats.resistencia }].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-[9px] text-neutral-600 w-6">{stat.label}</span>
                  <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} transition={{ delay: 0.5 + index * 0.15, duration: 1, ease: 'easeOut' }} />
                  </div>
                  <span className="text-[9px] text-neutral-600 w-6 text-right">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-2xl">
            <motion.span className="text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold" style={{ textShadow: `0 0 10px ${color}` }}>
              ▶ ABRIR EXPEDIENTE
            </motion.span>
          </div>
        </div>

        <div className="flex items-center justify-center mt-2 gap-1">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} />
          <span className="text-[9px] text-neutral-600 tracking-[0.2em]">CONTENIDO</span>
        </div>
      </div>
    </motion.div>
  );
}
