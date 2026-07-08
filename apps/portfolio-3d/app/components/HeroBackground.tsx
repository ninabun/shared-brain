"use client";

import { Float, Line, PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type PointerState = {
  x: number;
  y: number;
};

type ViewportState = {
  isMobile: boolean;
  isTablet: boolean;
  isPortrait: boolean;
};

const HERO_IMAGE = "/images/hero-ai-healthcare.png";
const WATER_FRAME_COUNT = 30;
const WATER_FRAMES = Array.from(
  { length: WATER_FRAME_COUNT },
  (_, index) => `/images/hero-water-sequence/frame-${String(index + 1).padStart(3, "0")}.jpg`
);

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function NeuralHealthcareField({
  pointer,
  isMobile,
}: {
  pointer: React.MutableRefObject<PointerState>;
  isMobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const glass = useRef<THREE.Mesh>(null);

  const particles = useMemo(() => {
    const count = isMobile ? 180 : 360;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const layer = seededNoise(i + 19) > 0.58 ? 1 : -1;
      const x = (seededNoise(i + 2) - 0.5) * 10.5;
      const y = (seededNoise(i + 47) - 0.5) * 4.8;
      const z = (seededNoise(i + 91) - 0.5) * 4.2 + layer * 0.65;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [isMobile]);

  const neuralPaths = useMemo(
    () =>
      Array.from({ length: isMobile ? 5 : 8 }, (_, pathIndex) => {
        const offset = pathIndex * 0.64;
        const yOffset = (pathIndex - 3.5) * 0.26;
        return Array.from({ length: 42 }, (_, pointIndex) => {
          const t = pointIndex / 5.7;
          return new THREE.Vector3(
            (pointIndex - 21) * 0.28,
            Math.sin(t + offset) * 0.58 + Math.cos(t * 0.48 + offset) * 0.22 + yOffset,
            Math.cos(t * 0.7 + offset) * 0.62 + (pathIndex % 2 ? 0.35 : -0.35)
          );
        });
      }),
    [isMobile]
  );

  const networkNodes = useMemo(
    () =>
      Array.from({ length: isMobile ? 11 : 18 }, (_, index) => {
        const lane = index % 6;
        const depth = index % 3;
        return new THREE.Vector3(
          (lane - 2.5) * 1.25 + (seededNoise(index + 211) - 0.5) * 0.5,
          Math.sin(index * 0.9) * 1.15 + (seededNoise(index + 317) - 0.5) * 0.5,
          (depth - 1) * 0.86 + (seededNoise(index + 419) - 0.5) * 0.5
        );
      }),
    [isMobile]
  );

  useFrame(({ clock, camera }) => {
    const elapsed = clock.getElapsedTime();
    const scrollDepth =
      typeof window === "undefined" ? 0 : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 5);
    const chapter = Math.min(scrollDepth / 4, 1);
    const targetX = pointer.current.x * (isMobile ? 0.16 : 0.42);
    const targetY = pointer.current.y * (isMobile ? 0.12 : 0.28);

    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY + chapter * 0.55 - camera.position.y) * 0.035;
    camera.position.z +=
      ((isMobile ? 8.8 : 7.4) + scrollDepth * 0.58 + Math.sin(elapsed * 0.18) * 0.22 - camera.position.z) *
      0.04;

    if (group.current) {
      group.current.rotation.y = elapsed * 0.035 + pointer.current.x * 0.035 + chapter * 0.38;
      group.current.rotation.x = Math.sin(elapsed * 0.14) * 0.05 - pointer.current.y * 0.025 - chapter * 0.12;
      group.current.position.x = (isMobile ? 0.2 : 1.25) - chapter * (isMobile ? 0.72 : 1.75);
      group.current.position.z = scrollDepth * 0.36;
      group.current.scale.setScalar((isMobile ? 0.82 : 1) + chapter * 0.18);
    }

    if (glass.current) {
      glass.current.rotation.z = elapsed * 0.025;
      glass.current.rotation.y = Math.sin(elapsed * 0.17) * 0.18;
    }
  });

  return (
    <group ref={group} position={[1.25, 0.1, 0]}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#dff8ff"
          size={0.018}
          sizeAttenuation
          depthWrite={false}
          opacity={0.62}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {neuralPaths.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 ? "#9befff" : "#f3fbff"}
          lineWidth={0.58}
          transparent
          opacity={index % 2 ? 0.19 : 0.13}
        />
      ))}

      {networkNodes.map((node, index) => (
        <Float key={index} speed={0.65 + index * 0.015} rotationIntensity={0.08} floatIntensity={0.18}>
          <mesh position={node}>
            <sphereGeometry args={[index % 4 === 0 ? 0.055 : 0.035, 16, 16]} />
            <meshBasicMaterial color={index % 3 === 0 ? "#f4fbff" : "#9befff"} transparent opacity={0.72} />
          </mesh>
        </Float>
      ))}

      <Float speed={0.85} rotationIntensity={0.14} floatIntensity={0.22}>
        <mesh ref={glass} position={[1.4, 0.2, -0.5]}>
          <icosahedronGeometry args={[1.35, 3]} />
          <meshPhysicalMaterial
            color="#dff8ff"
            metalness={0.18}
            roughness={0.16}
            transmission={0.28}
            thickness={0.6}
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      </Float>

      <mesh position={[1.15, -0.2, -1.4]} rotation={[0.2, -0.34, 0.08]}>
        <planeGeometry args={[4.8, 2.4, 1, 1]} />
        <meshBasicMaterial color="#bdefff" transparent opacity={0.035} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[-1.9, 0.7, -1.1]} rotation={[0.1, 0.42, -0.08]}>
        <planeGeometry args={[2.8, 1.35, 1, 1]} />
        <meshBasicMaterial color="#f4fbff" transparent opacity={0.026} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[2.35, -0.85, -0.9]} rotation={[-0.18, -0.35, 0.1]}>
        <planeGeometry args={[2.2, 1.1, 1, 1]} />
        <meshBasicMaterial color="#8edfff" transparent opacity={0.032} blending={THREE.AdditiveBlending} />
      </mesh>

      <ambientLight intensity={0.72} />
      <pointLight position={[2.8, 1.6, 2.7]} intensity={10.5} color="#dff8ff" />
      <pointLight position={[-3.2, -1.8, 1.4]} intensity={5.5} color="#7aa8ff" />
      <spotLight position={[0.8, 3.2, 2.4]} angle={0.55} penumbra={0.8} intensity={6.5} color="#bdefff" />
    </group>
  );
}

