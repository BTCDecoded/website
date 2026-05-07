#!/usr/bin/env node
/**
 * Copies blvm-docs canonical install JSON into website/data/ for Next.js import.
 * Monorepo layout: website/ and blvm-docs/ are siblings under btc-commons.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, "..");
const src = path.resolve(websiteRoot, "../blvm-docs/src/install/install-content.json");
const dest = path.join(websiteRoot, "data/install-content.json");

if (!fs.existsSync(src)) {
  console.warn(
    "sync-install-data: blvm-docs source missing at",
    src,
    "\nKeeping existing",
    dest,
    "if present.",
  );
  process.exit(0);
}
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log("sync-install-data: copied install-content.json → website/data/");
