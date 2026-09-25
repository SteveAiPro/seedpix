const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    console.log('Navigating to https://sparkpix.ai ...');
    await page.goto('https://sparkpix.ai', { waitUntil: 'networkidle', timeout: 30000 });
    
    await page.screenshot({ path: '/tmp/sparkpix_home_1440.png', fullPage: false });
    console.log('Saved /tmp/sparkpix_home_1440.png');

    const html = await page.content();
    fs.writeFileSync('/tmp/sparkpix_hydrated.html', html);
    console.log('Saved /tmp/sparkpix_hydrated.html (length: ' + html.length + ')');

    const editorEl = page.locator('#editor-section');
    if (await editorEl.count() > 0) {
      const editorHtml = await editorEl.innerHTML();
      fs.writeFileSync('/tmp/sparkpix_editor.html', editorHtml);
      console.log('Saved /tmp/sparkpix_editor.html');
      await editorEl.screenshot({ path: '/tmp/sparkpix_editor.png' });
    }

    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
})();
