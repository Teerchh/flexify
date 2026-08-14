import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.ts",
        // Only run unit tests under src/ — Playwright specs live in e2e/.
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        // Use a single worker thread — more reliable in restricted environments
        // than the default forked-child-process pool. Vite's built-in esbuild
        // transforms JSX for tests, so no React plugin is required here.
        pool: "threads",
        maxWorkers: 1,
        minWorkers: 1,
    },
});
