import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/933f16e19cfe4a4d983a3938faa4a1f4_PULGA.jpg';
const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '78%',
    y: '55%',
    color: '#ef4444',
    icon: '🦷',
    title: 'Vía: SALIVA',
    mechanism: 'Inyección Directa',
    desc: 'Al igual que mosquitos y pulgas, el patógeno viaja en la saliva e ingresa al torrente sanguíneo durante la picadura.',
  },
  {
    id: 'patas',
    label: 'Extremidades',
    x: '35%',
    y: '80%',
    color: '#3b82f6',
    icon: '🦿',
    title: 'Vía: PATAS',
    mechanism: 'Transmisión Mecánica',
    desc: 'Como las moscas, los vectores transportan bacterias en sus patas, contaminando superficies y alimentos al caminar.',
  },
  {
    id: 'abdomen',
    label: 'Excreción',
    x: '25%',
    y: '40%',
    color: '#f97316',
    icon: '🫘',
    title: 'Vía: HECES',
    mechanism: 'Contaminación por Desechos',
    desc: 'Como los roedores y vinchucas, el virus o parásito sale en las heces y entra al cuerpo por heridas o contacto directo.',
  },
];

const VECTOR_LIST = [
  { type: 'Mosquito', disease: 'Dengue, Malaria', icon: '🦟' },
  { type: 'Garrapata', disease: 'Lyme', icon: '🕷️' },
  { type: 'Pulga', disease: 'Peste Bubónica', icon: '🪳' },
  { type: 'Chinche', disease: 'Chagas', icon: '🐞' },
];

export default function VectorRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [showDocMessage, setShowDocMessage] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  const handleSpeakInfo = () => {
    if (speaking) {
      stop();
      return;
    }
    const script = "Nando, un vector es un vehículo biológico. Algunos transmiten por la SALIVA como mosquitos y pulgas. Otros por las PATAS como las moscas, dejando bacterias donde caminan. Y otros por las HECES como los roedores. Identificarlos es vital para las vacunas.";
    speak(script);
  };

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-white/10 pb-4 relative z-50">
        <h1 className="text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores</h1>
        <div className="flex gap-4">
           <button onClick={handleSpeakInfo} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase transition-all shadow-lg ${speaking ? 'bg-red-600 animate-pulse' : 'bg-green-600'}`}>
             {speaking ? '■ Detener' : '🔊 Análisis Hablado'}
           </button>
           <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase">◀ REGRESAR</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-7xl mx-auto w-full">
        {/* ESPECÍMEN CONTAINER */}
        <div className="relative w-full lg:w-3/4 aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl flex items-center justify-center">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga" 
            className={`w-full h-full object-contain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {isLoaded && HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelected(spot)}>
              <div className="w-12 h-12 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-sm">{spot.icon}</span>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Anatomía del Vector • Registro Nando-1910</div>
        </div>

        {/* DOCTORA MICRA PANEL */}
        <div className="w-full lg:w-85 p-8 bg-green-950/10 border-2 border-green-500/20 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative">
           <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-16 h-20 mx-auto mb-6 object-contain" />
           <AnimatePresence mode="wait">
             {selected ? (
               <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-orange-500 font-black text-xs uppercase mb-2 italic">{selected.title}</h3>
                  <p className="text-[9px] font-black text-white/30 uppercase mb-3">Mecanismo: {selected.mechanism}</p>
                  <p className="text-[11px] text-white/80 leading-relaxed mb-6 italic">"{selected.desc}"</p>
                  <button onClick={() => setSelected(null)} className="w-full py-2 border border-white/10 rounded-xl text-[8px] font-black uppercase">Cerrar Detalle</button>
               </motion.div>
             ) : (
               <div key="default">
                  <h3 className="text-green-400 font-black text-xs uppercase mb-4 text-center border-b border-green-500/20 pb-2">Reporte de Transmisión</h3>
                  <p className="text-[11px] text-white/70 leading-relaxed mb-6">
                    "Nando, pulsa los nodos sobre la pulga para ver cómo los vectores usan la <strong className='text-red-400'>saliva</strong>, las <strong className='text-blue-400'>patas</strong> o las <strong className='text-orange-400'>heces</strong> para infectar."
                  </p>
                  <div className="space-y-1">
                     {VECTOR_LIST.map((v, i) => (
                       <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                          <span className="text-lg">{v.icon}</span>
                          <span className="text-[9px] font-black uppercase text-green-500/60">{v.type}</span>
                       </div>
                     ))}
                  </div>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}