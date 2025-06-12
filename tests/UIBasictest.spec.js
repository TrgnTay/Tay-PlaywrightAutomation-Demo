const { test, expect } = require('@playwright/test');
const { Console } = require('console');
//const { title } = require('process');

test('Login with a valid mail and password', async ({ browser }) => {
  // Navigate to Home Page
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://practicesoftwaretesting.com/");
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');

  // Navigate to Login Page
  await page.locator(".nav-link[data-test='nav-sign-in']").click();
  await expect(page).toHaveTitle("Login - Practice Software Testing - Toolshop - v5.0");
  await expect(page.locator("input[value='Login']")).toContainText('Login');
  //console.log(await page.title());

  //login
  const userName = page.locator('#email');
  const loginbtn = page.locator("input[value='Login']");
  await userName.fill("customer@practicesoftwaretesting.com");
  await page.locator("#password").fill("welcome01");
  await loginbtn.click();
  await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

  await page.waitForTimeout(2000);

});

test('login with invalid mail or password', async ({ page }) => {

  //const context = await browser.newContext();
  //const page =  await context.newPage();
  // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
  const userName = page.locator('#email');
  const loginbtn = page.locator("input[value='Login']");

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await expect(page).toHaveTitle("Login - Practice Software Testing - Toolshop - v5.0");
  //css 
  await userName.fill("customer@practicesoftwaretesting.com");
  await page.locator("#password").fill("welcome02");
  await loginbtn.click();
  console.log(await page.locator(".help-block").textContent());
  await expect(page.locator(".help-block")).toContainText('Invalid email or password');


  //await page.waitForTimeout(2000);


});

test('Verify all product names are displayed', async ({ page }) => {

  const cardTitles = page.locator("h5");
  await page.goto("https://practicesoftwaretesting.com/");
  process.stdout.write(await cardTitles.first().textContent());
  process.stdout.write(await cardTitles.nth(1).textContent());
  await page.waitForLoadState('networkidle');
  const allTitles = await cardTitles.allTextContents();
  process.stdout.write(allTitles);
  const expectedProductNames =
    [
      ' Combination Pliers ',
      ' Pliers ',
      ' Bolt Cutters ',
      ' Long Nose Pliers ',
      ' Slip Joint Pliers ',
      ' Claw Hammer with Shock Reduction Grip ',
      ' Hammer ',
      ' Claw Hammer ',
      ' Thor Hammer '
    ]
  expect(allTitles).toEqual(expectedProductNames);


});

test('Verify checkbox and dropdown', async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  const dropdown = page.locator("select[aria-label='sort']");
  await dropdown.selectOption({ label: 'Name (Z - A)' });
  const cardTitles1 = page.locator("h5");
  await expect(cardTitles1.first()).toHaveText('Wood Saw');
  await page.locator('.icheck').first().click();
  console.log(await page.locator('.icheck').first().isChecked());  //print true
  await expect(page.locator('.icheck').first()).toBeChecked();
  await page.locator('.icheck').first().uncheck();
  expect(await page.locator('.icheck').first().isChecked()).toBeFalsy();


});

test('Child window ', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://practicesoftwaretesting.com/");
  const LinkSupportProject = page.locator("[href*='testwithroy.com/b/support']");

  const [newPage] = await Promise.all(   //in case there is a new child page, we should add another page object to the array,exp[newPage, newPage2,...]
    [
      context.waitForEvent('page'),
      LinkSupportProject.click(),

    ])

  await page.pause();
});


