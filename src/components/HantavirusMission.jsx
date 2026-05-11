import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHIP_LOCATIONS = [
  {
    id: 'bridge',
    name: 'Puente de Mando',
    icon: '\ud83d\udea2',
    description: 'Centro de control del MV Hondius. Los registros de navegaci\u00f3n est\u00e1n aqu\u00ed.',
    clue: 'El capit\u00e1n report\u00f3 el primer caso de fiebre 48 horas despu\u00e9s de zarpar de Ushuaia.',
    evidence: 'registro_navegacion',
  },
  {
    id: 'medical',
    name: 'Enfermer\u00eda',
    icon: '\ud83c\udfe5',
    description: 'Bah\u00eda m\u00e9dica. Aqu\u00ed se trataron los primeros s\u00edntomas.',
    clue: 'Tres pasajeros presentaron fiebre hemorr\u00e1gica. Todos hab\u00edan visitado la misma excursi\u00f3n en tierra.',
    evidence: 'historial_medico',
  },
  {
    id: 'cabin_a',
    name: 'Camarote 14-A',
    icon: '\ud83d\udeaa',
    description: 'Camarote del Sospechoso A. Bi\u00f3logo de campo que visit\u00f3 el vertedero de Ushuaia.',
    clue: 'Se encontraron botas con restos de tierra del vertedero municipal de Ushuaia. Marcas de mordedura de roedor en el equipo.',
    evidence: 'botas_contaminadas',
    isPatientZero: true,
  },
  {
    id: 'cabin_b',
    name: 'Camarote 22-B',
    icon: '\ud83d\udeaa',
    description: 'Camarote del Sospechoso B. Fot\u00f3grafa de naturaleza.',
    clue: 'Visit\u00f3 los glaciares pero NO el vertedero. Los s\u00edntomas aparecieron 5 d\u00edas despu\u00e9s del Sospechoso A.',
    evidence: 'itinerario_turista',
  },
  {
    id: 'cabin_c',
    name: 'Camarote 8-C',
    icon: '\ud83d\udeaa',
    description: 'Camarote del Sospechoso C. Chef del barco.',
    clue: 'Nunca baj\u00f3 del barco en Ushuaia. Prepar\u00f3 comida en la cocina todo el d\u00eda.',
    evidence: 'registro_trabajo',
  },
  {
    id: 'galley',
    name: 'Cocina / Galley',
    icon: '\ud83c\udf73',
    description: 'Donde se prepara la comida. \u00bfContaminaci\u00f3n alimentaria?',
    clue: 'Inspecci\u00f3n sanitaria limpia. No se encontraron roedores ni excrementos. La comida no es el vector.',
    evidence: 'inspeccion_sanitaria',
  },
  {
    id: 'cargo',
    name: 'Bodega de Carga',
    icon: '\ud83d\udce6',
    description: 'Almac\u00e9n inferior. Carga subida en Ushuaia.',
    clue: 'Se encontr\u00f3 una trampa para ratones activada con un Oligoryzomys longicaudatus (rat\u00f3n colilargo) muerto. Nido cerca de las cajas del Sospechoso A.',
    evidence: 'raton_muerto',
  },
  {
    id: 'deck',
    name: 'Cubierta Exterior',
    icon: '\ud83c\udf0a',
    description: 'Cubierta de observaci\u00f3n. Punto de desembarco para excursiones.',
    clue: 'El registro muestra que solo 8 pasajeros bajaron en la parada del vertedero. El Sospechoso A organiz\u00f3 la excursi\u00f3n.',
    evidence: 'registro_desembarco',
  },
];

