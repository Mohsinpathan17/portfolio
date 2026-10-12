import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4191",
    launchOptions: {
      executablePath:
        process.env.PORTFOLIO_CHROMIUM_PATH ??
        (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
  },
  webServer: {
    command: "npm run preview -- --port 4191 --strictPort",
    url: "http://127.0.0.1:4191",
    reuseExistingServer: false,
  },
});
