import { Physics } from "@react-three/rapier";
import { TerrainWrapper } from "./modelsAsJsx/TerrainWrapper";
import { CharacterController } from "./wrappers/CharacterController";
import { OrbitControls } from "@react-three/drei";

function Lights() {
  return (
    <>
      <ambientLight visible intensity={0.25} />
      <directionalLight
        visible
        position={[-30, 20, -20]}
        intensity={0.1}
        castShadow
      />
    </>
  );
}

export const Experience = () => {
  return (
    <>
      <Lights />
      {/* <OrbitControls /> */}
      <Physics>
        <TerrainWrapper />
        <CharacterController />
      </Physics>
    </>
  );
};
