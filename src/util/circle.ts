import { Circle } from "@motion-canvas/2d";

export function getPointAtDegree(circle: Circle, degree: number) {
  const radian = (degree * Math.PI) / 180;
  return circle.middle().add({
    x: (circle.size().x / 2) * Math.cos(radian),
    y: (circle.size().y / 2) * Math.sin(radian),
  });
}
