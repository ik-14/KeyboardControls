import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const Floor = ({position}) => {
  return (
    <RigidBody type="fixed">
      <Box position={position} args={[15, 0.25, 15]}>
        <meshStandardMaterial color={"#ff8527"} />
      </Box>
    </RigidBody>
  );
};

export default Floor;
