import { OrbitControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CharacterController from "./wrappers/CharacterController";
import CitySceneWrapper from "./wrappers/CitySceneWrapper";

function Lights() {
  // const ambientCtl = useControls("Ambient Light", {
  //   visible: true,
  //   intensity: {
  //     value: 0.25,
  //     min: 0,
  //     max: 1.0,
  //     step: 0.01,
  //   },
  // });

  // const directionalCtl = useControls("Directional Light", {
  //   visible: true,
  //   position: {
  //     x: -30,
  //     y: 20,
  //     z: -20,
  //   },
  //   intensity: {
  //     value: 0.1, // Dim light for moonlight
  //     min: 0,
  //     max: 1.0,
  //     step: 0.05,
  //   },
  //   castShadow: true,
  // });

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
      <OrbitControls />
      <Sky rayleigh={1} mieCoefficient={0.1} inclination={0.50125} />
      <Lights />
      <Physics>
        <CitySceneWrapper />
        <CharacterController />
      </Physics>
    </>
  );
};
