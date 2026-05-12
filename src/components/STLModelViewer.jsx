import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Procedural Flea Model ─────────────────────────────────────
   Since WeTransfer STL links expired, we create a detailed
   procedural flea using Three.js primitives. The flea consists of:
   head, thorax, abdomen, legs (6), antennae, mouthparts
   ───────────────────────────────────────────────────────────── */

function FleaBody({ color = '#8B4513' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const bodyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.4,
    metalness: 0.1,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3D1C00'),
    roughness: 0.5,
    metalness: 0.2,
  });

  const eyeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF2200'),
    emissive: new THREE.Color('#FF0000'),
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
  });

  const legMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5C2D00'),
    roughness: 0.6,
    metalness: 0.1,
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Head */}
      <mesh position={[0.9, 0.15, 0]} material={bodyMat}>
        <sphereGeometry args={[0.25, 16, 16]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[1.05, 0.28, 0.12]} material={eyeMat}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
      <mesh position={[1.05, 0.28, -0.12]} material={eyeMat}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>

      {/* Mouthparts (siphon) */}
      <mesh position={[1.2, -0.05, 0]} rotation={[0, 0, -0.5]} material={darkMat}>
        <cylinderGeometry args={[0.02, 0.01, 0.35, 8]} />
      </mesh>
      <mesh position={[1.18, -0.02, 0.03]} rotation={[0, 0, -0.4]} material={darkMat}>
        <cylinderGeometry args={[0.015, 0.008, 0.25, 8]} />
      </mesh>

      {/* Antennae */}
      <mesh position={[1.0, 0.4, 0.1]} rotation={[0.3, 0, 0.8]} material={darkMat}>
        <cylinderGeometry args={[0.01, 0.008, 0.3, 6]} />
      </mesh>
      <mesh position={[1.0, 0.4, -0.1]} rotation={[-0.3, 0, 0.8]} material={darkMat}>
        <cylinderGeometry args={[0.01, 0.008, 0.3, 6]} />
      </mesh>

      {/* Thorax */}
      <mesh position={[0.45, 0.1, 0]} material={bodyMat}>
        <sphereGeometry args={[0.3, 16, 16]} />
      </mesh>

      {/* Abdomen (large, flattened) */}
      <mesh position={[-0.3, 0.05, 0]} scale={[1.4, 0.8, 0.7]} material={bodyMat}>
        <sphereGeometry args={[0.45, 16, 16]} />
      </mesh>

      {/* Abdomen ridges */}
      {[-0.1, -0.3, -0.5].map((x, i) => (
        <mesh key={`ridge-${i}`} position={[x, 0.05, 0]} rotation={[0, 0, 0]} material={darkMat}>
          <torusGeometry args={[0.3 + i * 0.02, 0.01, 4, 16]} />
        </mesh>
      ))}

      {/* Front legs (pair) */}
      {[1, -1].map((side) => (
        <group key={`fleg-${side}`}>
          <mesh position={[0.6, -0.15, side * 0.15]} rotation={[side * 0.3, 0, -0.6]} material={legMat}>
            <cylinderGeometry args={[0.025, 0.02, 0.35, 6]} />
          </mesh>
          <mesh position={[0.52, -0.38, side * 0.2]} rotation={[side * 0.2, 0, 0.3]} material={legMat}>
            <cylinderGeometry args={[0.02, 0.015, 0.3, 6]} />
          </mesh>
        </group>
      ))}

      {/* Middle legs (pair) */}
      {[1, -1].map((side) => (
        <group key={`mleg-${side}`}>
          <mesh position={[0.3, -0.15, side * 0.2]} rotation={[side * 0.4, 0, -0.5]} material={legMat}>
            <cylinderGeometry args={[0.025, 0.02, 0.4, 6]} />
          </mesh>
          <mesh position={[0.2, -0.42, side * 0.28]} rotation={[side * 0.3, 0, 0.2]} material={legMat}>
            <cylinderGeometry args={[0.02, 0.015, 0.35, 6]} />
          </mesh>
        </group>
      ))}

      {/* Hind legs (large, powerful — for jumping) */}
      {[1, -1].map((side) => (
        <group key={`hleg-${side}`}>
          {/* Femur (thick) */}
          <mesh position={[-0.15, -0.1, side * 0.2]} rotation={[side * 0.3, 0, 0.8]} material={legMat}>
            <cylinderGeometry args={[0.04, 0.03, 0.5, 8]} />
          </mesh>
          {/* Tibia */}
          <mesh position={[-0.35, 0.2, side * 0.25]} rotation={[side * 0.2, 0, -0.4]} material={legMat}>
            <cylinderGeometry args={[0.03, 0.02, 0.55, 6]} />
          </mesh>
          {/* Tarsus */}
          <mesh position={[-0.5, -0.1, side * 0.3]} rotation={[side * 0.2, 0, -0.8]} material={legMat}>
            <cylinderGeometry args={[0.02, 0.01, 0.4, 6]} />
          </mesh>
        </group>
      ))}

      {/* Spines on body */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`spine-${i}`}
            position={[
              -0.3 + Math.cos(angle) * 0.35,
              0.05 + Math.sin(angle) * 0.25,
              Math.sin(angle + 1) * 0.15,
            ]}
            rotation={[0, 0, angle]}
            material={darkMat}
          >
            <coneGeometry args={[0.015, 0.08, 4]} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Procedural Plague Bacteria Model ──────────────────────────
   Yersinia pestis — rod-shaped bacterium (bacillus)
   with bipolar staining characteristic ("safety pin" appearance)
   ───────────────────────────────────────────────────────────── */

