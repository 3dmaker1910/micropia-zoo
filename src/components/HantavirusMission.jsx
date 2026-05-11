import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Ship locations to investigate
const SHIP_LOCATIONS = [
  {
    id: 'bridge',
    name: 'Puente de Mando',
    icon: '🚢',
    description: 'Centro de control del MV Hondius. Los registros de navegación están aquí.',
    clue: 'El capitán reportó el primer caso de fiebre 48 horas después de zarpar de Ushuaia.',
    evidence: 'registro_navegacion',
  },
  {
    id: 'medical',
    name: 'Enfermería',
    icon: '🏥',
    description: 'Bahía médica. Aquí se trataron los primeros síntomas.',
    clue: 'Tres pasajeros presentaron fiebre hemorrágica. Todos habían visitado la misma excursión en tierra.',
    evidence: 'historial_medico',
  },
  {
    id: 'cabin_a',
    name: 'Camarote 14-A',
    icon: '🚪',
    description: 'Camarote del Sospechoso A. Biólogo de campo que visitó el vertedero de Ushuaia.',
    clue: 'Se encontraron botas con restos de tierra del vertedero municipal de Ushuaia. Marcas de mordedura de roedor en el equipo.',
    evidence: 'botas_contaminadas',
    isPatientZero: true,
  },
  {
    id: 'cabin_b',
    name: 'Camarote 22-B',
    icon: '🚪',
    description: 'Camarote del Sospechoso B. Fotógrafa de naturaleza.',
    clue: 'Visitó los glaciares pero NO el vertedero. Los síntomas aparecieron 5 días después del Sospechoso A.',
    evidence: 'itinerario_turista',
  },
  {
    id: 'cabin_c',
    name: 'Camarote 8-C',
    icon: '🚪',
    description: 'Camarote del Sospechoso C. Chef del barco.',
    clue: 'Nunca bajó del barco en Ushuaia. Preparó comida en la cocina todo el día.',
    evidence: 'registro_trabajo',
  },
  {
    id: 'galley',
    name: 'Cocina / Galley',
    icon: '🍳',
    description: 'Donde se prepara la comida. ¿Contaminación alimentaria?',
    clue: 'Inspección sanitaria limpia. No se encontraron roedores ni excrementos. La comida no es el vector.',
    evidence: 'inspeccion_sanitaria',
  },
  {
    id: 'cargo',
    name: 'Bodega de Carga',
    icon: '📦',
    description: 'Almacén inferior. Carga subida en Ushuaia.',
    clue: 'Se encontró una trampa para ratones activada con un Oligoryzomys longicaudatus (ratón colilargo) muerto. Nido cerca de las cajas del Sospechoso A.',
    evidence: 'raton_muerto',
  },
  {
    id: 'deck',
    name: 'Cubierta Exterior',
    icon: '🌊',
    description: 'Cubierta de observación. Punto de desembarco para excursiones.',
    clue: 'El registro muestra que solo 8 pasajeros bajaron en la parada del vertedero. El Sospechoso A organizó la excursión.',
    evidence: 'registro_desembarco',
  },
];

const SUSPECTS = [
  {
    id: 'A',
    name: 'Dr. Alejandro Vega',
    role: 'Biólogo de Campo',
    description: 'Organizó una excursión no autorizada al vertedero municipal de Ushuaia para estudiar fauna urbana.',
    timeline: 'Visitó vertedero el Día 1. Primeros síntomas el Día 3. Fiebre hemorrágica el Día 5.',
    isPatientZero: true,
  },
  {
    id: 'B',
    name: 'Sofía Martínez',
    role: 'Fotógrafa de Naturaleza',
    description: 'Visitó los glaciares y el canal Beagle. No participó en la excursión al vertedero.',
    timeline: 'Sin contacto con vertedero. Síntomas el Día 8. Contagio persona-a-persona probable.',
    isPatientZero: false,
  },
  {
    id: 'C',
    name: 'Carlos Pereira',
    role: 'Chef del MV Hondius',
    description: 'Permaneció a bordo durante toda la escala en Ushuaia preparando comida.',
    timeline: 'Nunca salió del barco. No presentó síntomas. Descartado.',
    isPatientZero: false,
  },
];

const PHASES = {
  BRIEFING: 'briefing',
  INVESTIGATION: 'investigation',
  ACCUSATION: 'accusation',
  RESULT: 'result',
};

