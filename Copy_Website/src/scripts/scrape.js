const puppeteer = require('puppeteer');
const fs = require('fs');
const prompts = require('prompts');
const readline = require('readline');
require('dotenv').config();

const TARGET_URL = process.env.NEXT_PUBLIC_API_URL;

async function scrapeWebsite() {
  console.log(`Starting browser automation for ${TARGET_URL}...`);
  
  // Prompt for credentials
  const credentials = await prompts([
    {
      type: 'text',
      name: 'userid',
      message: 'Enter your USER ID:'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:'
    }
  ]);
  
  // Check if user cancelled the prompt
  if (!credentials.userid || !credentials.password) {
    console.log('Scraping cancelled.');
    return;
  }
  
  const browser = await puppeteer.launch({
    headless: false, // Keep browser visible
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });
  
  let page;
  
  try {
    page = await browser.newPage();
    
    // Navigate to the login page
    console.log('Navigating to login page...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
    
    // Find and fill the USER ID field
    console.log('Looking for USER ID field...');
    await page.evaluate((userid) => {
      // Try to find all input fields
      const inputs = Array.from(document.querySelectorAll('input'));
      
      // Find the first text input (likely the USER ID field)
      const userIdField = inputs.find(input => 
        input.type === 'text' || 
        input.name.toLowerCase().includes('user') ||
        input.id.toLowerCase().includes('user')
      );
      
      if (userIdField) {
        userIdField.value = userid;
      }
    }, credentials.userid);
    
    // Find and fill the password field
    console.log('Looking for password field...');
    await page.evaluate((password) => {
      // Find the password field
      const passwordField = document.querySelector('input[type="password"]');
      
      if (passwordField) {
        passwordField.value = password;
      }
    }, credentials.password);
    
    console.log('\n=== MANUAL INTERACTION REQUIRED ===');
    console.log('1. Please check if the credentials are filled correctly');
    console.log('2. Click the login button');
    console.log('3. If prompted, click the acknowledge button');
    console.log('4. Navigate to the page you want to scrape');
    console.log('5. Once you are on the target page, press Enter in this console to continue scraping');
    
    // Create readline interface for better input handling
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Wait for user to press Enter
    await new Promise(resolve => {
      rl.question('Press Enter to continue scraping...', () => {
        rl.close();
        resolve();
      });
    });
    
    console.log('Continuing with scraping...');
    
    // Now we're on the target page, let's scrape it
    console.log('Scraping page content...');
    
    // Take a screenshot of the current page
    await page.screenshot({ path: 'target-page.png', fullPage: true });
    
    // Get HTML content
    const htmlContent = await page.content();
    fs.writeFileSync('scraped-content.html', htmlContent);
    
    // Get CSS styles
    const cssStyles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let cssText = '';
      
      styleSheets.forEach(sheet => {
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (let i = 0; i < rules.length; i++) {
            cssText += rules[i].cssText + '\n';
          }
        } catch (e) {
          console.log('Error accessing stylesheet:', e);
        }
      });
      
      return cssText;
    });
    
    fs.writeFileSync('scraped-styles.css', cssStyles);
    
    // Save page metadata
    const metadata = {
      title: await page.title(),
      url: page.url(),
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('scraped-metadata.json', JSON.stringify(metadata, null, 2));
    
    console.log('Content scraped successfully!');
    
  } catch (error) {
    console.error('Error during scraping:', error.message);
    if (page) {
      await page.screenshot({ path: 'error-screenshot.png' }).catch(e => console.error('Could not take error screenshot:', e.message));
    }
  } finally {
    await browser.close();
  }
}

scrapeWebsite();