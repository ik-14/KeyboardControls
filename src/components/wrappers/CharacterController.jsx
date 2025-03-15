import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import Character from "../modelsAsJsx/Character";
import { useDeviceType } from "../../utils/hooks/useDeviceType";
import { lerpAngle } from "../../utils/helperFunctions/angleFunctions";

export const CharacterController = () => {
  const [animation, setAnimation] = useState("Idle");
  const rb = useRef();
  const container = useRef();
  const character = useRef();
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const isOnGround = useRef(true);
  const rotate = useRef(0);
  const characterRotationTarget = useRef(0);
  const ROTATION_SPEED = degToRad(1);
  const RUN_SPEED = 5.2;
  const WALK_SPEED = 3;
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  const deviceType = useDeviceType();

  useEffect(() => {
    const onMouseDown = () => (isClicking.current = true);
    const onMouseUp = () => (isClicking.current = false);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      let speed = get().run ? RUN_SPEED : WALK_SPEED;
      const velocity = rb.current.linvel();
      const movement = { x: 0, y: 0, z: 0 };

      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }
      if (get().jump && isOnGround.current) {
        movement.y = 2.3;
        isOnGround.current = false;
      }
      if (get().forward) movement.z = 1;
      if (get().back) movement.z = -1;
      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;

      if (movement.x !== 0) {
        rotate.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        // Calculate target angle from movement input
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        velocity.x =
          Math.sin(rotate.current + characterRotationTarget.current) * speed;
        velocity.z =
          Math.cos(rotate.current + characterRotationTarget.current) * speed;
        setAnimation(speed === RUN_SPEED ? "Run" : "Walk");
      } else {
        setAnimation("Idle");
      }

      if (movement.y !== 0) {
        velocity.y = movement.y;
        setAnimation("Jump");
      }

      // Rotate character, change last number for time it takes to lerp
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.07
      );

      rb.current.setLinvel(velocity, true);
    }

    // Rotate camera container
    container.current.rotation.y = lerp(
      container.current.rotation.y,
      rotate.current,
      0.05
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.9);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.9);
      camera.lookAt(cameraLookAt.current);
    }
  });

  const onCollisionEnter = () => {
    isOnGround.current = true;
  };

  return (
    <RigidBody
      onCollisionEnter={onCollisionEnter}
      colliders={false}
      lockRotations
      ref={rb}
      name="character"
      position={[0, -6.2, -60]}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group
          ref={cameraPosition}
          position-y={2}
          position-z={deviceType === "mobile" ? -9 : -5.5}
        />
        <group ref={character}>
          <Character position-y={-0.87} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.6, 0.28]} />
    </RigidBody>
  );
};
