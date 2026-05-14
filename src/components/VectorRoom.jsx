import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷', title: 'APARATO BUCAL', desc: 'Sistema picador-chupador para inyección de patógenos.' },
  { id: 'patas', label: 'Patas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿', title: 'PATAS SALTARINAS', desc: 'Mecanismo de propulsión biológica extrema.' },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘', title: 'ABDOMEN', desc: 'Reservorio donde se multiplican las bacterias.' },
];

export default function VectorRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [showDocMessage, setShowDocMessage] = useState(true);

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-orange-500/30 pb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores Biológicos</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/30 rounded-full text-[10px] font-black text-orange-400 uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all">◀ PABELLÓN</button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center max-w-7xl mx-auto w-full">
        {/* ESPECÍMEN CONTAINER */}
        <div className="relative w-full lg:w-3/4 aspect-video rounded-[3.5rem] overflow-hidden border-2 border-white/5 bg-neutral-900 shadow-[0_0_80px_rgba(234,88,12,0.1)] flex items-center justify-center">
          <img src={FLEA_IMAGE_URL} alt="Pulga" className="w-full h-full object-contain contrast-125 brightness-110" />
          {HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelected(spot)}>
              <div className="w-10 h-10 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-sm">{spot.icon}</span>
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Análisis de Vector: Xenopsylla Cheopis</div>
        </div>

        {/* INFORME DE LA DOCTORA MICRA - ACTUALIZACIÓN DE TEORÍA */}
        <AnimatePresence>
          {showDocMessage && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
              className="w-full lg:w-96 p-8 bg-green-950/10 border-2 border-green-500/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative z-40"
            >
               <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-20 h-24 mx-auto mb-4 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
               <h3 className="text-green-400 font-black text-xs uppercase mb-3 text-center border-b border-green-500/20 pb-2">¿Qué es un Vector?</h3>
               <p className="text-[11px] text-white/80 leading-relaxed mb-4">
                 "Nando, un <strong className='text-green-400'>VECTOR</strong> es un agente (como esta pulga) que transporta y transmite un patógeno a otro organismo. 
                 Identificarlos es vital: nos permite entender cómo se propagan las enfermedades y es el primer paso para crear <strong className='text-cyan-400'>VACUNAS</strong> y tratamientos efectivos."
               </p>
               <p className="text-[10px] text-white/50 leading-relaxed mb-6 italic">
                 "Esta pulga es solo el inicio. Más adelante analizaremos otros vectores peligrosos como el <strong>perro</strong> (Rabia), la <strong>garrapata</strong>, el <strong>gato</strong> (Toxo) y el <strong>murciélago</strong> (vínculo Covid). ¡Mantente alerta!"
               </p>
               <button onClick={() => setShowDocMessage(false)} className="w-full py-3 bg-green-600 text-black text-[10px] font-black uppercase rounded-2xl hover:bg-green-400 shadow-lg">Confirmar Lectura</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm p-6 bg-black border border-white/20 rounded-[2.5rem] z-50 text-center">
             <h2 className="text-orange-500 font-black uppercase text-sm mb-2">{selected.title}</h2>
             <p className="text-xs opacity-70 mb-4">{selected.desc}</p>
             <button onClick={() => setSelected(null)} className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white">Cerrar Detalle</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}