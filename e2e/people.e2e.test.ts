import { test, expect } from '@playwright/test';

test('should navigate to the next people page', async ({ page }) => {
  await page.goto('/people');
  await page.click(`a[aria-label='Go to page 2']`);
  await expect(page).toHaveURL('/people?page=2');

  await page.click(`a[aria-label='Go to next page']`);
  await expect(page).toHaveURL('/people?page=3');
});

test('should navigate to the person page by id', async ({ page }) => {
  await page.goto('/people');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#person-1').click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL('/people/1');
});
