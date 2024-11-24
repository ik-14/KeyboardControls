/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/stage/model.glb -o Stage.jsx 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export function Stage(props) {
  const { nodes, materials } = useGLTF("./public/models/stage/model.glb");

  const newMaterial1 = new MeshStandardMaterial({
    color: "#4a4a4a",
    toneMapped: false,
  });
  const newMaterial2 = new MeshStandardMaterial({
    color: "#4a4a4a",
    toneMapped: true,
    emissive: "#303030",
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.footing_02.geometry}
        material={newMaterial2}
        position={[0.068, 0.165, -0.085]}
        scale={4.923}
      >
        <mesh
          geometry={nodes.footing.geometry}
          material={newMaterial1}
          position={[-0.014, -0.066, 0.017]}
          scale={[1.128, 1.028, 1.108]}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./public/models/stage/model.glb");