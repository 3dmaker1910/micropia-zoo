import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BIO_BG = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop';

const BiofilmCluster = ({ id, x, y, size, color }) => {
  const [active, setActive] = useState(false);
  return (
    <motion.div className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: `radial-gradient(circle, ${color}60, transparent 70%)`, borderRadius: '40% 60% 50% 50%', filter: 'blur(10px)' }}
      animate={{ scale: active ? 1.5 : [1, 1.1, 1], rotate: active ? 180 : 0 }}
      onClick={() => setActive(!active)}
    />
  );
};

export default function BiotecnofilosRoom({ onNavigate }) {
  return (
    <motion.div className="min-h-screen bg-black text-white overflow-hidden relative font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={BIO_BG} alt="Matrix" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-transparent to-black" />

      <div className="relative z-10 flex flex-col h-full p-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-purple-400 italic uppercase tracking-tighter">Sector Biotecnófilos</h1>
          <p className="text-xs text-white/30 tracking-[0.5em] uppercase mt-2">Biofilms • Inteligencia Colectiva Bacteriana</p>
        </header>

        <div className="flex-1 relative">
          <BiofilmCluster x={20} y={30} size={200} color="#a855f7" />
          <BiofilmCluster x={60} y={20} size={250} color="#d946ef" />
          <BiofilmCluster x={40} y={60} size={180} color="#8b5cf6" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
             <p className="text-2xl font-black text-white/10 uppercase tracking-[0.3em]">Interacción de Biofilm Detectada</p>
          </div>
        </div>

        <footer className="flex justify-center">
          <button onClick={() => onNavigate('hall')} className="px-10 py-3 bg-purple-600 rounded-full font-black text-[10px] tracking-widest hover:bg-purple-400 transition-all uppercase">◀ VOLVER AL PABELLÓN</button>
        </footer>
      </div>
    </motion.div>
  );
}