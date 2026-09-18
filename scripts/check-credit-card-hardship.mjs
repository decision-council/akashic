import { readFile, readdir } from "node:fs/promises";
import { assessHardshipFreshness, validateHardshipRegistry } from "./lib/credit-card-hardship.mjs";

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== "--as-of")) throw new Error("Usage: node scripts/check-credit-card-hardship.mjs [--as-of YYYY-MM-DD]");
const asOf = args[1] ?? new Date().toISOString().slice(0, 10);
const directory = new URL("../research/financial-hardship/records/", import.meta.url);
const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
const records = await Promise.all(names.map(async (name) => JSON.parse(await readFile(new URL(name, directory), "utf8"))));
validateHardshipRegistry(records);
console.log(JSON.stringify({ schemaVersion: 1, records: records.map((record) => assessHardshipFreshness(record, asOf)) }, null, 2));
