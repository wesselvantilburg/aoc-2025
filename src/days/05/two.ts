import { duration, fetchInputByDay } from "@/utils";

function getCombinedRanges(ranges: { min: number; max: number }[]) {
  // We loop over all ranges and compare them to other ranges in the list
  // Manipulating ranges if they overlap others
  // Resetting our index to 0 each time to start with the new set of ranges
  // If we reach the last index in the ranges list, we're done and we have a clean set of ranges without overlap.

  let combinedRanges = ranges;

  for (let index = 0; index < combinedRanges.length; index++) {
    if (index === combinedRanges.length - 1) break; // We've reached the end

    const a = combinedRanges[index];

    if (!a) break;
    if (!a.min || !a.max) break;

    for (let next = 0; next < combinedRanges.length; next++) {
      const b = combinedRanges[next];

      if (a === b) continue; // Don't compare to self

      if (!b) break;
      if (!b.min || !b.max) break;

      // A fits inside B -> remove A
      if (a.min >= b.min && a.max <= b.max) {
        combinedRanges.splice(index, 1);
        index = 0;
        break;
      }

      // B fits inside A -> remove B
      if (b.min >= a.min && b.max <= a.max) {
        combinedRanges.splice(next, 1);
        index = 0;
        break;
      }

      // A.min fits inside B, A max is outside B -> B.max = A.max
      if (a.min >= b.min && a.min <= b.max && a.max >= b.max) {
        b.max = a.max;
        index = 0;
        break;
      }

      // B.min fits inside A, B max is outside A -> A.max = B.max
      if (b.min >= a.min && b.min <= a.max && b.max >= a.max) {
        a.max = b.max;
        index = 0;
        break;
      }
    }
  }
  return combinedRanges;
}

function solve(input: string): number {
  const [rawRanges] = input.split("\n\n").map((group) => group.split("\n"));

  if (!rawRanges) throw new Error("Faulty input. Missing ranges");

  const ranges = rawRanges.map((raw) => {
    const [min, max] = raw.split("-").map(Number);
    return { min: min!, max: max! };
  });

  // We should merge ranges until we have a subset of (unique) combined ranges where we can calculate valid ids based on (range.max - range.min + 1)
  const combinedRanges = getCombinedRanges(ranges);

  return combinedRanges.reduce(
    (total, range) => total + range.max - range.min + 1,
    0
  );
}

const rawInput = await fetchInputByDay(5);
const result = duration(solve)(rawInput);

console.log(result);
