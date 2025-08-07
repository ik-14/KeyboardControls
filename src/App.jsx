import {
  Environment,
  Html,
  KeyboardControls,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Experience } from "./components/Experience";

const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  const keyBoardControlsMap = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: "run", keys: ["Shift"] },
    ],
    []
  );
  return (
    <KeyboardControls map={keyBoardControlsMap}>
      <Canvas
        style={{
          touchAction: "none",
          // backgroundColor: 'black'
        }}
        shadows
        camera={{ fov: 45 }}
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="sunset" />
          <Experience />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
