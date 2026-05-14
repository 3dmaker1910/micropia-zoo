import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTOR_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷', title: 'APARATO BUCAL — Sistema Sifón', description: 'Estructura picadora-chupadora que inyecta saliva y extrae sangre.', facts: ['Enzimas anticoagulantes potentes', 'Punto de transmisión de Yersinia', 'Presión de succión mecánica'] },
  { id: 'patas', label: 'Patas Saltarinas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿', title: 'PATAS — Motor de Resilina', description: 'Proteína resilina que actúa como un resorte de alta velocidad.', facts: ['Salto de 150x su longitud', 'Aceleración de 100 Gs', 'Lanzamiento explosivo'] },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘', title: 'ABDOMEN — Reservorio', description: 'Capacidad de expansión masiva para procesar sangre.', facts: ['Cámara de incubación bacteriana', 'Expansión de 3x volumen', 'Bloqueo gastrointestinal por peste'] },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showDocMessage, setShowDocMessage] = useState(true);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white p-4 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6 border-b border-orange-500/20 pb-4">
        <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sector de Vectores</h1>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 uppercase tracking-widest">◀ PABELLÓN</button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center max-w-7xl mx-auto w-full">
        {/* Specimen Container */}
        <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900/50">
          <img src={FLEA_IMAGE_URL} alt="Pulga" className="w-full h-full object-contain" />
          {HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-20" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelectedHotspot(spot)}>
              <div className="w-10 h-10 rounded-full bg-black/80 border-2 flex items-center justify-center" style={{ borderColor: spot.color }}>{spot.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Doctora Micra Dialogue */}
        <AnimatePresence>
          {showDocMessage && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
              className="w-80 p-6 bg-green-900/10 border-2 border-green-500/30 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl"
            >
              <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-20 h-24 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] object-contain" />
              <h3 className="text-green-400 font-black text-xs uppercase mb-2 text-center">Dra. Micra - Reporte de Campo</h3>
              <p className="text-[10px] text-white/70 leading-relaxed mb-4">
                "Nando, un <strong className='text-green-400'>VECTOR</strong> es un vehículo biológico. En este caso, la pulga transporta la peste. <strong className='text-red-400'>¡Es vital encontrarlo!</strong> Sin el vector, el ciclo de contagio se rompe. Recuerda: murciélagos, perros y gatos también pueden ser vectores que veremos pronto."
              </p>
              <button onClick={() => setShowDocMessage(false)} className="w-full py-2 bg-green-600 text-black text-[9px] font-black uppercase rounded-xl tracking-tighter hover:bg-green-400 transition-all">Entendido</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-black/90 border border-orange-500/30 backdrop-blur-2xl rounded-[2.5rem] z-50 shadow-2xl">
            <h2 className="font-black uppercase italic text-orange-400 text-sm mb-2">{selectedHotspot.title}</h2>
            <p className="text-[10px] text-white/70 leading-relaxed">{selectedHotspot.description}</p>
            <button onClick={() => setSelectedHotspot(null)} className="mt-4 text-[9px] font-bold text-white/20 hover:text-white uppercase tracking-widest">— Cerrar Informe —</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}