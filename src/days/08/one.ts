import { duration, fetchInputByDay } from "@/utils";

function generateDistanceMap(boxes: string[]): Map<string, number> {
  const distances = new Map<string, number>();

  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i]!.split(",").map(Number);
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j]!.split(",").map(Number);

      const key = `${i}-${j}`;

      if (distances.has(key)) {
        continue;
      }

      const x = Math.pow(a![0]! - b![0]!, 2);
      const y = Math.pow(a![1]! - b![1]!, 2);
      const z = Math.pow(a![2]! - b![2]!, 2);
      const distance = Math.sqrt(x + y + z);

      distances.set(key, distance);
    }
  }

  return distances;
}

function generateCircuits(junctions: [string, number][]): Set<string>[] {
  const circuits: Set<string>[] = [];

  for (const distance of junctions) {
    const [a, b] = distance[0].split("-");

    let appearances: number[] = [];

    for (let i = 0; i < circuits.length; i++) {
      const circuit = circuits[i]!;
      if (circuit.has(a!) || circuit.has(b!)) appearances.push(i);
    }

    // A or B do not appear in any circuit? New circuit
    if (appearances.length === 0) {
      circuits.push(new Set([a!, b!]));
      continue;
    }
    // A or B appears in 1 circuit? Add both to circuit (No duplicates in a set)
    if (appearances.length === 1) {
      circuits[appearances[0]!]!.add(a!);
      circuits[appearances[0]!]!.add(b!);
      continue;
    }
    // A and B appear in 2 circuits? Take all from circuit two and add to circuit one
    if (appearances.length === 2) {
      for (const box of circuits[appearances[1]!]!) {
        circuits[appearances[0]!]!.add(box);
      }
      circuits.splice(appearances[1]!, 1);
      continue;
    }
  }

  return circuits;
}

function solve(input: string): number {
  const lines = input.split("\n");

  const distanceMap = generateDistanceMap(lines);
  const sortedDistancMap = Array.from(distanceMap).sort((a, b) => a[1] - b[1]);

  const circuits = generateCircuits(sortedDistancMap.splice(0, 1000));
  const sortedCircuits = circuits.map((c) => c.size).sort((a, b) => b - a);

  return sortedCircuits[0]! * sortedCircuits[1]! * sortedCircuits[2]!;
}

const rawInput = await fetchInputByDay(8);
const result = duration(solve)(rawInput);

console.log(result);
