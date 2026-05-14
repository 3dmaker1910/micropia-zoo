import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMAGEN DE LA PULGA ENVIADA POR NANDO (v11.3)
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '78%', // Adjusted +2cm roughly (was 75%)
    y: '55%',
    color: '#ef4444',
    icon: '🦷',
    title: 'APARATO BUCAL — Sistema Sifón',
    description: 'Estructura picadora-chupadora que inyecta saliva y extrae sangre.',
    facts: ['Enzimas anticoagulantes potentes', 'Punto de transmisión de Yersinia', 'Presión de succión mecánica'],
  },
  {
    id: 'patas',
    label: 'Patas Saltarinas',
    x: '35%',
    y: '80%',
    color: '#22c55e',
    icon: '🦿',
    title: 'PATAS — Motor de Resilina',
    description: 'Proteína resilina que actúa como un resorte de alta velocidad.',
    facts: ['Salito de 150x su longitud', 'Aceleración de 100 Gs', 'Lanzamiento explosivo'],
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    x: '25%',
    y: '40%',
    color: '#f97316',
    icon: '🫘',
    title: 'ABDOMEN — Reservorio',
    description: 'Capacidad de expansión masiva para procesar sangre.',
    facts: ['Cámara de incubación bacteriana', 'Expansión de 3x volumen', 'Bloqueo gastrointestinal por peste'],
  },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white p-4 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6 border-b border-orange-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sector de Vectores</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 hover:bg-orange-500 hover:text-black transition-all uppercase tracking-widest">◀ PABELLÓN</button>
      </div>

      {/* Main Specimen Display */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl bg-neutral-900/50">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga Specimen"
            className="w-full h-full object-contain"
          />
          
          {/* Markers overlay */}
          {HOTSPOTS.map(spot => (
            <motion.div
              key={spot.id}
              className="absolute cursor-pointer z-20"
              style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
              whileHover={{ scale: 1.4 }}
              onClick={() => setSelectedHotspot(spot)}
            >
              <div className="relative flex items-center justify-center w-12 h-12">
                <motion.div className="absolute inset-0 rounded-full border-2 shadow-lg"
                  style={{ borderColor: spot.color }}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="w-10 h-10 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                  <span className="text-sm">{spot.icon}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Infobox overlay */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="absolute top-10 right-10 w-72 p-6 bg-black/90 border border-orange-500/30 backdrop-blur-2xl rounded-[2.5rem] z-50 shadow-2xl"
              >
                <h2 className="font-black uppercase italic text-orange-400 text-sm mb-2">{selectedHotspot.title}</h2>
                <p className="text-[10px] text-white/70 leading-relaxed mb-4">{selectedHotspot.description}</p>
                <div className="space-y-2">
                  {selectedHotspot.facts.map((f, i) => (
                    <div key={i} className="text-[9px] text-white/40 bg-white/5 p-2 rounded-xl">▸ {f}</div>
                  ))}
                </div>
                <button onClick={() => setSelectedHotspot(null)} className="w-full mt-6 py-2 border border-orange-500/20 text-[9px] font-bold text-orange-500/50 uppercase rounded-full">Cerrar Detalle</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-8 left-12 font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">ESPECÍMEN DE NANDO — MUESTREO BSL-4</div>
        </div>
      </div>
    </motion.div>
  );
}