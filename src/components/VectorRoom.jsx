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
    <motion.div className="min-h-screen bg-black text-white p-4 md:p-6 font-sans flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between mb-6 border-b border-white/10 pb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪳</span>
          <h1 className="text-lg md:text-xl font-black italic uppercase text-orange-500 tracking-tighter">Sector de Vectores Biológicos</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={handleSpeakInfo} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase transition-all shadow-lg ${speaking ? 'bg-red-600 animate-pulse' : 'bg-green-600'}`}>
             {speaking ? '■ Detener' : '🔊 Análisis Hablado'}
           </button>
           <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black">◀ VOLVER</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN: THE SPECIMEN (7 cols) */}
        <div className="lg:col-span-7 relative w-full aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900/50 shadow-2xl flex items-center justify-center">
          <img 
            src={FLEA_IMAGE_URL} 
            alt="Pulga" 
            className={`w-full h-full object-contain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {isLoaded && HOTSPOTS.map(spot => (
            <motion.div key={spot.id} className="absolute cursor-pointer z-30" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => setSelected(spot)}>
              <div className="w-12 h-12 rounded-full bg-black/80 border-2 flex items-center justify-center shadow-2xl" style={{ borderColor: spot.color }}>
                <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-lg">{spot.icon}</span>
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-8 left-12 font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Registro Nando-1910 • Especímen BSL-4</div>
        </div>

        {/* RIGHT COLUMN: THE TWO PANELS (5 cols) */}
        <div className="lg:col-span-5 w-full space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
           
           {/* PANEL 1: REPORTE GENERAL (La versión anterior que pediste dejar) */}
           <div className="p-6 rounded-[2.5rem] bg-green-950/10 border-2 border-green-500/30 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                 <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-12 h-16 object-contain" />
                 <div>
                    <h3 className="text-green-400 font-black text-[11px] uppercase tracking-widest">Dra. Micra</h3>
                    <p className="text-[9px] text-white/40 font-bold uppercase">Reporte General de Vectores</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                 {VECTOR_LIST.map((v, i) => (
                   <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                         <span className="text-xl">{v.icon}</span>
                         <span className="text-[9px] font-black uppercase text-green-500/80">{v.type}</span>
                      </div>
                      <span className="text-[8px] text-white/60 italic font-medium">{v.disease}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* PANEL 2: ANÁLISIS BIO-MECÁNICO (El nuevo espacio para los puntos) */}
           <AnimatePresence mode="wait">
             {selected ? (
               <motion.div 
                 key={selected.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="p-8 rounded-[2.5rem] bg-orange-950/20 border-2 border-orange-500/40 backdrop-blur-3xl shadow-2xl"
               >
                  <div className="flex items-center gap-4 mb-4">
                     <span className="text-4xl">{selected.icon}</span>
                     <h2 className="text-lg font-black uppercase italic text-orange-400">{selected.title}</h2>
                  </div>
                  <p className="text-[9px] font-black text-white/30 uppercase mb-3 tracking-widest">Mecanismo: {selected.mechanism}</p>
                  <p className="text-[11px] text-white/80 leading-relaxed italic mb-6">"{selected.desc}"</p>
                  <button onClick={() => setSelected(null)} className="w-full py-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-[8px] font-black text-orange-500 uppercase hover:bg-orange-500 hover:text-black transition-all">Cerrar Detalle de Análisis</button>
               </motion.div>
             ) : (
               <div className="p-10 text-center border-2 border-dashed border-white/10 rounded-[2.5rem] opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                    Selecciona un nodo <br/> sobre la pulga para <br/> ver el mecanismo
                  </p>
               </div>
             )}
           </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}