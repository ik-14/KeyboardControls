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
        
        {/* Left Island */}
        <group position={[-60, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[30, 30, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="#2d4a1a" roughness={0.8} />
          </mesh>
          <InstancedGrass count={8000} area={30} position={[0, -0.01, 0]} />
        </group>
        
        {/* Right Island */}
        <group position={[70, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[30, 30, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="#2d4a1a" roughness={0.8} />
          </mesh>
          <InstancedGrass count={8000} area={30} position={[0, -0.01, 0]} />
        </group>
        
        {/* Bridge to Left Island */}
        <mesh position={[-25, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[15, 0.25, 3]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        
        {/* Bridge to Right Island */}
        <mesh position={[45, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[20, 0.3, 3]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
      </RigidBody>
    </group>
  );
};
