#!/usr/bin/env node
/* =========================================================
                      NEXUP END-TO-END
   Opens every page in a real browser and exercises the main
   flows. Setup (once):  npm install && npx playwright install chromium
   Run:                  npm test
========================================================= */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };

/* Tiny static server so the pages run exactly as they would on a host. */
const server = http.createServer((request, response) => {
    const file = path.join(root, decodeURIComponent(request.url.split("?")[0]));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        response.writeHead(404).end("not found");
        return;
    }
    response.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(response);
});

await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

/* Fresh browser profile per test. Remote fonts and images are blocked so tests run offline. */
async function open(url) {
    const context = await browser.newContext({ viewport: { width: 1360, height: 900 } });
    await context.route(url => !url.href.startsWith(base), route => route.abort());
    const page = await context.newPage();
    const errors = [];

    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
        if (message.type() === "error" && !/Failed to load resource|ERR_FAILED/.test(message.text())) errors.push(message.text());
    });
    page.on("requestfailed", request => {
        if (request.url().startsWith(base)) errors.push("request failed: " + request.url());
    });

    if (url) await page.goto(base + url);
    return { page, context, errors };
}

const results = [];

async function test(name, run) {
    try {
        await run();
        results.push([true, name]);
    } catch (error) {
        results.push([false, name, error.message.split("\n")[0]]);
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const equal = (actual, expected, label) => assert(actual === expected, `${label}: expected ${expected}, got ${actual}`);

/* ---------------------------------------------------------
   Every page loads without errors
--------------------------------------------------------- */
for (const page of ["home2", "marketplace", "venture", "pitch", "sell", "favorites", "categories", "pipeline", "profile"]) {
    await test(`${page}.html loads with no errors`, async () => {
        const { context, errors } = await open(`/HTML/${page}.html`);
        await new Promise(resolve => setTimeout(resolve, 300));
        assert(errors.length === 0, errors.join(" | "));
        await context.close();
    });
}

/* ---------------------------------------------------------
   Home
--------------------------------------------------------- */
await test("home: shows the six fastest-growing ventures", async () => {
    const { page, context } = await open("/HTML/home2.html");
    equal(await page.locator("[data-trending-id]").count(), 6, "trending cards");
    await context.close();
});

await test("home: search finds a venture and escapes typed HTML", async () => {
    const { page, context } = await open("/HTML/home2.html");
    await page.keyboard.press("/");
    await page.fill("#globalSearch", "nova");
    assert((await page.locator("#searchResults").innerText()).includes("NovaMind AI"), "NovaMind should match");

    await page.fill("#globalSearch", "<img src=x onerror=window.__xss=1>");
    equal(await page.evaluate(() => window.__xss), undefined, "script injected");
    assert((await page.locator("#searchResults").innerText()).includes("<img"), "typed text should be shown, not run");
    await context.close();
});

/* ---------------------------------------------------------
   Marketplace
--------------------------------------------------------- */
await test("marketplace: lists all nine ventures", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    equal(await page.locator(".venture-card").count(), 9, "cards");
    await context.close();
});

await test("marketplace: category pill filters the grid", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    await page.click('.category-pill[data-category="AI"]');
    equal(await page.locator(".venture-card").count(), 2, "AI cards");
    await context.close();
});

await test("marketplace: ?category= and ?q= deep links work", async () => {
    const { page, context } = await open("/HTML/marketplace.html?category=Gaming");
    equal(await page.locator(".venture-card").count(), 1, "Gaming cards");
    equal(await page.locator(".category-pill.active").getAttribute("data-category"), "Gaming", "active pill");
    await page.goto(base + "/HTML/marketplace.html?q=flowdesk");
    equal(await page.locator(".venture-card").count(), 1, "search cards");
    await context.close();
});

await test("marketplace: a card opens from the keyboard", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    await page.locator(".venture-card").first().focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(/venture\.html\?id=\d+/);
    await context.close();
});

await test("marketplace: sorts by price", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    await page.selectOption("#sortSelect", "price-low");
    assert((await page.locator(".venture-card h3").first().innerText()).includes("QuickBite"), "cheapest first");
    await context.close();
});

await test("marketplace: old favourites key is migrated", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    await page.evaluate(() => localStorage.setItem("nexupMarketplaceFavorites", "[2]"));
    await page.reload();
    const state = await page.evaluate(() => ({
        favorites: localStorage.getItem("nexupFavorites"),
        legacy: localStorage.getItem("nexupMarketplaceFavorites")
    }));
    equal(state.favorites, "[2]", "merged favourites");
    equal(state.legacy, null, "legacy key");
    await context.close();
});

