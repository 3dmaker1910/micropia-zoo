import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BodyScanner({ onNavigate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const calculateMass = () => {
    const w = parseFloat(weight);
    if (isNaN(w)) return;

    setIsScanning(true);
    setTimeout(() => {
      const bone = 15;
      const visceral = 20;
      const muscle = 40;
      const fats = 23;
      const microbiome = 2; // Fixed approx percentage for impact
      
      setResults({
        bone: (w * 0.15).toFixed(1),
        visceral: (w * 0.20).toFixed(1),
        muscle: (w * 0.40).toFixed(1),
        microbiome: (w * 0.02).toFixed(2),
        percentages: {
          bacteria: 90,
          virus: 5,
          fungi: 3,
          others: 2
        }
      });
      setIsScanning(false);
    }, 2500);
  };

  return (
    <motion.div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-6xl mx-auto flex flex-col h-full">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔬</span>
            <h1 className="text-2xl font-black italic uppercase text-green-500 tracking-tighter">Escáner de Auditoría Biológica</h1>
          </div>
          <button onClick={() => onNavigate('hall')} className="px-8 py-2 bg-white/5 border border-white/20 rounded-full text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">◀ SALIR AL PABELLÓN</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-1">
          {/* LEFT: INPUTS */}
          <div className="space-y-8 bg-neutral-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-green-400 mb-6">Ingreso de Parámetros de Huésped</h2>
            <div className="space-y-6">
              <div className="relative">
                <label className="absolute -top-2 left-6 bg-[#0a0a0a] px-2 text-[9px] font-black text-green-500/60 uppercase">Peso Corporal (KG)</label>
                <input 
                  type="text" inputMode="decimal" placeholder="Ej: 75"
                  value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full bg-transparent border-2 border-white/10 p-5 rounded-3xl text-3xl font-black text-white focus:border-green-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <label className="absolute -top-2 left-6 bg-[#0a0a0a] px-2 text-[9px] font-black text-green-500/60 uppercase">Estatura / Talla (CM)</label>
                <input 
                  type="text" inputMode="decimal" placeholder="Ej: 180"
                  value={height} onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full bg-transparent border-2 border-white/10 p-5 rounded-3xl text-3xl font-black text-white focus:border-green-500 outline-none transition-all"
                />
              </div>
              <button 
                onClick={calculateMass} 
                className="w-full py-6 bg-green-500 text-black font-black text-sm uppercase tracking-[0.2em] rounded-[2rem] hover:bg-green-400 shadow-[0_0_50px_rgba(34,197,94,0.3)] transition-all active:scale-95"
              >
                {isScanning ? 'ANALIZANDO BIO-DATOS...' : 'EJECUTAR ESCANEO TOTAL'}
              </button>
            </div>
          </div>

          {/* RIGHT: VISUAL RESULTS */}
          <div className="relative h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} className="text-[20rem] select-none">🧍</motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                  {/* MAIN BARS - VISUAL IMPACT */}
                  <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h3 className="text-xs font-black text-green-500 uppercase mb-8 tracking-widest text-center italic">Resultados del Análisis de Masa</h3>
                    
                    <div className="space-y-6">
                       {[ 
                         { label: 'Masa Ósea', val: results.bone, per: 15, col: '#fff' },
                         { label: 'Masa Muscular', val: results.muscle, per: 40, col: '#22c55e' },
                         { label: 'Masa Visceral', val: results.visceral, per: 20, col: '#facc15' },
                         { label: 'Zoo Invisible', val: results.microbiome, per: 2, col: '#ef4444' },
                       ].map((item, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                               <span style={{ color: item.col }}>{item.label}</span>
                               <span>{item.val} kg ({item.per}%)</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }} 
                                 animate={{ width: `${item.per}%` }} 
                                 transition={{ delay: 0.5 + (i * 0.1), duration: 1.5 }}
                                 className="h-full" 
                                 style={{ background: item.col, boxShadow: `0 0 15px ${item.col}50` }}
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* MICROBIOME BREAKDOWN - IMPACTFUL GRID */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 rounded-[2rem] bg-red-950/20 border border-red-500/30 text-center">
                        <p className="text-[9px] font-black text-red-500/60 uppercase mb-2">Carga Viral</p>
                        <p className="text-3xl font-black text-red-500">5%</p>
                        <p className="text-[8px] opacity-40">Vigilancia Nivel 4</p>
                     </div>
                     <div className="p-6 rounded-[2rem] bg-green-950/20 border border-green-500/30 text-center">
                        <p className="text-[9px] font-black text-green-500/60 uppercase mb-2">Bacterias</p>
                        <p className="text-3xl font-black text-green-400">90%</p>
                        <p className="text-[8px] opacity-40">Symbiotas Activos</p>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 text-center opacity-10">
           <p className="text-[8px] font-black tracking-[1em] uppercase">Bio-Audit Unit • Nando-1910 • BSL-4 Certified</p>
        </div>
      </div>
    </motion.div>
  );
}