import { useMemo } from 'react';
import * as THREE from 'three';
import { generateHeightmap } from '../../utils/terrainGenerator';

export function Terrain({ size = 70, segments = 128, ...props }) {
  const geometry = useMemo(() => {
    const heightData = generateHeightmap(segments, segments, 3);
    const geo = new THREE.PlaneGeometry(size, size, segments - 1, segments - 1);
    
    // Apply height data to vertices
    const vertices = geo.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const index = Math.floor(i / 3);
      const row = Math.floor(index / segments);
      const col = index % segments;
      vertices[i + 2] = heightData[row * segments + col]; // Z becomes height
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [size, segments]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={geometry}
      >
        <meshStandardMaterial 
          color="#4a7c59" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
