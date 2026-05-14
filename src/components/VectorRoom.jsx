import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  { id: 'bucal', label: 'Aparato Bucal', x: '78%', y: '55%', color: '#ef4444', icon: '🦷' },
  { id: 'patas', label: 'Patas Saltarinas', x: '35%', y: '80%', color: '#22c55e', icon: '🦿' },
  { id: 'abdomen', label: 'Abdomen', x: '25%', y: '40%', color: '#f97316', icon: '🫘' },
];

const VECTOR_LIST = [
  { 
    type: 'Mosquito', 
    disease: 'Dengue, Malaria, Zika', 
    icon: '🦟', 
    script: 'El mosquito es el vector más letal del planeta. Se reproduce en agua estancada y transmite virus como el Dengue y la Malaria. Es vital eliminar recipientes con agua y usar mosquiteros.' 
  },
  { 
    type: 'Garrapata', 
    disease: 'Enfermedad de Lyme', 
    icon: '🕷️', 
    script: 'La garrapata espera en el pasto alto y bosques para adherirse a la piel. Transmite la bacteria de Lyme, que puede causar daños crónicos en el corazón y el sistema nervioso.' 
  },
  { 
    type: 'Pulga', 
    disease: 'Peste Bubónica', 
    icon: '🪳', 
    script: 'La pulga de la rata es el vector que diezmó a Europa en la Edad Media. Salta de roedores a humanos inyectando la peste. La limpieza y el control de plagas son nuestra barrera.' 
  },
  { 
    type: 'Chinche', 
    disease: 'Enfermedad de Chagas', 
    icon: '🐞', 
    script: 'La vinchuca o chinche besucona habita en grietas de paredes. Transmite el parásito del Chagas, una enfermedad silenciosa que puede dañar el corazón décadas después del contacto.' 
  },
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
    const intro = "Nando, pon mucha atención a este informe detallado de bioseguridad. Un vector es un vehículo biológico que transporta la muerte. ";
    const list = VECTOR_LIST.map(v => v.script).join(' ');
    const footer = " Entender sus hábitos es la única forma de romper la cadena y crear vacunas efectivas. En las próximas salas analizaremos agentes portadores como el perro, el gato y el murciélago. ¡Fin del reporte!";
    speak(intro + list + footer);
  };

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-orange-500/30 pb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores Biológicos</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={handleSpeakInfo} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] ${speaking ? 'bg-red-600 animate-pulse' : 'bg-green-600'}`}>
             {speaking ? '■ Detener Análisis' : '🔊 Análisis de Voz Profundo'}
           </button>
           <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-950/40 border border-orange-500/40 rounded-full text-[10px] font-black text-orange-400 uppercase">◀ PABELLÓN</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-7xl mx-auto w-full pb-20">
        {/* ESPECÍMEN DE LA PULGA */}
        <div className="relative w-full lg:w-2/3 aspect-video rounded-[3.5rem] overflow-hidden border-2 border-white/5 bg-neutral-900 shadow-2xl flex items-center justify-center">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga Especimen" 
            className={`w-full h-full object-contain transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {isLoaded && HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelectedHotspot(spot)}>
              <div className="w-12 h-12 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-lg">{spot.icon}</span>
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Espécimen Nando-1910 — Unidad BSL-4</div>
        </div>

        {/* MENSAJE DOCTORA MICRA + LISTA EXPANDIDA */}
        <AnimatePresence>
          {showDocMessage && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="w-full lg:w-[480px] p-8 bg-green-950/10 border-2 border-green-500/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative z-40">
               <div className="flex items-center gap-4 mb-6">
                  <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-16 h-20 object-contain" />
                  <div>
                    <h3 className="text-green-400 font-black text-xs uppercase tracking-widest">Dra. Micra</h3>
                    <p className="text-[9px] text-white/40 uppercase font-bold">Auditoría de Vectores Globales</p>
                  </div>
               </div>

               <div className="space-y-3 mb-8">
                  <p className="text-[9px] font-black text-green-500/60 uppercase tracking-[0.3em] mb-4 border-b border-green-500/20 pb-2">Catálogo de Amenazas:</p>
                  {VECTOR_LIST.map((v, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/5">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <span className="text-2xl">{v.icon}</span>
                             <span className="text-xs font-black uppercase text-green-400 italic">{v.type}</span>
                          </div>
                          <span className="text-[10px] text-red-500 font-black tracking-widest uppercase">Nivel Crítico</span>
                       </div>
                       <p className="text-[10px] text-white/60 leading-relaxed font-medium mb-1">{v.disease}</p>
                       <p className="text-[9px] text-white/30 italic">{v.script}</p>
                    </div>
                  ))}
               </div>

               <button onClick={() => setShowDocMessage(false)} className="w-full py-4 bg-green-600 text-black text-[10px] font-black uppercase rounded-2xl hover:bg-green-400 shadow-lg tracking-[0.2em] transition-all">Confirmar Auditoría</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm p-6 bg-black border border-white/20 rounded-[2.5rem] z-50 text-center shadow-2xl backdrop-blur-md">
             <h2 className="text-orange-500 font-black uppercase text-sm mb-2">{selectedHotspot.title}</h2>
             <p className="text-[10px] text-white/70 italic">{selectedHotspot.desc}</p>
             <button onClick={() => setSelectedHotspot(null)} className="mt-4 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white">Cerrar</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}