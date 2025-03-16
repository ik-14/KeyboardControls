import React, { useMemo, useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Debug version of GrassMaterial: outputs influence as grayscale.
const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    uPlayerPos: new THREE.Vector3(0, 0, 0),
    uPushRadius: 3.0, // Grass within 3 units will be affected.
    uPushStrength: 0.3, // How strongly the grass moves away.
  },
  /* Vertex Shader */
  /* glsl */ `
    precision mediump float;
    uniform float uTime;
    uniform vec3 uPlayerPos;
    uniform float uPushRadius;
    uniform float uPushStrength;
    
    attribute vec3 offset;
    attribute float scale;
    attribute float rotation;
    attribute float colorVariation;
    
    varying float vColorVariation;
    varying float vInfluence; // New: pass influence to fragment shader.
    
    void main() {
      vColorVariation = colorVariation;
      
      vec3 pos = position;
      
      // Wind effect: basic sine-based sway.
      pos.x += sin(uTime + offset.x * 10.0) * 0.1;
      pos.y += sin(uTime + offset.y * 10.0) * 0.05;
      
      // Rotate each blade around Y.
      float c = cos(rotation);
      float s = sin(rotation);
      mat3 rotMatrix = mat3(
        c, 0.0, -s,
        0.0, 1.0,  0.0,
        s, 0.0,  c
      );
      pos = rotMatrix * pos;
      
      // --- Player Interaction Effect ---
      // Calculate the distance in the xz-plane between this grass instance's base and the player.
      float dist = length(offset.xz - uPlayerPos.xz);
      float influence = smoothstep(uPushRadius, 0.0, dist);
      vInfluence = influence; // Pass influence for debugging.
      
      // Calculate push direction away from the player.
      vec2 pushDir = normalize(offset.xz - uPlayerPos.xz);
      pos.x += pushDir.x * influence * uPushStrength;
      pos.z += pushDir.y * influence * uPushStrength;
      
      // Apply per-instance scale and then translate by the offset.
      pos *= scale;
      pos += offset;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* Fragment Shader */
  /* glsl */ `
precision mediump float;
varying float vColorVariation;
varying float vInfluence;  // Influence from player proximity (0 = no influence, 1 = full influence)

void main() {
  // Base green color.
  vec3 baseColor = vec3(0.1, 0.6, 0.2);
  
  // Adjusted brightness calculation for darker grass.
  // Old: 0.7 + vColorVariation * 0.6; New: 0.4 + vColorVariation * 0.4;
  float brightness = 0.4 + vColorVariation * 0.4;
  vec3 finalColor = baseColor * brightness;
  
  // Define a highlight color (lighter green).
  vec3 highlightColor = vec3(0.3, 0.8, 0.4);
  
  // Mix the base color with the highlight based on the influence.
  finalColor = mix(finalColor, highlightColor, vInfluence);
  
  gl_FragColor = vec4(finalColor, 1.0);
}

  `
);

extend({ GrassMaterial });

export function InstancedGrass({ count = 1000000, area = 50, position }) {
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
      <grassMaterial ref={materialRef} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
