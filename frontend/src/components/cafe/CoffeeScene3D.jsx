import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Strictly brand palette (PDF): sage, pale sage, cream + derived sage tones
const PALETTE = ["#8A987A", "#BEC8A1", "#EAE2CC", "#6C7A5D", "#A7B58C", "#9FAE86"];

function Blob({ position, scale, speed, shape, color }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.x = t * speed * 0.5 + offset;
    ref.current.rotation.y = t * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    ref.current.position.x = position[0] + Math.cos(t * speed * 0.5 + offset) * 0.22;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === "capsule" ? (
        <capsuleGeometry args={[0.3, 0.34, 12, 24]} />
      ) : (
        <sphereGeometry args={[0.5, 32, 32]} />
      )}
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
    </mesh>
  );
}

function Field({ count }) {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 7.5,
          (Math.random() - 0.5) * 3 - 3.5,
        ],
        scale: 0.4 + Math.random() * 0.5,
        speed: 0.14 + Math.random() * 0.34,
        shape: i % 2 === 0 ? "sphere" : "capsule",
        color: PALETTE[i % PALETTE.length],
      });
    }
    return arr;
  }, [count]);

  return (
    <>
      {items.map((it, i) => (
        <Blob key={i} {...it} />
      ))}
    </>
  );
}

export default function CoffeeScene3D({ count = 13 }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={1.5} color="#fff7e6" />
      <pointLight position={[-6, -3, 2]} intensity={0.6} color="#BEC8A1" />
      <fog attach="fog" args={["#F6EFDE", 9, 17]} />
      <Field count={count} />
    </Canvas>
  );
}
