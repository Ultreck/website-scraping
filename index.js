const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs");
const template1 = require("./components/template1");
const template2 = require("./components/template2");
const template4 = require("./components/template3");
const template3 = require("./components/template4");
const scrapeTemplate = require("./components/scrapeAll1");
const { stringify } = require("querystring");
const getTemplateData = require("./components/scrapeItAllNew");


const getFirstTemplate = async () => {
  const pages = [];

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  await page.goto("https://www.canva.com/login", { waitUntil: "networkidle2" });


  // await page.click(
  //   "main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._k_QMg > button._5KtATA.LQzFZw.xwTbNA._8ERLTg.MCgm0w.Z3nT2A.LQzFZw.xwTbNA._4_iekA.j34Zww.aqbYPg._3FvZZg.COAWQQ._7IvJg")

  await page.click(
    "main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._k_QMg > button._5KtATA.LQzFZw.xwTbNA._8ERLTg.MCgm0w.Z3nT2A.LQzFZw.xwTbNA._4_iekA.j34Zww.aqbYPg._3FvZZg.COAWQQ._7IvJg")




  // await page.click(
  //   "body > div:nth-child(2) > div > div > div > div > div._07T50w > button._5KtATA.LQzFZw.xwTbNA._8ERLTg.Z3nT2A.LQzFZw.xwTbNA._4_iekA.j34Zww.aqbYPg._3FvZZg._9Ix54Q"
  // );

  await page.click(
"body > div:nth-child(2) > div > div > div > div > div._07T50w > button._5KtATA.LQzFZw.xwTbNA._8ERLTg.Z3nT2A.LQzFZw.xwTbNA._4_iekA.j34Zww.aqbYPg._3FvZZg._9Ix54Q"
  );
  



  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "atayeseemmanuel0@gmail.com", {
    delay: 100,
  });
  // await page.type('input[name="email"]', "oluwatayeseemmanuel@gmail.com", {
  //   delay: 100,
  // });
  await page.waitForSelector(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._0lSjcQ > form > div:nth-child(2) > button"
  );

  await page.click(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div._0lSjcQ > form > div:nth-child(2) > button"
  );

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', "atayesee2024", { delay: 100 });
  // await page.type('input[name="password"]', "oluwatayeseemma2024", { delay: 100 });
  await page.waitForSelector(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div > div.FRDSwg > form > button"
  );
  await page.click(
    "#root > div > main > div._mbIcQ.TEiAng > div > section > div > div > div > div > div > div > div > div > div.FRDSwg > form > button"
  );

  const data =  await getTemplateData(page);
  fs.writeFileSync("scrape1.json", JSON.stringify(data, null, 2));
  // const data =  await scrapeTemplate(page);
  // fs.writeFileSync("scrape1.json", JSON.stringify(data, null, 2));
  // console.log(JSON.stringify(data, null, 2));

  // const thirdTemplateData = await template3(page);
  // pages.push(...thirdTemplateData);
  
  // const fourthTemplateData = await template4(page);
  // pages.push(...fourthTemplateData);

  // console.log(pages);
  // fs.writeFileSync("dataInfoMaster.json", JSON.stringify(pages, null, 2));
};
getFirstTemplate();
