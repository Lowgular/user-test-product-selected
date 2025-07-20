import test, { expect, Locator } from '@playwright/test';

const getProductDetails = (productDetails: Locator) => ({
  title: productDetails.locator('.product-title'),
  description: productDetails.locator('.product-description'),
  image: productDetails.locator('.product-image-wrapper img'),
});

const getProductCard = (productCardContainer: Locator) => ({
  image: productCardContainer.locator('img'),
  title: productCardContainer.locator('.card-title'),
  description: productCardContainer.locator('.card-text'),
  showMoreButton: productCardContainer.locator('button', {
    hasText: 'Show more',
  }),
});

const expectProductValues = async (
  elements: ReturnType<typeof getProductDetails>,
  product: any
) => {
  await expect(elements.title).toContainText(product.name);
  await expect(elements.description).toContainText(product.description);
  await expect(elements.image).toHaveAttribute(
    'src',
    expect.stringContaining(product.image)
  );
};

test('should select the product', async ({ page }) => {
  const emptyProductStub = {
    image: 'https://dummyimage.com/150x150/cccccc/888888&text=N/A',
    name: 'No product selected',
    description: 'Choose a product from the list to view its details',
  };

  const productsStub = [
    {
      id: 1,
      name: 'Product 1',
      description:
        'This is a beautiful and high-quality product. It comes in several color variants. Choose your favorite color below to preview the product variant.',
      price: 100,
      image: 'https://dummyimage.com/150x150/cccccc/888888&text=Product+1',
    },
    {
      id: 2,
      name: 'Product 2',
      description:
        'This is a beautiful and high-quality product. It comes in several color variants. Choose your favorite color below to preview the product variant.',
      price: 200,
      image: 'https://dummyimage.com/150x150/cccccc/888888&text=Product+2',
    },
    {
      id: 3,
      name: 'Product 3',
      description:
        'This is a beautiful and high-quality product. It comes in several color variants. Choose your favorite color below to preview the product variant.',
      price: 300,
      image: 'https://dummyimage.com/150x150/cccccc/888888&text=Product+3',
    },
  ];

  await page.route('/products.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productsStub),
    });
  });

  await page.goto('');
  // Given there are 3 products

  const productCards = page.locator('app-product-list .card');
  const productDetails = page.locator('app-product-detail');

  console.log(await productCards.count());
  // Then I should see 3 product cards
  expect(productCards).toHaveCount(3);
  // And I should see "No product selected" in the product details
  await expectProductValues(
    getProductDetails(productDetails),
    emptyProductStub
  );

  // When I click on the second card's "Show more" button
  await productCards.nth(1).locator('button', { hasText: 'Show more' }).click();
  await expectProductValues(getProductDetails(productDetails), productsStub[1]);
});
