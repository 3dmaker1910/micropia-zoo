import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMAGEN DE LA PULGA ENVIADA POR NANDO (v11.2)
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '75%',
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
    facts: ['Salto de 150x su longitud', 'Aceleración de 100 Gs', 'Lanzamiento explosivo'],
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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white p-4 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6 border-b border-orange-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sector de Vectores</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 hover:bg-orange-500 hover:text-black transition-all uppercase tracking-widest">◀ PABELLÓN</button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-center justify-center">
        <div className="lg:col-span-3 relative">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(234,88,12,0.1)] bg-neutral-900 flex items-center justify-center min-h-[500px]">
            
            <img 
              src={FLEA_IMAGE_URL} 
              alt="Espécimen de Nando" 
              className={`w-full h-auto max-h-[70vh] object-contain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
              style={{ filter: 'contrast(1.2) brightness(1.1)' }}
            />

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-orange-500/20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>⏳</motion.div>
              </div>
            )}
            
            {isLoaded && HOTSPOTS.map(spot => (
              <motion.div
                key={spot.id}
                className="absolute cursor-pointer z-20"
                style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
                whileHover={{ scale: 1.4 }}
                onClick={() => setSelectedHotspot(spot)}
              >
                <div className="relative flex items-center justify-center w-10 h-10">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: spot.color }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-8 h-8 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                    <span className="text-sm">{spot.icon}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-8 left-10 font-mono text-[8px] text-orange-500/30 tracking-[0.4em] uppercase">
              ANÁLISIS DE VECTOR: XENOPSYLLA — REGISTRO NANDO-1910
            </div>
          </div>
        </div>

        <div className="space-y-6 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedHotspot ? (
              <motion.div 
                key={selectedHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8 rounded-[2.5rem] bg-orange-950/20 border-2 border-orange-500/40 backdrop-blur-3xl shadow-2xl"
              >
                <h2 className="font-black uppercase italic text-orange-400 text-lg mb-2 leading-none">{selectedHotspot.title}</h2>
                <p className="text-xs text-white/70 leading-relaxed mb-6 font-medium italic">{selectedHotspot.description}</p>
                <div className="space-y-3">
                  {selectedHotspot.facts.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 text-[10px] text-white/60 bg-white/5 p-3 rounded-2xl">
                      <span className="text-orange-500 font-black">◈</span> {f}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedHotspot(null)}
                  className="mt-8 w-full py-3 bg-orange-500 text-black text-[10px] font-black tracking-widest rounded-2xl hover:bg-orange-400 transition-all uppercase shadow-lg"
                >Cerrar Informe</button>
              </motion.div>
            ) : (
              <div className="p-10 text-center border-2 border-dashed border-orange-500/10 rounded-[2.5rem] bg-orange-500/5">
                <p className="text-[9px] text-orange-500/40 uppercase tracking-[0.3em] font-black leading-loose animate-pulse">
                  Aguardando Selección <br/> de Nodo Biológico <br/> para Desglose
                </p>
              </div>
            )}
          </AnimatePresence>

          <div className="p-6 rounded-[2rem] bg-red-950/20 border border-red-500/20">
            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Aviso Crítico</p>
            <h3 className="text-white font-black text-sm uppercase italic">Peste Negra Activa</h3>
            <p className="text-[10px] text-white/40 mt-1">Carga bacteriana detectada en el espécimen provisto por Nando.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}