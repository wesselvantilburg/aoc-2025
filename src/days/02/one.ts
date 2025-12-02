import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const lines = input.split(",");

  let total = 0;

  for (const line of lines) {
    const [min, max] = line.split("-").map((str) => parseInt(str, 10));

    if (!min || !max) continue;

    for (let i = min; i <= max; i++) {
      const str = i.toString();
      const count = str.length;

      if (count % 2 !== 0) continue;

      if (str.slice(0, count / 2) !== str.slice(count / 2)) continue;

      total += i;
    }
  }

  return total;
}

const rawInput = await fetchInputByDay(2);
const result = duration(solve)(rawInput);

console.log(result);
