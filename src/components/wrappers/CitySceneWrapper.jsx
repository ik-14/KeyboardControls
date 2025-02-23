import { RigidBody } from "@react-three/rapier";
import React from "react";
import { CityScene } from "../modelsAsJsx/CityScene";

const CitySceneWrapper = () => {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <CityScene
        scale={0.5}
        position={[0, 0, 10]}
        rotation={[0, Math.PI, 0]}
      />
    </RigidBody>
  );
};

export default CitySceneWrapper;
