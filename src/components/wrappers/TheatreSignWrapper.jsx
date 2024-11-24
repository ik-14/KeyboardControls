import { RigidBody } from "@react-three/rapier";
import React from "react";
import { TheatreSign } from "../modelsAsJsx/TheatreSign";

const TheatreSignWrapper = ({ scale, position, rotation }) => {
  return (
    <RigidBody scale={scale} type="fixed" colliders="trimesh">
      <TheatreSign position={position} rotation={rotation} />
    </RigidBody>
  );
};

export default TheatreSignWrapper;
