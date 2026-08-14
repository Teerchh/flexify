import { expect, test } from "@playwright/test";

test("renders the home page with the hero and sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Find Movies");
    await expect(page.getByRole("link", { name: "Favorites" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Now Playing" })).toBeVisible();
});

test("navigates to the Favorites page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Favorites" }).click();
    await expect(page).toHaveURL(/\/favorites$/);
    await expect(page.getByRole("heading", { level: 1, name: "My Favorites" })).toBeVisible();
});

test("searches and shows results", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("searchbox", { name: "Search movies" });
    await search.fill("Inception");
    await expect(page.getByRole("heading", { name: "Search Results" })).toBeVisible();
    await expect(page.getByText("Inception", { exact: true }).first()).toBeVisible();
});

test("shows the empty state for a search with no matches", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("searchbox", { name: "Search movies" });
    await search.fill("zzzzzzzznomatch");
    await expect(page.getByText(/No movies found for/)).toBeVisible();
});
