import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";

export const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    uPlayerPos: new Vector3(0, 0, 0),
    uPushRadius: 1.5,
    uPushStrength: 1,
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
      
      pos.x += sin(uTime * 0.5 + offset.x * 20.0) * 0.275 ; // NOTE: This is the grass swaying x
      pos.y += sin(uTime * 0.5 + offset.y * 20.0) * 0.005; // NOTE: This is the grass swaying y
      
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
  vec3 darkGrassColor = vec3(0.08, 0.15, 0.06);   // Darker, more realistic grass
  vec3 lightGrassColor = vec3(0.25, 0.35, 0.15);  // Muted lighter grass

  // Mix between the dark and light grass colors based on vColorVariation.
  // vColorVariation now directly controls the blend from dark to light.
  vec3 finalColor = mix(darkGrassColor, lightGrassColor, vColorVariation);
  
  // Define a highlight color for player interaction
  vec3 highlightColor = vec3(0, 0.1, 0); // Muted highlight color
  
  // Mix the current grass color with the highlight color based on player influence.
  finalColor = mix(finalColor, highlightColor, vInfluence);
  
  gl_FragColor = vec4(finalColor, 1.0);
}

  `
);
