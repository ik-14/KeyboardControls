import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";

export const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    uPlayerPos: new Vector3(0, 0, 0),
    uPushRadius: 2,
    uPushStrength: 0.5,
  },
  /* Vertex Shader */
  /* glsl */ `
    precision mediump float;
    uniform float uTime;
    uniform vec3 uPlayerPos;
    uniform float uPushRadius;
    uniform float uPushStrength;
    
    attribute vec3 offset;
    attribute float scale;
    attribute float rotation;
    attribute float colorVariation;
    
    varying float vColorVariation;
    varying float vInfluence;
    
    void main() {
      vColorVariation = colorVariation;
      
      vec3 pos = position;
      
      pos *= scale;
      
      pos.x += sin(uTime * 0.5 + offset.x * 20.0) * 0.05 * scale;
      pos.y += sin(uTime * 0.5 + offset.y * 20.0) * 0.02 * scale;
      
      float c = cos(rotation);
      float s = sin(rotation);
      mat3 rotMatrix = mat3(
        c, 0.0, -s,
        0.0, 1.0,  0.0,
        s, 0.0,  c
      );
      pos = rotMatrix * pos;
      
      float dist = length(offset.xz - uPlayerPos.xz);
      float influence = smoothstep(uPushRadius, 0.0, dist);
      vInfluence = influence;
      
      vec2 pushDir = normalize(offset.xz - uPlayerPos.xz);
      pos.x += pushDir.x * influence * uPushStrength;
      pos.z += pushDir.y * influence * uPushStrength;
      
      pos += offset;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* Fragment Shader */
  /* glsl */ `
precision mediump float;
varying float vColorVariation;
varying float vInfluence;

void main() {
  // Define a dark base green and a lighter base green
  // These are carefully chosen to match the range of greens in your screenshot.
  vec3 darkGrassColor = vec3(0.116, 0.235, 0.117); // Approx RGB(40, 60, 30) from screenshot
  vec3 lightGrassColor = vec3(0.39, 0.58, 0.235);  // Approx RGB(100, 150, 60) from screenshot

  // Mix between the dark and light grass colors based on vColorVariation.
  // vColorVariation now directly controls the blend from dark to light.
  vec3 finalColor = mix(darkGrassColor, lightGrassColor, vColorVariation);
  
  // Define a highlight color for player interaction - can be a brighter, distinct green
  vec3 highlightColor = vec3(0.5, 0.8, 0.3); // A brighter, slightly yellow-green for the pushed state
  
  // Mix the current grass color with the highlight color based on player influence.
  finalColor = mix(finalColor, highlightColor, vInfluence);
  
  gl_FragColor = vec4(finalColor, 1.0);
}

  `
);
