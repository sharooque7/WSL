function random_between_stack() {
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgba = `rgba(${r},${g},${b},${0.7})`;
  return rgba;
}

export default random_between_stack;
