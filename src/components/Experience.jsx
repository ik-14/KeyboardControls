import { Physics } from "@react-three/rapier";
import CharacterController from "./wrappers/CharacterController";
import VideoScreen from "./wrappers/VideoScreen";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import FloorWithCampsiteWrapper from "./wrappers/FloorWithCampsiteWrapper";

export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" />

      <Physics>
        <FloorWithCampsiteWrapper />
        <CharacterController />

        <VideoScreen
          src="MajorcaBeach2.mov"
          position={[18, 0.7, 0.6]}
          scale={[0.7, 0.7, 0.35]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </Physics>
    </>
  );
};
