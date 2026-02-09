const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load the local HTML file
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath);
  
  // Take a full-page screenshot
  await page.screenshot({ 
    path: 'full-page-screenshot.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved to full-page-screenshot.png');
  await browser.close();
})();
