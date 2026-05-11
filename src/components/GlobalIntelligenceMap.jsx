import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified world map paths (continents as SVG paths)
const CONTINENTS = [
  {
    name: 'North America',
    d: 'M 95 75 L 120 55 L 145 48 L 170 52 L 190 65 L 195 80 L 200 95 L 195 110 L 190 125 L 175 135 L 165 140 L 155 138 L 140 140 L 130 145 L 120 140 L 105 130 L 100 115 L 95 100 Z',
  },
  {
    name: 'South America',
    d: 'M 155 165 L 170 155 L 185 160 L 190 175 L 195 195 L 190 215 L 185 235 L 175 255 L 165 265 L 160 260 L 155 245 L 150 225 L 148 205 L 150 185 Z',
  },
  {
    name: 'Europe',
    d: 'M 270 55 L 285 48 L 305 50 L 315 55 L 320 65 L 315 75 L 305 80 L 295 82 L 280 80 L 272 72 Z',
  },
  {
    name: 'Africa',
    d: 'M 270 100 L 290 90 L 310 95 L 320 105 L 325 120 L 322 140 L 315 160 L 305 175 L 295 180 L 285 175 L 275 160 L 268 140 L 265 120 Z',
  },
  {
    name: 'Asia',
    d: 'M 320 45 L 345 38 L 380 35 L 410 40 L 430 50 L 440 60 L 445 75 L 440 90 L 430 100 L 415 105 L 395 102 L 375 95 L 355 90 L 340 85 L 325 78 L 318 65 Z',
  },
  {
    name: 'Oceania',
    d: 'M 410 160 L 430 155 L 450 160 L 455 175 L 450 190 L 435 195 L 420 190 L 412 178 Z',
  },
  {
    name: 'Antarctica',
    d: 'M 140 290 L 200 285 L 260 288 L 320 285 L 380 288 L 400 290 L 380 295 L 320 298 L 260 295 L 200 298 L 140 295 Z',
  },
];

// Active outbreak points on the map
const OUTBREAK_POINTS = [
  {
    id: 'argentina',
    x: 170,
    y: 250,
    label: 'ARGENTINA \u2014 Ushuaia',
    sublabel: 'Brote Hantavirus \u2022 MV Hondius',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'china',
    x: 395,
    y: 65,
    label: 'CHINA \u2014 Wuhan',
    sublabel: 'Vigilancia Coronavirus',
    color: '#f97316',
    critical: false,
  },
  {
    id: 'congo',
    x: 300,
    y: 145,
    label: 'REP. DEM. CONGO',
    sublabel: '\u00c9bola \u2014 Monitoreo activo',
    color: '#f97316',
    critical: false,
  },
  {
    id: 'india',
    x: 370,
    y: 90,
    label: 'INDIA \u2014 Mumbai',
    sublabel: 'TB-XDR \u2022 Resistencia antibi\u00f3tica',
    color: '#eab308',
    critical: false,
  },
  {
    id: 'brazil',
    x: 185,
    y: 190,
    label: 'BRASIL \u2014 Amazonas',
    sublabel: 'Vigilancia Dengue / Zika',
    color: '#eab308',
    critical: false,
  },
];

