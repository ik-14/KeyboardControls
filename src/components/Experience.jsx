import { Physics } from "@react-three/rapier";
import CharacterController from "./CharacterController";
import Floor from "./Floor";
import BridgeWrapper from "./wrappers/BridgeWrapper";
import GallerySignWrapper from "./wrappers/GallerySignWrapper";
import TheatreSignWrapper from "./wrappers/TheatreSignWrapper";
import VideoScreen from "./VideoScreen";
import { Environment, Sky } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky />

      <Physics debug>
        <GallerySignWrapper
          scale={[0.6, 0.6, 0.6]}
          position={[-1.6, 0, 8.4]}
          rotation={[0, Math.PI / 2.25, 0]}
        />
        <TheatreSignWrapper
          scale={[0.6, 0.6, 0.6]}
          position={[9, 0, 1.5]}
          rotation={[0, Math.PI / 1.05, 0]}
        />
        <BridgeWrapper scale={[2.25, 1.9, 3]} position={[0, -0.2, 2.15]} />
        <BridgeWrapper
          scale={[2.25, 1.9, 3]}
          position={[2.9, -0.25, -0.1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Floor
          name="LandingFloor"
          scale={[1.2, 1, 1.2]}
          position={[0, -1.5, 0]}
        />
        <Floor
          name="GalleryFloor"
          scale={[1.2, 1, 1.2]}
          position={[0, -1.5, 13]}
        />
        <Floor
          name="TheatreFloor"
          scale={[1.2, 1, 1.2]}
          position={[12.3, -1.5, 0]}
        />
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
