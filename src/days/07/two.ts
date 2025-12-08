import { duration, fetchInputByDay } from "@/utils";

function countTimelines(
  grid: string[][],
  x: number,
  y: number,
  cache: Map<string, number>
): number {
  // End reached
  if (y >= grid.length) {
    return 1;
  }

  // Result already calculated for position?
  const key = `${x},${y}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const cell = grid[y]![x];
  let result: number;

  if (cell === "^") {
    const leftTimelines = countTimelines(grid, x - 1, y + 2, cache);
    const rightTimelines = countTimelines(grid, x + 1, y + 2, cache);
    result = leftTimelines + rightTimelines;
  } else {
    result = countTimelines(grid, x, y + 2, cache);
  }

  cache.set(key, result);
  return result;
}

function solve(input: string): number {
  const grid = input.split("\n").map((line) => line.split(""));
  const startBeam = grid[0]!.indexOf("S");
  const cache = new Map<string, number>();

  return countTimelines(grid, startBeam, 2, cache);
}

const rawInput = await fetchInputByDay(7);
const result = duration(solve)(rawInput);

console.log(result);