/* ---------------------------------------------------------
   Venture and Pitch
--------------------------------------------------------- */
await test("venture: every venture id renders", async () => {
    const { page, context } = await open();
    for (let id = 1; id <= 9; id++) {
        await page.goto(`${base}/HTML/venture.html?id=${id}`);
        const name = await page.locator("#ventureName").innerText();
        assert(name && !/not found/i.test(name), `venture ${id} shows "${name}"`);
    }
    await context.close();
});

await test("venture and pitch: an unknown id shows a not-found state", async () => {
    const { page, context } = await open("/HTML/venture.html?id=999");
    assert(/not found/i.test(await page.locator("#ventureName").innerText()), "venture not-found");
    await page.goto(base + "/HTML/pitch.html?id=999");
    assert(/not found/i.test(await page.locator("body").innerText()), "pitch not-found");
    await context.close();
});

await test("pitch: shows the requested venture", async () => {
    const { page, context } = await open("/HTML/pitch.html?id=7");
    assert((await page.locator(".hero-copy h1").innerText()).replace(/\s+/g, "").includes("PixelPilot"), "PixelPilot title");
    await context.close();
});

/* ---------------------------------------------------------
   Favourites, pipeline, profile
--------------------------------------------------------- */
await test("favourites flow: save, pipeline stage, profile stats, remove", async () => {
    const { page, context } = await open("/HTML/marketplace.html");
    await page.click('[data-favorite="2"]');
    equal(await page.evaluate(() => localStorage.getItem("nexupFavorites")), "[2]", "saved id");

    await page.goto(base + "/HTML/favorites.html");
    equal(await page.locator(".favorite-card").count(), 1, "favourite cards");

    await page.goto(base + "/HTML/pipeline.html");
    await page.selectOption("#stage-2", "In talks");
    await page.goto(base + "/HTML/profile.html");
    equal(await page.locator("#statSaved").innerText(), "1", "saved stat");
    equal(await page.locator("#statTalks").innerText(), "1", "in-talks stat");

    await page.goto(base + "/HTML/favorites.html");
    await page.click(".remove-favorite");
    equal(await page.locator(".favorite-card").count(), 0, "cards after remove");
    await context.close();
});

await test("categories: cards link into a filtered marketplace", async () => {
    const { page, context } = await open("/HTML/categories.html");
    equal(await page.locator(".favorite-card").count(), 9, "category cards");
    await page.click('.favorite-card[data-category="AI"]');
    await page.waitForURL("**/marketplace.html?category=AI");
    equal(await page.locator(".venture-card").count(), 2, "AI cards");
    await context.close();
});

/* ---------------------------------------------------------
   Sell: a listing really is saved and escaped
--------------------------------------------------------- */
await test("sell: publishing saves a listing that shows everywhere, then can be deleted", async () => {
    const { page, context } = await open("/HTML/sell.html");
    await page.fill("#ventureName", "<b>Test</b> Venture");
    await page.selectOption("#category", "Fintech");
    await page.fill("#description", "A test listing.");
    await page.fill("#price", "50000");
    await page.click("#publishButton");
    await page.waitForURL(/venture\.html\?id=\d+/);
    assert((await page.locator("#ventureName").innerText()).includes("<b>Test</b>"), "venture page shows typed text");

    await page.goto(base + "/HTML/marketplace.html");
    equal(await page.locator(".venture-card").count(), 10, "cards with listing");
    equal(await page.locator(".venture-card h3 b").count(), 0, "name must be escaped");

    await page.goto(base + "/HTML/profile.html");
    equal(await page.locator("#statListed").innerText(), "1", "listed stat");
    await page.click("[data-remove-listing]");
    equal(await page.locator("#statListed").innerText(), "0", "listed stat after delete");
    await context.close();
});

await test("sell: validation blocks an empty form", async () => {
    const { page, context } = await open("/HTML/sell.html");
    await page.click("#publishButton");
    assert(/name/i.test(await page.locator(".nexup-toast").innerText()), "asks for a name");
    equal(await page.evaluate(() => localStorage.getItem("nexupListings")), null, "nothing saved");
    await context.close();
});

/* --------------------------------------------------------- */
await browser.close();
server.close();

for (const [ok, name, reason] of results) console.log(`${ok ? "✔" : "✖"} ${name}${ok ? "" : "\n    " + reason}`);
const failed = results.filter(item => !item[0]).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
