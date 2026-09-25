const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('https://sparkpix.ai', { waitUntil: 'networkidle', timeout: 30000 });

  // Find buttons in editor
  const modelBtn = page.locator('#editor-section button:has-text("Model")');
  if (await modelBtn.count() > 0) {
    await modelBtn.click();
    await page.waitForTimeout(500);
    await page.locator('#editor-section').screenshot({ path: '/tmp/sparkpix_model_open.png' });
    const modelDropdownHtml = await page.locator('#editor-section').innerHTML();
    fs.writeFileSync('/tmp/sparkpix_model_dropdown.html', modelDropdownHtml);
  }

  // Click again to close or click ratio
  const ratioBtn = page.locator('#editor-section button:has-text("Ratio")');
  if (await ratioBtn.count() > 0) {
    await ratioBtn.click();
    await page.waitForTimeout(500);
    await page.locator('#editor-section').screenshot({ path: '/tmp/sparkpix_ratio_open.png' });
    const ratioDropdownHtml = await page.locator('#editor-section').innerHTML();
    fs.writeFileSync('/tmp/sparkpix_ratio_dropdown.html', ratioDropdownHtml);
  }

  await browser.close();
  console.log('Dropdown scrape done!');
})();
