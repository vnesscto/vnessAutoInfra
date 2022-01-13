import express from 'express';
import nessPortalExecuter from './automation/apps/ness_portal/executer.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/NessPortal/PagesObjects', (req, res) => {
    res.send("tamiraaaaaaaaa");
});

app.get('/NessPortal/BusinessProcesses', (req, res) => {
    res.send("NessPortal/BusinessProcesses");
});
 
app.get('/NessPortal/GetReports', async (req, res) => {
    res.send(`NessPortal/GetReports`);
});
 
app.post('/NessPortal/Steps', async (req, res) => {
    await nessPortalExecuter.executSteps(req.body);
    res.send(`Done`);
});

app.post('/NessPortal/BusinessProcesses',async (req, res) => {
    res.send(`NessPortal/BusinessProcesses`);
});
 
app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`),
);


// import webdriver from 'selenium-webdriver';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// var  bodyParser = require('body-parser');
// var chrome = require("selenium-webdriver/chrome");

// console.log ("ddd");
// var options = new chrome.Options();
// options.addArguments('--remote-debugging-port=9222');
// var driver = await new webdriver.Builder()
//         .forBrowser('chrome')
//         .setChromeOptions(options)
//         .build();

// await driver.manage().setTimeouts({implicit:(10000)});
// global.driver = driver;
// await driver.get('https://home.ness-tech.co.il');