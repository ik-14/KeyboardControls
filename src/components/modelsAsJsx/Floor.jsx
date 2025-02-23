import { Box, Float, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

import { Text } from "@react-three/drei";

function Key({ position, label, rotation }) {
  return (
    <group
      position={position}
      position-z={1.5}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <Text
        position={[0, 0.15, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        fontSize={0.12}
        color="black"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export const Floor = () => {
  const { scene } = useGLTF("models/floor.glb");
  const shadowBias = -0.005;
  const shadowMapSize = 2048;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <RigidBody type="fixed">
      <group scale={0.66}>
        <primitive object={scene} scale={50} />
        <Float>
          <group position={[-0.5, 0.02, 0]}>
            <Key position={[-0.4, -0.1, 0]} label="D" />
            <Key position={[0, 0.1, 0]} label="W" />
            <Key position={[0.4, -0.1, 0]} label="A" />
            <Key position={[0, -0.1, 0]} label="S" />
            <Key position={[1.5, 0.1, 0]} label="Up" />
            <Key position={[1.1, -0.1, 0]} label="Left" />
            <Key position={[1.5, -0.1, 0]} label="Down" />
            <Key position={[1.9, -0.1, 0]} label="Right" />
          </group>
        </Float>

        <Float>
          <group position={[0, -1, 0]} rotation={[0, Math.PI, 0]}>
            <Text fontSize={0.2} color="white" anchorY="middle">
              Controls: Move with WASD or Arrow Keys
            </Text>
            <Text
              position={[0, -0.2, 0]}
              fontSize={0.15}
              color="white"
              anchorY="middle"
            >
              Mobile: Touch and drag to move
            </Text>
          </group>
        </Float>
        <Float floatIntensity={0.5}  floatingRange={[-0.01, 0.02]}>
          <group position={[0, 2, 0]} rotation={[0, Math.PI, 0]}>
            <Text fontSize={0.3} color="white" anchorY="middle" maxWidth={6.5}>
              Hi! I'm Ismail, a 20 year old software engineer based in London. I
              love all things software, with a special spot for creative
              development. This site is still undergoing development so come
              back soon to see what's changed!
            </Text>
          </group>
        </Float>
        <ambientLight intensity={0.035} />
        {/* 0.035 */}
        <group name="HomeLights">
          <group position={[5.5, 0.5, -1.2]}>
            <pointLight
              intensity={3}
              distance={15}
              decay={3}
              color="#4124c9" // blue
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
          <group position={[-3, 3, -2]}>
            <pointLight
              intensity={3}
              decay={3}
              distance={6}
              color="#a5adff" // purple
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>

          <group position={[0, 2.5, 0.5]}>
            <pointLight
              intensity={0.9}
              decay={2}
              distance={10}
              castShadow
              color="#f7d216" // Orange
              shadow-bias={shadowBias}
              shadow-mapSize-width={shadowMapSize}
              shadow-mapSize-height={shadowMapSize}
            />

            <Box scale={0.5} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
        </group>

        <group name="HomeLights2" position={[30, 0, 30]}>
          <group position={[5.5, 0.5, -1.2]}>
            <pointLight
              intensity={3}
              distance={15}
              decay={3}
              color="#4124c9" // blue
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
          <group position={[-3, 3, -2]}>
            <pointLight
              intensity={3}
              decay={3}
              distance={6}
              color="#a5adff" // purple
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>

          <group position={[0, 2.5, 0.5]}>
            <pointLight
              intensity={0.9}
              decay={2}
              distance={10}
              castShadow
              color="#f7d216" // Orange
              shadow-bias={shadowBias}
              shadow-mapSize-width={shadowMapSize}
              shadow-mapSize-height={shadowMapSize}
            />

            <Box scale={0.5} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
        </group>

        <group name="HomeLights3" position={[-30, 0, 30]}>
          <group position={[5.5, 0.5, -1.2]}>
            <pointLight
              intensity={3}
              distance={15}
              decay={3}
              color="#4124c9" // blue
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
          <group position={[-3, 3, -2]}>
            <pointLight
              intensity={3}
              decay={3}
              distance={6}
              color="#a5adff" // purple
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>

          <group position={[0, 2.5, 0.5]}>
            <pointLight
              intensity={0.9}
              decay={2}
              distance={10}
              castShadow
              color="#f7d216" // Orange
              shadow-bias={shadowBias}
              shadow-mapSize-width={shadowMapSize}
              shadow-mapSize-height={shadowMapSize}
            />

            <Box scale={0.5} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
        </group>

        <group name="HomeLights4" position={[0, 0, 50]}>
          <group position={[5.5, 0.5, -1.2]}>
            <pointLight
              intensity={3}
              distance={15}
              decay={3}
              color="#4124c9" // blue
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
          <group position={[-3, 3, -2]}>
            <pointLight
              intensity={3}
              decay={3}
              distance={6}
              color="#a5adff" // purple
            />
            <Box scale={0.1} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>

          <group position={[0, 2.5, 0.5]}>
            <pointLight
              intensity={0.9}
              decay={2}
              distance={10}
              castShadow
              color="#f7d216" // Orange
              shadow-bias={shadowBias}
              shadow-mapSize-width={shadowMapSize}
              shadow-mapSize-height={shadowMapSize}
            />

            <Box scale={0.5} visible={false}>
              <meshBasicMaterial color="white" />
            </Box>
          </group>
        </group>


      </group>
      <primitive position-y={-2} object={scene} />
    </RigidBody>
  );
};

useGLTF.preload("models/floor.glb");
