import { duration, fetchInputByDay } from "@/utils";

const SIZE: number = 100;

function moveAndCount(start: number, step: number) {
  const sum = start + step;
  const end = ((sum % SIZE) + SIZE) % SIZE;

  let passes = 0;
  if (step > 0) {
    passes = Math.floor(sum / SIZE) - Math.floor(start / SIZE);
  } else if (step < 0) {
    passes = Math.floor((start - 1) / SIZE) - Math.floor((sum - 1) / SIZE);
  }

  return { end, passes };
}

function solve(input: string): number {
  const lines = input.split("\n");

  let dial = 50;
  let count = 0;

  for (const line of lines) {
    let distance = parseInt(line.slice(1, line.length));
    if (line[0] === "L") distance *= -1;

    const { end, passes } = moveAndCount(dial, distance);
    count += passes;
    dial = end;
  }

  return count;
}

const rawInput = await fetchInputByDay(1);
const result = duration(solve)(rawInput);

console.log(result);
