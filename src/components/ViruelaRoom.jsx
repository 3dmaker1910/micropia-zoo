import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const BG_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/8baa0d0549b39c77309b545347f1bc055594684f52327961d5b5dc4037b78088.png';

export default function ViruelaRoom({ onNavigate, onComplete }) {
  const { speak, stop, speaking } = useSpeech();

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      const script = "Nando, estás ante el Rey de las Cicatrices: la Viruela. Esta fue la pesadilla de la humanidad por siglos, matando a tres de cada diez personas infectadas. Pero aquí ocurrió el milagro más grande de la medicina. En mil setecientos noventa y seis, Edward Jenner observó que las recolectoras de leche no se enfermaban. ¡Así nació la primera vacuna de la historia! Gracias a un esfuerzo global masivo, la viruela es la única enfermedad humana erradicada por completo de la faz de la tierra. ¡Has ganado el Parche de la Corona de la Victoria!";
      speak(script);
      onComplete();
    }
  };

  return (
    <motion.div className="min-h-screen bg-black text-white overflow-hidden relative font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={BG_IMG} alt="Smallpox King" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-black" />

      <div className="relative z-10 flex flex-col h-full p-6 md:p-12 items-center justify-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-purple-400 italic uppercase tracking-tighter shadow-2xl">La Corona de la Muerte</h1>
          <p className="text-xs text-purple-200/50 tracking-[0.4em] uppercase mt-2">Expediente Variola • La Primera Victoria</p>
        </header>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="relative flex justify-center">
              <motion.div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
              <img src={BG_IMG} alt="Smallpox" className="w-full aspect-square object-contain rounded-full border-4 border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.4)]" />
           </div>

           <div className="p-10 rounded-[3rem] bg-black/80 border-2 border-purple-500/30 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black text-purple-400 uppercase italic mb-4">El Milagro de Jenner</h2>
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                "La viruela mató a 300 millones de personas solo en el siglo veinte. Hoy, no existe ni un solo caso en el mundo gracias a la ciencia."
              </p>
              <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-2xl mb-6">
                 <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Estado Global</p>
                 <p className="text-xs text-white/60">ERRADICADA EN 1980.</p>
              </div>
              
              <button 
                onClick={handleSpeak}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${speaking ? 'bg-red-600 animate-pulse' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
              >
                {speaking ? '■ Detener Historia' : '🔊 Hablar con la Dra. Micra'}
              </button>
           </div>
        </div>

        <button onClick={() => onNavigate('hall')} className="mt-12 text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest">◀ REGRESAR AL PABELLÓN</button>
      </div>
    </motion.div>
  );
}