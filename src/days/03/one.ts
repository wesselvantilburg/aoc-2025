import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const lines = input.split("\n");

  let total = 0;

  for (const line of lines) {
    let first = 0;
    let position = 0;

    for (let i = 0; i < line.length - 1; i++) {
      const current = Number(line[i]);
      if (current <= first) continue;

      first = current;
      position = i;
    }

    let second = 0;

    for (let i = position + 1; i < line.length; i++) {
      const current = Number(line[i]);
      if (current <= second) continue;

      second = current;
    }

    const joltage = first * 10 + second;
    total += joltage;
  }

  return total;
}

const rawInput = await fetchInputByDay(3);
const result = duration(solve)(rawInput);

console.log(result);
