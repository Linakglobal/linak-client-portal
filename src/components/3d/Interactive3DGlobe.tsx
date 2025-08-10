"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Country coordinates and data
const countryLocations = [
  {
    id: "canada",
    name: "Canada",
    lat: 56.1304,
    lng: -106.3468,
    color: "#FF6B6B",
  },
  {
    id: "australia",
    name: "Australia",
    lat: -25.2744,
    lng: 133.7751,
    color: "#4ECDC4",
  },
  {
    id: "singapore",
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    color: "#45B7D1",
  },
  {
    id: "germany",
    name: "Germany",
    lat: 51.1657,
    lng: 10.4515,
    color: "#96CEB4",
  },
  { id: "italy", name: "Italy", lat: 41.8719, lng: 12.5674, color: "#FFEAA7" },
  { id: "spain", name: "Spain", lat: 40.4637, lng: -3.7492, color: "#DDA0DD" },
  {
    id: "armenia",
    name: "Armenia",
    lat: 40.0691,
    lng: 45.0382,
    color: "#FD79A8",
  },
  {
    id: "georgia",
    name: "Georgia",
    lat: 42.3154,
    lng: 43.3569,
    color: "#FDCB6E",
  },
  {
    id: "russia",
    name: "Russia",
    lat: 61.524,
    lng: 105.3188,
    color: "#6C5CE7",
  },
];

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Animated marker component
function CountryMarker({
  position,
  color,
  name,
  onClick,
  isHovered,
  onHover,
}: {
  readonly position: THREE.Vector3;
  readonly color: string;
  readonly name: string;
  readonly onClick: () => void;
  readonly isHovered: boolean;
  readonly onHover: (hovered: boolean) => void;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const { clock } = state;
    if (markerRef.current) {
      // Gentle floating animation
      markerRef.current.position.y =
        position.y + Math.sin(clock.elapsedTime * 2) * 0.02;

      // Pulsing effect
      const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
      markerRef.current.scale.setScalar(isHovered ? scale * 1.5 : scale);
    }

    if (pulseRef.current) {
      // Outer pulse ring
      const pulseScale = 1 + Math.sin(clock.elapsedTime * 2) * 0.3;
      pulseRef.current.scale.setScalar(pulseScale);

      // Fade pulse ring
      const material = pulseRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group>
      {/* Main marker */}
      <mesh
        ref={markerRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={pulseRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Country label */}
      {isHovered && (
        <group position={[position.x, position.y + 0.15, position.z]}>
          <mesh>
            <planeGeometry args={[name.length * 0.08, 0.15]} />
            <meshBasicMaterial color="rgba(0,0,0,0.7)" transparent />
          </mesh>
          {/* Text rendering removed due to font loading complexity */}
        </group>
      )}
    </group>
  );
}

// Main Earth globe component
function EarthGlobe({
  onCountrySelect,
}: {
  readonly onCountrySelect: (countryId: string) => void;
}) {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Create earth texture
  const earthTexture = useMemo(() => {
    // Create a simple procedural earth texture
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;

    // Gradient for earth colors
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.3, "#16213e");
    gradient.addColorStop(0.7, "#0f3460");
    gradient.addColorStop(1, "#1a1a2e");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add some "land masses" (simple shapes)
    context.fillStyle = "#2d3748";
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 30 + 10;

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (globeRef.current) {
      // Slow rotation
      globeRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Main Earth sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial map={earthTexture} transparent opacity={0.9} />
      </mesh>

      {/* Country markers */}
      {countryLocations.map((country) => {
        const position = latLngToVector3(country.lat, country.lng, 2.05);
        return (
          <CountryMarker
            key={country.id}
            position={position}
            color={country.color}
            name={country.name}
            onClick={() => onCountrySelect(country.id)}
            isHovered={hoveredCountry === country.id}
            onHover={(hovered) =>
              setHoveredCountry(hovered ? country.id : null)
            }
          />
        );
      })}
    </>
  );
}

// Main 3D Globe component
export default function Interactive3DGlobe({
  onCountrySelect,
  className = "",
}: {
  readonly onCountrySelect: (countryId: string) => void;
  readonly className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`relative bg-gradient-to-br from-slate-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#64FFDA"
        />

        <EarthGlobe onCountrySelect={onCountrySelect} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxDistance={8}
          minDistance={3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay instructions */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        <p>🌍 Click countries to explore</p>
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <p className="text-white/80 text-xs mb-2 font-semibold">
          Success Programs
        </p>
        <div className="grid grid-cols-3 gap-1">
          {countryLocations.slice(0, 6).map((country) => (
            <div key={country.id} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: country.color }}
              />
              <span className="text-white/70 text-xs">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
