import * as THREE from 'three';

// Simple noise function for terrain generation
function noise(x, z, scale = 1, amplitude = 1) {
  const freq = 0.01 * scale;
  return Math.sin(x * freq) * Math.cos(z * freq) * amplitude +
         Math.sin(x * freq * 2.3) * Math.cos(z * freq * 1.7) * amplitude * 0.5 +
         Math.sin(x * freq * 4.1) * Math.cos(z * freq * 3.9) * amplitude * 0.25;
}

export function generateHeightmap(width, height, maxHeight = 3) {
  const data = new Float32Array(width * height);
  
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const x = (j - width / 2) * 2;
      const z = (i - height / 2) * 2;
      
      // Create gentle rolling hills
      let elevation = 0;
      elevation += noise(x, z, 0.5, maxHeight * 0.7); // Large gentle hills
      elevation += noise(x, z, 1.5, maxHeight * 0.2); // Medium details
      elevation += noise(x, z, 3, maxHeight * 0.1); // Fine details
      
      // Smooth falloff at edges
      const edgeFactor = Math.min(
        Math.min(j, width - j) / (width * 0.1),
        Math.min(i, height - i) / (height * 0.1)
      );
      elevation *= Math.min(1, edgeFactor);
      
      data[i * width + j] = elevation;
    }
  }
  
  return data;
}

export function getHeightAtPosition(heightData, width, height, x, z, terrainSize) {
  const halfSize = terrainSize / 2;
  const u = (x + halfSize) / terrainSize;
  const v = (z + halfSize) / terrainSize;
  
  const i = Math.floor(v * (height - 1));
  const j = Math.floor(u * (width - 1));
  
  if (i < 0 || i >= height || j < 0 || j >= width) return 0;
  
  return heightData[i * width + j];
}