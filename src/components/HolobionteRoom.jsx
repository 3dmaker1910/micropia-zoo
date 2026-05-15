import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

const BG_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/71f522967cc95495f6409cff931d20ad91eac92efde685b34f6e86a3dd46b2e2.png';
const EVOLUTION_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/ee841af569ddac0cc246ef6a01fd298d9f0e3296d608d5be54d44dcfd4c17b75.png';
const DOCTOR_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/913e4f510624c20204864a2009b0a380c9eba22e637d8db4dc5bd1d55e858800.png';

export default function HolobionteRoom({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  const zones = [
    { id: 'stomach', name: 'Estómago', fact: 'El ácido gástrico es una barrera protectora, pero aquí viven bacterias como H. pylori.', icon: '🧪' },
    { id: 'intestine', name: 'Intestino', fact: 'Aquí residen 39 billones de bacterias que ayudan a digerir y protegen tu sistema inmune.', icon: '🦠' },
    { id: 'connection', name: 'Vínculo Cerebro', fact: 'Tu microbiota produce el 90% de la serotonina, ¡la hormona de la felicidad!', icon: '🧠' },
  ];

  const handleSpeakTheory = () => {
    if (speaking) {
      stop();
    } else {
      const script = "Nando, presta atención a esta revolución científica. La teoría del Holobionte nos dice que el ser humano no es un individuo, sino una comunidad. Desde el hombre de Cro-Magnon hasta el hombre moderno sentado frente a una computadora, nuestra evolución no ha sido solo nuestra, sino de nuestras bacterias. Estos microorganismos han moldeado nuestro cerebro, nuestra dieta y nuestra supervivencia. Las repercusiones son enormes: si ellos cambian, nuestra evolución cambia. ¡Somos un zoológico en movimiento!";
      speak(script);
    }
  };

  return (
    <motion.div className="min-h-screen bg-[#0a0502] text-white overflow-y-auto relative font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <img src={BG_IMG} alt="Gut Microbiota" className="fixed inset-0 w-full h-full object-cover opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#2a1a0a] via-transparent to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col p-6 md:p-12 items-center">
        <header className="w-full max-w-6xl flex justify-between items-center mb-12 border-b border-orange-500/20 pb-6">
          <h1 className="text-3xl md:text-5xl font-black text-orange-400 italic uppercase tracking-tighter">El Holobionte</h1>
          <button onClick={() => onNavigate('hall')} className="px-6 py-2 bg-orange-900/40 border border-orange-500/40 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all">◀ PABELLÓN</button>
        </header>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: EVOLUTION IMAGE AND DOCTOR */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-[3rem] overflow-hidden border-2 border-orange-500/20 shadow-2xl bg-black/40 p-4">
               <img src={EVOLUTION_IMG} alt="Evolución Humana" className="w-full h-auto rounded-[2rem] contrast-125" />
               <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-orange-500/30">
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Registro Evolutivo: Cro-Magnon ➔ Hombre Moderno</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {zones.map(zone => (
                 <motion.div 
                   key={zone.id} onClick={() => setSelected(zone)} whileHover={{ scale: 1.05 }}
                   className="p-6 rounded-[2rem] bg-orange-950/20 border border-white/5 backdrop-blur-xl cursor-pointer text-center group active:bg-orange-500/20"
                 >
                    <span className="text-4xl mb-4 block">{zone.icon}</span>
                    <h3 className="font-black uppercase text-[10px] text-orange-400">{zone.name}</h3>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* RIGHT: DOCTOR REPORT */}
          <div className="lg:col-span-4 space-y-6">
             <div className="p-8 rounded-[3rem] bg-black/80 border-2 border-orange-500/30 backdrop-blur-2xl shadow-2xl relative">
                <img src={DOCTOR_IMG} alt="Doctor" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(251,146,60,0.4)]" />
                <h3 className="text-orange-400 font-black text-xs uppercase mb-4 text-center border-b border-orange-500/20 pb-2">Reporte: Teoría del Holobionte</h3>
                <p className="text-[11px] text-white/80 leading-relaxed mb-6 italic">
                  "Nando, un <strong className='text-orange-400'>HOLOBIONTE</strong> es el conjunto de un huésped y todas las especies microbianas que viven en él. Desde el Cro-Magnon hasta hoy, nuestra evolución ha sido guiada por estos seres."
                </p>
                
                <button 
                  onClick={handleSpeakTheory}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all ${speaking ? 'bg-red-600 animate-pulse' : 'bg-orange-500 text-black'}`}
                >
                  {speaking ? '■ Detener Explicación' : '🔊 Que el Doctor lo hable'}
                </button>
             </div>
             
             <AnimatePresence>
               {selected && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                   className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl"
                 >
                    <p className="text-[11px] text-orange-200/70 leading-relaxed font-medium">{selected.fact}</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 text-center opacity-10">
           <p className="text-[8px] font-black tracking-[1.5em] uppercase">Evolutionary Microbiota Unit • Nando-1910</p>
        </div>
      </div>
    </motion.div>
  );
}