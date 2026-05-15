import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import SecurityGuard from './SecurityGuard';

const ACCESS_PANEL_ROOMS = [
  { id: 'mission', name: 'Misión Hantavirus', icon: '🚢', desc: 'Investigación en Ushuaia' },
  { id: 'vectors', name: 'Sala de la Pulga', icon: '🪳', desc: 'Vectores Biológicos' },
  { id: 'bodyscan', name: 'Escáner Corporal', icon: '🔬', desc: 'Auditoría Humana' },
  { id: 'cyanobacteria', name: 'Primer Aliento', icon: '🌍', desc: 'Isla de Oxigenación' },
  { id: 'autofagia', name: 'Sala de Autofagia', icon: '♻️', desc: 'Reciclaje Celular' },
  { id: 'conan', name: 'Unidad Conan', icon: '☢️', desc: 'Resistencia Extrema' },
  { id: 'holobionte', name: 'El Holobionte', icon: '🤰', desc: 'Evolución Humana' },
  { id: 'probioticos', name: 'Superhéroes VIP', icon: '🦸‍♂️', desc: 'Sala de Probióticos' },
];

export default function ContainmentHall({ onGoToHub, onGoToMap, onNavigate }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);
  const [showAccessPanel, setShowAccessPanel] = useState(false);

  const handleTerminalLink = (targetId) => {
    onNavigate(targetId);
    setShowAccessPanel(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Main UI Controls */}
      <div className="absolute top-6 left-8 z-40 flex flex-col gap-4">
        <button onClick={onGoToHub} className="px-6 py-2 bg-green-900/20 border border-green-500/40 rounded-full text-[10px] font-black tracking-widest text-green-400 hover:bg-green-500 hover:text-black transition-all shadow-lg">◀ OFICINA DRA. MICRA</button>
        <button onClick={onGoToMap} className="px-6 py-2 bg-blue-900/20 border border-blue-500/40 rounded-full text-[10px] font-black tracking-widest text-blue-400 hover:bg-blue-500 hover:text-black transition-all shadow-lg">🌐 MAPA DE INTELIGENCIA</button>
      </div>

      {/* BOTÓN TERMINAL DE SALAS */}
      <div className="absolute top-6 right-8 z-50">
        <motion.button 
          onClick={() => setShowAccessPanel(!showAccessPanel)}
          whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(255,100,0,0.6)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="px-10 py-5 bg-orange-600 border-2 border-orange-400 rounded-full text-xs font-black tracking-widest text-black shadow-[0_0_30px_rgba(255,100,0,0.4)] hover:bg-orange-500 transition-all uppercase"
        >
          {showAccessPanel ? '✕ CERRAR UNIDAD' : '📂 TERMINAL DE SALAS'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-8 w-85 bg-black/95 border-2 border-orange-500/40 backdrop-blur-3xl rounded-[3rem] p-8 z-[60] shadow-[0_0_100px_rgba(0,0,0,1)]"
          >
            <h3 className="text-orange-500 font-black tracking-tighter uppercase italic mb-8 border-b border-orange-500/20 pb-4 text-center">Control de Accesos Micropia</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => handleTerminalLink(room.id)}
                  className="w-full flex items-center gap-5 p-4 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-orange-500/20 hover:border-orange-500/40 transition-all text-left group"
                >
                  <span className="text-3xl filter group-hover:scale-125 transition-transform">{room.icon}</span>
                  <div>
                    <p className="text-[11px] font-black text-white group-hover:text-orange-400">{room.name.toUpperCase()}</p>
                    <p className="text-[8px] text-white/40 uppercase tracking-[0.2em]">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hall Samples */}
      <div className="h-screen flex items-center justify-center p-10 pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-8 md:gap-16 items-center justify-center">
          {microbes.map((m) => (
            <div key={m.id} className="relative">
              <ContainmentTube microbe={m} onClick={() => setSelectedMicrobe(m)} />
            </div>
          ))}
        </div>
        <SecurityGuard />
      </div>

      <AnimatePresence>
        {selectedMicrobe && <MicrobeCard microbe={selectedMicrobe} onClose={() => setSelectedMicrobe(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}