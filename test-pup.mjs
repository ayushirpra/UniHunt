import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error.message);
  });

  page.on('requestfailed', request => {
    console.error(`REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
  });

  console.log('Navigating to http://localhost:5173/ ...');
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 10000 });
    
    const rootHTML = await page.evaluate(() => {
      const el = document.getElementById('root');
      return el ? el.innerHTML : 'no-root-found';
    });
    console.log('Root element HTML length:', rootHTML.length);
    if(rootHTML.length === 0) console.log("Root is completely empty!");
    
  } catch (err) {
    console.error('Navigation error:', err.message);
  } finally {
    await browser.close();
  }
})();