function PlagueBacteria({ color = '#6B21A8' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  const mainMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.3,
    metalness: 0.15,
    transparent: true,
    opacity: 0.9,
  });

  const poleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9333EA'),
    emissive: new THREE.Color('#7C3AED'),
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.3,
  });

  const capsuleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4C1D95'),
    roughness: 0.6,
    metalness: 0.05,
    transparent: true,
    opacity: 0.4,
  });

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Main rod body */}
      <mesh material={mainMat} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.2, 0.7, 16, 16]} />
      </mesh>

      {/* Bipolar dark staining (safety pin look) */}
      <mesh position={[-0.4, 0, 0]} material={poleMat}>
        <sphereGeometry args={[0.18, 12, 12]} />
      </mesh>
      <mesh position={[0.4, 0, 0]} material={poleMat}>
        <sphereGeometry args={[0.18, 12, 12]} />
      </mesh>

      {/* Outer capsule (slime layer) */}
      <mesh material={capsuleMat} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.28, 0.8, 12, 12]} />
      </mesh>

      {/* Surface bumps (antigen proteins) */}
      {[...Array(20)].map((_, i) => {
        const theta = (i / 20) * Math.PI * 2;
        const phi = ((i * 7) % 20) / 20 * Math.PI;
        const r = 0.26;
        return (
          <mesh
            key={`bump-${i}`}
            position={[
              Math.cos(theta) * r * 0.8 * Math.sin(phi),
              Math.sin(theta) * r,
              Math.cos(phi) * r * 0.8,
            ]}
            material={poleMat}
          >
            <sphereGeometry args={[0.025, 6, 6]} />
          </mesh>
        );
      })}

      {/* Colony cluster (smaller bacteria nearby) */}
      {[
        [0.7, 0.3, 0.2],
        [-0.6, -0.25, 0.3],
        [0.5, -0.35, -0.25],
      ].map((pos, i) => (
        <mesh key={`colony-${i}`} position={pos} material={mainMat} rotation={[i * 0.5, i * 0.3, Math.PI / 2]}>
          <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Loading Fallback ──────────────────────────────────────── */

function LoadingFallback() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color="#22c55e" wireframe />
    </mesh>
  );
}

/* ─── Main Viewer Component ─────────────────────────────────── */

export default function STLModelViewer({ modelType = 'flea', height = 350 }) {
  const [isInteracting, setIsInteracting] = useState(false);

  const config = {
    flea: {
      title: 'XENOPSYLLA CHEOPIS',
      subtitle: 'Pulga de la Rata \u2014 Vector de la Peste Negra',
      bgGradient: 'linear-gradient(180deg, rgba(139,69,19,0.08) 0%, rgba(5,5,10,0.98) 100%)',
      borderColor: 'rgba(168,85,247,0.2)',
      glowColor: 'rgba(168,85,247,0.1)',
      accentColor: '#a855f7',
      icon: '\ud83e\udeb3',
    },
    plague: {
      title: 'YERSINIA PESTIS',
      subtitle: 'Bacteria de la Peste Negra \u2014 Pat\u00f3geno BSL-3',
      bgGradient: 'linear-gradient(180deg, rgba(107,33,168,0.08) 0%, rgba(5,5,10,0.98) 100%)',
      borderColor: 'rgba(147,51,234,0.2)',
      glowColor: 'rgba(147,51,234,0.1)',
      accentColor: '#9333EA',
      icon: '\u2623',
    },
  };

  const cfg = config[modelType] || config.flea;

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: cfg.bgGradient,
        border: `1px solid ${cfg.borderColor}`,
        boxShadow: `0 0 40px ${cfg.glowColor}`,
      }}
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b" style={{ borderColor: `${cfg.accentColor}15` }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{cfg.icon}</span>
          <div>
            <h3 className="font-bold text-xs tracking-[0.2em] uppercase" style={{ color: cfg.accentColor }}>
              MODELO 3D \u2014 {cfg.title}
            </h3>
            <p className="text-neutral-600 text-[10px] tracking-wider">{cfg.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isInteracting && (
            <span className="text-[9px] px-2 py-0.5 rounded tracking-wider font-bold animate-pulse"
              style={{ background: `${cfg.accentColor}20`, color: cfg.accentColor, border: `1px solid ${cfg.accentColor}30` }}
            >
              INTERACTIVO
            </span>
          )}
          <span className="text-[9px] px-2 py-0.5 rounded tracking-wider font-bold"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            3D ACTIVO
          </span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div style={{ height, position: 'relative' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
          style={{
            backgroundImage: `linear-gradient(${cfg.accentColor}80 1px, transparent 1px), linear-gradient(90deg, ${cfg.accentColor}80 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <Canvas
          camera={{ position: [2, 1.5, 2], fov: 45 }}
          style={{ background: 'transparent' }}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#a855f7" />
          <pointLight position={[0, -2, 0]} intensity={0.3} color="#22c55e" />

          <Suspense fallback={<LoadingFallback />}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              {modelType === 'flea' ? <FleaBody /> : <PlagueBacteria />}
            </Float>
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={6}
            autoRotate={!isInteracting}
            autoRotateSpeed={1}
          />

          {/* Grid plane */}
          <gridHelper args={[4, 20, `${cfg.accentColor}`, '#111']} position={[0, -0.8, 0]} />
        </Canvas>
      </div>

      {/* Controls hint */}
      <div className="px-4 py-2 flex items-center justify-between border-t" style={{ borderColor: `${cfg.accentColor}10` }}>
        <div className="flex items-center gap-3">
          <span className="text-neutral-600 text-[10px] tracking-wider">\ud83d\uddb1 ARRASTRAR: Rotar</span>
          <span className="text-neutral-600 text-[10px] tracking-wider">\ud83d\udd0d SCROLL: Zoom</span>
        </div>
        <span className="text-neutral-700 text-[10px] tracking-wider">MODELO PROCEDURAL \u2022 THREE.JS</span>
      </div>
    </div>
  );
}
