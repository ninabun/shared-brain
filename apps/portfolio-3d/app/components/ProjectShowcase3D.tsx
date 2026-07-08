"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const palettes = [
  { glass: "#dff8ff", glow: "#86e8ff", deep: "#2569d8" },
  { glass: "#e7f6ff", glow: "#9fe6ff", deep: "#4257e6" },
  { glass: "#eefbff", glow: "#b5f5ff", deep: "#1976b8" },
  { glass: "#f2fbff", glow: "#98dcff", deep: "#6672ff" },
];

function GlassMaterial({ color, opacity = 0.46 }: { color: string; opacity?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.08}
      roughness={0.12}
      clearcoat={1}
      clearcoatRoughness={0.08}
      transmission={0.38}
      thickness={0.9}
      transparent
      opacity={opacity}
      envMapIntensity={1.2}
      side={THREE.DoubleSide}
    />
  );
}

function ShowcaseScene({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const palette = palettes[index % palettes.length];

  useFrame(({ clock, camera }) => {
    const elapsed = clock.getElapsedTime();
    const scroll = progress.get();
    const center = scroll - 0.5;

    camera.position.x += (center * 0.55 + Math.sin(elapsed * 0.2) * 0.08 - camera.position.x) * 0.035;
    camera.position.y += (-center * 0.22 + Math.cos(elapsed * 0.17) * 0.05 - camera.position.y) * 0.035;
    camera.position.z += (5.6 - scroll * 0.55 - camera.position.z) * 0.035;
    camera.lookAt(0, 0, 0);

    if (group.current) {
      group.current.rotation.x = -0.18 + center * 0.22 + Math.sin(elapsed * 0.18) * 0.025;
      group.current.rotation.y = 0.34 - center * 0.52 + Math.sin(elapsed * 0.24) * 0.035;
      group.current.position.y = center * -0.18;
      group.current.scale.setScalar(0.92 + scroll * 0.12);
    }

    if (ring.current) {
      ring.current.rotation.z = elapsed * 0.12 + scroll * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2.8, 3.2, 3]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-2.6, -1.2, 2.4]} intensity={4.6} color={palette.glow} />
      <pointLight position={[2.2, 0.6, 1.8]} intensity={2.8} color={palette.deep} />

      <group ref={group}>
        <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.18}>
          <RoundedBox args={[3.05, 2.05, 0.12]} radius={0.18} smoothness={8} position={[0, 0, 0]}>
            <GlassMaterial color={palette.glass} opacity={0.5} />
          </RoundedBox>
        </Float>

        <RoundedBox args={[2.44, 1.52, 0.08]} radius={0.14} smoothness={8} position={[0.08, -0.02, 0.16]}>
          <GlassMaterial color="#ffffff" opacity={0.24} />
        </RoundedBox>

        <mesh ref={ring} position={[0.08, 0.02, 0.28]} rotation={[0.08, 0.12, 0]}>
          <torusGeometry args={[0.95, 0.018, 18, 128]} />
          <meshPhysicalMaterial
            color={palette.deep}
            emissive={palette.glow}
            emissiveIntensity={0.22}
            metalness={0.18}
            roughness={0.18}
            clearcoat={1}
            transparent
            opacity={0.72}
          />
        </mesh>

        <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.25}>
          <mesh position={[-0.85, 0.48, 0.42]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <GlassMaterial color={palette.glow} opacity={0.62} />
          </mesh>
        </Float>

        <Float speed={0.75} rotationIntensity={0.08} floatIntensity={0.2}>
          <mesh position={[1.08, -0.42, 0.38]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <GlassMaterial color="#ffffff" opacity={0.5} />
          </mesh>
        </Float>

        <mesh position={[0.2, -0.86, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.55, 96]} />
          <meshBasicMaterial color={palette.deep} transparent opacity={0.055} />
        </mesh>
      </group>
    </>
  );
}

export default function ProjectShowcase3D({ index }: { index: number }) {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.86, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.86, 1], [0.92, 1, 1, 0.96]);
  const blur = useTransform(scrollYProgress, [0, 0.22, 0.86, 1], ["blur(18px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <motion.div ref={target} className="absolute inset-0" style={{ opacity, scale, filter: blur }}>
      {reduceMotion ? null : (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 5.6], fov: 42 }}
          dpr={[0.8, 1.35]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <ShowcaseScene index={index} progress={scrollYProgress} />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  );
}
