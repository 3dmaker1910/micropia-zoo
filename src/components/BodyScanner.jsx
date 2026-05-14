import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BodyScanner({ onNavigate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const calculateMass = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    setIsScanning(true);
    setTimeout(() => {
      const bone = (w * 0.15).toFixed(1);
      const visceral = (w * 0.20).toFixed(1);
      const muscle = (w * 0.40).toFixed(1);
      const microbiome = (w * 0.02).toFixed(2);
      
      setResults({
        bone, visceral, muscle, microbiome,
        breakdown: {
          bacteria: (microbiome * 0.90).toFixed(2),
          virus: (microbiome * 0.05).toFixed(3),
          fungi: (microbiome * 0.03).toFixed(3),
          parasites: (microbiome * 0.02).toFixed(3)
        }
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <motion.div className="min-h-screen bg-black text-white p-6 font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-xl font-black italic uppercase text-green-500">Escáner de Vulnerabilidad Humana</h1>
          <button onClick={() => onNavigate('hall')} className="text-[10px] font-black text-white/40 uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">◀ VOLVER</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-400">Registro de Biometría</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-2">Peso Actual (kg)</label>
                <input 
                  type="text"
                  inputMode="decimal"
                  placeholder="Escribe tu peso..."
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} 
                  className="w-full bg-black border-2 border-green-500/20 p-4 rounded-2xl text-green-400 font-bold text-2xl focus:border-green-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-2">Talla / Estatura (cm)</label>
                <input 
                  type="text"
                  inputMode="decimal"
                  placeholder="Escribe tu talla..."
                  value={height} 
                  onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))} 
                  className="w-full bg-black border-2 border-green-500/20 p-4 rounded-2xl text-green-400 font-bold text-2xl focus:border-green-500 outline-none transition-all"
                />
              </div>
              <button onClick={calculateMass} className="w-full py-5 bg-green-600 rounded-2xl font-black text-black uppercase tracking-[0.2em] hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all">{isScanning ? 'ANALIZANDO MATRIZ...' : 'INICIAR AUDITORÍA BIOLÓGICA'}</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {results ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                  <h3 className="text-xs font-bold text-green-500 uppercase mb-4 tracking-widest">Composición de Masa Estimada</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-black/60 rounded-2xl border border-white/5"><p className="text-[9px] text-white/30 uppercase">ÓSEA</p><p className="text-lg font-black">{results.bone} kg</p></div>
                    <div className="p-4 bg-black/60 rounded-2xl border border-white/5"><p className="text-[9px] text-white/30 uppercase">VISCERAL</p><p className="text-lg font-black">{results.visceral} kg</p></div>
                    <div className="p-4 bg-black/60 rounded-2xl border border-white/5"><p className="text-[9px] text-white/30 uppercase">MUSCULAR</p><p className="text-lg font-black">{results.muscle} kg</p></div>
                    <div className="p-4 bg-green-900/20 rounded-2xl border border-green-500/30"><p className="text-[9px] text-green-400/60 uppercase">ZOO INVISIBLE</p><p className="text-lg font-black text-green-400">{results.microbiome} kg</p></div>
                  </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-red-950/20 border-2 border-red-500/30 shadow-2xl">
                  <h3 className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">Desglose del Zoo Personal</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs"><span>Bacterias Symbiotas</span><span className="font-black text-green-400">{results.breakdown.bacteria} kg</span></div>
                    <div className="flex justify-between items-center text-xs"><span>Carga Viral</span><span className="font-black text-red-400">{results.breakdown.virus} kg</span></div>
                    <div className="flex justify-between items-center text-xs"><span>Hongos y Levaduras</span><span className="font-black text-yellow-400">{results.breakdown.fungi} kg</span></div>
                    <div className="flex justify-between items-center text-xs"><span>Parásitos Endógenos</span><span className="font-black text-purple-400">{results.breakdown.parasites} kg</span></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 opacity-20 border-2 border-dashed border-white/10 rounded-[3rem]">
                 <span className="text-6xl mb-4">⚖️</span>
                 <p className="text-xs font-black uppercase tracking-[0.3em] text-center">Aguardando Datos <br/> de Entrada</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}