const SUSPECTS = [
  {
    id: 'A',
    name: 'Dr. Alejandro Vega',
    role: 'Bi\u00f3logo de Campo',
    description: 'Organiz\u00f3 una excursi\u00f3n no autorizada al vertedero municipal de Ushuaia para estudiar fauna urbana.',
    timeline: 'Visit\u00f3 vertedero el D\u00eda 1. Primeros s\u00edntomas el D\u00eda 3. Fiebre hemorr\u00e1gica el D\u00eda 5.',
    isPatientZero: true,
  },
  {
    id: 'B',
    name: 'Sof\u00eda Mart\u00ednez',
    role: 'Fot\u00f3grafa de Naturaleza',
    description: 'Visit\u00f3 los glaciares y el canal Beagle. No particip\u00f3 en la excursi\u00f3n al vertedero.',
    timeline: 'Sin contacto con vertedero. S\u00edntomas el D\u00eda 8. Contagio persona-a-persona probable.',
    isPatientZero: false,
  },
  {
    id: 'C',
    name: 'Carlos Pereira',
    role: 'Chef del MV Hondius',
    description: 'Permaneci\u00f3 a bordo durante toda la escala en Ushuaia preparando comida.',
    timeline: 'Nunca sali\u00f3 del barco. No present\u00f3 s\u00edntomas. Descartado.',
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
        \ud83e\udda0
      </motion.div>
      <h2
        className="font-bold tracking-[0.15em] text-red-400 mb-4"
        style={{
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          textShadow: '0 0 30px rgba(239,68,68,0.3)',
        }}
      >
        MISI\u00d3N: HANTAVIRUS
      </h2>
      <div
        className="rounded-xl p-6 mb-6 text-left"
        style={{
          background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.15)',
        }}
      >
        <p className="text-red-400/80 text-xs tracking-[0.3em] uppercase font-bold mb-3">
          \u26a0 BRIEFING CLASIFICADO
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          El barco de expedici\u00f3n <strong className="text-red-400">MV Hondius</strong> ha reportado un brote de{' '}
          <strong className="text-red-400">Hantavirus</strong> entre sus pasajeros, 48 horas despu\u00e9s de zarpar
          de <strong className="text-red-400">Ushuaia, Argentina</strong>.
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          El Hantavirus (cepa Andes) se transmite por contacto con roedores infectados o sus excrementos.
          <strong className="text-red-400"> Es el \u00fanico hantavirus con transmisi\u00f3n persona-a-persona confirmada.</strong>
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          Tu misi\u00f3n: investigar el barco, examinar las pistas en cada ubicaci\u00f3n, y{' '}
          <strong className="text-emergency">encontrar al Paciente Cero</strong> \u2014 la primera persona infectada
          que trajo el virus a bordo.
        </p>
        <div
          className="mt-4 p-3 rounded-lg"
          style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)' }}
        >
          <p className="text-emergency/80 text-xs tracking-wider">
            \ud83d\udca1 CONSEJO: Investiga TODAS las ubicaciones del barco antes de acusar. Las pistas se conectan entre s\u00ed.
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
        \ud83d\udd0d INICIAR INVESTIGACI\u00d3N
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-red-400 tracking-wider text-sm">\ud83d\udd0d INVESTIGACI\u00d3N EN CURSO</h3>
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
            \u2696\ufe0f ACUSAR SOSPECHOSO
          </motion.button>
        )}
      </div>

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
                <div className="absolute top-1 right-1 text-bio-green text-xs">\u2713</div>
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
                \ud83d\udccb EVIDENCIA ENCONTRADA:
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
                  \u26a0 EVIDENCIA CR\u00cdTICA \u2014 Esta pista es clave
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
        <div className="text-4xl mb-3">\u2696\ufe0f</div>
        <h3
          className="font-bold tracking-[0.15em] text-emergency mb-2"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
        >
          \u00bfQUI\u00c9N ES EL PACIENTE CERO?
        </h3>
        <p className="text-neutral-500 text-xs tracking-wider">
          Bas\u00e1ndote en las pruebas, selecciona al sospechoso que introdujo el Hantavirus al barco.
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
            <div className="text-3xl mb-3">\ud83d\udd75\ufe0f</div>
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
              <span className="text-neutral-600 tracking-wider">\ud83d\udcc5 </span>
              <span className="text-neutral-400">{suspect.timeline}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function Result({ suspect, onRestart, onBackToMap }) {
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
        {isCorrect ? '\ud83c\udfc6' : '\u274c'}
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
        {isCorrect ? '\u00a1PACIENTE CERO IDENTIFICADO!' : 'SOSPECHOSO INCORRECTO'}
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
              \u2713 CASO RESUELTO
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              <strong className="text-bio-green">Dr. Alejandro Vega (Sospechoso A)</strong> es el Paciente
              Cero. Como bi\u00f3logo de campo, organiz\u00f3 una excursi\u00f3n no autorizada al vertedero municipal de
              Ushuaia donde entr\u00f3 en contacto con{' '}
              <strong className="text-bio-green">Oligoryzomys longicaudatus</strong> (rat\u00f3n colilargo), el
              reservorio natural del Hantavirus cepa Andes.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              Las botas contaminadas con tierra del vertedero y las marcas de mordedura en su equipo
              confirman el contacto directo. Sus s\u00edntomas aparecieron primero (D\u00eda 3), y los casos
              posteriores fueron transmisi\u00f3n persona-a-persona \u2014 una caracter\u00edstica \u00fanica del Hantavirus Andes.
            </p>
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <p className="text-emergency/80 text-xs tracking-wider leading-relaxed">
                \ud83e\uddec <strong>DATO CLAVE:</strong> El Hantavirus Andes (ANDV) es el \u00daNICO hantavirus con
                transmisi\u00f3n persona-a-persona documentada, lo que lo hace especialmente peligroso en
                espacios cerrados como un barco. La tasa de mortalidad es del 30-40%.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-red-400/80 text-xs tracking-[0.3em] uppercase font-bold mb-3">
              \u2717 INVESTIGACI\u00d3N FALLIDA
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">
              Seleccionaste a <strong className="text-red-400">{suspect.name}</strong>, pero el verdadero
              Paciente Cero es <strong className="text-red-400">Dr. Alejandro Vega (Sospechoso A)</strong>.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Las pistas clave eran: las botas con tierra del vertedero, las marcas de mordedura de roedor,
              el rat\u00f3n colilargo muerto encontrado cerca de sus cajas en la bodega, y el hecho de que fue
              la primera persona en mostrar s\u00edntomas.
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
          \ud83d\udd04 REINICIAR MISI\u00d3N
        </motion.button>
        <motion.button
          onClick={onBackToMap}
          className="px-6 py-3 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                     bg-bio-green/10 text-bio-green border border-bio-green/30
                     hover:bg-bio-green/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          \ud83c\udf10 VOLVER AL MAPA
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
            \u25c0 MAPA
          </button>
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-red-400"
              style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.9rem)' }}
            >
              \ud83e\udda0 MISI\u00d3N HANTAVIRUS
            </h1>
            <p
              className="tracking-[0.3em] text-neutral-600"
              style={{ fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)' }}
            >
              MV HONDIUS \u2022 USHUAIA \u2022 ARGENTINA
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
          />
        )}
      </AnimatePresence>

      <div className="border-t border-neutral-800/30 py-4 text-center mt-8">
        <p
          className="text-neutral-700 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)' }}
        >
          Micropia v6.0 \u2022 Misi\u00f3n Hantavirus \u2022 Juego Educativo de Detective Epidemiol\u00f3gico
        </p>
      </div>
    </motion.div>
  );
}
