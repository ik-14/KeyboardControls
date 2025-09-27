import { RigidBody } from "@react-three/rapier";
import { Terrain } from "../modelsAsJsx/Terrain";
import { BotWGrass } from "../BotWGrass";
import { EnvironmentObjects } from "../EnvironmentObjects";

export const TerrainWrapper = () => {
  return (
    <group position={[0, -8, 0]} rotation={[0, 0, 0]}>
      <RigidBody colliders="trimesh" type="fixed">

        <Terrain />
        <BotWGrass count={25000} area={65} position={[0, 0, 0]} fogMultiplier={2} />
        <EnvironmentObjects area={65} />

        {/* Left Island */}
        <group position={[-60, 0, 0]}>
          <Terrain size={30} segments={64} />
          <BotWGrass count={8000} area={30} position={[0, 0, 0]} fogMultiplier={2} />
        </group>

        {/* Right Island */}
        <group position={[70, 0, 0]}>
          <Terrain size={30} segments={64} />
          <BotWGrass count={8000} area={30} position={[0, 0, 0]} fogMultiplier={2} />
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