export default function HeroBackground() {
  const pointer = useRef<PointerState>({ x: 0, y: 0 });
  const animatedImage = useRef<HTMLDivElement>(null);
  const frameIndex = useRef(0);
  const lastFrameUpdate = useRef(0);
  const lastScrollY = useRef(0);
  const [viewport, setViewport] = useState<ViewportState>({
    isMobile: false,
    isTablet: false,
    isPortrait: false,
  });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rawDepth = useTransform(scrollYProgress, [0, 0.55], [0, 96]);
  const depth = useSpring(rawDepth, { stiffness: 80, damping: 24, mass: 0.4 });
  const imageOpacity = useTransform(scrollYProgress, [0, 0.18, 0.48], [1, 0.82, 0.46]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.55, 0.82], [1, 0.86, 0.28]);
  const { isMobile, isTablet, isPortrait } = viewport;
  const backgroundPosition = isMobile ? (isPortrait ? "50% 36%" : "58% 46%") : isTablet ? "54% 44%" : "center";
  const backgroundSize = isMobile && isPortrait ? "auto 86svh" : "cover";

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1180,
        isPortrait: height >= width,
      });
    }

    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointer.current.y = -(event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
    }

    function handlePointerLeave() {
      pointer.current.x = 0;
      pointer.current.y = 0;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const layer = animatedImage.current;
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (!layer || Math.abs(delta) < 2 || now - lastFrameUpdate.current < 34) {
        return;
      }

      const direction = delta > 0 ? 1 : -1;
      const step = Math.max(1, Math.min(5, Math.round(Math.abs(delta) / 42)));
      frameIndex.current = (frameIndex.current + direction * step + WATER_FRAMES.length) % WATER_FRAMES.length;
      layer.style.backgroundImage = `url('${WATER_FRAMES[frameIndex.current]}')`;
      lastFrameUpdate.current = now;
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const layer = animatedImage.current;
    if (!layer) {
      return undefined;
    }

    layer.style.backgroundImage = `url('${HERO_IMAGE}')`;

    if (reduceMotion) {
      return undefined;
    }

    WATER_FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
    layer.style.backgroundImage = `url('${WATER_FRAMES[frameIndex.current]}')`;

    return undefined;
  }, [reduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      <motion.div
        ref={animatedImage}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          opacity: imageOpacity,
          y: depth,
          scale: isMobile && isPortrait ? 1 : 1.08,
          backgroundPosition,
          backgroundSize,
          backgroundRepeat: "no-repeat",
          filter: isMobile
            ? "brightness(1.58) contrast(1.1) saturate(1.12)"
            : "brightness(1.32) contrast(1.08) saturate(1.08)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_36%,rgba(190,242,255,0.16),transparent_30%),radial-gradient(circle_at_35%_52%,rgba(100,160,255,0.07),transparent_36%)] md:bg-[radial-gradient(circle_at_70%_36%,rgba(190,242,255,0.12),transparent_30%),radial-gradient(circle_at_35%_52%,rgba(100,160,255,0.06),transparent_36%)]" />

      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, isMobile ? 8.8 : 7.4], fov: isMobile ? 50 : 45 }}
        dpr={isMobile ? [0.75, 1] : [1, 1.55]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#04060a", 6.2, 13.5]} />
          <NeuralHealthcareField pointer={pointer} isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-r from-[#04060a]/28 via-[#04060a]/10 to-transparent md:from-[#04060a]/42 md:via-[#04060a]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060a]/42 via-transparent to-transparent md:from-[#04060a]/54" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:96px_96px] opacity-8" />
    </motion.div>
  );
}
