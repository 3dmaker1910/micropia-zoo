import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// URL FORZADA - IMAGEN DE LA PULGA
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTOR_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷' },
  { id: 'patas', label: 'Patas Saltarinas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿' },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘' },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showDocMessage, setShowDocMessage] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-orange-500/30 pb-4">
        <h1 className="text-2xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores</h1>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/40 rounded-full text-[10px] font-black text-orange-400 uppercase">◀ SALIR AL HALL</button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-7xl mx-auto w-full">
        {/* ESPECÍMEN DE LA PULGA - REDISEÑO DE CONTENEDOR */}
        <div className="relative w-full lg:w-3/4 aspect-video rounded-[3.5rem] overflow-hidden border-2 border-white/5 bg-neutral-900 shadow-[0_0_100px_rgba(234,88,12,0.1)] flex items-center justify-center">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga Especimen" 
            className={`w-full h-full object-contain transition-all duration-[2000ms] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onLoad={() => setIsLoaded(true)}
            style={{ filter: 'contrast(1.2) brightness(1.1) grayscale(0.2)' }}
          />
          
          {/* CARGANDO */}
          {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-black animate-pulse">SCANNEANDO MUESTRA...</div>}

          {/* MARCADORES */}
          {isLoaded && HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelectedHotspot(spot)}>
              <div className="w-12 h-12 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-lg">{spot.icon}</span>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">ESPECÍMEN DE NANDO — MUESTREO BSL-4</div>
        </div>

        {/* MENSAJE DOCTORA MICRA */}
        <AnimatePresence>
          {showDocMessage && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="w-full lg:w-80 p-8 bg-green-950/10 border-2 border-green-500/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative">
               <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-24 h-24 mx-auto mb-6 object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
               <h3 className="text-green-400 font-black text-xs uppercase mb-4 text-center">Reporte de Bioseguridad</h3>
               <p className="text-[11px] text-white/80 leading-relaxed italic mb-6">
                 "Nando, detectamos la pulga. Este <strong className='text-green-400'>VECTOR</strong> es el responsable de millones de muertes en la historia. Si lo encuentras, cortas la cadena de transmisión. Pronto veremos otros como murciélagos y gatos."
               </p>
               <button onClick={() => setShowDocMessage(false)} className="w-full py-3 bg-green-600 text-black text-[10px] font-black uppercase rounded-2xl hover:bg-green-400 transition-all">ENTENDIDO</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}