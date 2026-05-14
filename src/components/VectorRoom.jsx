import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTOR_NPC_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '77%', y: '55%', color: '#ef4444', icon: '🦷', title: 'APARATO BUCAL — Sistema Sifón', description: 'Estructura picadora-chupadora que inyecta saliva y extrae sangre.', facts: ['Enzimas anticoagulantes potentes', 'Punto de transmisión de Yersinia', 'Presión de succión mecánica'] },
  { id: 'patas', label: 'Patas Saltarinas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿', title: 'PATAS — Motor de Resilina', description: 'Proteína resilina que actúa como un resorte de alta velocidad.', facts: ['Salito de 150x su longitud', 'Aceleración de 100 Gs', 'Lanzamiento explosivo'] },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘', title: 'ABDOMEN — Reservorio', description: 'Capacidad de expansión masiva para procesar sangre.', facts: ['Cámara de incubación bacteriana', 'Expansión de 3x volumen', 'Bloqueo gastrointestinal por peste'] },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showDoctor, setShowDoctor] = useState(true);

  return (
    <motion.div className="min-h-screen bg-black text-white p-4 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6 border-b border-orange-500/20 pb-4">
        <h1 className="text-xl font-black tracking-tighter text-orange-500 italic uppercase">Sector de Vectores</h1>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 uppercase tracking-widest">◀ VOLVER</button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="relative w-full max-w-4xl aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900/50">
          <img src={FLEA_IMAGE_URL} alt="Pulga" className="w-full h-full object-contain" />
          {HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-20" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelectedHotspot(spot)}>
               <div className="w-10 h-10 rounded-full bg-black/80 border-2 flex items-center justify-center" style={{ borderColor: spot.color }}>{spot.icon}</div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showDoctor && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="w-80 p-6 bg-blue-900/10 border-2 border-blue-500/30 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl">
               <img src={DOCTOR_NPC_URL} alt="Doctor" className="w-24 h-24 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
               <h3 className="text-blue-400 font-black text-xs uppercase mb-2 text-center">Informe del Especialista</h3>
               <p className="text-[10px] text-white/70 leading-relaxed mb-4">
                 "Detective Nando, un <strong className='text-blue-400'>vector</strong> es cualquier organismo que transporta y transmite un patógeno. La pulga es el vector clásico de la Peste Negra. Ten cuidado: otros vectores como murciélagos, perros y gatos serán analizados en las próximas salas."
               </p>
               <button onClick={() => setShowDoctor(false)} className="w-full py-2 bg-blue-500 text-black text-[9px] font-black uppercase rounded-xl tracking-tighter">Entendido</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}