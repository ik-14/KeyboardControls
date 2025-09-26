import React, { useMemo, useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GrassMaterial } from "../../shaders/grassShader";

extend({ GrassMaterial });



export function InstancedGrass({
  count = 70000,
  area = 50,
  position = [0, 0, 0], // Default position
  minScale = 23.0, // Updated default: from Math.random() * 12.0 + 15.0 => min 15.0
  maxScale = 25.0, // Updated default: from Math.random() * 12.0 + 15.0 => max 27.0 (15.0 + 12.0)
  minColorVar = 0, // Updated default: from Math.random() * 0.5 + 0.4 => min 0.4
  maxColorVar = 0.6, // Updated default: from Math.random() * 0.5 + 0.4 => max 0.9 (0.4 + 0.5)
}) {
  const materialRef = useRef();
  const meshRef = useRef();
  const { scene } = useThree();

  const { nodes } = useGLTF("models/Grass.glb");
  const bladeGeometry = useMemo(() => nodes.Grass_2.geometry.clone(), [nodes]);

  const offsets = useMemo(() => {
    const positions = [];
    const houseRadius = 10; // Exclusion radius around house
    
    let attempts = 0;
    while (positions.length < count * 3 && attempts < count * 3) {
      const x = (Math.random() - 0.5) * area;
      const z = (Math.random() - 0.5) * area;
      
      // Check if position is outside house exclusion zone
      const distanceFromHouse = Math.sqrt(x * x + z * z);
      if (distanceFromHouse > houseRadius) {
        const y = 0; // Flat terrain at y=0
        positions.push(x, y, z);
      }
      attempts++;
    }
    
    return new Float32Array(positions);
  }, [count, area]);

  const scales = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * (maxScale - minScale) + minScale;
    }
    return arr;
  }, [count, minScale, maxScale]);

  const rotations = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * Math.PI * 2;
    }
    return arr;
  }, [count]);

  const colorVariations = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * (maxColorVar - minColorVar) + minColorVar;
    }
    return arr;
  }, [count, minColorVar, maxColorVar]);

  const instancedGeometry = useMemo(() => {
    const geo = bladeGeometry.clone();
    geo.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3));
    geo.setAttribute("scale", new THREE.InstancedBufferAttribute(scales, 1));
    geo.setAttribute(
      "rotation",
      new THREE.InstancedBufferAttribute(rotations, 1)
    );
    geo.setAttribute(
      "colorVariation",
      new THREE.InstancedBufferAttribute(colorVariations, 1)
    );
    return geo;
  }, [bladeGeometry, offsets, scales, rotations, colorVariations]);

  useFrame(({ clock }) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      const player = scene.getObjectByName("character");
      if (player) {
        const localPlayerPos = meshRef.current.worldToLocal(
          player.position.clone()
        );
        materialRef.current.uPlayerPos.copy(localPlayerPos);
      }
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      geometry={instancedGeometry}
      args={[null, null, count]}
      frustumCulled={false}
      position={position}
    >
      <grassMaterial
        key={GrassMaterial.key}
        ref={materialRef}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
