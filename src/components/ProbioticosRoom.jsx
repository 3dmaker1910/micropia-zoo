import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const INFOGRAPHIC_IMG = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/797dee135fc44c8d80f8a5e5b4e97e63_Gemini_Generated_Image_cpkzc6cpkzc6cpkz.png';
const DOCTORA_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const SLIDES = [
  {
    id: 'intro',
    title: 'Inquilinos VIP 🦸‍♂️',
    content: '¡Los Probióticos son tus Superhéroes de Alquiler! Imagina que tu sistema digestivo es una ciudad enorme y ellos son los ciudadanos que mantienen la paz, reparan las calles y pelean contra los delincuentes.',
    audio: '¡Claro que sí! Si la autofagia es el equipo de limpieza, los Probióticos son los Inquilinos VIP o los Superhéroes de Alquiler que viven en tu cuerpo. Imagina que tu sistema digestivo es una ciudad enorme y los probióticos son los ciudadanos que mantienen la paz, reparan las calles y pelean contra los delincuentes.'
  },
  {
    id: 'heroes',
    title: 'Los Personajes 🧬',
    content: 'Lactobacillus (Policías del intestino), Bifidobacterium (Ingenieros del colon) y Saccharomyces (Médico de guardia contra diarreas). Son bacterias vivas y levaduras que son buena gente.',
    audio: '¿Quiénes son estos personajes? Los probióticos no son cosas raras, son bacterias vivas y levaduras que son buena gente. Los más famosos tienen nombres que parecen de constelaciones: Lactobacillus, los policías que viven en el intestino delgado; Bifidobacterium, los ingenieros que mandan en el colon; y Saccharomyces boulardii, una levadura que es como el médico de guardia.'
  },
  {
    id: 'hacia_donde',
    title: 'Cuarteles Generales 🏠',
    content: 'Viven en tu Intestino (trillones de ellos) y llegan como refuerzos en alimentos como Yogur, Kéfir, Chucrut y Kombucha.',
    audio: '¿Dónde están escondidos? No nacemos con el equipo completo; los vamos reclutando. Sus cuarteles generales son: Tu Intestino, su mansión principal con trillones de ellos. Y los Alimentos Fermentados como el Yogur, el Kéfir, el Chucrut y la Kombucha. Comer esto es como enviar refuerzos a la batalla.'
  },
  {
    id: 'poderes',
    title: 'Superpoderes ⚡',
    content: 'Ganan a la Salmonella en las sillas musicales, cocinan vitaminas B12 y K, y entrenan al 70% de tus defensas inmunológicas.',
    audio: '¿Qué hacen por ti? Sus superpoderes son asombrosos. Hacen una Guerra de Territorio: se pegan a las paredes para que las bacterias malas como la Salmonella no tengan donde sentarse. ¡Es como un juego de sillas musicales donde ellos siempre ganan! También son una Fábrica de Vitaminas B doce y K, y son los Entrenadores del Sistema Inmune. El 70 por ciento de tus defensas están en el intestino charlando con ellos.'
  },
  {
    id: 'salud',
    title: 'Escudo Biológico 🚑',
    content: 'Eliminan gases, repueblan la ciudad tras tomar antibióticos y fabrican serotonina, ¡la hormona de la felicidad! Si ellos están felices, tú también.',
    audio: '¿En qué nos ayudan específicamente? Son un escudo contra antibióticos: ayudan a repoblar la ciudad después del desastre. Y lo más importante: la Conexión Cerebro-Intestino. Fabrican sustancias como la serotonina, la hormona de la felicidad. Si tus probióticos están felices, tú también.'
  },
  {
    id: 'curioso',
    title: 'Datos Locos 💡',
    content: '¡Pesan casi 2 kilos! Es como llevar un chihuahua de bacterias dentro. Necesitan Prebióticos (fibra de ajo y cebolla) para estar fuertes.',
    audio: 'Un dato micro-curioso: ¡Son pesados! Si pudieras sacarlos todos y ponerlos en una balanza, pesarían casi 2 kilos. ¡Es como llevar un chihuahua de puras bacterias dentro de ti! Para que estén fuertes, necesitan Prebióticos como fibra de cebolla y ajo. ¡Si ellos están bien, tu hotel de 5 estrellas no quiebra!'
  }
];

export default function ProbioticosRoom({ onNavigate }) {
  const [idx, setIdx] = useState(0);
  const { speak, stop, speaking } = useSpeech();

  const handleSpeak = () => {
    if (speaking) stop();
    else speak(SLIDES[idx].audio);
  };

  return (
    <motion.div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 border-b border-yellow-500/20 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🦸‍♂️</span>
          <h1 className="text-xl md:text-2xl font-black italic uppercase text-yellow-400 tracking-tighter">Sala de Probióticos</h1>
        </div>
        <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-yellow-900/20 border border-yellow-500/40 rounded-full text-[10px] font-black text-yellow-400 uppercase">◀ PABELLÓN</button>
      </header>

      <div className="flex-1 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT: MAIN INFOGRAPHIC (7 cols) */}
        <div className="lg:col-span-7 relative h-full flex flex-col">
           <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl bg-black/40 flex-1">
              <img src={INFOGRAPHIC_IMG} alt="Mapa de Probióticos" className="w-full h-full object-contain" />
              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-yellow-500/30">
                 <p className="text-[9px] font-black text-yellow-400 uppercase tracking-[0.3em]">Mapa de Superhéroes Intestinales • Registro Nando</p>
              </div>
           </div>
        </div>

        {/* RIGHT: DOCTORA & THEORY (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
           <div className="p-8 rounded-[3rem] bg-yellow-950/10 border-2 border-yellow-500/30 backdrop-blur-3xl shadow-2xl relative">
              <img src={DOCTORA_IMG} alt="Dra Micra" className="w-20 h-24 mx-auto mb-6 object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
              
              <AnimatePresence mode="wait">
                <motion.div key={SLIDES[idx].id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-[200px]">
                   <h2 className="text-2xl font-black text-yellow-400 uppercase italic mb-4 leading-none">{SLIDES[idx].title}</h2>
                   <p className="text-sm text-white/80 leading-relaxed italic mb-8">"{SLIDES[idx].content}"</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleSpeak}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${speaking ? 'bg-red-600' : 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105'}`}
                >
                  {speaking ? '■ Detener Explicación' : '🔊 Que la Doctora lo hable'}
                </button>
                
                <div className="flex justify-between items-center gap-4">
                   <div className="flex gap-1">
                      {SLIDES.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/10'}`} />
                      ))}
                   </div>
                   <button 
                     onClick={() => { stop(); setIdx((prev) => (prev + 1) % SLIDES.length); }}
                     className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-[9px] rounded-xl hover:bg-white/10"
                   >
                     Siguiente Dato ▶
                   </button>
                </div>
              </div>
           </div>

           <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-center">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Micro-Life Security Unit • v11.6</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}