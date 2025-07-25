import test, { expect } from '@playwright/test';
import {
  expectProductValues,
  getProductDetails,
  productsStub,
  stubProducts,
} from './utils';

test.describe('Feature: Product Cards', () => {
  test('Scenario: Show placeholder product', async ({ page }) => {
    await page.goto('');

    // Given there are 3 products
    await stubProducts(page);

    const productCards = page.locator('app-product-list .card');
    const productDetails = page.locator('app-product-detail');

    // Then I should see 3 product cards in product list
    expect(productCards).toHaveCount(3);

    // And I should see "No products are selected" info text in the product details
    const infoBox = productDetails.locator('.alert-info');
    await expect(infoBox).toHaveText('No products are selected');
  });

  test('Scenario: Show selected product', async ({ page }) => {
    await page.goto('');
    // Given there are 3 products
    await stubProducts(page);

    const productCards = page.locator('app-product-list .card');
    const productDetails = page.locator('app-product-detail');

    // When I click on the second card's "Show more" button
    await productCards
      .nth(1)
      .locator('button', { hasText: 'Show more' })
      .click();

    // Then I should see the second product data in the product details
    await expectProductValues(
      getProductDetails(productDetails),
      productsStub[1]
    );
  });
});
