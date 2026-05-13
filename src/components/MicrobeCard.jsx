import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

function StatBar({ label, value, color, delay }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-300 w-20 shrink-0 font-medium"
        style={{ fontSize: 'clamp(0.7rem, 2vw, 0.8rem)' }}
      >{label}</span>
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="font-bold w-8 text-right" style={{ color, fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>{value}</span>
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
          <div className="h-1 rounded-t-xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          <div className="relative p-6 pb-4">
            <button
              onClick={() => { stop(); onClose(); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                       text-neutral-300 hover:text-white transition-colors text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded tracking-[0.2em] uppercase font-bold"
                style={{
                  fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                  background: `${color}20`, color, border: `1px solid ${color}30`,
                }}
              >
                {type}
              </span>
              <span className="px-2 py-0.5 rounded tracking-[0.2em] uppercase
                            bg-red-500/10 text-red-300 border border-red-500/20"
                style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
              >
                BSL-4
              </span>
            </div>

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
                <h2 className="font-bold" style={{ color, fontSize: 'clamp(1.2rem, 4vw, 1.6rem)' }}>{name}</h2>
                <p className="text-neutral-300 italic" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}>{scientific}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 mx-4 rounded-lg mb-4"
            style={{ background: `${color}08`, border: `1px solid ${color}15` }}
          >
            <h3 className="tracking-[0.3em] uppercase text-neutral-300 mb-3 font-semibold"
              style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
            >
              Estadísticas de Combate
            </h3>
            <div className="space-y-2">
              <StatBar label="Letalidad" value={stats.letal} color={color} delay={0.1} />
              <StatBar label="Contagio" value={stats.contagio} color={color} delay={0.2} />
              <StatBar label="Resistencia" value={stats.resistencia} color={color} delay={0.3} />
              <StatBar label="Mutación" value={stats.mutacion} color={color} delay={0.4} />
            </div>
          </div>

          <div className="px-6 space-y-3 pb-4">
            {[
              { label: '☠ Letalidad', value: letalidad },
              { label: '⚠ Peligrosidad', value: peligrosidad },
              { label: '🔬 Descubrimiento', value: descubrimiento },
            ].map((field) => (
              <div key={field.label}>
                <div className="tracking-[0.2em] uppercase text-neutral-400 mb-1 font-medium"
                  style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
                >
                  {field.label}
                </div>
                <div className="text-white font-medium leading-relaxed"
                  style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}
                >{field.value}</div>
              </div>
            ))}

            <div className="p-3 rounded-lg"
              style={{ background: `${color}12`, border: `1px solid ${color}25` }}
            >
              <div className="tracking-[0.2em] uppercase mb-1 font-medium"
                style={{ color: `${color}cc`, fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
              >
                📡 Vector de Transmisión
              </div>
              <div className="font-semibold leading-relaxed"
                style={{ color, fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}
              >
                {vectorTransmision}
              </div>
            </div>

            <div className="p-3 rounded-lg" style={{ background: `${color}08`, border: `1px solid ${color}10` }}>
              <div className="tracking-[0.2em] uppercase text-neutral-400 mb-1 font-medium"
                style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
              >
                📜 Impacto Histórico
              </div>
              <div className="text-white leading-relaxed"
                style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}
              >{impacto}</div>
            </div>

            <div className="p-3 rounded-lg bg-emergency/5 border border-emergency/15">
              <div className="tracking-[0.2em] uppercase text-emergency/90 mb-1 font-medium"
                style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
              >
                🔮 Dato de Misterio
              </div>
              <div className="text-white leading-relaxed italic"
                style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}
              >{misterio}</div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <motion.button
              onClick={speakCard}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg font-bold tracking-[0.2em] uppercase
                       transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                background: speaking ? `${color}30` : `${color}15`,
                border: `1px solid ${speaking ? color : `${color}40`}`,
                color: speaking ? color : `${color}ee`,
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

          <div className="h-0.5 rounded-b-xl" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}