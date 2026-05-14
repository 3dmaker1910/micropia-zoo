import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷', title: 'APARATO BUCAL', desc: 'Sistema picador-chupador para inyección de patógenos.' },
  { id: 'patas', label: 'Patas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿', title: 'PATAS SALTARINAS', desc: 'Mecanismo de propulsión biológica extrema.' },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘', title: 'ABDOMEN', desc: 'Reservorio donde se multiplican las bacterias.' },
];

const VECTOR_LIST = [
  { type: 'Mosquito', disease: 'Dengue, Malaria, Fiebre Amarilla, Zika', icon: '🦟' },
  { type: 'Garrapata', disease: 'Enfermedad de Lyme', icon: '🕷️' },
  { type: 'Pulga', disease: 'Peste Bubónica', icon: '🪳' },
  { type: 'Chinche (Vinchuca)', disease: 'Enfermedad de Chagas', icon: '🐞' },
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showDocMessage, setShowDocMessage] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  const handleSpeakInfo = () => {
    if (speaking) {
      stop();
      return;
    }
    const intro = "Nando, un vector es un organismo que transporta y transmite un patógeno. Identificarlos es vital para entender la propagación y crear vacunas eficientes. ";
    const list = VECTOR_LIST.map(v => `El ${v.type} transmite ${v.disease}`).join('. ');
    const footer = ". En próximas salas analizaremos al perro, el gato, la garrapata y el murciélago.";
    speak(intro + list + footer);
  };

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-orange-500/30 pb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={handleSpeakInfo} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${speaking ? 'bg-red-600 animate-pulse' : 'bg-green-600'}`}>
             {speaking ? '■ Detener Reporte' : '🔊 Escuchar Reporte'}
           </button>
           <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/40 rounded-full text-[10px] font-black text-orange-400 uppercase">◀ PABELLÓN</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-7xl mx-auto w-full pb-20">
        {/* ESPECÍMEN DE LA PULGA - NITIDEZ TOTAL */}
        <div className="relative w-full lg:w-2/3 aspect-video rounded-[3.5rem] overflow-hidden border-2 border-white/5 bg-neutral-900 shadow-2xl flex items-center justify-center">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga Especimen" 
            className={`w-full h-full object-contain transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            style={{ filter: 'none' }}
          />
          
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

        {/* INFORME DOCTORA MICRA */}
        <AnimatePresence>
          {showDocMessage && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="w-full lg:w-[450px] p-8 bg-green-950/10 border-2 border-green-500/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative z-40">
               <div className="flex items-center gap-4 mb-6">
                  <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-16 h-20 object-contain" />
                  <div>
                    <h3 className="text-green-400 font-black text-xs uppercase tracking-widest">Dra. Micra</h3>
                    <p className="text-[9px] text-white/40 uppercase font-bold">Unidad de Vectores</p>
                  </div>
               </div>

               <div className="space-y-2 mb-8">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-3">Vectores y Amenazas:</p>
                  {VECTOR_LIST.map((v, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <span className="text-xl">{v.icon}</span>
                          <span className="text-[10px] font-black text-green-400 uppercase">{v.type}</span>
                       </div>
                       <span className="text-[8px] text-white/60 italic text-right">{v.disease}</span>
                    </div>
                  ))}
               </div>

               <button onClick={() => setShowDocMessage(false)} className="w-full py-4 bg-green-600 text-black text-[10px] font-black uppercase rounded-2xl hover:bg-green-400 shadow-lg tracking-widest">CERRAR REPORTE</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm p-6 bg-black border border-white/20 rounded-[2.5rem] z-50 text-center">
             <h2 className="text-orange-500 font-black uppercase text-sm mb-2 italic">{selectedHotspot.title}</h2>
             <p className="text-xs opacity-70 mb-4">{selectedHotspot.desc}</p>
             <button onClick={() => setSelectedHotspot(null)} className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white">Cerrar Análisis</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}