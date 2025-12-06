import { duration, fetchInputByDay } from "@/utils";

function solve(input: string): number {
  const lines = input
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, ",").split(","));

  const numbers = lines.slice(0, lines.length - 1);
  const operators = lines[lines.length - 1]!;

  let total = 0;

  for (let i = 0; i < operators.length; i++) {
    const operationNumbers = [];
    for (let j = 0; j < numbers.length; j++) {
      operationNumbers.push(numbers[j]![i]);
    }
    const operation = operationNumbers.join(operators[i]);
    total += eval(operation);
  }

  return total;
}

const rawInput = await fetchInputByDay(6);
const result = duration(solve)(rawInput);

console.log(result);
