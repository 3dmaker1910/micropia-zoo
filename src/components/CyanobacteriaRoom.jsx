import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OCEAN_BG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/8a3ca59d16d840366226d617be401263f6ec324c27d15154dc53008e500afa14.png';
const DOCTOR_NPC_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

function makeBubble(id, x, y) {
  return { id, x, y, size: 4 + Math.random() * 10, duration: 2 + Math.random() * 3, opacity: 0.6 };
}

export default function CyanobacteriaRoom({ onNavigate }) {
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [reportText, setReportText] = useState('');
  
  // TEORÍA EXPUESTA - INFORME TÉCNICO
  const fullReport = "PROTOCOLO PRIMER ALIENTO: Las Cianobacterias son las bio-ingenieras que 'inventaron' la fotosíntesis oxigénica. Durante el Arcaico, saturaron los océanos de O2 hasta que este escapó a la atmósfera. Este evento, el Gran Evento de Oxidación, causó una extinción masiva de microbios anaerobios pero permitió que surgiera la vida compleja. Hoy respiras gracias a esta matriz primitiva.";

  const addOxygen = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setOxygenLevel(prev => Math.min(prev + 4, 100));
    setBubbles(prev => [...prev.slice(-20), makeBubble(Date.now(), x, y)]);
  };

  useEffect(() => {
    if (oxygenLevel > 0 && reportText.length < fullReport.length) {
      const timer = setTimeout(() => {
        setReportText(fullReport.slice(0, reportText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [oxygenLevel, reportText]);

  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative font-sans transition-colors duration-[3000ms]"
      style={{ 
        background: oxygenLevel < 50 
          ? 'radial-gradient(circle, #2e1065 0%, #020617 100%)' // Púrpura/Oscuro tóxico
          : 'radial-gradient(circle, #0c4a6e 0%, #020617 100%)'  // Azul Eléctrico Oxigenado
      }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* FONDO GRÁFICO - OCÉANO PRIMORDIAL */}
      <img src={OCEAN_BG} alt="Oceano Primordial" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />

      {/* HUD DE OXIGENACIÓN */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-10">
        <div className="flex justify-between text-[11px] font-black tracking-widest text-cyan-400 mb-2 uppercase">
          <span>Nivel de O₂ Atmosférico</span>
          <span className="italic">{oxygenLevel}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white"
            animate={{ width: `${oxygenLevel}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full p-8 pt-32 gap-12 items-center justify-center">
        
        {/* ÁREA DE INTERACCIÓN - ESTROMATÓLITOS */}
        <div className="flex-1 relative w-full h-[450px] flex items-end justify-around">
          {bubbles.map(b => (
            <motion.div key={b.id} className="absolute rounded-full bg-cyan-200/60 shadow-[0_0_10px_cyan]"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size }}
              animate={{ y: -600, opacity: 0, scale: 2 }} transition={{ duration: b.duration }}
            />
          ))}
          
          {[1, 2, 3].map(i => (
            <motion.button key={i} onClick={addOxygen} whileTap={{ scale: 0.8 }}
              className="group relative flex flex-col items-center">
              <div className="w-28 h-28 bg-gradient-to-b from-slate-800 to-cyan-950 border-4 border-cyan-900/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-cyan-400 transition-all">
                 <span className="text-5xl drop-shadow-lg">🪨</span>
              </div>
              <p className="mt-4 text-[9px] font-black text-cyan-500/50 tracking-widest uppercase opacity-0 group-hover:opacity-100">Producir O₂</p>
            </motion.button>
          ))}
          <p className="absolute top-0 text-[10px] font-black text-white/10 uppercase tracking-[0.5em] text-center w-full">Toca las colonias para iniciar la oxigenación</p>
        </div>

        {/* CONSOLA DEL DOCTOR - TEORÍA */}
        <div className="w-full md:w-[450px] flex flex-col">
           <div className="p-8 rounded-[3rem] bg-black/80 border-2 border-cyan-500/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                 <img src={DOCTOR_NPC_URL} alt="Doc" className="w-24 h-24 object-contain drop-shadow-[0_0_15px_cyan]" />
              </div>
              <h3 className="text-cyan-400 font-black text-[10px] uppercase mb-4 text-center tracking-[0.3em] mt-8">Bitácora: El Origen de la Vida</h3>
              <div className="h-px bg-cyan-500/20 mb-4" />
              <p className="text-[12px] text-white/80 leading-relaxed font-mono min-h-[160px] italic">
                {reportText}
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
              </p>
           </div>
           <button onClick={() => onNavigate('hall')} className="w-full mt-8 py-4 rounded-3xl bg-cyan-600 text-black font-black tracking-widest uppercase hover:bg-cyan-400 transition-all text-[10px]">◀ Regresar al Pabellón</button>
        </div>
      </div>

      <AnimatePresence>
        {oxygenLevel >= 100 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-cyan-400">
             <div className="text-center">
                <h2 className="text-6xl font-black italic uppercase leading-none text-black mb-4 tracking-tighter">¡Misión Cumplida!</h2>
                <p className="text-xl font-black text-black/60 uppercase tracking-widest">La Tierra es ahora un planeta azul</p>
                <button onClick={() => setOxygenLevel(0)} className="mt-10 px-12 py-4 bg-black text-white rounded-full font-black uppercase text-sm shadow-2xl hover:scale-105 transition-all">Reiniciar Proceso</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}