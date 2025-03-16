import { useGLTF } from "@react-three/drei";
import React from "react";

export function Terrain(props) {
  const { nodes, materials } = useGLTF("models/terrain.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        scale={[80, 1, 80]}
      >
        <meshStandardMaterial color="#3b6020" />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/terrain.glb");
