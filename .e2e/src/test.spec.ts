import test, { expect } from '@playwright/test';
import {
  emptyProductStub,
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

    // Then I should see 3 product cards
    expect(productCards).toHaveCount(3);

    // And I should see placeholder product in the product details
    await expectProductValues(
      getProductDetails(productDetails),
      emptyProductStub
    );
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

    // Then I should see the selected product in the product details
    await expectProductValues(
      getProductDetails(productDetails),
      productsStub[1]
    );
  });
});
