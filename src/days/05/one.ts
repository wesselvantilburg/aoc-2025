import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const [rawRanges, rawIds] = input
    .split("\n\n")
    .map((group) => group.split("\n"));

  if (!rawRanges || !rawIds)
    throw new Error("Faulty input. Missing ranges or ids");

  const ranges = rawRanges.map((raw) => {
    const [min, max] = raw.split("-").map(Number);
    return { min: min!, max: max! };
  });

  const ids = rawIds.map(Number);

  let fresh = 0;

  for (const id of ids) {
    for (const range of ranges) {
      if (id >= range.min && id <= range.max) {
        fresh++;
        break;
      }
    }
  }

  return fresh;
}

const rawInput = await fetchInputByDay(5);
const result = duration(solve)(rawInput);

console.log(result);
