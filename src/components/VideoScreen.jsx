import { Box, Html, Text, useVideoTexture } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Frame } from "./modelsAsJsx/Frame";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function VideoScreen({ src, position, scale, rotation }) {
  const [video, setVideo] = useState(null);
  const [muted, setMuted] = useState(true);
  const vidSrc = `videos/${src}`;

  const texture = useVideoTexture(vidSrc, {
    loop: true,
    autoplay: true,
    muted,
  });

  useEffect(() => {
    if (texture && texture.image instanceof HTMLVideoElement) {
      setVideo(texture.image);
    }
  }, [texture]);

  useEffect(() => {
    if (video) {
      video.muted = muted;
      if (!muted) {
        video.play().catch((error) => {
          console.error("Failed to play the video:", error);
        });
      }
    }
  }, [muted, video]);

  // Toggle mute state
  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted); // Use React state to toggle
  };
  const playVideo = () => {
    if (video && video.paused) {
      video.play().catch((error) => console.log("Error playing video:", error));
    }
  };

  const pauseVideo = () => {
    if (video && !video.paused) {
      video.pause();
    }
  };
  return (
    <>
      <group position={position} scale={scale} rotation={rotation}>
        {/* Black frame */}
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
        <Box
          onClick={() => {
            toggleMute();
            console.log(muted);
          }}
          scale={[0.75, 0.75, 0.5]}
          position={[2.2, 1, 1.2]}
        >
          <Text position={[0, 0, 0.6]} fontSize={0.4}>
            Mute
          </Text>
          <meshStandardMaterial color={"red"} />
        </Box>
        <Box scale={[0.75, 0.75, 0.5]} position={[2.2, 0.1, 1.2]}>
          <meshStandardMaterial color={"red"} />
        </Box>
        <Box scale={[0.75, 0.75, 0.5]} position={[2.2, -0.8, 1.2]}>
          <meshStandardMaterial color={"red"} />
        </Box>
      </group>
    </>
  );
}

export default VideoScreen;
