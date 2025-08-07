import React, { useMemo, useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GrassMaterial } from "../../shaders/grassShader"; // Adjust path if needed

extend({ GrassMaterial });

export function InstancedGrass({
  count = 70000,
  area = 50,
  position = [0, 0, 0], // Default position
  minScale = 13.0, // Updated default: from Math.random() * 12.0 + 15.0 => min 15.0
  maxScale = 27.0, // Updated default: from Math.random() * 12.0 + 15.0 => max 27.0 (15.0 + 12.0)
  minColorVar = 0, // Updated default: from Math.random() * 0.5 + 0.4 => min 0.4
  maxColorVar = 0.4, // Updated default: from Math.random() * 0.5 + 0.4 => max 0.9 (0.4 + 0.5)
}) {
  const materialRef = useRef();
  const meshRef = useRef();
  const { scene } = useThree();

  const { nodes } = useGLTF("models/Grass.glb");
  const bladeGeometry = useMemo(() => nodes.Grass_2.geometry.clone(), [nodes]);

  const offsets = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * area;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = (Math.random() - 0.5) * area;
    }
    return arr;
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
