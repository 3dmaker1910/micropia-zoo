import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bodyZones = [
  { id: 'brain', name: 'Cerebro', icon: '🧠', color: '#a855f7', position: { top: '8%', left: '50%' }, threats: ['Rabia', 'Priones'], factoid: 'La barrera hematoencefálica es tu escudo final.' },
  { id: 'lungs', name: 'Pulmones', icon: '🫁', color: '#ef4444', position: { top: '28%', left: '50%' }, threats: ['Peste Neumónica', 'Hantavirus'], factoid: '70m² de superficie listos para ser infectados.' },
  { id: 'blood', name: 'Sangre', icon: '🩸', color: '#dc2626', position: { top: '36%', left: '55%' }, threats: ['Ébola', 'VIH'], factoid: '96,000 km de vasos para colonizar el cuerpo.' },
  { id: 'stomach', name: 'Estómago', icon: '🫃', color: '#06b6d4', position: { top: '42%', left: '47%' }, threats: ['Cólera', 'Salmonella'], factoid: 'Ácido gástrico: la primera línea de fuego.' },
  { id: 'intestines', name: 'Intestinos', icon: '🦠', color: '#22c55e', position: { top: '52%', left: '52%' }, threats: ['E. coli', 'C. difficile'], factoid: '39 billones de aliados en equilibrio precario.' },
  { id: 'skin', name: 'Piel', icon: '🧬', color: '#f59e0b', position: { top: '22%', left: '38%' }, threats: ['Viruela', 'Estafilococo'], factoid: '1 millón de microbios por cada cm².' },
];

export default function BodyScanner({ onNavigate }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [scanPhase, setScanPhase] = useState('idle');
  const [scanY, setScanY] = useState(0);

  const startScan = () => { setScanPhase('scanning'); setScanY(0); };

  useEffect(() => {
    if (scanPhase === 'scanning') {
      const interval = setInterval(() => {
        setScanY(p => {
          if (p >= 100) { clearInterval(interval); setScanPhase('complete'); return 100; }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scanPhase]);

  return (
    <motion.div className="min-h-screen bg-slate-950 text-white p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-white/5 pb-4">
        <h2 className="text-xl font-black text-green-500 italic uppercase tracking-tighter">Escáner de Vulnerabilidad</h2>
        <button onClick={() => onNavigate('hall')} className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest">◀ VOLVER</button>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-20">
        {/* SILUETA MÁS GRANDE (+4cm) */}
        <div className="relative w-80 h-[600px] border-2 border-white/5 rounded-[4rem] bg-black/40 shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-[18rem] opacity-10 grayscale select-none">🧍</div>
          
          {scanPhase === 'scanning' && (
            <motion.div className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_30px_#22c55e] z-10"
              style={{ top: `${scanY}%` }} />
          )}

          {bodyZones.map(zone => (
            <motion.button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className="absolute w-12 h-12 rounded-full border-2 flex items-center justify-center z-20"
              style={{ top: zone.position.top, left: zone.position.left, borderColor: zone.color, background: `${zone.color}20` }}
              whileHover={{ scale: 1.2 }}
            >
              <span className="text-xl">{zone.icon}</span>
            </motion.button>
          ))}
        </div>

        <div className="w-full max-w-sm">
           {selectedZone ? (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-[3rem] bg-white/5 border border-white/10">
               <h3 className="text-2xl font-black mb-2" style={{ color: selectedZone.color }}>{selectedZone.name}</h3>
               <p className="text-sm text-white/60 mb-6">{selectedZone.factoid}</p>
               <div className="space-y-2">
                 {selectedZone.threats.map((t, i) => (
                   <div key={i} className="p-3 bg-red-950/20 border border-red-500/20 rounded-2xl text-xs font-bold text-red-400">⚠ {t}</div>
                 ))}
               </div>
             </motion.div>
           ) : (
             <div className="text-center">
                <button onClick={startScan} className="px-10 py-4 bg-green-600 rounded-full font-black text-black tracking-widest hover:bg-green-400">INICIAR ANÁLISIS</button>
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}