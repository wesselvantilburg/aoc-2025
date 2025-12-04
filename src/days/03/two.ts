import { duration, fetchInputByDay } from "@/utils";

function findHighest(start: number, max: number, list: string) {
  let highest = 0;
  let position = 0;
  for (let i = start; i < max; i++) {
    const current = Number(list[i]);
    if (current <= highest) continue;

    highest = current;
    position = i;
  }
  return { highest, position };
}

function solve(input: string): number {
  const lines = input.split("\n");

  let total = 0;

  for (const line of lines) {
    let position = -1;
    for (let i = 11; i >= 0; i--) {
      const { highest, position: newPosition } = findHighest(
        position + 1,
        line.length - i,
        line
      );
      total += highest * Math.pow(10, i);
      position = newPosition;
    }
  }

  return total;
}

const rawInput = await fetchInputByDay(3);
const result = duration(solve)(rawInput);

console.log(result);
