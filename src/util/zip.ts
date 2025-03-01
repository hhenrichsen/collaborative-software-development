export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((a, i) => [a, b[i]]);
}
