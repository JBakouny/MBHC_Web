const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function run() {
  const options = new chrome.Options();
  options.addArguments('--headless=new');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('http://localhost:3000/auth/login');
    await driver.wait(until.elementLocated(By.id('email')), 10000);
    await driver.findElement(By.id('email')).sendKeys('bakouny2@hotmail.com');
    await driver.findElement(By.id('password')).sendKeys('ALLAH_ma7abbeh_3777');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 10000);
    console.log('Login test passed');

    await driver.get('http://localhost:3000/');
    await driver.wait(until.elementLocated(By.css('textarea#comment')), 10000);
    await driver.findElement(By.css('textarea#comment')).sendKeys('Great!');
    await driver.findElement(By.css('form button[type="submit"]')).click();
    console.log('Review submit test executed');

    await driver.get('http://localhost:3000/messages');
    await driver.wait(until.elementLocated(By.id('message')), 10000);
    await driver.findElement(By.id('message')).sendKeys('Hello');
    await driver.findElement(By.css('form button[type="submit"]')).click();
    console.log('Message send test executed');
  } finally {
    await driver.quit();
  }
}

run().catch(err => {
  console.error('Test failed', err);
  process.exit(1);
});