function Briefing({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto text-center px-4 py-8"
    >
      <motion.div
        className="text-6xl mb-6"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🦠
      </motion.div>
      <h2
        className="font-bold tracking-[0.15em] text-red-400 mb-4"
        style={{
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          textShadow: '0 0 30px rgba(239,68,68,0.3)',
        }}
      >
        MISIÓN: HANTAVIRUS
      </h2>
      <div
        className="rounded-xl p-6 mb-6 text-left"
        style={{
          background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.15)',
        }}
      >
        <p className="text-red-400/80 text-xs tracking-[0.3em] uppercase font-bold mb-3">
          ⚠ BRIEFING CLASIFICADO
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          El barco de expedición <strong className="text-red-400">MV Hondius</strong> ha reportado un brote de{' '}
          <strong className="text-red-400">Hantavirus</strong> entre sus pasajeros, 48 horas después de zarpar
          de <strong className="text-red-400">Ushuaia, Argentina</strong>.
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          El Hantavirus (cepa Andes) se transmite por contacto con roedores infectados o sus excrementos.
          <strong className="text-red-400"> Es el único hantavirus con transmisión persona-a-persona confirmada.</strong>
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          Tu misión: investigar el barco, examinar las pistas en cada ubicación, y{' '}
          <strong className="text-emergency">encontrar al Paciente Cero</strong> — la primera persona infectada
          que trajo el virus a bordo.
        </p>
        <div
          className="mt-4 p-3 rounded-lg"
          style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)' }}
        >
          <p className="text-emergency/80 text-xs tracking-wider">
            💡 CONSEJO: Investiga TODAS las ubicaciones del barco antes de acusar. Las pistas se conectan entre sí.
          </p>
        </div>
      </div>

      <motion.button
        onClick={onStart}
        className="px-10 py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-sm
                   transition-all duration-300"
        style={{
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444',
        }}
        whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(239,68,68,0.2)' }}
        whileTap={{ scale: 0.97 }}
      >
        🔍 INICIAR INVESTIGACIÓN
      </motion.button>
    </motion.div>
  );
}

