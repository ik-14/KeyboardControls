import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Terrain } from "./terrain";
import { degToRad } from "three/src/math/MathUtils.js";

export const TerrainWrapper = () => {
  return (
    <group position={[0, -8, 0]} rotation={[0, degToRad(45), 0]}>
      <RigidBody colliders="trimesh" type="fixed">
        <Terrain />
      </RigidBody>
    </group>
  );
};
