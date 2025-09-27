import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Cloud({ position, scale, speed }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += speed * 0.02;
      if (meshRef.current.position.x > 100) {
        meshRef.current.position.x = -100;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[2, 8, 6]} />
      <meshLambertMaterial color="#ffffff" transparent opacity={0.9} />
    </mesh>
  );
}

export function Clouds({ count = 20 }) {
  const clouds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 120,
        Math.random() * 5 + 15,
        (Math.random() - 0.5) * 120
      ],
      scale: Math.random() * 1.5 + 0.8,
      speed: Math.random() * 0.3 + 0.1
    }));
  }, [count]);
  
  return (
    <group>
      {clouds.map(cloud => (
        <Cloud
          key={cloud.id}
          position={cloud.position}
          scale={cloud.scale}
          speed={cloud.speed}
        />
      ))}
    </group>
  );
}