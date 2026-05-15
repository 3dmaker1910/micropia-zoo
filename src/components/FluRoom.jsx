import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const MAP_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/808e891e043f87b97626c935274c01a3a5ecd04c9251bc1726eadccdffe55749.png';

const QUESTIONS = [
  {
    id: 1,
    text: "¿Dónde se recuperó el virus congelado en el hielo?",
    options: ["Nueva York", "Alaska", "Madrid", "París"],
    correct: "Alaska",
    hint: "Brevig Mission, en el permafrost ártico."
  },
  {
    id: 2,
    text: "¿Dónde se cree que empezó el primer brote masivo?",
    options: ["Londres", "Barcelona", "Kansas, USA", "Tokio"],
    correct: "Kansas, USA",
    hint: "Camp Funston, marzo de 1918."
  },
  {
    id: 3,
    text: "¿A cuántas personas mató aproximadamente esta pandemia?",
    options: ["1 millón", "5 millones", "Más de 50 millones", "500 mil"],
    correct: "Más de 50 millones",
    hint: "Fue la pandemia más letal de la historia moderna."
  },
  {
    id: 4,
    text: "¿Por qué se llama Gripe 'Española'?",
    options: ["Empezó en Madrid", "España fue neutral y reportó la verdad", "El virus era de España", "Por el clima español"],
    correct: "España fue neutral y reportó la verdad",
    hint: "Otros países censuraron las noticias por la guerra."
  }
];

export default function FluRoom({ onNavigate, onComplete }) {
  const [step, setStep] = useState('briefing');
  const [qIdx, setQIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const { speak, stop, speaking } = useSpeech();

  const startMission = () => {
    setStep('map_quiz');
    speak("Nando, misión iniciada. Debes identificar las coordenadas y los datos históricos para ganar tu parche del Virus del Hielo.");
  };

  const handleAnswer = (opt) => {
    if (opt === QUESTIONS[qIdx].correct) {
      setPoints(p => p + 25);
      if (qIdx < QUESTIONS.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        setStep('victory');
        onComplete();
        speak("¡Excelente trabajo Detective Nando! Has recuperado el código del virus y ganado tu parche de honor.");
      }
    } else {
      speak("Incorrecto. Revisa tus archivos de inteligencia.");
    }
  };

  return (
    <motion.div className="min-h-screen bg-[#020617] text-white overflow-y-auto relative font-sans p-4 md:p-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={MAP_IMG} alt="Historical Map" className="fixed inset-0 w-full h-full object-cover opacity-20 grayscale" />
      
      <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto items-center">
        <header className="w-full flex justify-between items-center mb-8 border-b border-blue-500/20 pb-4">
          <h1 className="text-xl md:text-2xl font-black text-blue-400 italic uppercase">Misión: El Virus del Hielo</h1>
          <div className="flex gap-4">
            <div className="bg-blue-900/40 px-4 py-1 rounded-full border border-blue-500/30 text-[10px] font-bold hidden md:block">
               PUNTOS: <span className="text-blue-400">{points}</span>
            </div>
            <button onClick={() => onNavigate('hall')} className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">◀ REGRESAR</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 'briefing' && (
            <motion.div key="b" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-8">
               <div className="p-8 md:p-12 rounded-[3rem] bg-black/60 border-2 border-blue-500/30 backdrop-blur-xl shadow-2xl">
                  <h2 className="text-3xl font-black text-blue-400 uppercase mb-6">Dossier 1918: La Gripe Española</h2>
                  <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-6 italic">
                    "La pandemia más devastadora de la era moderna comenzó en Kansas en marzo de 1918. Se estima que mató a más de 50 millones de personas en todo el mundo."
                  </p>
                  <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-8">
                    "Lo más increíble es cómo la ciencia la rastreó décadas después. En Alaska, en la zona de Brevig Mission, se encontró el cuerpo de una mujer inuit congelada en el permafrost que aún portaba el virus. Gracias a ese hielo, pudimos recuperar su código genético."
                  </p>
                  <button onClick={startMission} className="w-full md:w-auto px-12 py-5 bg-blue-600 rounded-2xl font-black uppercase hover:bg-blue-400 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)]">INICIAR INVESTIGACIÓN</button>
               </div>
            </motion.div>
          )}

          {step === 'map_quiz' && (
            <motion.div key="q" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
               <div className="relative rounded-[3rem] overflow-hidden border-2 border-blue-500/20 shadow-2xl bg-black">
                  <img src={MAP_IMG} className="w-full h-auto" alt="Map" />
                  <motion.div className="absolute top-[18%] left-[10%] w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                  <motion.div className="absolute top-[32%] left-[24%] w-4 h-4 bg-yellow-500 rounded-full border border-white" />
               </div>

               <div className="space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
                    <p className="text-blue-400 font-black text-[10px] uppercase mb-2 tracking-[0.3em]">Pregunta {qIdx + 1} de {QUESTIONS.length}</p>
                    <h3 className="text-lg md:text-xl font-bold mb-8">{QUESTIONS[qIdx].text}</h3>
                    <div className="grid grid-cols-1 gap-3">
                       {QUESTIONS[qIdx].options.map(opt => (
                         <button key={opt} onClick={() => handleAnswer(opt)} 
                           className="w-full py-4 px-6 bg-blue-900/20 border border-blue-500/20 rounded-2xl text-left font-bold hover:bg-blue-500 hover:text-black transition-all">
                           {opt}
                         </button>
                       ))}
                    </div>
                  </div>
                  <p className="text-[9px] text-white/30 italic text-center">💡 Pista: {QUESTIONS[qIdx].hint}</p>
               </div>
            </motion.div>
          )}

          {step === 'victory' && (
            <motion.div key="v" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-6">
               <div className="text-8xl mb-4">❄️🏅</div>
               <h2 className="text-5xl font-black text-blue-400 italic uppercase">¡Misión Cumplida!</h2>
               <div className="p-8 bg-blue-600 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.5)] text-black font-black">
                  SCORE: 100/100 • PARCHE OBTENIDO
               </div>
               <button onClick={() => onNavigate('hall')} className="mt-8 px-12 py-4 bg-white text-black font-black uppercase rounded-full">Regresar al Pabellón</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}