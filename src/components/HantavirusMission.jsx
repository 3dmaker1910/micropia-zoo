import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOCTORA_MICRA_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/6ad01c0408cd7402b4a8a5d5db8db0a1591fca247dec59ef735d67e5e2975bda.png';

const NEWS_VIDEOS = [
  {
    id: 'evacuation',
    title: 'Evacuación de Emergencia — MV Hondius 2026',
    embedUrl: 'https://www.youtube.com/embed/2GSpRnulPis',
    description: 'Imágenes reales de la evacuación de emergencia del MV Hondius.',
  },
  {
    id: 'inside',
    title: 'Dentro del Brote — MV Hondius',
    embedUrl: 'https://www.youtube.com/embed/1rLIyzZwHTA',
    description: 'Reportaje exclusivo desde el interior del brote.',
  },
];

const SHIP_LOCATIONS = [
  { id: 'bridge', name: 'Puente de Mando', icon: '🚢', clue: 'El capitán reportó el primer caso de fiebre 48 horas después de zarpar.', evidence: 'registro_navegacion' },
  { id: 'medical', name: 'Enfermería', icon: '🏥', clue: 'Tres pasajeros presentaron fiebre hemorrágica tras la excursión.', evidence: 'historial_medico' },
  { id: 'cabin_a', name: 'Camarote 14-A', icon: '🚪', clue: 'Se encontraron botas con tierra del vertedero. Marcas de mordedura.', evidence: 'botas_contaminadas', isPatientZero: true },
  { id: 'cargo', name: 'Bodega de Carga', icon: '📦', clue: 'Trampa con ratón colilargo muerto cerca de las cajas del Sospechoso A.', evidence: 'raton_muerto' },
];

const SUSPECTS = [
  { id: 'A', name: 'Dr. Alejandro Vega', role: 'Biólogo de Campo', description: 'Visitó el vertedero el Día 1. Primeros síntomas el Día 3.', isPatientZero: true },
  { id: 'B', name: 'Sofía Martínez', role: 'Fotógrafa', description: 'Síntomas el Día 8. Sin contacto con vertedero.', isPatientZero: false },
  { id: 'C', name: 'Carlos Pereira', role: 'Chef', description: 'Nunca bajó del barco. Sin síntomas.', isPatientZero: false },
];

function IntelligenceFeed() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-black/20 rounded-3xl mb-8 border border-red-500/10">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-black tracking-[0.3em] uppercase text-red-500">📡 Intelligence Feed • Noticias Reales</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NEWS_VIDEOS.map(v => (
          <div key={v.id} className="rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
            <div className="aspect-video">
              <iframe 
                className="w-full h-full border-none" 
                src={v.embedUrl} 
                title={v.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-red-400 text-sm mb-1">{v.title}</h4>
              <p className="text-[10px] text-white/40 leading-relaxed">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HantavirusMission({ onNavigate }) {
  const [phase, setPhase] = useState('briefing');
  const [evidence, setEvidence] = useState([]);

  return (
    <motion.div 
      className="min-h-screen bg-[#050202] text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 border-b border-red-500/20 pb-4">
        <button onClick={() => onNavigate('map')} className="text-xs font-bold text-red-500/70 hover:text-red-500">◀ VOLVER AL MAPA</button>
        <div className="text-center">
          <h1 className="text-lg font-black tracking-tighter text-red-500 italic uppercase">Misión Hantavirus</h1>
          <p className="text-[10px] text-white/30 tracking-widest">LOCALIZACIÓN: MV HONDIUS • USHUAIA</p>
        </div>
        <div className="w-20" />
      </div>

      <IntelligenceFeed />

      <div className="max-w-4xl mx-auto">
        {phase === 'briefing' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <img src={DOCTORA_MICRA_URL} alt="Micra" className="w-32 h-32 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
            <h2 className="text-2xl font-black mb-4">¡Detective Nando!</h2>
            <p className="text-sm text-white/60 mb-8">Hay un brote activo en el barco. Debes encontrar al paciente cero examinando las bitácoras y las pistas.</p>
            <button onClick={() => setPhase('investigation')} className="px-10 py-4 bg-red-600 rounded-full font-black tracking-widest hover:bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all">INICIAR INVESTIGACIÓN</button>
          </motion.div>
        )}

        {phase === 'investigation' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SHIP_LOCATIONS.map(loc => (
              <div key={loc.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-3xl block mb-2">{loc.icon}</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">{loc.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}