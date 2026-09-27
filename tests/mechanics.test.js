import test from "node:test";
import assert from "node:assert/strict";
import {
  dampAlpha,
  screenMovement,
  shotVelocity,
  crossedBasket,
} from "../src/island/mechanics.js";
test("diagonals and combined touch/keyboard never increase movement speed", () => {
  for (const [x, z] of [
    [1, 0],
    [0, -1],
    [1, 1],
    [-1, -1],
    [2, 1],
  ]) {
    const v = screenMovement(x, z);
    assert.ok(Math.abs(Math.hypot(v.x, v.z) - 1) < 1e-10);
  }
  assert.deepEqual(screenMovement(0, 0), { x: 0, z: 0 });
});
test("movement smoothing converges equally at 30, 60 and 120 FPS", () => {
  const velocities = [30, 60, 120].map((fps) => {
    let v = 0;
    for (let i = 0; i < fps; i++) v += (3.4 - v) * dampAlpha(18, 1 / fps);
    return v;
  });
  assert.ok(Math.max(...velocities) - Math.min(...velocities) < 1e-10);
});
test("the basketball reaches the hoop while descending", () => {
  const start = { x: 7, y: 1.8, z: 5 },
    hoop = [7, 3.35, 0.4],
    t = 1.12;
  const v = shotVelocity(start, hoop);
  const p = {
    x: start.x + v.x * t,
    y: start.y + v.y * t - 4.905 * t * t,
    z: start.z + v.z * t,
  };
  assert.ok(Math.hypot(p.x - hoop[0], p.y - hoop[1], p.z - hoop[2]) < 1e-10);
  assert.ok(v.y - 9.81 * t < 0);
});
test("basket detection rejects rising balls, misses and balls remaining below the rim", () => {
  const hoop = [7, 3.35, 0.4];
  assert.equal(crossedBasket(3.5, { x: 7, y: 3.3, z: 0.4 }, hoop), true);
  assert.equal(crossedBasket(3.2, { x: 7, y: 3.4, z: 0.4 }, hoop), false);
  assert.equal(crossedBasket(3.5, { x: 8, y: 3.3, z: 0.4 }, hoop), false);
  assert.equal(crossedBasket(3.3, { x: 7, y: 3.2, z: 0.4 }, hoop), false);
});
