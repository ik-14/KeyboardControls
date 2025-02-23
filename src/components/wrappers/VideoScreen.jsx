import { Box, Html, Text, useVideoTexture } from "@react-three/drei";
import React, { useState, useEffect } from "react";
import { Frame } from "../modelsAsJsx/Frame";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function VideoScreen({ src, position, scale, rotation }) {
  const vidSrc = `videos/${src}`;

  const texture = useVideoTexture(vidSrc, {
    loop: true,
    start: true,
  });

  return (
    <>
      <group position={position} scale={scale} rotation={rotation}>
        <group position={[0, -1.35, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Frame />
        </group>

        <RigidBody type="fixed">
          <CuboidCollider args={[2.4, 1.4, 0.15]} />
          <mesh
            position={[-0.6, 0.4, 0.4]}
            rotation={[Math.PI / 36, Math.PI / 72, -Math.PI / 72]}
          >
            <planeGeometry args={[4.8, 2.8]} />
            <meshStandardMaterial map={texture} toneMapped={false} />
          </mesh>
        </RigidBody>

        {/* Light emitting from the screen */}
        <pointLight
          position={[-0.6, 0.4, 0.6]} // Adjust position to match the screen
          color="white"
          intensity={1.5} // Standard TV-like intensity
          distance={5} // How far the light reaches
          decay={2} // How quickly the light fades with distance
        />
      </group>
    </>
  );
}

export default VideoScreen;
