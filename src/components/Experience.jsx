import { Physics } from "@react-three/rapier";
import { TerrainWrapper } from "./wrappers/TerrainWrapper";
import { CharacterController } from "./wrappers/CharacterController";
import { DayNightLighting } from "./DayNightLighting";
import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <DayNightLighting />
      {/* <OrbitControls/> */}
      <Physics>
        <TerrainWrapper />
        <CharacterController />
      </Physics>
    </>
  );
};
