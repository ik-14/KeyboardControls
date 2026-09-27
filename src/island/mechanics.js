export const dampAlpha = (rate, delta) =>
  1 - Math.exp(-rate * Math.min(delta, 0.05));
export function screenMovement(x, z) {
  const length = Math.hypot(x, z);
  if (length < 0.01) return { x: 0, z: 0 };
  x /= length;
  z /= length;
  return { x: x * 0.8 + z * 0.6, z: -x * 0.6 + z * 0.8 };
}
export function shotVelocity(start, target, duration = 1.12) {
  return {
    x: (target[0] - start.x) / duration,
    y: (target[1] - start.y + 4.905 * duration ** 2) / duration,
    z: (target[2] - start.z) / duration,
  };
}
export function crossedBasket(previousY, position, hoop) {
  return (
    previousY > hoop[1] &&
    position.y <= hoop[1] &&
    Math.hypot(position.x - hoop[0], position.z - hoop[2]) < 0.4
  );
}
