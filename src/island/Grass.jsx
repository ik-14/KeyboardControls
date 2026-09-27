import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
function random(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
export function Grass({ player }) {
  const material = useRef();
  const geometry = useMemo(() => {
    const rng = random(73),
      offsets = [],
      scales = [];
    for (let i = 0; i < 22000; i++) {
      const x = (rng() - 0.5) * 30,
        z = (rng() - 0.5) * 27;
      if ((x * x) / 225 + (z * z) / 182 > 1) continue;
      // Leave circulation, the studio, court and exhibits clear.
      if (
        Math.abs(x) < 1.6 ||
        Math.abs(z - 1) < 1.3 ||
        (x > 3.7 && x < 10.7 && z > -1 && z < 9) ||
        (x > -8 && x < 0 && z < -2) ||
        (x > 0 && z < -3) ||
        (x < -5 && z > 2 && z < 8)
      )
        continue;
      offsets.push(x, 0.015, z);
      scales.push(0.2 + rng() * 0.35, rng() * 6.28, rng());
    }
    const g = new THREE.InstancedBufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [-0.065, 0, 0, 0.065, 0, 0, 0.04, 0.6, 0, 0, 1, 0, -0.04, 0.6, 0],
        3,
      ),
    );
    g.setIndex([0, 1, 2, 0, 2, 4, 4, 2, 3]);
    g.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3),
    );
    g.setAttribute(
      "data",
      new THREE.InstancedBufferAttribute(new Float32Array(scales), 3),
    );
    g.instanceCount = offsets.length / 3;
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const uniforms = useMemo(
    () => ({ time: { value: 0 }, player: { value: new THREE.Vector3() } }),
    [],
  );
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.time.value = clock.elapsedTime;
      material.current.uniforms.player.value.copy(player.current);
    }
  });
  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`
    attribute vec3 offset; attribute vec3 data; uniform float time; uniform vec3 player; varying float shade; varying float height;
    void main(){vec3 p=position; height=p.y; p.y*=data.x; float s=sin(data.y),c=cos(data.y);p.xz=mat2(c,-s,s,c)*p.xz;
    float tip=height*height; p.x+=sin(time*1.6+offset.x*.7+offset.z*.5)*.09*tip;
    vec2 delta=offset.xz-player.xz;float distance=length(delta);float influence=1.-smoothstep(.2,1.25,distance);
    p.xz+=delta/max(distance,.01)*influence*.48*tip;p.y*=1.-influence*.4;
    shade=data.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p+offset,1.);}`}
        fragmentShader={`varying float shade;varying float height;void main(){vec3 base=mix(vec3(.27,.38,.16),vec3(.48,.57,.26),shade);vec3 color=mix(base*.8,base+vec3(.12,.1,.025),height);gl_FragColor=vec4(color,1.); #include <tonemapping_fragment>\n #include <encodings_fragment>\n}`.replace(
          "; #include",
          ";\n #include",
        )}
      />
    </mesh>
  );
}
