// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  workers: 1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 7000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: null,

    browserName : 'chromium',
    
    screenshot : 'on',
    trace : 'retain-on-failure',//off,on
    
launchOptions: {
      headless : false,
      args: ['--start-maximized'],
      
    },



    
  },


};

module.exports = config;