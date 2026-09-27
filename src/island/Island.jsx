import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
} from "@react-three/rapier";
import * as THREE from "three";
import { Player } from "./Player";
import { Grass } from "./Grass";
import { shotVelocity, crossedBasket } from "./mechanics";

const C = {
  cream: "#f2e7ca",
  dark: "#354e40",
  orange: "#cb7250",
  wood: "#9a684a",
  grass: "#a4ac77",
  pink: "#d9a48e",
};
function Box({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = C.cream,
  rotation = [0, 0, 0],
  radius = 0.05,
  ...rest
}) {
  return (
    <RoundedBox
      args={size}
      position={position}
      rotation={rotation}
      radius={radius}
      smoothness={2}
      castShadow
      receiveShadow
      {...rest}
    >
      <meshStandardMaterial color={color} roughness={0.85} />
    </RoundedBox>
  );
}
function Label({
  text,
  position,
  rotation = [0, 0, 0],
  width = 2,
  height = 0.5,
  color = "#f9efd8",
  background = null,
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1024, 256);
    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 1024, 256);
    }
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 74px Arial";
    ctx.fillText(text, 512, 134, 960);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [text, color, background]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
function Tree({ position, scale = 1, variant = 0 }) {
  return (
    <group position={position} scale={scale}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.2, 1.2, 0.2]} position={[0, 1.2, 0]} />
        <Box position={[0, 1.25, 0]} size={[0.3, 2.5, 0.35]} color="#9b7954" />
      </RigidBody>
      {[
        [0, 3, 0, 1.35],
        [-0.65, 2.8, 0.25, 0.9],
        [0.7, 3.2, -0.1, 1],
        [0.1, 3.8, 0, 0.85],
      ].map(([x, y, z, s], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          scale={[s, s * 0.9, s * 0.85]}
          castShadow
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={
              ["#829655", "#a3ae65", "#b4b878", "#95a462"][(i + variant) % 4]
            }
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}
function Marker({ position, number, title }) {
  return (
    <group position={position}>
      <Box position={[0, 0.7, 0]} size={[0.11, 1.4, 0.11]} color={C.wood} />
      <Box position={[0, 1.5, 0]} size={[1.65, 0.65, 0.13]} color={C.cream} />
      <Label
        text={title}
        position={[0, 1.53, 0.075]}
        width={1.5}
        height={0.32}
        color={C.dark}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0.7]}>
        <ringGeometry args={[0.36, 0.41, 48]} />
        <meshBasicMaterial color="#f4e7b7" />
      </mesh>
      <Label
        text={number}
        position={[0, 0.03, 0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={0.4}
        height={0.3}
        color={C.dark}
      />
    </group>
  );
}
function Workshop() {
  return (
    <group position={[-4, 0, -6]}>
      <RigidBody type="fixed" colliders="cuboid">
        <Box position={[0, 1.35, 0]} size={[5, 2.7, 3.6]} color="#b67c5d" />
        <Box position={[0, 2.85, 0]} size={[5.55, 0.35, 4.1]} color={C.dark} />
        <Box
          position={[0, 3.04, 0]}
          size={[5.25, 0.15, 3.85]}
          color="#70816a"
        />
      </RigidBody>
      {[
        [-1.55, 1.65],
        [1.55, 1.65],
      ].map(([x, y]) => (
        <group key={x}>
          <Box
            position={[x, y, 1.82]}
            size={[1.2, 1.35, 0.12]}
            color={C.cream}
          />
          <Box
            position={[x, y, 1.9]}
            size={[1.02, 1.15, 0.04]}
            color="#688c8b"
          />
          <Box
            position={[x, y, 1.94]}
            size={[0.06, 1.15, 0.03]}
            color={C.cream}
          />
          <Box
            position={[x, y, 1.94]}
            size={[1.05, 0.07, 0.03]}
            color={C.cream}
          />
        </group>
      ))}
      <Box position={[0, 0.96, 1.85]} size={[0.95, 1.9, 0.13]} color={C.dark} />
      <mesh position={[0.3, 1, 1.96]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#e1b15c" />
      </mesh>
      <Label
        text="THE WORKSHOP"
        position={[0, 2.5, 1.83]}
        width={2.6}
        height={0.35}
      />
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <Box
            key={`${row}-${col}`}
            position={[
              -2.2 + col * 0.63 + (row % 2) * 0.18,
              0.3 + row * 0.45,
              1.812,
            ]}
            size={[0.52, 0.025, 0.012]}
            color="#c59275"
            radius={0.004}
          />
        )),
      )}
      <Box position={[0, 0.09, 2.2]} size={[2, 0.18, 0.8]} color={C.cream} />
      <Box
        position={[-1.8, 0.33, 2.3]}
        size={[0.6, 0.65, 0.6]}
        color={C.orange}
      />
      <mesh position={[-1.8, 0.9, 2.3]} castShadow>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color="#75884f" />
      </mesh>
      <group position={[2.9, 0, 0.7]}>
        <Box position={[0, 0.9, 0]} size={[0.65, 1.8, 0.65]} color="#a94235" />
        <Box
          position={[0, 1.72, 0]}
          size={[0.75, 0.12, 0.75]}
          color="#a94235"
        />
        <Box
          position={[0, 1.2, 0.34]}
          size={[0.37, 0.1, 0.03]}
          color="#303b30"
        />
        <Label
          text="POST"
          position={[0, 0.95, 0.342]}
          width={0.38}
          height={0.17}
        />
      </group>
    </group>
  );
}
function BoulderGarden() {
  return (
    <group position={[-8, 0, 5]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[3.5, 48]} />
        <meshStandardMaterial color="#c9b998" />
      </mesh>
      {[
        [0, 1.1, 0, 1.8],
        [-1.9, 0.65, -1, 1.1],
        [1.9, 0.7, -0.7, 1.15],
      ].map(([x, y, z, s], i) => (
        <RigidBody
          key={i}
          type="fixed"
          colliders="hull"
          position={[x, y, z]}
          rotation={[0.2 * i, 0.4 * i, 0.15]}
        >
          <mesh scale={[s, s * 0.85, s * 0.72]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={["#918f7c", "#a5a38d", "#797f70"][i]}
              flatShading
              roughness={1}
            />
          </mesh>
        </RigidBody>
      ))}
      {[
        [0.1, 1.7, 1.1],
        [-0.55, 1.25, 1.15],
        [0.55, 2.2, 0.6],
      ].map((p, i) => (
        <mesh key={i} position={p} scale={[0.14, 0.07, 0.035]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#e7dfc9" />
        </mesh>
      ))}
      <Box
        position={[0.1, 0.12, 2]}
        size={[1.5, 0.22, 1]}
        rotation={[0, 0.3, 0]}
        color={C.orange}
      />
      <Box
        position={[0.1, 0.245, 2]}
        size={[1.35, 0.015, 0.88]}
        rotation={[0, 0.3, 0]}
        color="#e2ab7e"
      />
      <Marker position={[-2, 0, 2]} number="03" title="GET OUTSIDE" />
    </group>
  );
}
function Exhibits() {
  return (
    <>
      <group position={[2, 0, -5]}>
        <RigidBody type="fixed" colliders="cuboid">
          <Box position={[0, 0.65, 0]} size={[2.8, 1.3, 1.5]} color={C.cream} />
        </RigidBody>
        <Box position={[0, 1.4, 0]} size={[3, 0.2, 1.7]} color={C.orange} />
        <Box position={[0, 2, -0.35]} size={[1.7, 1.1, 0.14]} color={C.dark} />
        <Label
          text="whim"
          position={[0, 2, -0.26]}
          width={1.4}
          height={0.6}
          color="#e7b197"
        />
        <Label
          text="SMALL CREATORS. BIG IDEAS."
          position={[0, 0.8, 0.76]}
          width={2.5}
          height={0.28}
          color={C.dark}
        />
        <Marker position={[1.8, 0, 1]} number="03" title="NIGHTS & WEEKENDS" />
      </group>
      <group position={[8, 0, -6]}>
        <Box position={[0, 0.15, 0]} size={[4.5, 0.3, 3.5]} color="#c1a37a" />
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((x) => (
          <Box
            key={x}
            position={[x, 0.315, 0]}
            size={[0.025, 0.015, 3.4]}
            color="#a98c65"
          />
        ))}
        <Box
          position={[0, 1.5, -0.9]}
          size={[0.15, 2.5, 0.15]}
          color={C.wood}
        />
        <Box
          position={[0, 2.6, -0.9]}
          size={[3.5, 1.25, 0.18]}
          color={C.dark}
        />
        <Label
          text="LONDON → SAN FRANCISCO"
          position={[0, 2.85, -0.795]}
          width={3.2}
          height={0.38}
        />
        <Label
          text="EF RESIDENCY / OCT 2026"
          position={[0, 2.4, -0.795]}
          width={2.9}
          height={0.26}
          color="#b8c497"
        />
        <Box
          position={[-0.8, 0.8, 0.3]}
          size={[0.9, 1, 0.5]}
          rotation={[0, -0.2, 0]}
          color={C.orange}
        />
        <Box
          position={[-0.8, 1.38, 0.3]}
          size={[0.35, 0.15, 0.15]}
          color={C.wood}
        />
        <Marker
          position={[1.5, 0.3, 0.6]}
          number="04"
          title="THE NEXT CHAPTER"
        />
      </group>
      <Marker
        position={[-2, 0, -2.5]}
        number="01"
        title="A LITTLE BIT OF MAGIC"
      />
    </>
  );
}
function Basketball({ input, onScore, onShooting }) {
  const ball = useRef(),
    flight = useRef(null),
    previousY = useRef(0);
  const hoop = [7, 3.35, 0.4];
  useFrame(({ clock }) => {
    if (!ball.current) return;
    if (input.current.shot) {
      input.current.shot = false;
      if (!flight.current) {
        const start = { x: 7, y: 1.8, z: 5 };
        ball.current.setTranslation(start, true);
        ball.current.setLinvel(shotVelocity(start, hoop), true);
        ball.current.setAngvel({ x: -3, y: 1, z: 0 }, true);
        flight.current = { time: clock.elapsedTime, scored: false };
        previousY.current = start.y;
        onShooting(true);
      }
    }
    const p = ball.current.translation();
    if (flight.current) {
      if (!flight.current.scored && crossedBasket(previousY.current, p, hoop)) {
        flight.current.scored = true;
        onScore();
      }
      if (clock.elapsedTime - flight.current.time > 4.2) {
        flight.current = null;
        ball.current.setTranslation({ x: 8.2, y: 0.36, z: 6 }, true);
        ball.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        ball.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        onShooting(false);
      }
    } else if (p.y < -3 || Math.hypot(p.x - 7, p.z - 4) > 12) {
      ball.current.setTranslation({ x: 8.2, y: 0.36, z: 6 }, true);
      ball.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
    previousY.current = p.y;
  });
  return (
    <>
      <Box
        position={[7, 0.015, 4]}
        size={[7, 0.04, 9.6]}
        color="#b7795e"
        radius={0.025}
      />
      {[
        [7, 0.05, -0.6, 6.6, 0.04, 0.045],
        [7, 0.05, 8.6, 6.6, 0.04, 0.045],
        [3.7, 0.05, 4, 0.045, 0.04, 9.2],
        [10.3, 0.05, 4, 0.045, 0.04, 9.2],
        [7, 0.05, 4.6, 3.1, 0.04, 0.045],
        [5.45, 0.05, 2, 0.045, 0.04, 5.2],
        [8.55, 0.05, 2, 0.045, 0.04, 5.2],
      ].map(([x, y, z, w, h, d], i) => (
        <Box
          key={i}
          position={[x, y, z]}
          size={[w, h, d]}
          color="#efdcba"
          radius={0.005}
        />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.065, 4.6]}>
        <ringGeometry args={[1.48, 1.52, 64, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#efdcba" side={THREE.DoubleSide} />
      </mesh>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider position={[7, 1.9, -0.55]} args={[0.09, 1.9, 0.09]} />
        <CuboidCollider position={[7, 3.8, -0.08]} args={[1, 0.65, 0.07]} />
        <Box
          position={[7, 1.9, -0.55]}
          size={[0.16, 3.8, 0.16]}
          color={C.dark}
        />
        <Box position={[7, 3.8, -0.08]} size={[2, 1.3, 0.14]} color={C.cream} />
        <Box
          position={[7, 3.65, 0.002]}
          size={[0.75, 0.55, 0.01]}
          color={C.orange}
        />
        <Box
          position={[7, 3.65, 0.012]}
          size={[0.65, 0.45, 0.01]}
          color={C.cream}
        />
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <BallCollider
              key={i}
              args={[0.045]}
              position={[
                7 + Math.cos(a) * 0.49,
                3.35,
                0.4 + Math.sin(a) * 0.49,
              ]}
            />
          );
        })}
      </RigidBody>
      <mesh position={hoop} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.49, 0.04, 8, 40]} />
        <meshStandardMaterial color="#d96537" />
      </mesh>
      <mesh position={[7, 3.06, 0.4]}>
        <cylinderGeometry args={[0.48, 0.28, 0.55, 12, 4, true]} />
        <meshStandardMaterial
          color="#f6edd5"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
      <RigidBody
        ref={ball}
        position={[8.2, 0.36, 6]}
        colliders={false}
        restitution={0.67}
        friction={0.7}
        linearDamping={0}
        angularDamping={0.3}
        ccd
      >
        <BallCollider args={[0.25]} mass={0.6} />
        <mesh castShadow>
          <sphereGeometry args={[0.25, 24, 16]} />
          <meshStandardMaterial color="#de7b36" roughness={0.85} />
        </mesh>
        {[0, Math.PI / 2].map((a, i) => (
          <mesh key={i} rotation={[a, 0, 0]}>
            <torusGeometry args={[0.251, 0.008, 4, 32]} />
            <meshStandardMaterial color="#654431" />
          </mesh>
        ))}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.251, 0.008, 4, 32]} />
          <meshStandardMaterial color="#654431" />
        </mesh>
      </RigidBody>
      <Label
        text="JUST ONE MORE SHOT."
        position={[7, 0.075, 7.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={4.8}
        height={0.5}
        color="#f0ddbd"
      />
    </>
  );
}
function Crates() {
  const bodies = useRef([]);
  const starts = [
    [-0.8, 0.4, 8],
    [0.05, 0.4, 8],
    [-0.38, 1.22, 8],
  ];
  useFrame(() => {
    bodies.current.forEach((body, i) => {
      if (body && body.translation().y < -5) {
        const [x, y, z] = starts[i];
        body.setTranslation({ x, y, z }, true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      }
    });
  });
  return (
    <>
      {[
        [0, 0.4, 0],
        [0.85, 0.4, 0],
        [0.42, 1.22, 0],
      ].map((p, i) => (
        <RigidBody
          ref={(body) => (bodies.current[i] = body)}
          key={i}
          position={[-0.8 + p[0], p[1], 8 + p[2]]}
          colliders="cuboid"
          restitution={0.1}
          friction={0.8}
        >
          <Box
            size={[0.75, 0.75, 0.75]}
            color={i === 2 ? "#c88a57" : "#d3b080"}
          />
          <Box size={[0.79, 0.09, 0.79]} color="#ad8355" />
          <Box size={[0.09, 0.79, 0.79]} color="#ad8355" />
        </RigidBody>
      ))}
    </>
  );
}
function Flowers({ player }) {
  const refs = useRef([]);
  const places = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const a = i * 2.399;
        const r = 9 + (i % 5);
        return [Math.cos(a) * r, 0, Math.sin(a) * r * 0.82];
      }),
    [],
  );
  useFrame(({ clock }) => {
    places.forEach((p, i) => {
      if (refs.current[i]) {
        const d = Math.hypot(player.current.x - p[0], player.current.z - p[2]);
        refs.current[i].rotation.z =
          Math.sin(clock.elapsedTime * 2 + i) * 0.05 +
          Math.max(0, 1 - d / 1.7) * 0.45;
      }
    });
  });
  return (
    <>
      {places.map((p, i) => (
        <group key={i} position={p} ref={(el) => (refs.current[i] = el)}>
          <Box
            position={[0, 0.18, 0]}
            size={[0.025, 0.36, 0.025]}
            color="#657e49"
            radius={0.008}
          />
          <mesh position={[0, 0.38, 0]}>
            <icosahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial color={i % 3 ? "#e4bd65" : "#e7ddc2"} />
          </mesh>
        </group>
      ))}
    </>
  );
}
export function Island({ input, onNear, onScore, onShooting, onReady }) {
  const player = useRef(new THREE.Vector3(0, 1, 4));
  return (
    <>
      <color attach="background" args={["#eeeade"]} />
      <ambientLight intensity={0.4} />
      <hemisphereLight args={["#fff1d8", "#93a382", 0.4]} />
      <directionalLight
        castShadow
        position={[-8, 18, 10]}
        intensity={1.15}
        color="#fff0d3"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-normalBias={0.04}
        shadow-bias={-0.0001}
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>
      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60}>
        <RigidBody type="fixed" colliders={false}>
          <CylinderCollider args={[0.5, 15.6]} position={[0, -0.52, 0]} />
          <mesh position={[0, -0.53, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[15.6, 14.9, 1, 96]} />
            <meshStandardMaterial color="#cab99a" roughness={1} />
          </mesh>
          <mesh position={[0, -0.075, 0]} receiveShadow>
            <cylinderGeometry args={[15.65, 15.65, 0.12, 96]} />
            <meshStandardMaterial color={C.grass} roughness={1} />
          </mesh>
        </RigidBody>
        <mesh
          position={[0, 0.001, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[4.3, 64]} />
          <meshStandardMaterial color="#d9cfad" />
        </mesh>
        {Array.from({ length: 11 }, (_, i) => (
          <Box
            key={i}
            position={[0.1 * Math.sin(i), 0.01, -11 + i * 2.2]}
            size={[1.6, 0.055, 1.2]}
            rotation={[0, Math.sin(i) * 0.13, 0]}
            color="#dfd3b4"
          />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <Box
            key={i}
            position={[-11 + i * 2.1, 0.005, 1 + 0.1 * Math.sin(i)]}
            size={[1.4, 0.05, 1.1]}
            rotation={[0, Math.cos(i) * 0.15, 0]}
            color="#dfd3b4"
          />
        ))}
        <Grass player={player} />
        <Flowers player={player} />
        {[
          [-11, 0, -5, 1.2],
          [-8, 0, -10, 1],
          [-1, 0, -12, 1.25],
          [5, 0, -11, 1],
          [12, 0, -4, 0.9],
          [12, 0, 5, 0.8],
          [-12, 0, 1, 0.75],
          [-6, 0, 11, 0.95],
          [2, 0, 12, 0.75],
        ].map(([x, y, z, s], i) => (
          <Tree key={i} position={[x, y, z]} scale={s} variant={i % 4} />
        ))}
        <Workshop />
        <BoulderGarden />
        <Exhibits />
        <Basketball input={input} onScore={onScore} onShooting={onShooting} />
        <Crates />
        <group position={[-5, 0, 1]} rotation={[0, -0.3, 0]}>
          <RigidBody type="fixed" colliders="cuboid">
            <Box position={[0, 0.55, 0]} size={[2, 0.16, 0.6]} color={C.wood} />
            <Box
              position={[0, 1, -0.27]}
              size={[2, 0.6, 0.12]}
              color={C.wood}
            />
            {[-0.7, 0.7].map((x) => (
              <Box
                key={x}
                position={[x, 0.27, 0]}
                size={[0.1, 0.55, 0.5]}
                color={C.dark}
              />
            ))}
          </RigidBody>
        </group>
        <Label
          text="MAKE YOURSELF AT HOME"
          position={[0, 0.06, 5.8]}
          rotation={[-Math.PI / 2, 0, 0]}
          width={4.4}
          height={0.5}
          color="#65764c"
        />
        <Player
          input={input}
          player={player}
          onNear={onNear}
          onReady={onReady}
        />
      </Physics>
    </>
  );
}
