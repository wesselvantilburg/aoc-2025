import { duration, fetchInputByDay } from "@/utils";

const DIRECTIONS = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

const PAPER_SYMBOL = "@";

function countAdjacentMatches(
  x: number,
  y: number,
  grid: string[],
  match: string
) {
  return DIRECTIONS.reduce((matches, direction) => {
    if (grid[y + direction.y]?.[x + direction.x] === match)
      return (matches += 1);
    return matches;
  }, 0);
}

function solve(input: string): number {
  const grid: string[] = input.split("\n");

  const rows = grid.length;
  const cols = grid[0]!.length;

  let total = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y]![x] !== PAPER_SYMBOL) continue;

      const matches = countAdjacentMatches(x, y, grid, PAPER_SYMBOL);

      if (matches > 3) continue;

      total++;
    }
  }

  return total;
}

const rawInput = await fetchInputByDay(4);
const result = duration(solve)(rawInput);

console.log(result);
