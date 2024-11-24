/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/gallerySign.glb -o GallerySign.jsx 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function GallerySign(props) {
  const { nodes, materials } = useGLTF("./public/models/gallerySign.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.001"]}
        scale={[-0.08, -1.753, -0.14]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["Material.002"]}
        position={[-0.017, 1.347, 0.019]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-0.114, -0.286, -1.196]}
      />
      <mesh
        geometry={nodes.Text.geometry}
        material={materials["Material.003"]}
        position={[0.157, 1.221, 0.779]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload("./public/models/gallerySign.glb");
