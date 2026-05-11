import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity world map paths — recognizable coastlines and country borders
// Military satellite aesthetic: dark terrain with neon borders
const WORLD_PATHS = {
  // North America
  northAmerica: {
    // Alaska
    alaska: 'M 58 42 L 62 38 L 68 36 L 75 37 L 80 40 L 78 44 L 72 47 L 65 46 L 60 44 Z',
    // Canada
    canada: 'M 82 44 L 90 38 L 100 35 L 110 34 L 120 35 L 130 38 L 140 40 L 148 43 L 155 40 L 160 42 L 158 48 L 150 50 L 142 48 L 135 50 L 128 48 L 120 50 L 110 52 L 102 50 L 95 52 L 88 50 L 82 48 Z',
    // USA
    usa: 'M 82 52 L 90 50 L 100 52 L 110 54 L 118 56 L 130 55 L 138 57 L 145 56 L 152 58 L 158 56 L 160 60 L 155 63 L 148 65 L 140 66 L 130 65 L 120 67 L 110 66 L 100 68 L 92 67 L 85 65 L 80 60 L 82 55 Z',
    // Mexico & Central America
    mexico: 'M 80 68 L 88 67 L 95 70 L 100 72 L 108 74 L 115 76 L 120 78 L 118 82 L 112 84 L 108 82 L 102 80 L 96 78 L 90 76 L 85 74 L 82 72 Z',
    centralAm: 'M 112 84 L 118 82 L 122 85 L 125 88 L 128 91 L 132 94 L 134 97 L 130 99 L 126 96 L 122 93 L 118 90 L 115 87 Z',
  },
  // South America — with Argentina at proper southern extent
  southAmerica: {
    // Northern SA (Colombia/Venezuela/Guianas)
    northSA: 'M 135 100 L 142 97 L 150 98 L 158 100 L 165 103 L 170 107 L 175 104 L 180 106 L 178 112 L 172 115 L 165 114 L 158 116 L 150 115 L 142 112 L 136 108 L 133 104 Z',
    // Brazil
    brazil: 'M 142 116 L 150 115 L 158 116 L 165 118 L 175 117 L 182 120 L 188 124 L 190 130 L 188 138 L 184 146 L 178 152 L 172 158 L 165 162 L 158 164 L 152 160 L 148 154 L 145 146 L 143 138 L 140 130 L 138 122 Z',
    // Peru/Bolivia/Ecuador/Paraguay
    westernSA: 'M 130 104 L 136 108 L 140 115 L 138 122 L 140 130 L 142 138 L 140 145 L 136 150 L 132 146 L 128 140 L 125 132 L 122 124 L 120 116 L 122 110 L 126 106 Z',
    // Chile — long narrow strip
    chile: 'M 130 150 L 134 148 L 136 155 L 137 162 L 136 170 L 134 178 L 132 186 L 130 194 L 128 200 L 125 206 L 122 210 L 120 206 L 121 198 L 123 190 L 125 182 L 126 174 L 127 166 L 128 158 Z',
    // Argentina — extending to ~-55° latitude (Ushuaia/Tierra del Fuego)
    argentina: 'M 134 148 L 140 145 L 145 150 L 150 155 L 152 160 L 155 165 L 154 172 L 150 178 L 146 185 L 142 192 L 138 198 L 135 204 L 132 208 L 128 212 L 125 210 L 122 210 L 125 206 L 128 200 L 130 194 L 132 186 L 134 178 L 136 170 L 137 162 L 136 155 Z',
    // Tierra del Fuego (small island tip)
    tierraDelFuego: 'M 125 212 L 130 211 L 134 213 L 136 216 L 132 218 L 127 217 L 124 215 Z',
  },
  // Europe — detailed country borders
  europe: {
    // Scandinavia/Nordic
    scandinavia: 'M 278 24 L 282 20 L 288 18 L 294 20 L 298 24 L 296 30 L 292 35 L 288 38 L 284 36 L 280 32 L 278 28 Z',
    // British Isles
    britain: 'M 262 34 L 266 30 L 270 32 L 272 36 L 270 40 L 266 42 L 262 40 L 260 38 Z',
    ireland: 'M 256 34 L 260 32 L 262 35 L 261 38 L 258 40 L 255 38 Z',
    // Western Europe (France/Iberia)
    westernEu: 'M 260 42 L 268 40 L 276 42 L 280 44 L 278 48 L 274 52 L 270 54 L 264 56 L 258 54 L 254 50 L 252 46 L 256 44 Z',
    iberia: 'M 248 52 L 254 50 L 260 52 L 264 56 L 262 60 L 258 64 L 252 66 L 246 64 L 244 58 L 246 54 Z',
    // Central Europe (Germany/Poland/Italy)
    centralEu: 'M 278 42 L 286 40 L 294 42 L 300 44 L 304 48 L 300 52 L 294 54 L 288 52 L 282 50 L 278 48 Z',
    // Italy
    italy: 'M 278 52 L 282 50 L 286 54 L 288 58 L 286 62 L 284 66 L 280 70 L 276 68 L 274 64 L 276 58 Z',
    // Eastern Europe (Ukraine/Russia west)
    easternEu: 'M 300 36 L 308 34 L 316 36 L 324 38 L 330 40 L 334 44 L 330 48 L 324 50 L 318 48 L 310 50 L 304 48 L 298 44 L 300 40 Z',
    // Greece/Turkey west
    balkans: 'M 294 54 L 300 52 L 306 54 L 310 58 L 312 62 L 308 66 L 304 68 L 298 66 L 294 62 L 292 58 Z',
  },
  // Africa
  africa: {
    // North Africa (Morocco to Egypt)
    northAf: 'M 248 68 L 260 66 L 272 68 L 284 70 L 296 68 L 308 70 L 318 72 L 322 76 L 318 80 L 308 82 L 296 84 L 284 82 L 272 84 L 260 82 L 252 80 L 248 76 Z',
    // West Africa
    westAf: 'M 248 80 L 255 82 L 262 84 L 260 90 L 256 96 L 252 100 L 248 96 L 246 90 L 244 86 Z',
    // Central Africa
    centralAf: 'M 262 84 L 272 84 L 282 86 L 290 88 L 298 90 L 306 92 L 310 98 L 306 104 L 300 108 L 292 110 L 284 108 L 276 106 L 270 102 L 264 98 L 260 92 Z',
    // East Africa (Horn + East coast)
    eastAf: 'M 306 82 L 314 80 L 322 78 L 328 82 L 332 88 L 330 94 L 326 100 L 320 104 L 314 106 L 308 102 L 306 96 L 308 90 Z',
    // Southern Africa
    southAf: 'M 272 108 L 282 108 L 292 110 L 300 112 L 308 114 L 314 118 L 316 124 L 312 132 L 306 138 L 298 142 L 290 144 L 282 142 L 276 138 L 270 132 L 268 124 L 266 118 L 268 112 Z',
    // Madagascar
    madagascar: 'M 322 120 L 326 118 L 328 122 L 328 128 L 326 134 L 322 132 L 320 126 Z',
  },
  // Asia
  asia: {
    // Russia (mainland)
    russia: 'M 330 20 L 345 18 L 360 16 L 380 15 L 400 16 L 420 18 L 440 20 L 455 22 L 465 26 L 470 32 L 468 38 L 460 42 L 450 44 L 440 42 L 425 40 L 410 38 L 395 36 L 380 34 L 365 32 L 350 30 L 340 28 L 334 26 L 330 24 Z',
    // Middle East
    middleEast: 'M 316 62 L 326 58 L 336 56 L 346 58 L 352 62 L 356 68 L 352 74 L 346 78 L 338 80 L 330 78 L 324 74 L 318 70 L 316 66 Z',
    // Central Asia / Stans
    centralAsia: 'M 348 36 L 358 34 L 368 36 L 376 40 L 378 46 L 374 52 L 366 54 L 358 52 L 350 48 L 346 42 Z',
    // South Asia (India)
    india: 'M 356 68 L 366 64 L 376 66 L 384 70 L 388 76 L 390 84 L 386 92 L 380 98 L 372 102 L 364 100 L 358 96 L 354 88 L 352 80 L 354 74 Z',
    // China
    china: 'M 380 36 L 395 34 L 410 36 L 425 38 L 440 42 L 448 46 L 450 52 L 446 58 L 440 62 L 432 64 L 422 62 L 412 60 L 402 58 L 392 56 L 384 52 L 378 48 L 376 42 Z',
    // Southeast Asia
    seAsia: 'M 400 68 L 410 64 L 420 66 L 428 70 L 432 76 L 428 82 L 422 86 L 414 88 L 406 86 L 400 82 L 396 76 L 398 72 Z',
    // Japan
    japan: 'M 454 42 L 458 38 L 462 40 L 464 44 L 462 50 L 458 54 L 454 52 L 452 48 Z',
    // Korea
    korea: 'M 444 44 L 448 42 L 452 44 L 452 50 L 448 54 L 444 52 L 442 48 Z',
    // Indonesia/Philippines
    indonesia: 'M 408 92 L 415 90 L 422 92 L 430 94 L 438 96 L 445 98 L 450 100 L 448 104 L 440 106 L 432 104 L 424 102 L 416 100 L 410 98 Z',
  },
  // Oceania
  oceania: {
    // Australia
    australia: 'M 418 128 L 430 122 L 442 120 L 454 122 L 462 128 L 468 136 L 466 144 L 460 152 L 452 156 L 442 158 L 432 156 L 424 150 L 418 142 L 416 134 Z',
    // New Zealand
    nzNorth: 'M 478 150 L 482 148 L 484 152 L 482 156 L 478 154 Z',
    nzSouth: 'M 476 156 L 480 154 L 482 158 L 480 164 L 476 162 L 474 158 Z',
    // Papua New Guinea
    png: 'M 452 104 L 460 102 L 468 104 L 472 108 L 468 112 L 462 114 L 456 112 L 452 108 Z',
  },
};

