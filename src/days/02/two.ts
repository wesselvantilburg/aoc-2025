import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const lines = input
    .split(",")
    .map((line) => line.split("-").map((str) => parseInt(str, 10)));

  let total = 0;

  for (const line of lines) {
    const [min, max] = line;

    if (!min || !max) continue;

    for (let num = min; num <= max; num++) {
      const str = num.toString();
      const size = str.length;

      // Start splitting in 2 -> increment split if no equal parts
      for (let split = 2; split <= size; split++) {
        // Not able to divide by split -> no equal parts, continue
        if (size % split !== 0) continue;

        const parts = [];

        const partSize = size / split;

        for (let i = 0; i < split; i++) {
          parts.push(str.slice(i * partSize, (i + 1) * partSize));
        }

        if (new Set(parts).size !== 1) continue;

        total += num;
        break;
      }
    }
  }

  return total;
}

const rawInput = await fetchInputByDay(2);
const result = duration(solve)(rawInput);

console.log(result);
