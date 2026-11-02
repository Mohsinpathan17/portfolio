import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440]) {
  test("nightfall 3D project explorer at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 930 });
    await page.goto("/");
    const explorer = page.getByRole("region", { name: "Interactive 3D project explorer" });
    await expect(explorer).toBeVisible();
    await expect(explorer.getByRole("heading", { name: "Build what you imagine." })).toBeVisible();
    await explorer.getByRole("button", { name: /KRISHISETU/ }).click();
    await expect(explorer.getByRole("heading", { name: "Predict what matters." })).toBeVisible();
    await expect(explorer.locator(".dimension-planet")).toContainText("K");
    await expect(explorer.getByRole("link", { name: /Explore KrishiSetu/ })).toHaveAttribute(
      "href",
      "https://github.com/Mohsinpathan17/Krishisetu"
    );
    await explorer.getByRole("button", { name: /WEBSITES WITH PUNCH/ }).click();
    await expect(explorer.getByRole("heading", { name: "Make an impression." })).toBeVisible();
    const stage = explorer.locator(".dimension-stage");
    await stage.hover({ position: { x: 40, y: 80 } });
    await expect(stage).not.toHaveCSS("--turn-y", "0deg");
    await stage.dispatchEvent("pointerleave");
    await expect(stage).toHaveCSS("--turn-y", "0deg");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
