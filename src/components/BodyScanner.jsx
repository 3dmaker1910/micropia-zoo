import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BodyScanner({ onNavigate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const calculateMass = () => {
    if (!weight || !height) return;
    setIsScanning(true);
    setTimeout(() => {
      const w = parseFloat(weight);
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
          <button onClick={() => onNavigate('hall')} className="text-[10px] font-black text-white/40 uppercase">◀ SALIR</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-400">Registro de Biometría</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-2">Ingresa tu Peso (kg)</label>
                <input 
                  type="number" 
                  placeholder="Ej: 75" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  className="w-full bg-black border-2 border-green-500/20 p-4 rounded-2xl text-green-400 font-bold text-xl focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-white/40 mb-2">Ingresa tu Talla (cm)</label>
                <input 
                  type="number" 
                  placeholder="Ej: 175" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className="w-full bg-black border-2 border-green-500/20 p-4 rounded-2xl text-green-400 font-bold text-xl focus:border-green-500 outline-none"
                />
              </div>
              <button onClick={calculateMass} className="w-full py-4 bg-green-600 rounded-2xl font-black text-black uppercase tracking-widest hover:bg-green-400">{isScanning ? 'ANALIZANDO...' : 'INICIAR AUDITORÍA BIOLÓGICA'}</button>
            </div>
          </div>

          <AnimatePresence>
            {results && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                  <h3 className="text-xs font-bold text-green-500 uppercase mb-4">Composición Estimada</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-black rounded-xl border border-white/5"><p className="text-[8px] text-white/30">ÓSEA</p><p className="font-bold">{results.bone} kg</p></div>
                    <div className="p-3 bg-black rounded-xl border border-white/5"><p className="text-[8px] text-white/30">VISCERAL</p><p className="font-bold">{results.visceral} kg</p></div>
                    <div className="p-3 bg-black rounded-xl border border-white/5"><p className="text-[8px] text-white/30">MUSCULAR</p><p className="font-bold">{results.muscle} kg</p></div>
                    <div className="p-3 bg-green-950/20 rounded-xl border border-green-500/20"><p className="text-[8px] text-green-400/60">ZOO INVISIBLE</p><p className="font-bold text-green-400">{results.microbiome} kg</p></div>
                  </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-red-950/10 border border-red-500/20">
                  <h3 className="text-[10px] font-black text-red-500 uppercase mb-3">Desglose del Zoo Personal</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px]"><span>Bacterias</span><span className="font-bold text-green-400">{results.breakdown.bacteria} kg</span></div>
                    <div className="flex justify-between text-[10px]"><span>Virus</span><span className="font-bold text-red-400">{results.breakdown.virus} kg</span></div>
                    <div className="flex justify-between text-[10px]"><span>Hongos</span><span className="font-bold text-yellow-400">{results.breakdown.fungi} kg</span></div>
                    <div className="flex justify-between text-[10px]"><span>Parásitos</span><span className="font-bold text-purple-400">{results.breakdown.parasites} kg</span></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}