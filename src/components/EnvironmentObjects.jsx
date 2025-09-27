import React, { useMemo } from 'react';
import * as THREE from 'three';
import { generateHeightmap } from '../utils/terrainGenerator';

function Tree({ position, scale }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[1.2, 8, 6]} />
        <meshLambertMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Rock({ position, scale }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.8]} />
      <meshLambertMaterial color="#696969" />
    </mesh>
  );
}

function Pebble({ position, scale }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.1, 6, 4]} />
      <meshLambertMaterial color="#A9A9A9" />
    </mesh>
  );
}

export function EnvironmentObjects({ area = 65 }) {
  const objects = useMemo(() => {
    const heightData = generateHeightmap(128, 128, 3);
    const houseRadius = 12;
    const trees = [];
    const rocks = [];
    const pebbles = [];
    
    // Trees (sparse)
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * area * 0.8;
      const z = (Math.random() - 0.5) * area * 0.8;
      
      if (Math.sqrt(x * x + z * z) > houseRadius) {
        const u = (x + area/2) / area;
        const v = (z + area/2) / area;
        const i = Math.floor(v * 127);
        const j = Math.floor(u * 127);
        const y = (i >= 0 && i < 128 && j >= 0 && j < 128) ? heightData[i * 128 + j] : 0;
        
        trees.push({
          position: [x, y, z],
          scale: Math.random() * 0.5 + 0.8
        });
      }
    }
    
    // Rocks (medium density)
    for (let i = 0; i < 25; i++) {
      const x = (Math.random() - 0.5) * area;
      const z = (Math.random() - 0.5) * area;
      
      if (Math.sqrt(x * x + z * z) > houseRadius) {
        const u = (x + area/2) / area;
        const v = (z + area/2) / area;
        const i = Math.floor(v * 127);
        const j = Math.floor(u * 127);
        const y = (i >= 0 && i < 128 && j >= 0 && j < 128) ? heightData[i * 128 + j] : 0;
        
        rocks.push({
          position: [x, y + 0.4, z],
          scale: Math.random() * 0.8 + 0.6
        });
      }
    }
    
    // Pebbles (high density)
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * area;
      const z = (Math.random() - 0.5) * area;
      
      if (Math.sqrt(x * x + z * z) > houseRadius) {
        const u = (x + area/2) / area;
        const v = (z + area/2) / area;
        const i = Math.floor(v * 127);
        const j = Math.floor(u * 127);
        const y = (i >= 0 && i < 128 && j >= 0 && j < 128) ? heightData[i * 128 + j] : 0;
        
        pebbles.push({
          position: [x, y + 0.05, z],
          scale: Math.random() * 0.5 + 0.3
        });
      }
    }
    
    return { trees, rocks, pebbles };
  }, [area]);
  
  return (
    <group>
      {objects.trees.map((tree, i) => (
        <Tree key={`tree-${i}`} position={tree.position} scale={tree.scale} />
      ))}
      {objects.rocks.map((rock, i) => (
        <Rock key={`rock-${i}`} position={rock.position} scale={rock.scale} />
      ))}
      {objects.pebbles.map((pebble, i) => (
        <Pebble key={`pebble-${i}`} position={pebble.position} scale={pebble.scale} />
      ))}
    </group>
  );
}