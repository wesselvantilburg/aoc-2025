import { duration, fetchInputByDay } from "@/utils";

function split(beams: Set<number>, x: number) {
  beams.delete(x);
  beams.add(x - 1);
  beams.add(x + 1);
}

function solve(input: string): number {
  const grid = input.split("\n").map((line) => line.split(""));
  const startBeam = grid[0]!.indexOf("S");
  const beams = new Set<number>([startBeam]);

  let splits = 0;

  for (let y = 2; y < grid.length; y += 2) {
    for (let x = 0; x < grid[y]!.length; x++) {
      const cell = grid[y]![x];
      if (cell !== "^") continue;
      if (!beams.has(x)) continue;

      split(beams, x);
      splits++;
    }
  }

  return splits;
}

const rawInput = await fetchInputByDay(7);
const result = duration(solve)(rawInput);

console.log(result);
