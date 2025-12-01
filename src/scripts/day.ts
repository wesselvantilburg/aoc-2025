const [, , dayArg, partArg] = process.argv;

if (!dayArg || !partArg) {
  console.error("Usage: bun run day <day> <part>");
  process.exit(1);
}

const day = dayArg.padStart(2, "0");

const partMap: Record<string, string> = {
  "1": "one",
  "2": "two",
};

const part = partMap[partArg];
if (!part) {
  console.error(`Invalid part: ${partArg}`);
  process.exit(1);
}

const file = `days/${day}/${part}.ts`;

console.log(`Running ${file}...\n`);

await import(`../${file}`);
