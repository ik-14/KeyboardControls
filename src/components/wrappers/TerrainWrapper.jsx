import { RigidBody } from "@react-three/rapier";
import { Terrain } from "../modelsAsJsx/Terrain";
import { InstancedGrass } from "./InstancedGrass";
import { Frame } from "../modelsAsJsx/Frame";

export const TerrainWrapper = () => {
  return (
    <group position={[0, -8, 0]} rotation={[0, 0, 0]}>
      <RigidBody colliders="trimesh" type="fixed">
        {/* Medium density grass covering whole terrain (excluding house area) */}
        <InstancedGrass count={60000} area={65} position={[0, -0.01, 0]} />
        
        {/* House in center */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[4, 3, 4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Frames on each side of house */}
        {/* <Frame position={[6, 1, 0]} rotation={[0, -Math.PI/2, 0]} />  Right side */}
        {/* <Frame position={[-6, 1, 0]} rotation={[0, Math.PI/2, 0]} />   Left side */}
        {/* <Frame position={[0, 1, 6]} rotation={[0, Math.PI, 0]} />      Front side */}
        {/* <Frame position={[0, 1, -6]} rotation={[0, 0, 0]} />           Back side */}
        <Terrain />
      </RigidBody>
    </group>
  );
};
