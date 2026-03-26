#!/usr/bin/env node
import fs from "node:fs";

const inputPath = process.argv[2];

if (!inputPath) {
  console.log("Usage: node scripts/benchmark-startup.mjs <metrics.json>");
  console.log("Example metrics file format: [{\"domContentLoadedMs\":210,\"firstPaintMs\":165}]");
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8");
const rows = JSON.parse(raw);

if (!Array.isArray(rows) || rows.length === 0) {
  console.error("No rows found. Provide a non-empty JSON array.");
  process.exit(1);
}

const dcl = rows.map((r) => Number(r.domContentLoadedMs)).filter(Number.isFinite);
const fp = rows.map((r) => Number(r.firstPaintMs)).filter(Number.isFinite);

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const p95 = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95));
  return sorted[idx];
};

console.log("Startup Benchmark Summary");
console.log(`Samples: ${rows.length}`);
console.log(`DOMContentLoaded avg: ${avg(dcl).toFixed(2)}ms`);
console.log(`DOMContentLoaded p95: ${p95(dcl).toFixed(2)}ms`);
console.log(`FirstPaint avg: ${avg(fp).toFixed(2)}ms`);
console.log(`FirstPaint p95: ${p95(fp).toFixed(2)}ms`);
console.log(`Gap (DCL - FP) avg: ${(avg(dcl) - avg(fp)).toFixed(2)}ms`);
