import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Stage } from "./modelsAsJsx/Stage";

const Floor = ({ name, scale, position, onCharacterEnter }) => {
  return (
    <RigidBody
      name={name}
      scale={scale}
      type="fixed"
      colliders="hull"
      onCollisionEnter={({ target, other }) => {
        if (other.rigidBodyObject?.name === "character") {
          onCharacterEnter(position);
        }
      }}
    >
      <Stage position={position} />
    </RigidBody>
  );
};

export default Floor;
