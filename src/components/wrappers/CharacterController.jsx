import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import Character from "../modelsAsJsx/Character";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const CharacterController = () => {
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

  const RUN_SPEED = 4;
  const WALK_SPEED = 2;

  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);

  const deviceType = useDeviceType();

  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    // touch
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

      const movement = {
        x: 0,
        y: 0,
        z: 0,
      };

      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }
        movement.z = mouse.y + 0.4;

        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      if (get().jump && isOnGround.current) {
        movement.y = 2.3;
        isOnGround.current = false;
      }

      if (get().forward) {
        movement.z = 1;
      }

      if (get().back) {
        movement.z = -1;
      }

      if (get().left) {
        movement.x = 1;
      }

      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotate.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        velocity.x =
          Math.sin(rotate.current + characterRotationTarget.current) * speed;
        velocity.z =
          Math.cos(rotate.current + characterRotationTarget.current) * speed;
        if (speed === RUN_SPEED) {
          setAnimation("Run");
        } else {
          setAnimation("Walk");
        }
      } else {
        setAnimation("Idle");
      }

      if (movement.y !== 0) {
        velocity.y = movement.y;
        setAnimation("Jump");
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      rb.current.setLinvel(velocity, true);
    }

    //CAMERA
    container.current.rotation.y = lerp(
      container.current.rotation.y,
      rotate.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

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
      position-z={-2.5}
      onCollisionEnter={onCollisionEnter}
      colliders={false}
      lockRotations
      ref={rb}
      name="character"
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group
          ref={cameraPosition}
          position-y={2.2}
          position-z={deviceType === "mobile" ? -10 : -5.5}
        />
        <group ref={character}>
          <Character position-y={-0.87} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.6, 0.28]} />
    </RigidBody>
  );
};

export default CharacterController;
