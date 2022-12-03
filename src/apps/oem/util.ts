export const hsla = (
  hsla: number[],
  opacity: number = 1,
  lightness: number = 0,
) => {
  const h = hsla[0];
  const s = hsla[1];
  const l = hsla[2] + lightness;
  const a = hsla[3] * opacity;
  const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return color;
};
