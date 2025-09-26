import { Physics } from "@react-three/rapier";
import { TerrainWrapper } from "./wrappers/TerrainWrapper";
import { CharacterController } from "./wrappers/CharacterController";
import { DayNightLighting } from "./DayNightLighting";

export const Experience = () => {
  return (
    <>
      <DayNightLighting />
      {/* <OrbitControls /> */}
      <Physics>
        <TerrainWrapper />
        <CharacterController />
      </Physics>
    </>
  );
};
