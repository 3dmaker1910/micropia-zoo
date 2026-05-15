import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const BG_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/06fa8f97af08ee025db5d82a54adb7549fb23f0e1581fc9bda74418f304e52b7.png';
const DOCTOR_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/913e4f510624c20204864a2009b0a380c9eba22e637d8db4dc5bd1d55e858800.png';

export default function FluRoom({ onNavigate, onComplete }) {
  const [phase, setPhase] = useState('intro');
  const { speak, stop, speaking } = useSpeech();

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      const script = "Nando, bienvenido a mil novecientos dieciocho. Esta es la Misión: El Virus del Hielo. La Gripe Española fue la pandemia más devastadora de la era moderna. Pero lo más increíble es cómo la ciencia la rastreó décadas después. En Alaska, enterrada en el hielo del permafrost, se encontró el cuerpo de una mujer inuit que aún portaba el virus. Gracias a ese hielo, pudimos recuperar su código genético y entender por qué fue tan mortal. ¡Has desbloqueado el Parche del Virus del Hielo!";
      speak(script);
      onComplete();
    }
  };

  return (
    <motion.div className="min-h-screen bg-black text-white overflow-hidden relative font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={BG_IMG} alt="Spanish Flu 1918" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-black" />

      <div className="relative z-10 flex flex-col h-full p-6 md:p-12 items-center justify-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-blue-400 italic uppercase tracking-tighter">El Virus del Hielo</h1>
          <p className="text-xs text-blue-200/50 tracking-[0.4em] uppercase mt-2">Expediente 1918 • Gripe Española</p>
        </header>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
           <div className="p-8 rounded-[3rem] bg-black/70 border-2 border-blue-500/20 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black text-blue-400 uppercase italic mb-4">Misión de Rescate Genético</h2>
              <p className="text-sm leading-relaxed text-white/80 mb-6 font-medium">
                "En el permafrost de Alaska, el tiempo se detuvo. Un equipo de científicos desenterró un secreto mortal para salvarnos del futuro."
              </p>
              
              <div className="space-y-4">
                 <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Localización</p>
                    <p className="text-xs text-white/60">Brevig Mission, Alaska. Círculo Polar Ártico.</p>
                 </div>
                 <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">El Hallazgo</p>
                    <p className="text-xs text-white/60">Pulmones preservados en hielo desde hace más de 100 años.</p>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <motion.div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
                <img src={DOCTOR_IMG} alt="Doc" className="w-40 h-48 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              </div>
              
              <button 
                onClick={handleSpeak}
                className={`px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${speaking ? 'bg-red-600 animate-pulse' : 'bg-blue-500 text-black hover:bg-blue-400'}`}
              >
                {speaking ? '■ Detener Informe' : '🔊 Escuchar al Doctor'}
              </button>
           </div>
        </div>

        <button onClick={() => onNavigate('hall')} className="mt-12 text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest">◀ REGRESAR AL PABELLÓN</button>
      </div>
    </motion.div>
  );
}