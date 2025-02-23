import { RigidBody } from "@react-three/rapier";
import React from "react";
import { CityScene } from "../modelsAsJsx/CityScene";

const CitySceneWrapper = () => {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <CityScene scale={0.5} position={[0, -5, 0]} />
    </RigidBody>
  );
};

export default CitySceneWrapper;
