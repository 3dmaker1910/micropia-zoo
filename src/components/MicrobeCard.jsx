import { motion, AnimatePresence } from 'framer-motion';
import { useSpeech } from '../hooks/useSpeech';

function StatBar({ label, value, color, delay }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-neutral-500 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function MicrobeCard({ microbe, onClose }) {
  const { speak, stop, speaking } = useSpeech();

  if (!microbe) return null;

  const { name, scientific, type, icon, color, colorDim, glowColor, 
          letalidad, peligrosidad, descubrimiento, vectorTransmision, impacto, misterio, stats } = microbe;

  const speakCard = () => {
    if (speaking) {
      stop();
      return;
    }
    const text = `Expediente de ${name}, ${scientific}. 
      Clasificación: ${type}. 
      Letalidad: ${letalidad}. 
      Peligrosidad: ${peligrosidad}. 
      Descubrimiento: ${descubrimiento}. 
      Vector de transmisión: ${vectorTransmision}. 
      Impacto histórico: ${impacto}. 
      Dato de misterio: ${misterio}.`;
    speak(text);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => { stop(); onClose(); }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            background: `linear-gradient(180deg, #111 0%, #0a0a0a 100%)`,
            border: `1px solid ${color}30`,
            boxShadow: `0 0 60px ${glowColor}, inset 0 1px 0 ${color}15`,
          }}
        >
          {/* Top border accent */}
          <div className="h-1 rounded-t-xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          {/* Header */}
          <div className="relative p-6 pb-4">
            {/* Close button */}
            <button
              onClick={() => { stop(); onClose(); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                       text-neutral-500 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>

            {/* Classification badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] px-2 py-0.5 rounded tracking-[0.2em] uppercase font-bold"
                style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
              >
                {type}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded tracking-[0.2em] uppercase
                            bg-red-500/10 text-red-400 border border-red-500/20">
                BSL-4
              </span>
            </div>

            {/* Microbe icon + name */}
            <div className="flex items-center gap-4">
              <motion.div
                className="text-5xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ filter: `drop-shadow(0 0 20px ${color})` }}
              >
                {icon}
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color }}>{name}</h2>
                <p className="text-sm text-neutral-400 italic">{scientific}</p>
              </div>
            </div>
          </div>

          {/* Stats section (Pokémon-style) */}
          <div className="px-6 py-4 mx-4 rounded-lg mb-4"
            style={{ background: `${color}08`, border: `1px solid ${color}15` }}
          >
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3">
              Estadísticas de Combate
            </h3>
            <div className="space-y-2">
              <StatBar label="Letalidad" value={stats.letal} color={color} delay={0.1} />
              <StatBar label="Contagio" value={stats.contagio} color={color} delay={0.2} />
              <StatBar label="Resistencia" value={stats.resistencia} color={color} delay={0.3} />
              <StatBar label="Mutación" value={stats.mutacion} color={color} delay={0.4} />
            </div>
          </div>

          {/* Data fields */}
          <div className="px-6 space-y-3 pb-4">
            {[
              { label: '☠ Letalidad', value: letalidad },
              { label: '⚠ Peligrosidad', value: peligrosidad },
              { label: '🔬 Descubrimiento', value: descubrimiento },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-1">
                  {field.label}
                </div>
                <div className="text-sm text-neutral-300">{field.value}</div>
              </div>
            ))}

            {/* Vector de Transmisión */}
            <div className="p-3 rounded-lg"
              style={{ background: `${color}12`, border: `1px solid ${color}25` }}
            >
              <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: `${color}99` }}>
                📡 Vector de Transmisión
              </div>
              <div className="text-sm font-medium leading-relaxed" style={{ color: `${color}dd` }}>
                {vectorTransmision}
              </div>
            </div>

            {/* Impacto Histórico */}
            <div className="p-3 rounded-lg" style={{ background: `${color}08`, border: `1px solid ${color}10` }}>
              <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-1">
                📜 Impacto Histórico
              </div>
              <div className="text-sm text-neutral-300 leading-relaxed">{impacto}</div>
            </div>

            {/* Dato de Misterio */}
            <div className="p-3 rounded-lg bg-emergency/5 border border-emergency/15">
              <div className="text-[10px] tracking-[0.2em] uppercase text-emergency/70 mb-1">
                🔮 Dato de Misterio
              </div>
              <div className="text-sm text-neutral-300 leading-relaxed italic">{misterio}</div>
            </div>
          </div>

          {/* Voice button */}
          <div className="px-6 pb-6 pt-2">
            <motion.button
              onClick={speakCard}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg font-bold text-sm tracking-[0.2em] uppercase
                       transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: speaking ? `${color}30` : `${color}15`,
                border: `1px solid ${speaking ? color : `${color}40`}`,
                color: speaking ? color : `${color}cc`,
                boxShadow: speaking ? `0 0 20px ${glowColor}` : 'none',
              }}
            >
              {speaking ? (
                <>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ◼
                  </motion.span>
                  Detener Voz de Seguridad
                </>
              ) : (
                <>🔊 Voz de Seguridad</>
              )}
            </motion.button>
          </div>

          {/* Bottom border accent */}
          <div className="h-0.5 rounded-b-xl" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
