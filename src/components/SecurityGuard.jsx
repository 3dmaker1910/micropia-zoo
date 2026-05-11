import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOSSIP_LINES = [
  {
    microbe: 'Peste Negra',
    text: "¡Pssst! No te acerques mucho a la Peste Negra, ayer escuché que el vidrio crujió...",
  },
  {
    microbe: 'Cólera',
    text: "El Cólera lleva dos días sin parar de moverse... como si supiera que lo estamos mirando. Me da escalofríos.",
  },
  {
    microbe: 'Viruela',
    text: "¿Sabías que la Viruela fue la primera enfermedad que exterminamos? Pero ahí sigue, encerradita... esperando.",
  },
  {
    microbe: 'Gripe Española',
    text: "La Gripe Española mató más gente que la Primera Guerra Mundial... y la tenemos aquí a metros. ¿No te parece loco?",
  },
  {
    microbe: 'Tuberculosis',
    text: "La Tuberculosis es la más paciente de todas. Puede esperarte DÉCADAS dentro de tu cuerpo sin que lo sepas. ¡Décadas!",
  },
  {
    microbe: null,
    text: "Mi abuela dice que estos bichos son obra del diablo... yo no sé, pero de noche se escuchan ruidos raros.",
  },
  {
    microbe: null,
    text: "El turno de noche es peor. Las luces parpadean y juro que el tubo de la Peste Negra se ve... más oscuro.",
  },
  {
    microbe: null,
    text: "La Dra. Micra me dijo que no me preocupara. Pero ella nunca se queda después de las 10pm. ¿Coincidencia? No creo.",
  },
];

export default function SecurityGuard() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), 3000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextGossip = () => {
    setCurrentLine((prev) => (prev + 1) % GOSSIP_LINES.length);
    setIsExpanded(true);
    setIsTalking(true);
    setTimeout(() => setIsTalking(false), 3000);
  };

  const gossip = GOSSIP_LINES[currentLine];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <div
        className="rounded-xl p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(250,204,21,0.04) 0%, rgba(10,10,10,0.95) 100%)',
          border: '1px solid rgba(250,204,21,0.12)',
        }}
      >
        {/* Guard header */}
        <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={nextGossip}>
          {/* Guard avatar */}
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative"
            style={{
              background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, rgba(250,204,21,0.03) 100%)',
              border: '1.5px solid rgba(250,204,21,0.25)',
            }}
            animate={isTalking ? {
              scale: [1, 1.05, 1],
              borderColor: ['rgba(250,204,21,0.25)', 'rgba(250,204,21,0.5)', 'rgba(250,204,21,0.25)'],
            } : {}}
            transition={{ duration: 0.5, repeat: isTalking ? Infinity : 0 }}
          >
            <span className="text-2xl">👮</span>
            {/* Nervous eye shift */}
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500/80"
              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="text-white" style={{ fontSize: 6 }}>!</span>
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-emergency/80 text-xs tracking-wider">GUARDIA DE SEGURIDAD</h4>
              <motion.span
                className="text-[8px] px-1.5 py-0.5 rounded tracking-wider"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NERVIOSO
              </motion.span>
            </div>
            <p className="text-neutral-600 text-[10px] tracking-wider">Turno nocturno • Sector BSL-4</p>
          </div>

          <motion.button
            className="text-xs px-2 py-1 rounded"
            style={{
              background: 'rgba(250,204,21,0.08)',
              border: '1px solid rgba(250,204,21,0.2)',
              color: '#facc15',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💬
          </motion.button>
        </div>

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg p-3 relative"
            style={{
              background: 'rgba(250,204,21,0.03)',
              border: '1px solid rgba(250,204,21,0.08)',
            }}
          >
            {/* Speech triangle */}
            <div
              className="absolute -top-1.5 left-8 w-3 h-3 rotate-45"
              style={{
                background: 'rgba(250,204,21,0.03)',
                borderLeft: '1px solid rgba(250,204,21,0.08)',
                borderTop: '1px solid rgba(250,204,21,0.08)',
              }}
            />
            <p className="text-neutral-300 text-xs leading-relaxed italic">
              "{gossip.text}"
            </p>
            {gossip.microbe && (
              <p className="text-emergency/40 text-[9px] tracking-wider mt-1.5 uppercase">
                Sobre: {gossip.microbe}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* "Next gossip" hint */}
        <p className="text-neutral-700 text-[9px] tracking-wider mt-2 text-center">
          Toca al guardia para escuchar más chismes...
        </p>
      </div>
    </motion.div>
  );
}
