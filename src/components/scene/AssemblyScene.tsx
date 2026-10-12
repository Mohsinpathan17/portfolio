import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EdgesGeometry, ExtrudeGeometry, Group, Shape } from "three";
function boardGeometry() {
  const shape = new Shape(),
    w = 0.94,
    h = 0.76,
    r = 0.1;
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 6,
  });
  geometry.center();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
function Assembly({
  expanded,
  moving,
  active,
}: {
  expanded: boolean;
  moving: boolean;
  active: number;
}) {
  const root = useRef<Group>(null);
  const plates = useRef<(Group | null)[]>([]);
  const geometry = useMemo(boardGeometry, []),
    edges = useMemo(() => new EdgesGeometry(geometry, 30), [geometry]);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      const targetY =
        0.1 + (moving ? Math.sin(t * 0.18) * 0.1 + state.pointer.x * 0.1 : 0);
      root.current.rotation.y +=
        (targetY - root.current.rotation.y) * Math.min(delta * 3, 1);
      root.current.position.y = moving ? Math.sin(t * 0.65) * 0.025 : 0;
    }
    plates.current.forEach((plate, i) => {
      if (plate) {
        const target = (1 - i) * (expanded ? 0.68 : 0.36);
        plate.position.y = moving
          ? plate.position.y +
            (target - plate.position.y) * Math.min(delta * 5, 1)
          : target;
      }
    });
  });
  return (
    <group ref={root}>
      {[0, 1, 2].map((i) => (
        <group
          ref={(node) => {
            plates.current[i] = node;
          }}
          key={i}
          position={[0, (1 - i) * (expanded ? 0.68 : 0.36), 0]}
        >
          <mesh geometry={geometry}>
            <meshStandardMaterial
              color={i === active ? "#325de8" : i === 1 ? "#dce0e6" : "#e8e9e6"}
              metalness={i === active ? 0.35 : 0.55}
              roughness={0.35}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial
              color={i === active ? "#7497ff" : "#a6afb9"}
              transparent
              opacity={0.8}
            />
          </lineSegments>
          <mesh position={[0.25, 0.096, 0]}>
            <boxGeometry args={[0.57, 0.055, 0.55]} />
            <meshStandardMaterial
              color={i === active ? "#b2c6ff" : "#6c737d"}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {[-0.5, -0.35, -0.2].map((x) => (
            <mesh position={[x, 0.082, 0.09]} key={x}>
              <boxGeometry args={[0.05, 0.025, 0.6]} />
              <meshStandardMaterial
                color={i === active ? "#91b0ff" : "#9fa8af"}
              />
            </mesh>
          ))}
          {[-0.56, 0.56].map((z) => (
            <mesh position={[0.67, 0.075, z]} key={z}>
              <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
              <meshStandardMaterial
                color="#8593a3"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          ))}
          <mesh position={[0, -0.065, 0.62]}>
            <boxGeometry args={[0.64, 0.016, 0.09]} />
            <meshStandardMaterial
              color={i === active ? "#2848ae" : "#242d3a"}
            />
          </mesh>
        </group>
      ))}
      {[-0.75, 0.75].map((x) =>
        [-0.57, 0.57].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]}>
            <cylinderGeometry
              args={[0.035, 0.035, expanded ? 1.7 : 1.05, 10]}
            />
            <meshStandardMaterial
              color="#c5c9cc"
              metalness={0.65}
              roughness={0.3}
            />
          </mesh>
        )),
      )}
      <mesh position={[0, -0.97, 0]}>
        <cylinderGeometry args={[1.42, 1.42, 0.045, 64]} />
        <meshStandardMaterial color="#e3e4df" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.939, 0]}>
        <ringGeometry args={[1.23, 1.235, 64]} />
        <meshBasicMaterial color="#a6adaf" />
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
      camera={{ position: [3.5, 3, 4.7], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={() => onReady()}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 6, 3]} intensity={4} />
      <directionalLight position={[-4, 2, -2]} intensity={2} color="#ccd9ff" />
      <Assembly expanded={expanded} moving={moving} active={active} />
    </Canvas>
  );
}
