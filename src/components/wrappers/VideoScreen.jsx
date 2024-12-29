import { Box, Html, Text, useVideoTexture } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Frame } from "../modelsAsJsx/Frame";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function VideoScreen({ src, position, scale, rotation }) {
  const vidSrc = `videos/${src}`;

  const texture = useVideoTexture(vidSrc, {
    muted: true,
  });

  return (
    <>
      <group position={position} scale={scale} rotation={rotation}>
        <mesh position={[0, -1.35, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Frame />
        </mesh>
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

        <Box scale={[0.75, 0.75, 0.5]} position={[2.2, 1, 1.2]}>
          <Text position={[0, 0, 0.6]} fontSize={0.35}>
            Unmute
          </Text>
          <meshStandardMaterial color={"red"} />
        </Box>
      </group>
    </>
  );
}

export default VideoScreen;
