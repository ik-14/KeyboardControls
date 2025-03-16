import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";

export const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    uPlayerPos: new Vector3(0, 0, 0),
    uPushRadius: 2.5, // Grass within 3 units will be affected.
    uPushStrength: 0.4, // How strongly the grass moves away.
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
    varying float vInfluence; // New: pass influence to fragment shader.
    
    void main() {
      vColorVariation = colorVariation;
      
      vec3 pos = position;
      
      // Wind effect: basic sine-based sway.
      pos.x += sin(uTime + offset.x * 20.0) * 0.05;
      pos.y += sin(uTime + offset.y * 20.0) * 0.02;
      
      // Rotate each blade around Y.
      float c = cos(rotation);
      float s = sin(rotation);
      mat3 rotMatrix = mat3(
        c, 0.0, -s,
        0.0, 1.0,  0.0,
        s, 0.0,  c
      );
      pos = rotMatrix * pos;
      
      // --- Player Interaction Effect ---
      // Calculate the distance in the xz-plane between this grass instance's base and the player.
      float dist = length(offset.xz - uPlayerPos.xz);
      float influence = smoothstep(uPushRadius, 0.0, dist);
      vInfluence = influence; // Pass influence for debugging.
      
      // Calculate push direction away from the player.
      vec2 pushDir = normalize(offset.xz - uPlayerPos.xz);
      pos.x += pushDir.x * influence * uPushStrength;
      pos.z += pushDir.y * influence * uPushStrength;
      
      // Apply per-instance scale and then translate by the offset.
      pos *= scale;
      pos += offset;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* Fragment Shader */
  /* glsl */ `
precision mediump float;
varying float vColorVariation;
varying float vInfluence;  // Influence from player proximity (0 = no influence, 1 = full influence)

void main() {
  // Base green color.
  vec3 baseColor = vec3(0.1, 0.4, 0.2);
  
  // Adjusted brightness calculation for darker grass.
  // Old: 0.7 + vColorVariation * 0.6; New: 0.4 + vColorVariation * 0.4;
  float brightness = 0.4 + vColorVariation * 0.4;
  vec3 finalColor = baseColor * brightness;
  
  // Define a highlight color (lighter green).
  vec3 highlightColor = vec3(0.3, 0.8, 0.4);
  
  // Mix the base color with the highlight based on the influence.
  finalColor = mix(finalColor, highlightColor, vInfluence);
  
  gl_FragColor = vec4(finalColor, 1.0);
}

  `
);
