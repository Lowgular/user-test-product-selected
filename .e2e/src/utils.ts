import { expect, Locator, Page } from '@playwright/test';

export const getProductDetails = (productDetails: Locator) => ({
  title: productDetails.locator('.product-title'),
  description: productDetails.locator('.product-description'),
  image: productDetails.locator('.product-image-wrapper img'),
});

export const getProductCard = (productCardContainer: Locator) => ({
  image: productCardContainer.locator('img'),
  title: productCardContainer.locator('.card-title'),
  description: productCardContainer.locator('.card-text'),
  showMoreButton: productCardContainer.locator('button', {
    hasText: 'Show more',
  }),
});

export const expectProductValues = async (
  elements: ReturnType<typeof getProductDetails>,
  product: any
) => {
  // Debug: Check if elements exist before testing
  const titleExists = await elements.title.count() > 0;
  const descriptionExists = await elements.description.count() > 0;
  const imageExists = await elements.image.count() > 0;

  
  await expect(elements.title).toContainText(product.name);
  await expect(elements.description).toContainText(product.description);
  await expect(elements.image).toHaveAttribute(
    'src',
    expect.stringContaining(product.image)
  );
};

export const emptyProductStub = {
  image: 'https://dummyimage.com/150x150/cccccc/888888&text=N/A',
  name: 'No product selected',
  description: 'Choose a product from the list to view its details',
};

export const productsStub = [
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

export const stubProducts = async (page: Page) => {
  await page.route('/products.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productsStub),
    });
  });
};