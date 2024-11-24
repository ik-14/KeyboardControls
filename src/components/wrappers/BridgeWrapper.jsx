import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Bridge } from "../modelsAsJsx/Bridge";

const BridgeWrapper = ({ scale, position, rotation }) => {
  return (
    <RigidBody scale={scale} type="fixed" colliders="trimesh">
      <Bridge position={position} rotation={rotation} />
    </RigidBody>
  );
};

export default BridgeWrapper;
