#!/usr/bin/env node
/* =========================================================
                      NEXUP CHECK
   Zero-dependency sanity checks. Run:  node tools/check.mjs

   1. Every local href / src in the HTML resolves, with exact
      letter case (GitHub Pages and Linux are case-sensitive).
   2. Every JavaScript file parses.
   3. Every page loads data.js and shared.js before its own script.
   4. The demo data is consistent (unique ids, required fields,
      valid categories, pitch cards point at real ventures).
========================================================= */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const fail = message => problems.push(message);

/* Case-sensitive existence check, even on Windows and macOS. */
function existsExact(target) {
    const parts = path.relative(root, target).split(path.sep);
    let current = root;

    for (const part of parts) {
        if (!fs.existsSync(current) || !fs.readdirSync(current).includes(part)) return false;
        current = path.join(current, part);
    }

    return true;
}

/* 1 + 3. HTML references and script order */
const htmlDir = path.join(root, "HTML");
const pages = fs.readdirSync(htmlDir).filter(name => name.endsWith(".html"));

for (const page of pages) {
    const file = path.join(htmlDir, page);
    const html = fs.readFileSync(file, "utf8");

    for (const [, , ref] of html.matchAll(/\b(href|src)\s*=\s*"([^"]*)"/g)) {
        if (!ref || /^(https?:|mailto:|data:|tel:|#|javascript:)/i.test(ref)) continue;

        const target = path.resolve(path.dirname(file), ref.split("#")[0].split("?")[0]);
        if (!existsExact(target)) fail(`${page}: broken reference "${ref}"`);
    }

    const scripts = [...html.matchAll(/<script src="\.\.\/JS\/([^"]+)"/g)].map(match => match[1]);
    const own = scripts[scripts.length - 1];

    if (scripts.indexOf("data.js") !== 0 || scripts.indexOf("shared.js") !== 1) {
        fail(`${page}: expected data.js then shared.js before ${own}`);
    }
}

/* 2. JavaScript syntax */
for (const name of fs.readdirSync(path.join(root, "JS"))) {
    if (!name.endsWith(".js")) continue;

    try {
        new vm.Script(fs.readFileSync(path.join(root, "JS", name), "utf8"), { filename: name });
    } catch (error) {
        fail(`JS/${name}: ${error.message}`);
    }
}

/* 4. Data consistency */
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "JS", "data.js"), "utf8"), sandbox);
const data = sandbox.window.NEXUP_DATA;

const required = ["id", "name", "category", "tagline", "description", "pitch", "story", "headline",
    "longDescription", "seller", "revenue", "growth", "price", "views", "verified", "featured", "icon", "image"];
const ids = new Set();

for (const venture of data.ventures) {
    for (const field of required) {
        if (venture[field] === undefined || venture[field] === "") fail(`data: venture ${venture.id} is missing "${field}"`);
    }
    if (ids.has(venture.id)) fail(`data: duplicate id ${venture.id}`);
    ids.add(venture.id);
    if (!data.categories.includes(venture.category)) fail(`data: ${venture.name} uses unknown category "${venture.category}"`);
}

for (const card of data.pitchCards) {
    if (!ids.has(card.ventureId)) fail(`data: pitch card points at missing venture ${card.ventureId}`);
}

if (problems.length) {
    console.error(`\n✖ ${problems.length} problem(s):\n` + problems.map(item => "  - " + item).join("\n"));
    process.exit(1);
}

console.log(`✔ ${pages.length} pages, ${data.ventures.length} ventures, all references and scripts are valid.`);
