import { duration, fetchInputByDay } from "@/utils";

const operators = ["+", "*"];

function solve(input: string): number {
  const lines = input.split("\n");

  const length = lines[0]!.length;

  let total = 0;

  let numbers = [];
  let operator = "";

  // From back to front - 1 (to execute last operation)
  for (let i = length - 1; i >= -1; i--) {
    let number = "";
    for (let j = 0; j < lines.length; j++) {
      const char = lines[j]?.[i];

      if (!char) break;

      if (operators.includes(char)) {
        operator = char;
        break;
      }
      number += char;
    }

    // If we didn't hit a white space, add number, continue
    if (number.trim()) {
      numbers.push(number);
      continue;
    }

    const operation = numbers.join(operator);
    total += eval(operation);

    numbers = [];
    operator = "";
  }

  return total;
}

const rawInput = await fetchInputByDay(6);
const result = duration(solve)(rawInput);

console.log(result);
