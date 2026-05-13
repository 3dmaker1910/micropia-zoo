import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMAGEN DE LA PULGA ENVIADA POR NANDO
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/a71221b6a3784df6992d997f37ccb83e_PULGA.jpg';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '15%',
    y: '38%',
    color: '#ef4444',
    icon: '🦷',
    title: 'APARATO BUCAL — Sifón de Infección',
    description: 'Diseñado para perforar e inyectar saliva anticoagulante con Yersinia pestis.',
    facts: ['Saliva con enzimas bloqueadoras', 'Regurgitación bacteriana directa', 'Transmisión ultra-rápida'],
  },
  {
    id: 'patas',
    label: 'Patas Saltarinas',
    x: '45%',
    y: '82%',
    color: '#22c55e',
    icon: '🦿',
    title: 'PATAS SALTARINAS — Propulsión 100G',
    description: 'Contienen resilina, permitiendo saltos de hasta 150 veces su tamaño.',
    facts: ['Aceleración extrema', 'Resorte biológico de resilina', 'Salto sobre edificios de 30 pisos'],
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    x: '72%',
    y: '42%',
    color: '#f97316',
    icon: '🫘',
    title: 'ABDOMEN — Tanque de Cultivo',
    description: 'Se expande 3x al alimentarse. Es el reactor donde la peste se multiplica.',
    facts: ['Consumo de 15x su peso en sangre', 'Ambiente ideal para multiplicación', 'Bloqueo del tracto digestivo'],
  },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  return (
    <motion.div 
      className="min-h-screen bg-[#0a0502] text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 border-b border-orange-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sala de Vectores</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-4 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-xs font-bold text-orange-400 hover:bg-orange-500 hover:text-black transition-all">← VOLVER AL PABELLÓN</button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Image Container */}
        <div className="lg:col-span-2 relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/10 shadow-[0_0_50px_rgba(234,88,12,0.1)]">
            <img 
              src={FLEA_IMAGE_URL} 
              alt="Pulga de Nando" 
              className="w-full h-auto block grayscale contrast-125 brightness-110"
              style={{ minHeight: '400px', backgroundColor: '#111' }}
            />
            
            {/* Hotspots */}
            {HOTSPOTS.map(spot => (
              <motion.div
                key={spot.id}
                className="absolute cursor-pointer z-20"
                style={{ left: spot.x, top: spot.y }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedHotspot(spot)}
              >
                <div className="relative flex items-center justify-center w-10 h-10">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: spot.color }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border flex items-center justify-center shadow-lg" style={{ borderColor: spot.color }}>
                    {spot.icon}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Label Overlay */}
            <div className="absolute bottom-4 left-6 font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase">
              Imagen del Vector Provista por Nando • Micropia v11.0
            </div>
          </div>
        </div>

        {/* Right Column: Info Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedHotspot ? (
              <motion.div 
                key={selectedHotspot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 rounded-3xl bg-orange-950/10 border border-orange-500/20 backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selectedHotspot.icon}</span>
                  <h2 className="font-black uppercase italic text-orange-400 leading-none">{selectedHotspot.title}</h2>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-6">{selectedHotspot.description}</p>
                <div className="space-y-2">
                  {selectedHotspot.facts.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-white/50 bg-white/5 p-2 rounded-lg">
                      <span className="text-orange-500">▸</span> {f}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedHotspot(null)}
                  className="mt-8 w-full py-2 text-[10px] font-bold tracking-widest text-orange-500/50 hover:text-orange-500 uppercase"
                >— Cerrar Análisis —</button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center border-2 border-dashed border-white/5 rounded-3xl"
              >
                <p className="text-sm text-white/20 uppercase tracking-[0.2em] font-bold">
                  Selecciona un punto <br/> del vector para <br/> iniciar el análisis
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Link placeholder */}
          <div className="p-6 rounded-3xl bg-purple-950/10 border border-purple-500/20">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Próxima Conexión</p>
            <h3 className="text-white font-bold">Yersinia Pestis 3D</h3>
            <p className="text-[10px] text-white/40 mt-1">Mapeo estructural de la bacteria en la pulga.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}