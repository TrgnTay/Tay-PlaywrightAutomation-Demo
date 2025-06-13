const { test, expect } = require('@playwright/test');


test.only('Place Order End to End Test', async ({ page }) => {
    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';
    const productName = ' Pliers ';
    const products = page.locator(".card-title");
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator("input[value='Login']").click();
    await page.locator(".nav-link.active").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body h5").first().waitFor();
    const titles = await page.locator(".card-body h5").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).textContent() === productName) {
            await products.nth(i).click();
            await page.locator("#btn-add-to-cart").click();  // text= 'Add to cart' can also be used
            break;


        }
    }

    await page.locator("#lblCartCount").click();
    await page.locator('td span').first().waitFor();
    //const booln = await page.getByText('Pliers').isVisible();

    await expect(page.locator("td span:has-text('Pliers ')")).toContainText(productName.trim());
    //expect(booln).toBeTruthy();
    await page.locator("div[class='ng-star-inserted'] button[type='button']").click();
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator("input[value='Login']").click();
    await page.locator("app-login button[type='button']").click();
    await page.waitForTimeout(3000);
    await page.locator('#state').fill('Bundesland');
    await page.waitForTimeout(3000);
    await page.locator('#postal_code').fill('1789');

    await page.locator("app-address button[type='button']").click();
    const dropdown = page.locator('#payment-method');
    dropdown.selectOption({ label: 'Bank Transfer' });
    await page.locator('#bank_name').fill('Belfius');
    await page.locator('#account_name').fill('Tay tay');
    await page.locator('#account_number').fill('45368456749456');
    await page.locator("text='Confirm'").click();
    await expect(page.locator('.help-block')).toContainText('Payment was successful');
    await page.locator("text='Confirm'").click();
    await expect(page.locator('#order-confirmation')).toContainText('Thanks for your order! Your invoice number is ');





});