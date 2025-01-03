/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/floorWithCampsite.glb -o FloorWithCampsite.jsx -s 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function FloorWithCampsite(props) {
  const { nodes, materials } = useGLTF("/models/floorWithCampsite.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.881, -0.337]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.path_B.geometry}
          material={materials["HalloweenBits.003"]}
          position={[0, 0, 2.929]}
          scale={[40, 100, 40]}
        />
      </group>
      <group position={[0, 0.928, 3.239]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.path_C001.geometry}
          material={materials["HalloweenBits.001"]}
          position={[-0.005, -0.017, 1.552]}
          scale={[40, 50, 48]}
        />
      </group>
      <group position={[0, 0.881, 0.365]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.path_B001.geometry}
          material={materials["HalloweenBits.004"]}
          position={[0, 0, 2.929]}
          scale={[40, 100, 40]}
        />
      </group>
      <group position={[0, 0.881, 1.079]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.path_B002.geometry}
          material={materials["HalloweenBits.005"]}
          position={[0, 0, 2.929]}
          scale={[40, 100, 40]}
        />
      </group>
      <group scale={[25, 1, 25]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Island_Cylinder014-Mesh"].geometry}
          material={materials.Dirt}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Island_Cylinder014-Mesh_1"].geometry}
          material={materials.Grass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube.geometry}
        material={materials.Stone}
        position={[-1.311, 1.241, -0.787]}
        scale={0.9}
      />
      <group position={[0.857, 1.466, -1.176]} scale={0.8}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Tent_Cube001-Mesh"].geometry}
          material={materials.Tent_M}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Tent_Cube001-Mesh_1"].geometry}
          material={materials.Tent_S}
        />
      </group>
      <group
        position={[1.059, 1.08, 1.179]}
        rotation={[0, -0.199, 0]}
        scale={[0.9, 1, 0.9]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Log_Cylinder002-Mesh"].geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Log_Cylinder002-Mesh_1"].geometry}
          material={materials.Wood_l_shade}
        />
      </group>
      <group position={[0, 1.1, 0.676]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Campfire_Cylinder009-Mesh"].geometry}
          material={materials["Stone.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Campfire_Cylinder009-Mesh_1"].geometry}
          material={materials["Wood.002"]}
        />
      </group>
      <group
        position={[2.568, 0.897, 0]}
        rotation={[Math.PI / 2, 0, 1.196]}
        scale={[0.4, 0.3, 0.4]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder016.geometry}
          material={materials["Red.025"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder016_1.geometry}
          material={materials["White.025"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder016_2.geometry}
          material={materials["BrownDark.018"]}
        />
      </group>
      <group
        position={[-1.175, 1.08, 0.962]}
        rotation={[0, 0.395, 0]}
        scale={[0.9, 1, 0.9]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Log_Cylinder002-Mesh001"].geometry}
          material={materials["Wood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Log_Cylinder002-Mesh001_1"].geometry}
          material={materials["Wood_l_shade.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube001.geometry}
        material={materials["Stone.001"]}
        position={[-0.738, 1.123, -1.073]}
        scale={[0.82, 0.48, 0.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube002.geometry}
        material={materials["Stone.002"]}
        position={[-1.056, 1.123, -1.305]}
        scale={[0.82, 0.48, 0.58]}
      />
      <group position={[-5.432, 3.046, -0.575]} scale={10}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1145296422.geometry}
          material={materials["mat20.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1145296422_1.geometry}
          material={materials.mat9}
        />
      </group>
      <group position={[-5.716, 2.45, -1.589]} scale={[7, 8, 8.2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh100681590.geometry}
          material={materials["mat19.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh100681590_1.geometry}
          material={materials["mat11.001"]}
        />
      </group>
      <group position={[2.357, 2.778, -6.329]} scale={10}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876.geometry}
          material={materials.mat9}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876_1.geometry}
          material={materials["mat20.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rocksA_forest.geometry}
        material={materials["Stone.007"]}
        position={[2.574, 0.881, 1.016]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.6, 0.7, 0.6]}
      />
      <group position={[3.485, 2.466, -5.92]} scale={[8.74, 8.56, 8.66]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876001.geometry}
          material={materials["mat9.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876001_1.geometry}
          material={materials["mat20.002"]}
        />
      </group>
      <group position={[0.608, 3.055, -5.467]} scale={[8.74, 11, 8.66]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876002.geometry}
          material={materials["mat9.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1610579876002_1.geometry}
          material={materials["mat20.003"]}
        />
      </group>
      <group position={[-0.819, 2.45, -1.986]} scale={[7, 8, 8.2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh100681590001.geometry}
          material={materials["mat19.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh100681590001_1.geometry}
          material={materials["mat11.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube004.geometry}
        material={materials["Stone.005"]}
        position={[-0.577, 1.156, -1.965]}
        scale={[1.1, 0.3, 0.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rocksA_forest002.geometry}
        material={materials["Stone.008"]}
        position={[1.973, 0.942, -1.941]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.4}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube003.geometry}
        material={materials["Stone.009"]}
        position={[2.897, 1.005, 0.709]}
        scale={[0.5, 0.2, 0.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube005.geometry}
        material={materials["Stone.010"]}
        position={[2.614, 1.005, -0.861]}
        scale={[0.68, 0.9, 0.44]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_Cube006.geometry}
        material={materials["Stone.011"]}
        position={[2.614, 1.005, -0.587]}
        scale={[0.5, 0.2, 0.3]}
      />
    </group>
  );
}

useGLTF.preload("/models/floorWithCampsite.glb");
