import { test, expect } from '@playwright/test';
import { MainPage } from './pages/main_page';
import { CatalogPupupPage } from './pages/catalog_popup';
import { ProductPage } from './pages/product_page';
import { Utils } from './utils/utils';
import { BasketPopup } from './pages/basket_popup';
import { ProductCard } from './pages/product-card-page';
import { EventsAndDiscountsPage } from './pages/events-and-discounts-page';

const utils = new Utils();

test.beforeEach(async ({ page }) => {
  await page.goto('https://allo.ua/');
});

test('Verify if the price filter working correctly for the following marketplaces', async ({ page }) => {
  const mainPage = new MainPage(page);
  const catalogPopupPage = new CatalogPupupPage(page);
  const productPage = new ProductPage(page);

  await mainPage.openCatalogPopup();
  await catalogPopupPage.hoverOverCategoryByLinkPart('odezhda');
  await catalogPopupPage.clickOnSubCategoryLinkByLinkPart('detskie-krossovki');
  await catalogPopupPage.waitWhilePageLoaded();
  await productPage.clickOnItemOnFilterPanel('Reebok');
  await productPage.clickOnViewResultButton();
  await productPage.waitWhilePageLoaded();
  await productPage.expandFilter('Колір');
  await productPage.clickOnItemOnFilterPanel('Білий');
  await productPage.clickOnViewResultButton();
  await productPage.waitWhilePageLoaded()
  await productPage.waitABit(5000);
  await productPage.hoverOverOrderSelect();
  await productPage.clickOnOrderItemByTitle('від дорогих до дешевих');

  (await productPage.getAllProductCards()).forEach(color => {
    expect.soft(color).toContain('Reebok');
    expect.soft(color).toContain('Білий')
  });

  var prices = await productPage.getPricesForProductCards();
  var result = utils.isArrayHasAscSorting(prices)

  expect.soft(result, `Actual prices is: ${prices}`).toEqual(true);
});

test('Add items to the basket', async ({ page }) => {
  const mainPage = new MainPage(page);
  const catalogPopupPage = new CatalogPupupPage(page);
  const productPage = new ProductPage(page);
  const basketPopup = new BasketPopup(page);
  const productCard = new ProductCard(page);

  await mainPage.openCatalogPopup()
  await catalogPopupPage.hoverOverCategoryByLinkPart('odezhda');
  await catalogPopupPage.clickOnSubCategoryLinkByLinkPart('detskie-krossovki');
  await catalogPopupPage.waitWhilePageLoaded();
  await productPage.clickOnBuyIconOnProductCatalogPageByName('Кросівки дитячі Jack Wolfskin WOODLAND TEXAPORE LOW K 34 (4060477901886)');
  await productPage.waitWhilePageLoaded();

  await expect.soft(page.locator("span.wrap")).toHaveText('Кросівки дитячі Jack Wolfskin WOODLAND TEXAPORE LOW K 34 (4060477901886)');

  await basketPopup.clickOnCloseBasketPopupIcon()
  await mainPage.openCatalogPopup();
  await catalogPopupPage.hoverOverCategoryByLinkPart('tovary-dlja-detej');
  await catalogPopupPage.clickOnSubCategoryLinkByLinkPart("proizvoditel-l.o.l.surprise");
  await catalogPopupPage.waitWhilePageLoaded();
  await productPage.clickOnProductItemByText('Ігровий набір із лялькою L.O.L. SURPRISE! серії "Travel" - МОДНА ПОДОРОЖ (в ас., дисплеї) (576006)');
  await productPage.waitWhilePageLoaded();
  await productCard.clickOnBuyButton();
  await productCard.waitWhilePageLoaded();

  await expect.soft(page.locator("span.wrap").filter({ hasText: 'L.O.L' })).toHaveText('Ігровий набір із лялькою L.O.L. SURPRISE! серії "Travel" - МОДНА ПОДОРОЖ (в ас., дисплеї) (576006)');

  var prices = await basketPopup.getItemsPrices();
  var pricesAsNumber = utils.convertPricesToNumbers(prices);
  var sum = utils.arrayElementsSum(pricesAsNumber);

  await expect.soft(basketPopup.getTotalPriceLocator()).toContainText(`${sum}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' ₴');
  await basketPopup.removeFirstItemFromBasket();
  await basketPopup.waitWhilePageLoaded();
  await expect((await page.$$('a~.remove')).length).toBe(1);
});

test('Search the item', async ({ page }) => {
  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);

  await mainPage.fillSearchInput('crocs');
  await mainPage.clickOnSearchButton();
  await mainPage.waitWhilePageLoaded();
  var item = await productPage.getAllProductCards();

  item.forEach(cardContent => {
    expect.soft(cardContent).toContain('Crocs');
  });
});

test('Verify shares sorted by ‘Незабаром закiнчаться’', async ({ page }) => {
  const mainPage = new MainPage(page);
  const eventsAndDiscountsPage = new EventsAndDiscountsPage(page);

  await mainPage.clickOnEventsAndDiscountsLink();
  await eventsAndDiscountsPage.clickOnDatesEndSoonLink()
  await eventsAndDiscountsPage.waitWhilePageLoaded();
  var time = await eventsAndDiscountsPage.getAllDatesLeftText();
  var result = utils.isArrayHasAscSorting(time)
  expect(result, `Actual time: ${time}`).toEqual(true);
});

test.afterEach(async ({ page }) => {
  await page.close()
})