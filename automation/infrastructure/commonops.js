
import webdriver from 'selenium-webdriver';
import request from 'request'; 
import chrome from 'selenium-webdriver/chrome.js';

class CommonOps{
  
  async setBrowserUrl(url){
    driver.get(url);
  }

  async startChromeDriver (ip,port){
    var startChrom = await this.isChromeUp(ip,port);

    var options = new chrome.Options();

    if (startChrom == 'yes'){
      options.options_["debuggerAddress"] =  `${ip}:${port}`;
    }else{
      options.addArguments(`--remote-debugging-port=${port}`);
    }
    var driver = await new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({implicit:(10000)});
    global.driver = driver;
  }

  async isChromeUp(ip,port){
    const options = {
      url: `http://${ip}:${port}`,
      method: 'GET',
    };
    
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.get(options, function(err, resp, body) {
        if (err) {
          return resolve ("no");
        } else {
          return resolve("yes");
        }
      })
    });
  }
}

export default new CommonOps();
