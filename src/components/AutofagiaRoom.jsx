import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const DOCTOR_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/913e4f510624c20204864a2009b0a380c9eba22e637d8db4dc5bd1d55e858800.png';

const AUTOFAGIA_DATA = [
  {
    id: 'intro',
    title: '1. Nombre de Terror 🧟‍♂️',
    content: 'Auto significa uno mismo y Phagia comer. ¡Literalmente es comerte a ti mismo! Pero no te asustes, tu célula identifica las partes viejas o infectadas y decide almorzárselas para fabricar piezas nuevas.',
    audio: 'La Autofagia es básicamente el sistema de reciclaje extremo y limpieza profunda de tus células. El nombre viene del griego: Auto, uno mismo, y Phagia, comer. ¡Literalmente significa comerte a ti mismo! Pero no te asustes, no es que te vayas a desaparecer, es que tu célula identifica las partes que ya están viejas, rotas o infectadas y decide almorzárselas para fabricar piezas nuevas.'
  },
  {
    id: 'pacman',
    title: '2. El Pac-Man Celular 👄',
    content: 'Hay una burbuja llamada Autofagosoma que patrulla como un Pac-Man. Cuando encuentra un virus o una proteína podrida, lo encierra, lo funde con ácido y ¡BUM!, se convierte en energía pura.',
    audio: 'Imagina que dentro de tus células hay una burbuja llamada Autofagosoma. Esta burbuja patrulla como un Pac-Man. Cuando encuentra un virus, como el de la gripe, o una proteína podrida, lo encierra en su bolsa, se fusiona con otra burbuja llena de ácido llamada Lisosoma y ¡BUM! El virus se disuelve y se convierte en energía pura.'
  },
  {
    id: 'superpoder',
    title: '3. El Superpoder ⚡',
    content: 'Se activa cuando tienes hambre (ayuno) o haces ejercicio. Tus células dicen: \'¡No hay comida afuera! Vamos a limpiar la basura de adentro para sacar energía\'.',
    audio: '¿Cuándo se activa este Superpoder? La autofagia se activa principalmente cuando tienes hambre. Cuando no comes por un buen rato, tus células dicen: ¡No hay comida afuera! Vamos a limpiar la basura de adentro para sacar energía. También ocurre cuando haces ejercicio: el estrés del deporte le dice a la célula: ¡Renévate o muere!'
  },
  {
    id: 'guerra',
    title: '4. Guerra a los Okupas 🪖',
    content: 'La autofagia es un detector de humo inteligente. Detecta virus intrusos y los envuelve antes de que usen tu ADN para multiplicarse. ¡Aunque algunos virus intentan hackear el sistema!',
    audio: 'En tu zoológico de microbios, hay virus que intentan esconderse. La autofagia es como un detector de humo inteligente: detecta al virus intruso y lo envuelve antes de que pueda usar tu fotocopiadora, el ADN, para multiplicarse. Dato Curioso: ¡Algunos virus son tan listos que han aprendido a hackear la autofagia para usar esas bolsas como transporte VIP!'
  },
  {
    id: 'eterno',
    title: '5. No Envejecer 🎂',
    content: 'Evita que el cuerpo se llene de basura celular. Ayuda a prevenir el cáncer, evitar el Alzheimer y tener una piel más sana. ¡Es el secreto de la eterna juventud!',
    audio: 'Si la autofagia se detiene, tu cuerpo se llena de basura celular. Es como si en tu casa nunca sacaras la basura: al final, no podrías ni caminar. Mantener la autofagia activa ayuda a prevenir el cáncer eliminando células que se portan mal, evitar el Alzheimer limpiando el cerebro y tener una piel más sana.'
  }
];

export default function AutofagiaRoom({ onNavigate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { speak, stop, speaking } = useSpeech();

  const handleNext = () => {
    stop();
    setCurrentIdx((prev) => (prev + 1) % AUTOFAGIA_DATA.length);
  };

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      speak(AUTOFAGIA_DATA[currentIdx].audio);
    }
  };

  return (
    <motion.div className="min-h-screen bg-[#050f0a] text-white p-4 md:p-10 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* HEADER */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-emerald-500/20 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">♻️</span>
          <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-emerald-400">Sala de Autofagia</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">◀ PABELLÓN</button>
      </header>

      <div className="flex-1 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT: DOCTOR CARTOON (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-[3rem] overflow-hidden border-2 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] bg-black">
             <img src={DOCTOR_IMG} alt="Doctor" className="w-full h-auto object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050f0a] via-transparent to-transparent" />
             
             {/* SPEECH BUTTON OVER DOCTOR */}
             <motion.button 
               onClick={handleSpeak}
               whileHover={{ scale: 1.1 }}
               className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-2xl transition-all ${speaking ? 'bg-red-600 animate-pulse' : 'bg-emerald-500 text-black'}`}
             >
               {speaking ? '■ Detener Explicación' : '🔊 Que lo hable el Doctor'}
             </motion.button>
          </div>
        </div>

        {/* RIGHT: THEORY CONTENT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={AUTOFAGIA_DATA[currentIdx].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-10 rounded-[3rem] bg-neutral-900/60 border border-emerald-500/30 backdrop-blur-xl min-h-[400px] flex flex-col justify-center"
            >
               <p className="text-[10px] font-black text-emerald-500 mb-4 tracking-[0.3em]">REPORTE DE MANTENIMIENTO CELULAR</p>
               <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-none mb-6 text-white">{AUTOFAGIA_DATA[currentIdx].title}</h2>
               <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
                 {AUTOFAGIA_DATA[currentIdx].content}
               </p>
               
               <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {AUTOFAGIA_DATA.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/10'}`} />
                    ))}
                  </div>
                  <button 
                    onClick={handleNext}
                    className="px-10 py-4 bg-white text-black font-black uppercase text-xs rounded-2xl hover:bg-emerald-400 transition-all"
                  >
                    Siguiente Dato ▶
                  </button>
               </div>
            </motion.div>
          </AnimatePresence>

          <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/10 text-[9px] font-medium text-emerald-500/60 leading-relaxed">
             💡 <strong>Dato Micro-Loco:</strong> El científico Yoshinori Ohsumi ganó el Nobel en 2016 solo por explicarnos este reciclaje. ¡Se cree que tras 16-18 horas sin comer, tus células activan este modo experto!
          </div>
        </div>

      </div>
    </motion.div>
  );
}