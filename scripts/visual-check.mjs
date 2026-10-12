import { chromium, expect } from "@playwright/test";
import { mkdirSync, existsSync } from "node:fs";
const base = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4190";
const browser = await chromium.launch({
  executablePath:
    process.env.PORTFOLIO_CHROMIUM_PATH ??
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
mkdirSync("artifacts", { recursive: true });
if (base.startsWith("https://"))
  await page.route("https://**/*", async (route) => {
    const req = route.request();
    const response = await fetch(req.url(), {
      method: req.method(),
      headers: req.headers(),
      body: req.postData() ?? undefined,
    });
    const headers = Object.fromEntries(response.headers);
    for (const key of [
      "content-encoding",
      "content-length",
      "transfer-encoding",
    ])
      delete headers[key];
    await route.fulfill({
      status: response.status,
      headers,
      body: Buffer.from(await response.arrayBuffer()),
    });
  });
try {
  for (const [name, width, height] of [
    ["mobile", 375, 1000],
    ["phone", 390, 1000],
    ["large-phone", 430, 1000],
    ["tablet", 768, 1000],
    ["laptop", 1024, 900],
    ["desktop", 1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    const response = await page.goto(base, { waitUntil: "domcontentloaded" });
    expect(response.status()).toBe(200);
    await expect(page.locator(".assembly-canvas")).toHaveAttribute(
      "data-ready",
      "true",
    );
    await page.evaluate(async () => await document.fonts.ready);
    const canvas = page.locator(".assembly canvas");
    await canvas.scrollIntoViewIfNeeded();
    const collapsed = await canvas.screenshot();
    await page.getByRole("button", { name: "Explore the layers" }).click();
    expect(collapsed.equals(await canvas.screenshot())).toBe(false);
    await page.getByRole("button", { name: "Bring it together" }).click();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `artifacts/${name}-final.png` });
    await page.getByRole("link", { name: "Explore the case study" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "NEXYRAL",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `artifacts/case-${name}-final.png` });
    console.log(
      JSON.stringify({
        width,
        core: "passed",
        home: "passed",
        caseStudy: "passed",
        overflow: false,
      }),
    );
  }
  if (!base.startsWith("https://")) {
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(base);
    await expect(page.locator(".assembly-canvas")).toHaveAttribute(
      "data-ready",
      "true",
    );
    await page.evaluate(async () => await document.fonts.ready);
    await page.screenshot({ path: "public/images/social-preview.png" });
  }
  expect(errors).toEqual([]);
  console.log(JSON.stringify({ errors }));
} finally {
  await browser.close();
}
