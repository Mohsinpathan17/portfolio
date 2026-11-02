import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";

const orbitColors = ["#62ecff", "#a98cff", "#b4fbbf"] as const;
const stars = Array.from({ length: 34 }, (_, i) => {
  const a = i * 2.399963229728653;
  const radius = 1.7 + (i % 7) * 0.17;
  return {
    x: Math.cos(a) * radius,
    y: Math.sin(i * 1.74) * 1.45,
    z: Math.sin(a) * radius,
    size: i % 4 === 0 ? 0.022 : 0.012,
  };
});

function Reactor({
  expanded,
  moving,
  active,
}: {
  expanded: boolean;
  moving: boolean;
  active: number;
}) {
  const root = useRef<Group>(null);
  const rings = useRef<(Group | null)[]>([]);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const ease = Math.min(delta * 2.6, 1);
    if (root.current) {
      root.current.rotation.y +=
        ((moving ? pointer.x * 0.27 + 0.18 : 0.18) -
          root.current.rotation.y) *
        ease;
      root.current.rotation.x +=
        ((moving ? pointer.y * -0.16 : 0) - root.current.rotation.x) *
        ease;
      root.current.position.y = moving ? Math.sin(t * 0.65) * 0.055 : 0;
    }
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.scale.setScalar(expanded ? 1.26 : 1);
      if (moving) ring.rotation.z = t * (i % 2 ? -0.16 : 0.13) + i;
      else ring.rotation.z = i;
    });
  });

  return (
    <group ref={root}>
      <mesh scale={1.2}>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshPhysicalMaterial
          color={orbitColors[active]}
          roughness={0.17}
          metalness={0.48}
          transmission={0.24}
          thickness={1.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh scale={1.23}>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshBasicMaterial
          color={orbitColors[active]}
          wireframe
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={0.6} rotation={[0.5, 0.35, 0.2]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0b173e"
          emissive={orbitColors[active]}
          emissiveIntensity={0.35}
          metalness={0.75}
          roughness={0.17}
          flatShading
        />
      </mesh>
      <mesh scale={0.36} rotation={[0, 0.6, 0.3]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#f8ffff" wireframe />
      </mesh>

      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(node) => {
            rings.current[i] = node;
          }}
          rotation={[0.55 + i * 0.55, i * 0.8, i]}
        >
          <mesh>
            <torusGeometry args={[1.15 + i * 0.25, i === active ? 0.025 : 0.011, 8, 112]} />
            <meshBasicMaterial
              color={orbitColors[i]}
              transparent
              opacity={i === active ? 0.95 : 0.34}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[1.15 + i * 0.25, 0, 0]}>
            <icosahedronGeometry args={[i === active ? 0.12 : 0.085, 1]} />
            <meshStandardMaterial
              color={orbitColors[i]}
              emissive={orbitColors[i]}
              emissiveIntensity={i === active ? 2.3 : 0.85}
              metalness={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {stars.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#63e6ff" : "#c6cbff"}
            transparent
            opacity={i % 4 === 0 ? 0.8 : 0.38}
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]}>
        <ringGeometry args={[1.1, 1.12, 80]} />
        <meshBasicMaterial color="#5a70da" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function AssemblyScene({
  expanded,
  moving,
  active,
  mobile,
  onReady,
}: {
  expanded: boolean;
  moving: boolean;
  active: number;
  mobile: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.25 : 1.5]}
      frameloop={moving ? "always" : "demand"}
      camera={{ position: [0, 0.3, 6.7], fov: mobile ? 43 : 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[2.8, 3, 3.5]} intensity={36} distance={12} color="#68e4ff" />
      <pointLight position={[-3, -1.2, 1]} intensity={23} distance={10} color="#9c74ff" />
      <directionalLight position={[0, 3, 2]} intensity={2.5} />
      <Reactor expanded={expanded} moving={moving} active={active} />
    </Canvas>
  );
}
