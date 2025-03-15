import { Physics } from "@react-three/rapier";
import { TerrainWrapper } from "./modelsAsJsx/TerrainWrapper";
import { CharacterController } from "./wrappers/CharacterController";

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
      <Physics>
        <TerrainWrapper />

        {/* <mesh position={[0, -3.4, -60]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial attach="material-0" color="red" />
          <meshBasicMaterial attach="material-1" color="black" />
          <meshBasicMaterial attach="material-2" color="green" /> 
          <meshBasicMaterial attach="material-3" color="yellow" />
          <meshBasicMaterial attach="material-4" color="blue" />
          <meshBasicMaterial attach="material-5" color="white" />
        </mesh> */}

        <CharacterController />
      </Physics>
    </>
  );
};
