import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const PALETTE = {
  bean: "#5b3a24",
  beanDark: "#3f2715",
  sage: "#8A987A",
  paleSage: "#BEC8A1",
  cream: "#EAE2CC",
};

function Bean({ position, scale, speed, type }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.x = t * speed * 0.6 + offset;
    ref.current.rotation.y = t * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    ref.current.position.x = position[0] + Math.cos(t * speed * 0.5 + offset) * 0.25;
  });

  if (type === "orb") {
    const color = Math.random() > 0.5 ? PALETTE.paleSage : PALETTE.cream;
    return (
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
    );
  }

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <capsuleGeometry args={[0.26, 0.34, 12, 24]} />
        <meshStandardMaterial color={PALETTE.bean} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh scale={[0.06, 1.02, 0.5]}>
        <capsuleGeometry args={[0.26, 0.34, 8, 16]} />
        <meshStandardMaterial color={PALETTE.beanDark} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Field() {
  const items = useMemo(() => {
    const arr = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const isOrb = i % 4 === 0;
      arr.push({
        position: [
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 7.5,
          (Math.random() - 0.5) * 3 - 3.5,
        ],
        scale: isOrb ? 0.45 + Math.random() * 0.45 : 0.4 + Math.random() * 0.5,
        speed: 0.14 + Math.random() * 0.36,
        type: isOrb ? "orb" : "bean",
      });
    }
    return arr;
  }, []);

  return (
    <>
      {items.map((it, i) => (
        <Bean key={i} {...it} />
      ))}
    </>
  );
}

export default function CoffeeScene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} color="#fff7e6" />
      <pointLight position={[-6, -3, 2]} intensity={0.6} color="#BEC8A1" />
      <fog attach="fog" args={["#F6EFDE", 9, 17]} />
      <Field />
    </Canvas>
  );
}