function Investigation({ onAccuse, collectedEvidence, onCollectEvidence }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleInspect = (loc) => {
    setSelectedLocation(loc);
    if (!collectedEvidence.includes(loc.evidence)) {
      onCollectEvidence(loc.evidence);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      {/* Evidence counter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-red-400 tracking-wider text-sm">🔍 INVESTIGACIÓN EN CURSO</h3>
          <p className="text-neutral-600 text-xs tracking-wider mt-1">
            Pistas recolectadas: {collectedEvidence.length}/{SHIP_LOCATIONS.length}
          </p>
        </div>
        {collectedEvidence.length >= 4 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onAccuse}
            className="px-5 py-2 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                       bg-emergency/10 text-emergency border border-emergency/30
                       hover:bg-emergency/20 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ⚖️ ACUSAR SOSPECHOSO
          </motion.button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #ef4444, #f97316)',
            boxShadow: '0 0 10px #ef4444',
          }}
          animate={{ width: `${(collectedEvidence.length / SHIP_LOCATIONS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Ship map / locations grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {SHIP_LOCATIONS.map((loc) => {
          const visited = collectedEvidence.includes(loc.evidence);
          return (
            <motion.button
              key={loc.id}
              onClick={() => handleInspect(loc)}
              className="rounded-xl p-3 text-center transition-all duration-300 relative"
              style={{
                background: visited
                  ? 'rgba(34,197,94,0.08)'
                  : selectedLocation?.id === loc.id
                    ? 'rgba(239,68,68,0.1)'
                    : 'rgba(255,255,255,0.02)',
                border: `1px solid ${
                  visited
                    ? 'rgba(34,197,94,0.25)'
                    : selectedLocation?.id === loc.id
                      ? 'rgba(239,68,68,0.3)'
                      : 'rgba(255,255,255,0.05)'
                }`,
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {visited && (
                <div className="absolute top-1 right-1 text-bio-green text-xs">✓</div>
              )}
              <div className="text-2xl mb-1">{loc.icon}</div>
              <p
                className="font-bold text-xs tracking-wider"
                style={{ color: visited ? '#22c55e' : '#a3a3a3' }}
              >
                {loc.name}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Evidence panel */}
      <AnimatePresence mode="wait">
        {selectedLocation && (
          <motion.div
            key={selectedLocation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(180deg, rgba(239,68,68,0.05) 0%, rgba(5,10,20,0.9) 100%)',
              border: '1px solid rgba(239,68,68,0.15)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{selectedLocation.icon}</span>
              <div>
                <h4 className="font-bold text-red-400 tracking-wider text-sm">
                  {selectedLocation.name}
                </h4>
                <p className="text-neutral-500 text-xs">{selectedLocation.description}</p>
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(239,68,68,0.1)' }}
            >
              <p className="text-red-400/60 text-xs tracking-[0.2em] uppercase font-bold mb-2">
                📋 EVIDENCIA ENCONTRADA:
              </p>
              <p className="text-neutral-200 text-sm leading-relaxed">{selectedLocation.clue}</p>
            </div>
            {selectedLocation.isPatientZero && (
              <motion.div
                className="mt-3 p-2 rounded border border-emergency/20 bg-emergency/5 text-center"
                animate={{ borderColor: ['rgba(250,204,21,0.2)', 'rgba(250,204,21,0.5)', 'rgba(250,204,21,0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-emergency/70 text-xs tracking-wider">
                  ⚠ EVIDENCIA CRÍTICA — Esta pista es clave
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Accusation({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">⚖️</div>
        <h3
          className="font-bold tracking-[0.15em] text-emergency mb-2"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
        >
          ¿QUIÉN ES EL PACIENTE CERO?
        </h3>
        <p className="text-neutral-500 text-xs tracking-wider">
          Basándote en las pruebas, selecciona al sospechoso que introdujo el Hantavirus al barco.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SUSPECTS.map((suspect) => (
          <motion.button
            key={suspect.id}
            onClick={() => onSelect(suspect)}
            className="rounded-xl p-5 text-left transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
              borderColor: 'rgba(239,68,68,0.4)',
              background: 'rgba(239,68,68,0.05)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="text-3xl mb-3">🕵️</div>
            <div className="text-xs text-red-400/60 tracking-[0.2em] uppercase font-bold mb-1">
              Sospechoso {suspect.id}
            </div>
            <h4 className="font-bold text-neutral-200 text-sm mb-1">{suspect.name}</h4>
            <p className="text-neutral-500 text-xs mb-3">{suspect.role}</p>
            <p className="text-neutral-400 text-xs leading-relaxed">{suspect.description}</p>
            <div
              className="mt-3 p-2 rounded text-xs"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span className="text-neutral-600 tracking-wider">📅 </span>
              <span className="text-neutral-400">{suspect.timeline}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function Result({ suspect, onRestart, onBackToMap, onGoToHall }) {
  const isCorrect = suspect.isPatientZero;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto text-center px-4 py-8"
    >
      <motion.div
        className="text-7xl mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
      >
        {isCorrect ? '🏆' : '❌'}
      </motion.div>

      <h2
        className="font-bold tracking-[0.15em] mb-4"
        style={{
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          color: isCorrect ? '#22c55e' : '#ef4444',
          textShadow: isCorrect
            ? '0 0 30px rgba(34,197,94,0.3)'
            : '0 0 30px rgba(239,68,68,0.3)',
        }}
      >
        {isCorrect ? '¡PACIENTE CERO IDENTIFICADO!' : 'SOSPECHOSO INCORRECTO'}
      </h2>

      <div
        className="rounded-xl p-6 mb-6 text-left"
        style={{
          background: isCorrect ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
          border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
        }}
      >
        {isCorrect ? (
          <>
            <p className="text-bio-green/80 text-xs tracking-[0.3em] uppercase font-bold mb-3">
              ✓ CASO RESUELTO
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              <strong className="text-bio-green">Dr. Alejandro Vega (Sospechoso A)</strong> es el Paciente
              Cero. Como biólogo de campo, organizó una excursión no autorizada al vertedero municipal de
              Ushuaia donde entró en contacto con{' '}
              <strong className="text-bio-green">Oligoryzomys longicaudatus</strong> (ratón colilargo), el
              reservorio natural del Hantavirus cepa Andes.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              Las botas contaminadas con tierra del vertedero y las marcas de mordedura en su equipo
              confirman el contacto directo. Sus síntomas aparecieron primero (Día 3), y los casos
              posteriores fueron transmisión persona-a-persona — una característica única del Hantavirus Andes.
            </p>
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <p className="text-emergency/80 text-xs tracking-wider leading-relaxed">
                🧬 <strong>DATO CLAVE:</strong> El Hantavirus Andes (ANDV) es el ÚNICO hantavirus con
                transmisión persona-a-persona documentada, lo que lo hace especialmente peligroso en
                espacios cerrados como un barco. La tasa de mortalidad es del 30-40%.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-red-400/80 text-xs tracking-[0.3em] uppercase font-bold mb-3">
              ✗ INVESTIGACIÓN FALLIDA
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              Seleccionaste a <strong className="text-red-400">{suspect.name}</strong>, pero el verdadero
              Paciente Cero es <strong className="text-red-400">Dr. Alejandro Vega (Sospechoso A)</strong>.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Las pistas clave eran: las botas con tierra del vertedero, las marcas de mordedura de roedor,
              el ratón colilargo muerto encontrado cerca de sus cajas en la bodega, y el hecho de que fue
              la primera persona en mostrar síntomas.
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          onClick={onRestart}
          className="px-6 py-3 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                     bg-red-500/10 text-red-400 border border-red-500/30
                     hover:bg-red-500/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          🔄 REINICIAR MISIÓN
        </motion.button>
        <motion.button
          onClick={onBackToMap}
          className="px-6 py-3 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                     bg-bio-green/10 text-bio-green border border-bio-green/30
                     hover:bg-bio-green/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          🌐 VOLVER AL MAPA
        </motion.button>
        <motion.button
          onClick={onGoToHall}
          className="px-6 py-3 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                     bg-emergency/10 text-emergency border border-emergency/30
                     hover:bg-emergency/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          🏛 SIGUIENTE SALA: CONTENCIÓN
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function HantavirusMission({ onNavigate }) {
  const [phase, setPhase] = useState(PHASES.BRIEFING);
  const [collectedEvidence, setCollectedEvidence] = useState([]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  const handleStart = useCallback(() => setPhase(PHASES.INVESTIGATION), []);

  const handleCollectEvidence = useCallback((evidence) => {
    setCollectedEvidence((prev) => (prev.includes(evidence) ? prev : [...prev, evidence]));
  }, []);

  const handleAccuse = useCallback(() => setPhase(PHASES.ACCUSATION), []);

  const handleSelectSuspect = useCallback((suspect) => {
    setSelectedSuspect(suspect);
    setPhase(PHASES.RESULT);
  }, []);

  const handleRestart = useCallback(() => {
    setPhase(PHASES.BRIEFING);
    setCollectedEvidence([]);
    setSelectedSuspect(null);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative"
      style={{ background: 'radial-gradient(ellipse at center, #140a0a 0%, #0a0505 50%, #050202 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#0a0505]/90 backdrop-blur-md border-b border-red-500/20">
        <div
          className="h-0.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, #ef4444, #ef4444 10px, transparent 10px, transparent 20px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('map')}
            className="text-bio-green/70 hover:text-bio-green text-sm tracking-widest uppercase transition-colors flex items-center gap-1"
          >
            ◀ MAPA
          </button>
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-red-400"
              style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.9rem)' }}
            >
              🦠 MISIÓN HANTAVIRUS
            </h1>
            <p
              className="tracking-[0.3em] text-neutral-600"
              style={{ fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)' }}
            >
              MV HONDIUS • USHUAIA • ARGENTINA
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              className="text-red-400/60 tracking-[0.2em] hidden sm:inline"
              style={{ fontSize: '0.6rem' }}
            >
              CASO ACTIVO
            </span>
          </div>
        </div>
      </div>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === PHASES.BRIEFING && <Briefing key="briefing" onStart={handleStart} />}
        {phase === PHASES.INVESTIGATION && (
          <Investigation
            key="investigation"
            onAccuse={handleAccuse}
            collectedEvidence={collectedEvidence}
            onCollectEvidence={handleCollectEvidence}
          />
        )}
        {phase === PHASES.ACCUSATION && <Accusation key="accusation" onSelect={handleSelectSuspect} />}
        {phase === PHASES.RESULT && (
          <Result
            key="result"
            suspect={selectedSuspect}
            onRestart={handleRestart}
            onBackToMap={() => onNavigate('map')}
            onGoToHall={() => onNavigate('hall')}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-neutral-800/30 py-4 text-center mt-8">
        <p
          className="text-neutral-700 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)' }}
        >
          Micropia v6.6 • Misión Hantavirus • Juego Educativo de Detective Epidemiológico
        </p>
      </div>
    </motion.div>
  );
}
