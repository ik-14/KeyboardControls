import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { Vector3 } from "three";
import Character from "../components/modelsAsJsx/Character";
import { chapters } from "./story";
import { dampAlpha, screenMovement } from "./mechanics";

export function Player({ input, player, onNear, onReady }) {
  const body = useRef(),
    model = useRef();
  const [animation, setAnimation] = useState("Idle");
  const animationRef = useRef("Idle");
  const { world, rapier } = useRapier();
  const { camera, size } = useThree();
  const target = useRef(new Vector3(-3, 0, 2));
  const look = useRef(new Vector3());
  const nearRef = useRef(null),
    lastGround = useRef(-100),
    lastJump = useRef(-100);
  useEffect(() => {
    camera.zoom =
      size.width < 600
        ? size.width / 29
        : size.width < 1000
          ? size.width / 36
          : size.width / 40;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  useEffect(() => {
    onReady();
  }, []);
  useFrame((state, dt) => {
    if (!body.current) return;
    dt = Math.min(dt, 0.05);
    const controls = input.current;
    if (
      controls.reset ||
      controls.teleport ||
      body.current.translation().y < -6
    ) {
      const p = controls.teleport || [0, 0, 4];
      body.current.setTranslation({ x: p[0], y: 1.05, z: p[2] }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      controls.reset = false;
      controls.teleport = null;
      controls.jump = false;
      lastGround.current = -100;
    }
    const p = body.current.translation(),
      vel = body.current.linvel();
    const ray = new rapier.Ray(
      { x: p.x, y: p.y, z: p.z },
      { x: 0, y: -1, z: 0 },
    );
    const ground = world.castRay(
      ray,
      1.04,
      true,
      undefined,
      undefined,
      undefined,
      body.current,
    );
    const grounded = !!ground && Math.abs(vel.y) < 0.65;
    if (grounded) lastGround.current = state.clock.elapsedTime;
    const keys = controls.keys;
    let x = 0,
      z = 0;
    if (!controls.blocked) {
      x =
        Number(keys.has("KeyD") || keys.has("ArrowRight")) -
        Number(keys.has("KeyA") || keys.has("ArrowLeft")) +
        controls.touch.x;
      z =
        Number(keys.has("KeyS") || keys.has("ArrowDown")) -
        Number(keys.has("KeyW") || keys.has("ArrowUp")) +
        controls.touch.z;
    }
    const moving = Math.hypot(x, z) > 0.01;
    // Screen-relative movement for the fixed three-quarter camera.
    const { x: wx, z: wz } = screenMovement(x, z);
    const running = keys.has("ShiftLeft") || keys.has("ShiftRight");
    const speed = running ? 5.8 : 3.4,
      a = dampAlpha(18, dt);
    let vy = vel.y;
    if (
      controls.jump &&
      !controls.blocked &&
      state.clock.elapsedTime - lastGround.current < 0.11 &&
      state.clock.elapsedTime - lastJump.current > 0.3
    ) {
      vy = 5.3;
      lastJump.current = state.clock.elapsedTime;
      lastGround.current = -100;
    }
    controls.jump = false;
    body.current.setLinvel(
      {
        x: vel.x + (wx * speed - vel.x) * a,
        y: vy,
        z: vel.z + (wz * speed - vel.z) * a,
      },
      true,
    );
    if (moving) {
      const angle = Math.atan2(wx, wz);
      const delta = Math.atan2(
        Math.sin(angle - model.current.rotation.y),
        Math.cos(angle - model.current.rotation.y),
      );
      model.current.rotation.y += delta * (1 - Math.exp(-14 * dt));
    }
    const next =
      Math.abs(vy) > 0.8
        ? "Jump"
        : moving
          ? running
            ? "Run"
            : "Walk"
          : "Idle";
    if (animationRef.current !== next) {
      animationRef.current = next;
      setAnimation(next);
    }
    player.current.set(p.x, p.y, p.z);
    look.current.set(
      (size.width < 1000 ? -1 : -4) + p.x * 0.48,
      0,
      2 + (p.z - 4) * 0.48,
    );
    target.current.lerp(look.current, 1 - Math.exp(-3 * dt));
    camera.position.copy(target.current).add(new Vector3(23, 27, 31));
    camera.lookAt(target.current);
    let nearest = null,
      distance = 3.1;
    const places = [
      ...chapters,
      { id: "basket", position: [7, 0, 6] },
      { id: "rocks", position: [-8, 0, 5] },
    ];
    for (const place of places) {
      const d = Math.hypot(p.x - place.position[0], p.z - place.position[2]);
      if (d < distance) {
        distance = d;
        nearest = place.id;
      }
    }
    if (nearest !== nearRef.current) {
      nearRef.current = nearest;
      onNear(nearest);
    }
  });
  return (
    <RigidBody
      ref={body}
      position={[0, 1.05, 4]}
      colliders={false}
      lockRotations
      canSleep={false}
      ccd
      friction={0}
      mass={1}
    >
      <CapsuleCollider args={[0.58, 0.3]} />
      <group ref={model}>
        <Character animation={animation} position={[0, -0.88, 0]} />
      </group>
    </RigidBody>
  );
}