// Active outbreak points — Argentina hotspot geographically accurate at Ushuaia
const OUTBREAK_POINTS = [
  {
    id: 'argentina',
    x: 130,
    y: 213,
    label: 'ARGENTINA — Ushuaia',
    sublabel: 'Brote Hantavirus • MV Hondius',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'china',
    x: 420,
    y: 52,
    label: 'CHINA — Wuhan',
    sublabel: 'Vigilancia Coronavirus',
    color: '#f97316',
    critical: false,
  },
  {
    id: 'congo',
    x: 292,
    y: 108,
    label: 'REP. DEM. CONGO',
    sublabel: 'Ébola — Monitoreo activo',
    color: '#f97316',
    critical: false,
  },
  {
    id: 'india',
    x: 374,
    y: 82,
    label: 'INDIA — Mumbai',
    sublabel: 'TB-XDR • Resistencia antibiótica',
    color: '#eab308',
    critical: false,
  },
  {
    id: 'brazil',
    x: 170,
    y: 130,
    label: 'BRASIL — Amazonas',
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
      <circle
        cx={point.x}
        cy={point.y}
        r={point.critical ? 8 : 5}
        fill={point.color}
        opacity="0.15"
        filter="url(#glow)"
      />
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
      <circle cx={point.x} cy={point.y} r="1.5" fill="#fff" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function renderRegionPaths(regionData, strokeColor, fillId) {
  return Object.entries(regionData).map(([key, d]) => (
    <path
      key={key}
      d={d}
      fill={fillId}
      stroke={strokeColor}
      strokeWidth="0.4"
      opacity="0.7"
      className="transition-opacity duration-300"
    />
  ));
}

export default function GlobalIntelligenceMap({ onNavigate }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [scanLine, setScanLine] = useState(0);
  const [dataFeed, setDataFeed] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 230 ? 0 : prev + 0.4));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const feeds = [
      '◈ SATÉLITE MICROPIA-7 — enlace activo',
      '◈ Sensor biológico #42 — Argentina — ALERTA',
      '◈ Red de vigilancia OMS — 147 nodos activos',
      '◈ Análisis genómico en tiempo real...',
      '◈ Hantavirus Andes — secuencia confirmada',
      '◈ MV Hondius — cuarentena nivel 3 activa',
      '◈ Paciente cero — rastreo en progreso...',
      '◈ Tierra del Fuego — perímetro sellado',
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

  // Border colors for different continents — military satellite neon palette
  const neonCyan = '#06d6d4';
  const neonBlue = '#3b82f6';
  const neonGreen = '#22c55e';
  const neonAmber = '#d97706';
  const neonPurple = '#a78bfa';
  const neonTeal = '#14b8a6';

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
            ◀ CONTENCIÓN
          </button>
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-red-400"
              style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.9rem)' }}
            >
              🌐 MAPA DE INTELIGENCIA GLOBAL
            </h1>
            <p
              className="tracking-[0.3em] text-neutral-600"
              style={{ fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)' }}
            >
              RED DE VIGILANCIA EPIDEMIOLÓGICA • MICROPIA v6.6
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

          {/* SVG Map — high-fidelity military satellite view */}
          <svg viewBox="0 0 520 240" className="w-full h-auto relative z-10">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="terrainGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Dark terrain fills — military satellite look */}
              <linearGradient id="terrainNA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0f2940" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="terrainSA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3352" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d2238" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="terrainEU" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#152d4a" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient id="terrainAF" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a3f52" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#1a2d3f" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="terrainAS" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1c3550" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#112840" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="terrainOC" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3050" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0f2238" stopOpacity="0.12" />
              </linearGradient>
              {/* Latitude/longitude grid pattern */}
              <pattern id="mapGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="40" y2="0" stroke="#22c55e" strokeWidth="0.15" opacity="0.15" />
                <line x1="0" y1="0" x2="0" y2="40" stroke="#22c55e" strokeWidth="0.15" opacity="0.15" />
              </pattern>
            </defs>

            {/* Background grid */}
            <rect width="520" height="240" fill="url(#mapGrid)" opacity="0.4" />

            {/* Equator line */}
            <line x1="0" y1="105" x2="520" y2="105" stroke="#22c55e" strokeWidth="0.3" opacity="0.12" strokeDasharray="6 4" />
            {/* Tropic of Cancer */}
            <line x1="0" y1="72" x2="520" y2="72" stroke="#22c55e" strokeWidth="0.2" opacity="0.08" strokeDasharray="4 6" />
            {/* Tropic of Capricorn */}
            <line x1="0" y1="138" x2="520" y2="138" stroke="#22c55e" strokeWidth="0.2" opacity="0.08" strokeDasharray="4 6" />

            {/* Scan line */}
            <line
              x1="0"
              y1={scanLine}
              x2="520"
              y2={scanLine}
              stroke="#22c55e"
              strokeWidth="0.5"
              opacity="0.25"
            />
            <line
              x1="0"
              y1={scanLine}
              x2="520"
              y2={scanLine}
              stroke="#22c55e"
              strokeWidth="2"
              opacity="0.05"
              filter="url(#glow)"
            />

            {/* North America — neon cyan borders */}
            {renderRegionPaths(WORLD_PATHS.northAmerica, neonCyan, 'url(#terrainNA)')}

            {/* South America — neon green borders */}
            {renderRegionPaths(WORLD_PATHS.southAmerica, neonGreen, 'url(#terrainSA)')}

            {/* Europe — neon blue borders */}
            {renderRegionPaths(WORLD_PATHS.europe, neonBlue, 'url(#terrainEU)')}

            {/* Africa — neon amber borders */}
            {renderRegionPaths(WORLD_PATHS.africa, neonAmber, 'url(#terrainAF)')}

            {/* Asia — neon purple borders */}
            {renderRegionPaths(WORLD_PATHS.asia, neonPurple, 'url(#terrainAS)')}

            {/* Oceania — neon teal borders */}
            {renderRegionPaths(WORLD_PATHS.oceania, neonTeal, 'url(#terrainOC)')}

            {/* Connection lines from Argentina to other hotspots */}
            {OUTBREAK_POINTS.filter((p) => p.id !== 'argentina').map((p) => (
              <line
                key={`line-${p.id}`}
                x1={130}
                y1={213}
                x2={p.x}
                y2={p.y}
                stroke="#ef4444"
                strokeWidth="0.3"
                opacity="0.12"
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

            {/* Argentina critical label — near Tierra del Fuego */}
            <g>
              <text x="90" y="208" fill="#ef4444" fontSize="4.5" fontFamily="monospace" opacity="0.8" fontWeight="bold">
                ▼ ALERTA CRÍTICA
              </text>
              <text x="96" y="220" fill="#ef4444" fontSize="3" fontFamily="monospace" opacity="0.5">
                USHUAIA • TIERRA DEL FUEGO
              </text>
              <text x="96" y="226" fill="#ef4444" fontSize="3" fontFamily="monospace" opacity="0.4">
                HANTAVIRUS ANDES • ACTIVO
              </text>
            </g>

            {/* Continental labels — subtle */}
            <text x="105" y="60" fill={neonCyan} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              NORTEAMÉRICA
            </text>
            <text x="140" y="145" fill={neonGreen} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              SUDAMÉRICA
            </text>
            <text x="270" y="38" fill={neonBlue} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              EUROPA
            </text>
            <text x="275" y="95" fill={neonAmber} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              ÁFRICA
            </text>
            <text x="390" y="30" fill={neonPurple} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              ASIA
            </text>
            <text x="430" y="140" fill={neonTeal} fontSize="3.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">
              OCEANÍA
            </text>
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
                    ▶ CLIC PARA INICIAR MISIÓN
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
              { color: '#ef4444', label: 'CRÍTICO — Misión activa', blink: true },
              { color: '#f97316', label: 'ALTO — Monitoreo intensivo', blink: false },
              { color: '#eab308', label: 'MODERADO — Vigilancia', blink: false },
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
              🔴 IR A MISIÓN: HANTAVIRUS ARGENTINA
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
            📡 TRANSMISIONES DE INTELIGENCIA
          </h3>
          <p className="text-neutral-600 text-xs tracking-wider">
            Material educativo clasificado sobre amenazas biológicas
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Hantavirus: Origen y Transmisión', tag: 'EDUCATIVO', duration: '12:34' },
            { title: 'MV Hondius: Reconstrucción del Brote', tag: 'INVESTIGACIÓN', duration: '08:47' },
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
              <div
                className="relative aspect-video flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(5,10,20,0.9) 100%)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                  }}
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-2 opacity-40 group-hover:opacity-80 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    ▶
                  </motion.div>
                  <p className="text-neutral-500 text-xs tracking-wider">SEÑAL CLASIFICADA</p>
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
                🔴
              </motion.div>
              <motion.p
                className="text-red-400 font-bold tracking-[0.3em] text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                INICIANDO MISIÓN...
              </motion.p>
              <p className="text-neutral-600 text-xs tracking-wider mt-2">
                CONECTANDO CON USHUAIA • HANTAVIRUS
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
          Micropia v6.6 • Red de Inteligencia Global • Vigilancia Epidemiológica en Tiempo Real
        </p>
      </div>
    </motion.div>
  );
}
