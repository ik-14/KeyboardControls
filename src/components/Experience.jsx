import { Physics } from "@react-three/rapier";
import { TerrainWrapper } from "./wrappers/TerrainWrapper";
import { CharacterController } from "./wrappers/CharacterController";
import { DayNightLighting } from "./DayNightLighting";
import { Clouds } from "./Clouds";
import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <DayNightLighting />
      <Clouds count={25} />
      <OrbitControls/>
      <Physics>
        <TerrainWrapper />
        <CharacterController />
      </Physics>
    </>
  );
};
