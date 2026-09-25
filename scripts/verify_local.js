const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    console.log('Navigating to http://localhost:3005 ...');
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });

    // 1. Screenshot Editor
    const editor = page.locator('#editor-section');
    await editor.screenshot({ path: '/tmp/local_editor_default.png' });
    console.log('Saved /tmp/local_editor_default.png');

    // 2. Click Model
    await page.locator('#editor-section button:has-text("Model")').click();
    await page.waitForTimeout(300);
    await editor.screenshot({ path: '/tmp/local_editor_model_open.png' });
    console.log('Saved /tmp/local_editor_model_open.png');

    // 3. Click Ratio
    await page.locator('#editor-section button:has-text("Ratio")').click();
    await page.waitForTimeout(300);
    await editor.screenshot({ path: '/tmp/local_editor_ratio_open.png' });
    console.log('Saved /tmp/local_editor_ratio_open.png');

    // 4. Close ratio & scroll to Showcase Tiers
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);

    const showcase = page.locator('#tier-magic');
    await showcase.screenshot({ path: '/tmp/local_tier_magic.png' });
    console.log('Saved /tmp/local_tier_magic.png');

    const profileTier = page.locator('#tier-profile');
    await profileTier.screenshot({ path: '/tmp/local_tier_profile.png' });
    console.log('Saved /tmp/local_tier_profile.png');

    await browser.close();
    console.log('Local verification complete!');
  } catch (err) {
    console.error('Verification error:', err);
  }
})();
