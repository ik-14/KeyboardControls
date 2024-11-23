import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const Floor = (props) => {
  return (
    <RigidBody type="fixed">
      <Box position={props.position || [0, -0.75, 0]} args={[15, 0.25, 15]}>
        <meshStandardMaterial color={"green"} />
      </Box>
    </RigidBody>
  );
};

export default Floor;
