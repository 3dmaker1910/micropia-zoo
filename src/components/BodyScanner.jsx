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
      setResults({
        bone: (w * 0.15).toFixed(1),
        visceral: (w * 0.20).toFixed(1),
        muscle: (w * 0.40).toFixed(1),
        microbiome: (w * 0.02).toFixed(2),
        bacteria: (w * 0.02 * 0.90).toFixed(2),
        virus: (w * 0.02 * 0.05).toFixed(3),
      });
      setIsScanning(false);
    }, 2500);
  };

  return (
    <motion.div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-6xl mx-auto flex flex-col min-h-screen">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">Bio-Scanner Humano v11.5</h1>
          <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">◀ SALIR</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1 items-center">
          
          {/* LEFT: INPUTS (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-neutral-900/60 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
               <p className="text-[9px] font-black text-green-500/60 uppercase mb-4 tracking-widest">Sincronización Biométrica</p>
               <div className="space-y-4">
                  <input 
                    type="text" inputMode="decimal" placeholder="PESO (KG)"
                    value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full bg-black border border-white/10 p-4 rounded-2xl text-xl font-black focus:border-green-500 outline-none transition-all"
                  />
                  <input 
                    type="text" inputMode="decimal" placeholder="TALLA (CM)"
                    value={height} onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full bg-black border border-white/10 p-4 rounded-2xl text-xl font-black focus:border-green-500 outline-none transition-all"
                  />
                  <button 
                    onClick={calculateMass} 
                    className="w-full py-4 bg-green-600 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-green-400 shadow-lg transition-all active:scale-95"
                  >
                    {isScanning ? 'ANALIZANDO...' : 'INICIAR ESCANEO'}
                  </button>
               </div>
            </div>
          </div>

          {/* CENTER: THE HUMAN BODY DISPLAY (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-[1/2] flex items-center justify-center">
               {/* SILUETA HUMANA */}
               <div className="text-[25rem] md:text-[35rem] opacity-10 select-none grayscale transition-opacity duration-1000">
                  {isScanning ? '🧬' : '🧍'}
               </div>

               <AnimatePresence>
                  {results && (
                    <>
                      {/* DATA NODES OVER THE BODY */}
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-[10%] left-[60%] z-20">
                         <div className="bg-black/80 border border-green-500 p-3 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <p className="text-[8px] font-black text-green-500">M. ÓSEA</p>
                            <p className="text-lg font-black">{results.bone} kg</p>
                         </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[40%] left-[-10%] z-20">
                         <div className="bg-black/80 border border-yellow-500 p-3 rounded-2xl backdrop-blur-md">
                            <p className="text-[8px] font-black text-yellow-500 uppercase">M. Visceral</p>
                            <p className="text-lg font-black text-yellow-500">{results.visceral} kg</p>
                         </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="absolute top-[65%] left-[65%] z-20">
                         <div className="bg-black/80 border border-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <p className="text-[8px] font-black opacity-40">M. MUSCULAR</p>
                            <p className="text-lg font-black">{results.muscle} kg</p>
                         </div>
                      </motion.div>

                      {/* THE IMPACTFUL ZOO DATA (Lungs/Core) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ delay: 0.8, type: 'spring' }}
                        className="absolute top-[35%] left-[25%] z-30"
                      >
                         <div className="bg-red-600 p-5 rounded-[2rem] shadow-[0_0_50px_rgba(239,68,68,0.5)] border-2 border-white text-center">
                            <p className="text-[9px] font-black text-white uppercase tracking-widest">Zoo Invisible</p>
                            <p className="text-3xl font-black text-white leading-none">{results.microbiome} kg</p>
                            <div className="mt-2 h-0.5 w-full bg-white/30 rounded-full overflow-hidden">
                               <motion.div className="h-full bg-white" animate={{ x: [-40, 40] }} transition={{ repeat: Infinity, duration: 1 }} />
                            </div>
                         </div>
                      </motion.div>
                    </>
                  )}
               </AnimatePresence>

               {isScanning && (
                 <motion.div 
                    className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_#22c55e] z-10"
                    animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 1.5, repeat: Infinity }}
                 />
               )}
            </div>
          </div>

          {/* RIGHT: BREAKDOWN (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
             <AnimatePresence>
                {results && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                     <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Carga Viral</p>
                        <p className="text-4xl font-black">{results.virus} kg</p>
                        <p className="text-[8px] opacity-30 mt-2 italic">Vigilancia Nivel 4 Activa</p>
                     </div>
                     <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">Masa Bacteriana</p>
                        <p className="text-4xl font-black text-green-400">{results.bacteria} kg</p>
                        <p className="text-[8px] opacity-30 mt-2">Symbiotas en Equilibrio</p>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </div>

        <div className="pb-6 text-center opacity-10">
           <p className="text-[8px] font-black tracking-[1.5em] uppercase">Anatomía Digital • Registro Nando-1910</p>
        </div>

      </div>
    </motion.div>
  );
}