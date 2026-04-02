import { chromium } from '@playwright/test';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:5173/');
  // wait a bit for react to mount
  await page.waitForTimeout(2000);
  
  const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
  console.log('Root HTML length:', rootHtml.length);
  if (rootHtml.length < 10) console.log('HTML is blank!');
  
  await browser.close();
})();
