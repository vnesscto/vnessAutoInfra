import {until} from 'selenium-webdriver';

class SeleniumHelper{

  async URLvalidation(pageName) {
    try {
      const isValid = await driver.wait(until.urlContains(pageName), waitTime);
      this.logPass("URLvalidation succeed");
      return isValid;
    } catch (error) {
      console.error(error);
      this.logError("Got Error when tring to validate URL", error);
      return Promise.reject();
    }
  }

  async getURL(url) {
    try {
      await driver.manage().window().maximize();
      await driver.get(url);
      await driver.wait(until.urlIs(url), waitTime);
      this.logPass(`The navigation to (${url}) was successful`);
    } catch (error) {
      this.logError(`Failed to GET the URL: (${url})`, error);
      return Promise.reject();
    }
  }

  async sleep(num)
  {
      await driver.sleep(num)
  }

  async clickButton(locator, element = null, fromElement = null) {
    if (!element) {
      element = await this.findElementBy(locator, fromElement);
    }
    try {
      await element.click();
      this.logPass(`Clicked on element with locator: (${locator})`);
    } catch (error) {
      this.logError(`Could not CLICK on the element with locator:(${locator}).`, error);
      return Promise.reject();
    }
  }

  async setText(locator, data = "", element = null, fromElement = null) {
    if (!element) {
      element = await this.findElementBy(locator, fromElement);
      //element = await driver.findElement(locator);
    }
    try {
      await element.sendKeys(data);
      this.logPass(`On writing element with locator: (${locator}), the following data: (${data})`);
    } catch (error) {
      this.logError(`Could not WRITE to the element with locator:(${locator}), the following data: (${data})`, error);
      return Promise.reject();
    }
  }

  async getTextFromElement(locator, element = null, fromElement = null) {
    if (!element) {
      element = await this.findElementBy(locatorType, fromElement);
    }
    try {
      const text = await element.getText();
      this.logPass(`Got the following text from element with locator: (${locator}) : ${text}`);
      return text;
    } catch (error) {
      this.logError(`Could not GET TEXT from the element with locator: (${locator})`, error);
      return Promise.reject();
    }
  }

  async clearElementField(locator, element = null, fromElement = null) {
    if (!element) {
      element = await this.findElementBy(locator, fromElement);
    }
    try {
      await element.clear();
      this.logPass(`Cleared element with locator (${locator})`);
    } catch (error) {
      this.logError(`Could not CLEAR the element with:(${locator})`, error);
      return Promise.reject();
    }
  }

  async isElementExists(locator, fromElement = null) {
    try {
      await this.findElementBy(locator, fromElement);
      return true;
    } catch (error) {
      this.logError(`Got error while tring to find if this element exist (${locator})`, error);
      return false;
    }
  }

  async close() {
    try {
      driver.quit();
    } catch (error) {
      this.logError(`Failed to ClOSE the Driver`, error);
      return Promise.reject();
    }
  }

  async findElementBy(locator, fromElement = null) {
    try {
      if (!fromElement) {
        fromElement = driver;
      }
      await driver.wait(until.elementLocated(locator), 10000);
      const element = await fromElement.findElement(locator);
      this.logPass(`Find element with locator:(${locator})`);
      //await this.scrollToElement(element);
      return element;
    } catch (error) {
      this.logError(`Element NOT FOUND with: locator (${locator})`, error);
      return Promise.reject();
    }
  }

  async findElementListBy(locator, fromElement = null) {
    try {
      if (!fromElement) {
        fromElement = driver;
      }
      await driver.wait(until.elementsLocated(locator), waitTime);
      const elementList = await fromElement.findElements(locator);
      this.logPass(`Found List of elements with (${locator})`);
      await this.scrollToElement(elementList[0]);
      return elementList;
    } catch (error) {
      this.logError(`Element List NOT FOUND with: locator (${locator})`, error);
      return Promise.reject();
    }
  }

  async scrollToElement(element) {
    try {
      await driver.executeScript("console.log('scrooolling')", element);
      await driver.executeScript("arguments[0].scrollIntoView(true)", element);
    } catch (error) {
      this.logError(`Got error while trying to scroll to element`,error);
    }
  }

  logPass(msg = "") {
    // console.log(`[Successs] SeleniumInfra: ${msg}.`);
  }

  logError(msgHeader = "", errorObj = "") {
    console.error("--------");
    //const errMsg = new Error(`[FAIL] SeleniumInfra: ${msgHeader}...`);
    //console.error(errMsg);
    console.error(errorObj);
    console.error("--------");
  }
}

export default new SeleniumHelper();
