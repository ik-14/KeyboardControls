import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { generateHeightmap } from '../utils/terrainGenerator';

export function BotWGrass({ count = 30000, area = 45, position = [0, 0, 0], fogMultiplier = 1.0 }) {
  const meshRef = useRef();
  const { scene } = useThree();
  
  const { geometry, positions } = useMemo(() => {
    const heightData = generateHeightmap(128, 128, 3);
    const houseRadius = 10;
    
    // Create grass blade geometry
    const bladeGeometry = new THREE.PlaneGeometry(0.1, 0.6);
    bladeGeometry.translate(0, 0.3, 0);
    
    const instancedGeo = new THREE.InstancedBufferGeometry();
    instancedGeo.copy(bladeGeometry);
    
    const grassPositions = [];
    const scales = [];
    const rotations = [];
    const windOffsets = [];
    
    let attempts = 0;
    while (grassPositions.length < count * 3 && attempts < count * 3) {
      const x = (Math.random() - 0.5) * area;
      const z = (Math.random() - 0.5) * area;
      
      const distanceFromHouse = Math.sqrt(x * x + z * z);
      if (distanceFromHouse > houseRadius) {
        const u = (x + area/2) / area;
        const v = (z + area/2) / area;
        const i = Math.floor(v * 127);
        const j = Math.floor(u * 127);
        const y = (i >= 0 && i < 128 && j >= 0 && j < 128) ? heightData[i * 128 + j] : 0;
        
        grassPositions.push(x, y, z);
        scales.push(Math.random() * 0.4 + 0.8);
        rotations.push(Math.random() * Math.PI * 2);
        windOffsets.push(Math.random() * Math.PI * 2);
      }
      attempts++;
    }
    
    instancedGeo.setAttribute('grassPosition', new THREE.InstancedBufferAttribute(new Float32Array(grassPositions), 3));
    instancedGeo.setAttribute('scale', new THREE.InstancedBufferAttribute(new Float32Array(scales), 1));
    instancedGeo.setAttribute('rotation', new THREE.InstancedBufferAttribute(new Float32Array(rotations), 1));
    instancedGeo.setAttribute('windOffset', new THREE.InstancedBufferAttribute(new Float32Array(windOffsets), 1));
    
    return { geometry: instancedGeo, positions: grassPositions };
  }, [count, area]);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPlayerPos: { value: new THREE.Vector3(0, 0, 0) },
        uPushRadius: { value: 2.0 },
        uPushStrength: { value: 1.5 },
        uFogColor: { value: new THREE.Color('#a8c8ec') },
        uFogNear: { value: 15 },
        uFogFar: { value: 80 },
        uFogMultiplier: { value: fogMultiplier }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uPlayerPos;
        uniform float uPushRadius;
        uniform float uPushStrength;
        
        attribute vec3 grassPosition;
        attribute float scale;
        attribute float rotation;
        attribute float windOffset;
        
        varying vec3 vColor;
        varying float vFogDepth;
        
        void main() {
          vec3 pos = position;
          pos *= scale;
          
          // Wind sway
          float windStrength = sin(uTime * 1.5 + windOffset) * 0.15;
          pos.x += windStrength * position.y;
          
          // Rotation
          float c = cos(rotation);
          float s = sin(rotation);
          mat3 rotMatrix = mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
          pos = rotMatrix * pos;
          
          // Character interaction
          float dist = length(grassPosition.xz - uPlayerPos.xz);
          float influence = smoothstep(uPushRadius, 0.0, dist);
          vec2 pushDir = normalize(grassPosition.xz - uPlayerPos.xz);
          pos.x += pushDir.x * influence * uPushStrength;
          pos.z += pushDir.y * influence * uPushStrength;
          
          pos += grassPosition;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vFogDepth = -mvPosition.z;
          
          // BotW grass colors
          float colorVar = (sin(grassPosition.x * 0.1) + cos(grassPosition.z * 0.1)) * 0.5 + 0.5;
          vColor = mix(vec3(0.3, 0.6, 0.2), vec3(0.5, 0.8, 0.3), colorVar);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;
        uniform float uFogMultiplier;
        
        varying vec3 vColor;
        varying float vFogDepth;
        
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
          
          float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth) * uFogMultiplier;
          gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, clamp(fogFactor, 0.0, 1.0));
        }
      `,
      side: THREE.DoubleSide
    });
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current && material) {
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Update fog color to match scene fog
      if (scene.fog) {
        material.uniforms.uFogColor.value.copy(scene.fog.color);
        material.uniforms.uFogNear.value = scene.fog.near;
        material.uniforms.uFogFar.value = scene.fog.far;
        material.uniforms.uFogMultiplier.value = fogMultiplier;
      }
      
      const player = scene.getObjectByName('character');
      if (player) {
        const localPlayerPos = meshRef.current.worldToLocal(player.position.clone());
        material.uniforms.uPlayerPos.value.copy(localPlayerPos);
      }
    }
  });
  
  return (
    <instancedMesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      args={[null, null, count]}
      position={position}
      frustumCulled={false}
    />
  );
}