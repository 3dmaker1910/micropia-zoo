import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMAGEN DE LA PULGA - Intento de carga directa sin proxys
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/a71221b6a3784df6992d997f37ccb83e_PULGA.jpg';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '22%',
    y: '35%',
    color: '#ef4444',
    icon: '🦷',
    title: 'APARATO BUCAL — Sifón de Infección',
    description: 'Diseñado para perforar e inyectar saliva anticoagulante con Yersinia pestis.',
    facts: ['Saliva con enzimas bloqueadoras', 'Regurgitación bacteriana directa', 'Transmisión ultra-rápida'],
  },
  {
    id: 'patas',
    label: 'Patas Saltarinas',
    x: '48%',
    y: '78%',
    color: '#22c55e',
    icon: '🦿',
    title: 'PATAS SALTARINAS — Propulsión 100G',
    description: 'Contienen resilina, permitiendo saltos de hasta 150 veces su tamaño.',
    facts: ['Aceleración extrema', 'Resorte biológico de resilina', 'Salto sobre edificios de 30 pisos'],
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    x: '75%',
    y: '45%',
    color: '#f97316',
    icon: '🫘',
    title: 'ABDOMEN — Tanque de Cultivo',
    description: 'Se expande 3x al alimentarse. Es el reactor donde la peste se multiplica.',
    facts: ['Consumo de 15x su peso en sangre', 'Ambiente ideal para multiplicación', 'Bloqueo del tracto digestivo'],
  },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-[#0a0502] text-white p-4 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 border-b border-orange-500/20 pb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sector de Vectores</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 hover:bg-orange-500 hover:text-black transition-all uppercase tracking-widest">◀ VOLVER</button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Image Container */}
        <div className="lg:col-span-3 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-orange-500/10 shadow-[0_0_60px_rgba(234,88,12,0.15)] bg-[#111]">
            {!imgError ? (
              <img 
                src={FLEA_IMAGE_URL} 
                alt="Pulga de Nando" 
                className="w-full h-auto block min-h-[500px] object-contain"
                style={{ filter: 'contrast(1.1) brightness(1.1)' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center flex-col gap-4 text-orange-500/40">
                <span className="text-6xl">⚠️</span>
                <p className="font-black uppercase tracking-widest text-xs">Error al cargar gráfico de Nando</p>
                <p className="text-[10px] opacity-50">Verifica la URL o re-envía el archivo</p>
              </div>
            )}
            
            {/* Hotspots */}
            {!imgError && HOTSPOTS.map(spot => (
              <motion.div
                key={spot.id}
                className="absolute cursor-pointer z-30"
                style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
                whileHover={{ scale: 1.3 }}
                onClick={() => setSelectedHotspot(spot)}
              >
                <div className="relative flex items-center justify-center w-12 h-12">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: spot.color }}
                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-xl border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                    <span className="text-lg">{spot.icon}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-6 left-8 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase z-10">
              Archivo del Vector: PULGA.JPG • Registro Micropia-Nando
            </div>
          </div>
        </div>

        {/* Right Column: Info Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedHotspot ? (
              <motion.div 
                key={selectedHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 rounded-[2rem] bg-orange-950/20 border-2 border-orange-500/30 backdrop-blur-3xl shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,100,0,0.5)]">{selectedHotspot.icon}</span>
                  <h2 className="font-black uppercase italic text-orange-400 leading-none text-base">{selectedHotspot.title}</h2>
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-6 font-medium">{selectedHotspot.description}</p>
                <div className="space-y-3">
                  {selectedHotspot.facts.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 text-[10px] text-white/50 bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-orange-500 font-black">▶</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedHotspot(null)}
                  className="mt-8 w-full py-3 bg-orange-500 text-black text-[10px] font-black tracking-widest rounded-2xl hover:bg-orange-400 transition-all uppercase"
                >Cerrar Análisis</button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 text-center border-2 border-dashed border-white/10 rounded-[2rem] bg-white/5"
              >
                <div className="text-4xl mb-4 opacity-20">🔬</div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black leading-relaxed">
                  Inicia el escaneo <br/> seleccionando un <br/> nodo biológico
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6 rounded-[2rem] bg-purple-950/20 border border-purple-500/20 shadow-lg">
            <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-2">Dato de Seguridad</p>
            <h3 className="text-white font-black text-sm uppercase italic">Yersinia Pestis</h3>
            <p className="text-[10px] text-white/40 mt-2 leading-relaxed">El vector está infectado. Evita contacto directo con la cutícula del espécimen.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}