import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense, useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";

const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

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
      <Suspense>
        <Canvas shadows camera={{ fov: 45 }}>
          <Experience />
        </Canvas>
      </Suspense>
    </KeyboardControls>
  );
}

export default App;
