import { Environment, useKeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CharacterController from "./CharacterController";
import Floor from "./Floor";

export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      />
      <Physics debug>
        <Floor position={[0, -0.75, 0]} />
        <CharacterController />
      </Physics>
    </>
  );
};
