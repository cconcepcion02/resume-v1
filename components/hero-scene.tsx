"use client";

import { Float, RoundedBox, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function ScreenCode() {
  const lines = [
    [1.4, "#5eecc4"],
    [0.8, "#86a8a0"],
    [1.15, "#2dd4bf"],
    [0.55, "#86a8a0"],
    [1.3, "#22d3ee"],
    [0.72, "#86a8a0"],
  ] as const;

  return (
    <group position={[0, 0.15, 0.071]}>
      {lines.map(([width, color], index) => (
        <mesh key={`${width}-${index}`} position={[-0.55 + width / 2, 0.44 - index * 0.17, 0]}>
          <planeGeometry args={[width, 0.035]} />
          <meshBasicMaterial color={color} transparent opacity={index % 2 ? 0.42 : 0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Workstation() {
  const rig = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const screenGlow = useRef<THREE.PointLight>(null);

  useFrame(({ clock, pointer }) => {
    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight * 3.5, 1), 1);
    if (rig.current) {
      rig.current.rotation.y = -0.34 + pointer.x * 0.13 + scroll * 0.6;
      rig.current.rotation.x = pointer.y * -0.045;
      rig.current.position.y = -0.25 + Math.sin(clock.elapsedTime * 0.55) * 0.035 - scroll * 1.4;
      rig.current.position.x = scroll * 1.4;
      rig.current.scale.setScalar(1 - scroll * 0.2);
    }
    if (orbit.current) {
      orbit.current.rotation.z = clock.elapsedTime * 0.08;
      orbit.current.rotation.x = 1.12 + Math.sin(clock.elapsedTime * 0.16) * 0.08;
    }
    if (screenGlow.current) {
      screenGlow.current.intensity = 4.4 + Math.sin(clock.elapsedTime * 2) * 0.55;
    }
  });

  return (
    <>
      <group ref={orbit}>
        <mesh>
          <torusGeometry args={[3.05, 0.012, 10, 160]} />
          <meshBasicMaterial color="#5eecc4" transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[0.22, 0.35, 0]}>
          <torusGeometry args={[2.46, 0.008, 10, 160]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
        </mesh>
        {[0, 1, 2].map((item) => (
          <mesh
            key={item}
            position={[
              Math.cos((item / 3) * Math.PI * 2) * 3.05,
              Math.sin((item / 3) * Math.PI * 2) * 3.05,
              0,
            ]}
          >
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color={item === 1 ? "#22d3ee" : "#5eecc4"} />
          </mesh>
        ))}
      </group>

      <group ref={rig} rotation={[0, -0.34, 0]}>
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.16}>
          <group>
            <RoundedBox args={[3.8, 0.18, 2.15]} radius={0.06} smoothness={4} position={[0, -1.05, 0]}>
              <meshStandardMaterial color="#10231f" roughness={0.62} metalness={0.38} />
            </RoundedBox>
            <mesh position={[-1.45, -1.67, 0]}>
              <cylinderGeometry args={[0.09, 0.12, 1.18, 12]} />
              <meshStandardMaterial color="#101b19" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[1.45, -1.67, 0]}>
              <cylinderGeometry args={[0.09, 0.12, 1.18, 12]} />
              <meshStandardMaterial color="#101b19" metalness={0.7} roughness={0.3} />
            </mesh>

            <group position={[0.15, 0.25, -0.15]}>
              <RoundedBox args={[2.8, 1.75, 0.14]} radius={0.08} smoothness={4}>
                <meshStandardMaterial color="#101b1a" roughness={0.26} metalness={0.72} />
              </RoundedBox>
              <mesh position={[0, 0, 0.075]}>
                <planeGeometry args={[2.57, 1.51]} />
                <meshStandardMaterial
                  color="#06110f"
                  emissive="#0a584a"
                  emissiveIntensity={0.65}
                  roughness={0.2}
                />
              </mesh>
              <ScreenCode />
              <mesh position={[0, -1.13, -0.02]}>
                <boxGeometry args={[0.16, 0.78, 0.12]} />
                <meshStandardMaterial color="#182825" metalness={0.82} roughness={0.25} />
              </mesh>
              <RoundedBox args={[0.96, 0.08, 0.52]} radius={0.04} smoothness={3} position={[0, -1.53, 0.02]}>
                <meshStandardMaterial color="#152622" metalness={0.72} roughness={0.3} />
              </RoundedBox>
              <pointLight ref={screenGlow} position={[0, 0.1, 1.1]} color="#5eecc4" intensity={4.5} distance={4.5} />
            </group>

            <group position={[0, -0.87, 0.35]} rotation={[-0.05, 0, 0]}>
              <RoundedBox args={[1.85, 0.09, 0.66]} radius={0.05} smoothness={3}>
                <meshStandardMaterial color="#152421" roughness={0.42} metalness={0.5} />
              </RoundedBox>
              {Array.from({ length: 32 }).map((_, index) => {
                const row = Math.floor(index / 8);
                const column = index % 8;
                return (
                  <mesh key={index} position={[-0.72 + column * 0.205, 0.058, -0.22 + row * 0.145]}>
                    <boxGeometry args={[0.15, 0.018, 0.09]} />
                    <meshBasicMaterial color={index % 7 === 0 ? "#5eecc4" : "#54706a"} />
                  </mesh>
                );
              })}
            </group>

            <group position={[1.43, -0.67, 0.45]}>
              <mesh>
                <cylinderGeometry args={[0.24, 0.2, 0.52, 32]} />
                <meshStandardMaterial color="#d8e7e2" roughness={0.35} />
              </mesh>
              <mesh position={[0.26, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.16, 0.045, 12, 30, Math.PI * 1.45]} />
                <meshStandardMaterial color="#d8e7e2" roughness={0.35} />
              </mesh>
            </group>
          </group>
        </Float>
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [0, 0.15, 7], fov: 43 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#06110f", 6.5, 14]} />
      <ambientLight intensity={0.52} color="#b8fff0" />
      <directionalLight position={[4, 5, 4]} intensity={2.8} color="#d8fff7" />
      <pointLight position={[-4, 1, 2]} intensity={7} distance={8} color="#22d3ee" />
      <pointLight position={[4, -2, 1]} intensity={6} distance={8} color="#34d399" />
      <Stars radius={35} depth={15} count={900} factor={2.4} saturation={0.4} fade speed={0.35} />
      <Sparkles count={70} scale={[7, 5, 4]} size={1.8} speed={0.28} color="#5eecc4" opacity={0.45} />
      <Workstation />
    </Canvas>
  );
}
