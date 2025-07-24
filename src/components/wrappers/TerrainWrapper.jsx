import { RigidBody } from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils.js";
import { Terrain } from "../modelsAsJsx/Terrain";
import { InstancedGrass } from "./InstancedGrass";

export const TerrainWrapper = () => {
  return (
    <group position={[0, -8, 0]} rotation={[0, degToRad(45), 0]}>
      <RigidBody colliders="trimesh" type="fixed">
        <InstancedGrass count={35000} area={50} position={[50,-0.75,0]} />
        <Terrain />
      </RigidBody>
    </group>
  );
};
