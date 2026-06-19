import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

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
      <meshPhysicalMaterial
        color={color}
        roughness={0.42}
        metalness={0.05}
        clearcoat={0.5}
        clearcoatRoughness={0.5}
      />
    </mesh>
  );
}

function Field({ count, pointer }) {
  const group = useRef();
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 7.5,
          (Math.random() - 0.5) * 4 - 3.5,
        ],
        scale: 0.4 + Math.random() * 0.5,
        speed: 0.14 + Math.random() * 0.34,
        shape: i % 2 === 0 ? "sphere" : "capsule",
        color: PALETTE[i % PALETTE.length],
      });
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!group.current) return;
    const tx = pointer.current.x * 0.28;
    const ty = -pointer.current.y * 0.2;
    group.current.rotation.y += (tx - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (ty - group.current.rotation.x) * 0.05;
    group.current.position.x += (pointer.current.x * 0.6 - group.current.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Blob key={i} {...it} />
      ))}
    </group>
  );
}

export default function CoffeeScene3D({ count = 13 }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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
      <fog attach="fog" args={["#F6EFDE", 8, 18]} />
      <Field count={count} pointer={pointer} />
    </Canvas>
  );
}
