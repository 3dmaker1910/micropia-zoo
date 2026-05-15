import { motion } from 'framer-motion';

const BG_IMG = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/3650c9feb9575d96b9b17dde9dffc409d587e8d53e1fabcf0ccd78f45b44a3a1.png';

export default function ConanRoom({ onNavigate }) {
  return (
    <motion.div className="min-h-screen bg-black text-white overflow-hidden relative font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img src={BG_IMG} alt="Radiation Room" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-yellow-950/20" />

      <div className="relative z-10 flex flex-col h-full p-8 md:p-12 items-center justify-center">
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest mb-4">⚠ ADVERTENCIA: RADIACIÓN EXTREMA ⚠</div>
          <h1 className="text-5xl md:text-7xl font-black text-yellow-400 italic uppercase tracking-tighter shadow-2xl">Unidad Conan</h1>
          <p className="text-sm text-yellow-200/50 tracking-[0.4em] uppercase mt-2">Deinococcus Radiodurans</p>
        </header>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="p-10 rounded-[3rem] bg-black/80 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black text-yellow-500 uppercase italic mb-4">El Organismo Inmortal</h2>
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                "Detective Nando, estás ante el Guinness World Record al microbio más resistente. Puede sobrevivir a dosis de radiación 3,000 veces superiores a las que matarían a un humano."
              </p>
              <div className="space-y-3">
                 <div className="p-4 bg-yellow-950/30 border border-yellow-500/20 rounded-2xl">
                    <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">Resistencia Total</p>
                    <p className="text-xs text-white/60">Sobrevive al vacío del espacio, al frío extremo y al ácido más corrosivo.</p>
                 </div>
                 <div className="p-4 bg-yellow-950/30 border border-yellow-500/20 rounded-2xl">
                    <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">Superpoder Genético</p>
                    <p className="text-xs text-white/60">Repara su ADN en horas, incluso después de ser fragmentado por completo.</p>
                 </div>
              </div>
           </div>
           <div className="relative">
              <motion.div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-3xl" animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} />
              <img src={BG_IMG} alt="Conan" className="w-full aspect-square object-contain rounded-full border-4 border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.3)]" />
           </div>
        </div>

        <button onClick={() => onNavigate('hall')} className="mt-16 px-10 py-4 bg-yellow-500 text-black font-black uppercase text-xs rounded-full hover:bg-white transition-all shadow-xl">◀ REGRESAR AL PABELLÓN</button>
      </div>
    </motion.div>
  );
}