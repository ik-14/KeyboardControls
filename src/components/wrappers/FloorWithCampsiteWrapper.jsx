import { RigidBody } from "@react-three/rapier";
import React from "react";
import { FloorWithCampsite } from "../modelsAsJsx/FloorWithCampsite";

const FloorWithCampsiteWrapper = () => {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <FloorWithCampsite position={[0, -5, 0]}/>
    </RigidBody>
  );
};

export default FloorWithCampsiteWrapper;