function PulsingDot({ point, onClick, isHovered, onHover, onLeave }) {
  return (
    <g
      className="cursor-pointer"
      onClick={() => onClick(point)}
      onMouseEnter={() => onHover(point.id)}
      onMouseLeave={onLeave}
    >
      {/* Outer pulse ring for critical */}
      {point.critical && (
        <>
          <circle cx={point.x} cy={point.y} r="12" fill="none" stroke={point.color} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={point.x} cy={point.y} r="8" fill="none" stroke={point.color} strokeWidth="0.8" opacity="0.4">
            <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
        </>
      )}
      {/* Glow */}
      <circle
        cx={point.x}
        cy={point.y}
        r={point.critical ? 8 : 5}
        fill={point.color}
        opacity="0.15"
        filter="url(#glow)"
      />
      {/* Core dot */}
      <circle
        cx={point.x}
        cy={point.y}
        r={point.critical ? 4 : 2.5}
        fill={point.color}
        opacity={isHovered ? 1 : 0.9}
      >
        <animate
          attributeName="r"
          values={point.critical ? '3;5;3' : '2;3;2'}
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Inner bright core */}
      <circle cx={point.x} cy={point.y} r="1.5" fill="#fff" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

export default function GlobalIntelligenceMap({ onNavigate }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [scanLine, setScanLine] = useState(0);
  const [dataFeed, setDataFeed] = useState([]);

  // Animate scan line
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 310 ? 0 : prev + 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Simulate data feed
  useEffect(() => {
    const feeds = [
      '\u25c8 SAT\u00c9LITE MICROPIA-7 \u2014 enlace activo',
      '\u25c8 Sensor biol\u00f3gico #42 \u2014 Argentina \u2014 ALERTA',
      '\u25c8 Red de vigilancia OMS \u2014 147 nodos activos',
      '\u25c8 An\u00e1lisis gen\u00f3mico en tiempo real...',
      '\u25c8 Hantavirus Andes \u2014 secuencia confirmada',
      '\u25c8 MV Hondius \u2014 cuarentena nivel 3 activa',
      '\u25c8 Paciente cero \u2014 rastreo en progreso...',
      '\u25c8 Tierra del Fuego \u2014 per\u00edmetro sellado',
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setDataFeed((prev) => [...prev.slice(-4), feeds[idx % feeds.length]]);
      idx++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    if (point.navigateTo) {
      setTimeout(() => onNavigate(point.navigateTo), 1200);
    }
  };

  const hoveredData = OUTBREAK_POINTS.find((p) => p.id === hoveredPoint);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0a1628 0%, #050a14 50%, #020408 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#050a14]/90 backdrop-blur-md border-b border-red-500/20">
        <div
          className="h-0.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, #ef4444, #ef4444 10px, transparent 10px, transparent 20px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('hall')}
            className="text-bio-green/70 hover:text-bio-green text-sm tracking-widest uppercase transition-colors flex items-center gap-1"
          >
            \u25c0 CONTENCI\u00d3N
          </button>
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-red-400"
              style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.9rem)' }}
            >
              \ud83c\udf10 MAPA DE INTELIGENCIA GLOBAL
            </h1>
            <p
              className="tracking-[0.3em] text-neutral-600"
              style={{ fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)' }}
            >
              RED DE VIGILANCIA EPIDEMIOL\u00d3GICA \u2022 MICROPIA v6.0
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
              EN VIVO
            </span>
          </div>
        </div>
      </div>

      {/* Main map area */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(5,15,35,0.9) 0%, rgba(2,8,20,0.95) 100%)',
            border: '1px solid rgba(239,68,68,0.15)',
            boxShadow: '0 0 80px rgba(239,68,68,0.05), inset 0 0 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* SVG Map */}
          <svg viewBox="0 0 540 310" className="w-full h-auto relative z-10">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="continentFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Scan line */}
            <line
              x1="0"
              y1={scanLine}
              x2="540"
              y2={scanLine}
              stroke="#22c55e"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <line
              x1="0"
              y1={scanLine}
              x2="540"
              y2={scanLine}
              stroke="#22c55e"
              strokeWidth="2"
              opacity="0.05"
              filter="url(#glow)"
            />

            {/* Continents */}
            {CONTINENTS.map((c) => (
              <path
                key={c.name}
                d={c.d}
                fill="url(#continentFill)"
                stroke="#22c55e"
                strokeWidth="0.5"
                opacity="0.6"
              />
            ))}

            {/* Connection lines from Argentina to other points */}
            {OUTBREAK_POINTS.filter((p) => p.id !== 'argentina').map((p) => (
              <line
                key={`line-${p.id}`}
                x1={170}
                y1={250}
                x2={p.x}
                y2={p.y}
                stroke="#ef4444"
                strokeWidth="0.3"
                opacity="0.1"
                strokeDasharray="4 4"
              >
                <animate attributeName="strokeDashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
              </line>
            ))}

            {/* Outbreak points */}
            {OUTBREAK_POINTS.map((point) => (
              <PulsingDot
                key={point.id}
                point={point}
                onClick={handlePointClick}
                isHovered={hoveredPoint === point.id}
                onHover={setHoveredPoint}
                onLeave={() => setHoveredPoint(null)}
              />
            ))}

            {/* Labels for critical point */}
            <g>
              <text x="135" y="242" fill="#ef4444" fontSize="5" fontFamily="monospace" opacity="0.8">
                \u25bc ALERTA CR\u00cdTICA
              </text>
              <text x="148" y="260" fill="#ef4444" fontSize="3.5" fontFamily="monospace" opacity="0.5">
                USHUAIA \u2022 HANTAVIRUS
              </text>
            </g>
          </svg>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredData && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20 p-3 rounded-lg"
                style={{
                  background: 'rgba(5,10,20,0.95)',
                  border: `1px solid ${hoveredData.color}40`,
                  boxShadow: `0 0 20px ${hoveredData.color}15`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: hoveredData.color, boxShadow: `0 0 6px ${hoveredData.color}` }}
                  />
                  <span className="font-bold text-xs tracking-wider" style={{ color: hoveredData.color }}>
                    {hoveredData.label}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs tracking-wide">{hoveredData.sublabel}</p>
                {hoveredData.navigateTo && (
                  <p className="text-red-400/70 text-xs mt-1.5 tracking-wider animate-pulse">
                    \u25b6 CLIC PARA INICIAR MISI\u00d3N
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Data feed + Legend */}
      <div className="max-w-6xl mx-auto px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data feed */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(5,15,30,0.8)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-bio-green"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-bio-green/60 text-xs tracking-[0.3em] uppercase font-bold">
              Feed de Datos
            </span>
          </div>
          <div className="space-y-1 font-mono" style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)' }}>
            {dataFeed.map((line, i) => (
              <motion.p
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${i === dataFeed.length - 1 ? 'text-bio-green/80' : 'text-neutral-600'}`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(5,15,30,0.8)',
            border: '1px solid rgba(239,68,68,0.1)',
          }}
        >
          <span className="text-red-400/60 text-xs tracking-[0.3em] uppercase font-bold block mb-3">
            Nivel de Amenaza
          </span>
          <div className="space-y-2">
            {[
              { color: '#ef4444', label: 'CR\u00cdTICO \u2014 Misi\u00f3n activa', blink: true },
              { color: '#f97316', label: 'ALTO \u2014 Monitoreo intensivo', blink: false },
              { color: '#eab308', label: 'MODERADO \u2014 Vigilancia', blink: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                  animate={item.blink ? { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-neutral-400 text-xs tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Argentina mission CTA */}
          <motion.button
            onClick={() => handlePointClick(OUTBREAK_POINTS[0])}
            className="mt-4 w-full py-2.5 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                       transition-all duration-300"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239,68,68,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              \ud83d\udd34 IR A MISI\u00d3N: HANTAVIRUS ARGENTINA
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Video section */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="text-center mb-6">
          <h3
            className="font-bold tracking-[0.15em] text-red-400/80 mb-1"
            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)' }}
          >
            \ud83d\udce1 TRANSMISIONES DE INTELIGENCIA
          </h3>
          <p className="text-neutral-600 text-xs tracking-wider">
            Material educativo clasificado sobre amenazas biol\u00f3gicas
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Hantavirus: Origen y Transmisi\u00f3n', tag: 'EDUCATIVO', duration: '12:34' },
            { title: 'MV Hondius: Reconstrucci\u00f3n del Brote', tag: 'INVESTIGACI\u00d3N', duration: '08:47' },
            { title: 'Ushuaia: Zona Cero', tag: 'DOCUMENTAL', duration: '15:21' },
          ].map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="rounded-xl overflow-hidden group cursor-pointer"
              style={{
                background: 'rgba(5,15,30,0.8)',
                border: '1px solid rgba(239,68,68,0.1)',
              }}
            >
              {/* Video placeholder */}
              <div
                className="relative aspect-video flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(5,10,20,0.9) 100%)',
                }}
              >
                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-2 opacity-40 group-hover:opacity-80 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    \u25b6
                  </motion.div>
                  <p className="text-neutral-500 text-xs tracking-wider">SE\u00d1AL CLASIFICADA</p>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold tracking-wider bg-red-500/20 text-red-400/70 border border-red-500/20">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <span className="text-red-400/50 text-xs tracking-[0.2em] uppercase font-bold">
                  {video.tag}
                </span>
                <h4 className="text-neutral-300 text-sm font-bold mt-1 tracking-wide group-hover:text-red-400/80 transition-colors">
                  {video.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected point transition overlay */}
      <AnimatePresence>
        {selectedPoint?.navigateTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                \ud83d\udd34
              </motion.div>
              <motion.p
                className="text-red-400 font-bold tracking-[0.3em] text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                INICIANDO MISI\u00d3N...
              </motion.p>
              <p className="text-neutral-600 text-xs tracking-wider mt-2">
                CONECTANDO CON USHUAIA \u2022 HANTAVIRUS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-neutral-800/30 py-4 text-center">
        <p
          className="text-neutral-700 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)' }}
        >
          Micropia v6.0 \u2022 Red de Inteligencia Global \u2022 Vigilancia Epidemiol\u00f3gica en Tiempo Real
        </p>
      </div>
    </motion.div>
  );
}
