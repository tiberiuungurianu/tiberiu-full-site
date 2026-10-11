export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  hover: 0.28,
  reveal: 0.55,
  menu: 0.42,
  lightbox: 0.48,
  hero: 1.0,
  instant: 0.01,
} as const;

export function durationFor(reduceMotion: boolean, value: number) {
  return reduceMotion ? motionDuration.instant : value;
}
