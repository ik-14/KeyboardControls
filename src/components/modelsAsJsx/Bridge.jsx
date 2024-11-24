/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/stage/bridge.glb -o Bridge.jsx 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Bridge(props) {
  const { nodes, materials } = useGLTF("./public/models/stage/bridge.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[-6.238, 17.821, 13.612]} scale={8.719}>
          <mesh
            geometry={nodes.Long_bridge_M_Human_props_0.geometry}
            material={materials["M_Human_props.001"]}
            position={[0.011, -3.473, 3.289]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/public/models/stage/bridge.glb");