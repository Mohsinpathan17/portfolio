import { test, expect } from "@playwright/test";
for (const width of [375, 390, 768, 1440]) {
  test(`portfolio ${width}px: navigation, projects, profile and case study`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Useful software.",
    );
    await expect(page.locator(".assembly-canvas")).toHaveAttribute(
      "data-ready",
      "true",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", { name: "Just a minute? Read my quick profile" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("button", {
        name: "Just a minute? Read my quick profile",
      }),
    ).toBeFocused();
    if (width < 801) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
    }
    await page
      .getByRole("link", { name: "Explore my work", exact: true })
      .click();
    await expect(page).toHaveURL(/#work/);
    await expect(
      page
        .locator(".flagship-links")
        .getByRole("link", { name: "Live website" }),
    ).toHaveAttribute("href", "https://nexyral.online");
    await expect(
      page
        .locator(".flagship-links")
        .getByRole("link", { name: "Source code" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Mohsinpathan17/nexus-ai-platform",
    );
    await page.getByRole("button", { name: "Build the whole flow" }).click();
    await expect(page.locator(".approach-detail")).toContainText(
      "Failed AI revisions keep the previous",
    );
    await page.getByRole("link", { name: "Explore the case study" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "NEXYRAL",
    );
    await expect(page.locator(".case-facts")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "NEXYRAL",
    );
    await page.getByRole("link", { name: "Back to selected work" }).click();
    await expect(page).toHaveURL(/#work/);
    expect(errors).toEqual([]);
  });
}
test("3D assembly rotates, pauses, changes layers and stays stable with reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".assembly").scrollIntoViewIfNeeded();
  const canvas = page.locator(".assembly canvas");
  await expect(canvas).toBeVisible();
  await expect(page.locator(".assembly-canvas")).toHaveAttribute(
    "data-ready",
    "true",
  );
  await page.waitForTimeout(250);
  const before = await canvas.screenshot();
  await page.waitForTimeout(700);
  expect(before.equals(await canvas.screenshot())).toBe(false);
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await page.waitForTimeout(250);
  const paused = await canvas.screenshot();
  await page.waitForTimeout(350);
  expect(paused.equals(await canvas.screenshot())).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Resume 3D animation" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Explore the layers" }).click();
  await expect(
    page.getByRole("button", { name: "Bring it together" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(paused.equals(await canvas.screenshot())).toBe(false);
  await page.getByRole("button", { name: "03 Systems" }).click();
  await expect(page.locator(".assembly-description")).toContainText(
    "keeps it dependable",
  );
});
test("resume really downloads, contact is direct, copy works and missing routes have a recovery", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "View résumé", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Mohsin_Pathan_Resume.pdf");
  const file = await download.createReadStream();
  if (!file) throw new Error("No resume bytes");
  const parts: Buffer[] = [];
  for await (const part of file) parts.push(Buffer.from(part));
  expect(Buffer.concat(parts).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(
    page.getByRole("link", { name: "Email Mohsin", exact: true }),
  ).toHaveAttribute("href", /^mailto:mohsinpathan1058@gmail.com/);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Email address copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mohsinpathan1058@gmail.com",
  );
  await page.goto("/missing");
  await expect(
    page.getByRole("heading", { name: "This page isn’t here." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to the portfolio →" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Useful software.",
  );
});
test("the portfolio remains usable when WebGL is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await expect(page.locator(".assembly-fallback")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Useful software.",
  );
  await page.getByRole("link", { name: "Explore the case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "NEXYRAL",
  );
});
