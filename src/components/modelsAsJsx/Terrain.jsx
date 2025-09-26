export function Terrain(props) {
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[70, 70, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#2d4a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}
