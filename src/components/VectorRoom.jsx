import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// URL DEL ESPECÍMEN DE NANDO
const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷', title: 'APARATO BUCAL', desc: 'Sistema picador-chupador.' },
  { id: 'patas', label: 'Patas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿', title: 'PATAS SALTARINAS', desc: 'Resorte de resilina.' },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘', title: 'ABDOMEN', desc: 'Reservorio de sangre.' },
];

export default function VectorRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h1 className="text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sala de Vectores</h1>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">◀ REGRESAR</button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-7xl mx-auto w-full">
        {/* ESPECÍMEN CONTAINER - REMOVED LOADING BLOCKER */}
        <div className="relative w-full lg:w-3/4 aspect-video rounded-[3rem] overflow-hidden border-2 border-white/5 bg-neutral-900 shadow-2xl flex items-center justify-center">
          
          {imgError ? (
            <div className="text-center p-10 text-orange-500/40">
               <span className="text-6xl mb-4 block">⚠️</span>
               <p className="font-black uppercase tracking-widest text-xs mb-2">Error al cargar la imagen de Nando</p>
               <p className="text-[10px] opacity-60">El link del archivo parece haber caducado.</p>
            </div>
          ) : (
            <img 
              src={FLEA_IMAGE_URL} 
              alt="Pulga de Nando" 
              className="w-full h-full object-contain contrast-125 brightness-110"
              onError={() => setImgError(true)}
            />
          )}
          
          {/* Markers are ALWAYS visible now to debug */}
          {HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelected(spot)}>
              <div className="w-10 h-10 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl animate-pulse" style={{ borderColor: spot.color }}>
                <span className="text-sm">{spot.icon}</span>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">ARCHIVO: PULGA.JPG • BSL-4 UNIT</div>
        </div>

        {/* DRA MICRA PANEL */}
        <div className="w-full lg:w-80 p-8 bg-green-950/20 border-2 border-green-500/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative">
           <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-24 h-24 mx-auto mb-6 object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
           <h3 className="text-green-400 font-black text-xs uppercase mb-2 text-center">Dra. Micra - Alerta</h3>
           <p className="text-[10px] text-white/80 leading-relaxed italic">
             "Nando, los <strong className='text-green-400'>VECTORES</strong> son claves. La pulga es el transporte de la peste. ¡Dime si no ves la imagen para resubirla!"
           </p>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm p-6 bg-black border border-white/20 rounded-[2.5rem] z-50 text-center">
             <h2 className="text-orange-500 font-black uppercase text-sm mb-2 italic">{selected.title}</h2>
             <p className="text-xs opacity-70 mb-4">{selected.desc}</p>
             <button onClick={() => setSelected(null)} className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all">Cerrar Detalle</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}