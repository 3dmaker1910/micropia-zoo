import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AQUATIC_BG = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2034&auto=format&fit=crop';
const DOCTOR_NPC_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

function makeBubble(id, x, y) {
  return { id, x, y, size: 4 + Math.random() * 10, duration: 3 + Math.random() * 3, opacity: 0.4 + Math.random() * 0.4 };
}

export default function CyanobacteriaRoom({ onNavigate }) {
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [reportText, setReportText] = useState('');
  const [isAtmosphereBlue, setIsAtmosphereBlue] = useState(false);

  const fullReport = "INFORME TÉCNICO: Las Cianobacterias son los ingenieros más antiguos del planeta. Hace 3,500 millones de años, mediante la fotosíntesis, comenzaron a liberar Oxígeno (O2) como residuo. Este 'residuo' transformó la atmósfera venenosa de la Tierra en una respirable, permitiendo la existencia de animales y humanos. ¡Sin ellas, no estaríamos aquí!";

  const addOxygen = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setOxygenLevel(prev => Math.min(prev + 5, 100));
    setBubbles(prev => [...prev.slice(-15), makeBubble(Date.now(), x, y)]);
  };

  useEffect(() => {
    if (oxygenLevel > 0 && reportText.length < fullReport.length) {
      const timer = setTimeout(() => {
        setReportText(fullReport.slice(0, reportText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
    if (oxygenLevel >= 100) setIsAtmosphereBlue(true);
  }, [oxygenLevel, reportText]);

  return (
    <motion.div className="min-h-screen transition-colors duration-[4000ms] overflow-hidden relative font-sans"
      style={{ background: isAtmosphereBlue ? '#0c4a6e' : '#020617' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={AQUATIC_BG} alt="Oceano" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
      
      {/* HUD de Oxigenación */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6">
        <div className="flex justify-between text-[10px] font-black tracking-widest text-cyan-400 mb-2 uppercase">
          <span>Saturación de O₂ Atmosférico</span>
          <span>{oxygenLevel}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div className="h-full bg-cyan-400 shadow-[0_0_15px_cyan]" animate={{ width: `${oxygenLevel}%` }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full p-8 pt-24 gap-10 items-center justify-center">
        
        {/* Área de Juego / Estromatólitos */}
        <div className="flex-1 relative w-full h-[400px] bg-cyan-900/5 rounded-[3rem] border border-white/5 flex items-center justify-around">
          {bubbles.map(b => (
            <motion.div key={b.id} className="absolute rounded-full bg-cyan-200/40"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size, filter: 'blur(2px)' }}
              animate={{ y: -500, opacity: 0 }} transition={{ duration: b.duration }}
            />
          ))}
          
          {[1, 2, 3].map(i => (
            <motion.button key={i} onClick={addOxygen} whileTap={{ scale: 0.9 }}
              className="w-24 h-24 bg-gradient-to-t from-slate-900 to-cyan-900 border-4 border-cyan-800 rounded-full flex items-center justify-center shadow-2xl hover:border-cyan-400 transition-all">
              <span className="text-4xl">🪨</span>
            </motion.button>
          ))}
          <p className="absolute bottom-10 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Toca los estromatólitos para fotosintetizar</p>
        </div>

        {/* Informe del Doctor */}
        <div className="w-full md:w-96 flex flex-col gap-6">
           <div className="p-6 rounded-[2.5rem] bg-black/60 border-2 border-cyan-500/30 backdrop-blur-xl shadow-2xl relative">
              <img src={DOCTOR_NPC_URL} alt="Doc" className="w-20 h-24 object-contain mx-auto mb-4 drop-shadow-[0_0_10px_cyan]" />
              <h3 className="text-cyan-400 font-black text-xs uppercase mb-3 text-center border-b border-cyan-500/20 pb-2">Reporte: El Gran Evento de Oxidación</h3>
              <p className="text-[11px] text-white/80 leading-relaxed font-mono min-h-[120px]">
                {reportText}
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
              </p>
           </div>

           <button onClick={() => onNavigate('hall')} className="w-full py-4 rounded-2xl bg-cyan-600 text-black font-black tracking-widest uppercase hover:bg-cyan-400 transition-all text-xs">◀ Regresar al Pabellón</button>
        </div>
      </div>

      <AnimatePresence>
        {isAtmosphereBlue && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-cyan-500/10 backdrop-blur-md">
             <div className="bg-cyan-400 text-black p-10 rounded-[4rem] text-center shadow-[0_0_100px_cyan]">
                <h2 className="text-4xl font-black italic uppercase leading-none mb-4">¡Planeta Oxigenado!</h2>
                <p className="text-sm font-bold uppercase tracking-widest">Has completado el Primer Aliento de la Tierra.</p>
                <button onClick={() => setIsAtmosphereBlue(false)} className="mt-8 px-10 py-3 bg-black text-white rounded-full font-black uppercase text-[10px]">Continuar</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}