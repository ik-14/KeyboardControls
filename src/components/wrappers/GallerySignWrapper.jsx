import { RigidBody } from "@react-three/rapier";
import React from "react";
import { GallerySign } from "../modelsAsJsx/GallerySign";

const GallerySignWrapper = ({ scale, position, rotation }) => {
  return (
    <RigidBody scale={scale} type="fixed" colliders="trimesh">
      <GallerySign position={position} rotation={rotation} />
    </RigidBody>
  );
};

export default GallerySignWrapper;
