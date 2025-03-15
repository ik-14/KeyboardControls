import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Terrain } from "./terrain";

export const TerrainWrapper = () => {
  return (
    <group position={[0, -4, 0]}>
      <RigidBody colliders="trimesh" type="fixed">
        <Terrain />
      </RigidBody>
    </group>
  );
};
