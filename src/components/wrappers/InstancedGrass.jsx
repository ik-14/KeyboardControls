import React, { useMemo, useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GrassMaterial } from "../../shaders/grassShader";

extend({ GrassMaterial });

export function InstancedGrass({ count = 2000000, area = 50, position }) {
  const materialRef = useRef();
  const meshRef = useRef();
  const { scene } = useThree();

  // Load the grass blade model.
  const { nodes } = useGLTF("models/grassBlade.glb");
  const bladeGeometry = useMemo(
    () => nodes.brush_Spikes_g0_b0.geometry.clone(),
    [nodes]
  );

  // Generate per-instance attributes.
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
      arr[i] = Math.random() * 1.0 + 0.3;
    }
    return arr;
  }, [count]);

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
      arr[i] = Math.random();
    }
    return arr;
  }, [count]);

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
        // Convert the player's world position to the local space of the grass mesh.
        const localPlayerPos = meshRef.current.worldToLocal(
          player.position.clone()
        );
        materialRef.current.uPlayerPos.copy(localPlayerPos);
        // Optional: log to verify
        // console.log("Local player pos:", localPlayerPos);
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
