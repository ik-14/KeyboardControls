import { Cloud, Environment, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CharacterController from "./CharacterController";
import Floor from "./Floor";
import VideoScreen from "./VideoScreen";

export const Experience = () => {
  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.15} />
      <Sky />

      <Physics>
        <Floor position={[0, -0.75, 0]} />
        <CharacterController />
{/* 
        <VideoScreen
          src="MajorcaBeach1.mov"
          position={[0, 0.7, 6]}
          scale={[0.7, 0.7, 0.35]}
        /> */}
      </Physics>
    </>
  );
};
