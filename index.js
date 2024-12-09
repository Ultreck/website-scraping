const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs");
const template1 = require("./components/template1");
const template2 = require("./components/template2");
const template3 = require("./components/template3");
const template4 = require("./components/template4");

const getFirstTemplate = async () => {
  const pages = [];

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  await page.goto("https://www.canva.com/login", { waitUntil: "networkidle2" });

  await page.click(
    "main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._k_QMg > button._5KtATA.LQzFZw.tYI0Vw._8ERLTg.MCgm0w.Z3nT2A.LQzFZw.tYI0Vw._4_iekA.j34Zww.aqbYPg._3FvZZg.COAWQQ._7IvJg")


  
  await page.click(
    "body > div:nth-child(3) > div > div > div > div > div._07T50w > button._5KtATA.LQzFZw.tYI0Vw._8ERLTg.Z3nT2A.LQzFZw.tYI0Vw._4_iekA.j34Zww.aqbYPg._3FvZZg._9Ix54Q"
  );



  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "atayeseemmanuel0@gmail.com", {
    delay: 100,
  });
  await page.waitForSelector(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._0lSjcQ > form > div:nth-child(2) > button"
  );

  await page.click(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._0lSjcQ > form > div:nth-child(2) > button"
  );

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', "atayesee2024", { delay: 100 });
  await page.waitForSelector(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div > div.FRDSwg > form > button"
  );
  await page.click(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div > div.FRDSwg > form > button"
  );

  const firstTemplateData = await template1(page);
  pages.push(...firstTemplateData);

//   const secondTemplateData = await template2(page);
//   pages.push(...secondTemplateData);

//   const thirdTemplateData = await template3(page);
//   pages.push(...thirdTemplateData);
  
  // const fourthTemplateData = await template4(page);
  // pages.push(...fourthTemplateData);

  // console.log(pages);
  fs.writeFileSync("dataInfoMaster.json", JSON.stringify(pages, null, 2));
};
getFirstTemplate();
