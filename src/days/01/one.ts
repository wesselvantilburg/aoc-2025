import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const lines = input.split("\n");

  let dial = 50;
  let count = 0;

  for (const line of lines) {
    const distance = parseInt(line.slice(1, line.length));
    line[0] === "L" ? (dial -= distance) : (dial += distance);
    if (dial % 100 === 0) count++;
  }

  return count;
}

const rawInput = await fetchInputByDay(1);
const result = duration(solve)(rawInput);

console.log(result);
