import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Color } from 'three';
import { useDayNightCycle } from '../utils/hooks/useDayNightCycle';

export const DayNightLighting = () => {
  const cycle = useDayNightCycle();
  const { scene } = useThree();

  useEffect(() => {
    if (cycle.skyColor) {
      scene.background = new Color(cycle.skyColor);
    }
  }, [scene, cycle.skyColor]);


  const ambientIntensity = cycle.ambientIntensity
  const lightIntensity = cycle.lightIntensity
  const lightColor = cycle.lightColor
  const sunPosition = cycle.sunPosition

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={ambientIntensity} />

      {/* Sun - always visible, moves in circle */}
      <directionalLight
        position={sunPosition}
        intensity={lightIntensity}
        color={lightColor}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
      />

      {/* Dynamic fog */}
      <fog
        attach="fog"
        args={[
          cycle.skyColor,
          15,
          80
        ]}
      />
    </>
  );
};