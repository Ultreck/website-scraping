const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const fs = require("fs");
const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
} = require("./pageStructure");

const scrapeWithLogin = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  await page.goto("https://www.canva.com/login", { waitUntil: "networkidle2" });

  console.log("Routed to the login page successfully");

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  console.log("Logged in successfully!");

  await page.goto(
    "https://www.canva.com/design/DAGXxKxxOGU/Pvt05xwxEfKdwd86zG7M9w/edit?ui=eyJEIjp7IlEiOnsiQSI6dHJ1ZX19fQ",
    { waitUntil: "networkidle2" }
  );

  const pages = [];

  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );
  productElements.forEach(async (el, index) => {
    const title = await el.$eval(
      "div:nth-child(22) > div > div > div > p:nth-child(1) > span",
      (el) => el.textContent
    );
    const txt = await el.$eval(
      "div:nth-child(22) > div > div > div > p:nth-child(2) > span",
      (el) => el.textContent
    );

    const webUrl = await el.$eval(
      "div:nth-child(17) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const brand = await el.$eval(
      "div:nth-child(16) > div > div > div > p > span",
      (el) => el.textContent
    );
    const description = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const descriptionSvg = await el.$eval(
      "div:nth-child(12) > div > svg",
      (el) => el.outerHTML
    );
    const btnTxt = await el.$eval(
      "div:nth-child(18) > div > div > div > p > span",
      (el) => el.textContent
    );
    const btnSvg = await el.$eval(
      "div:nth-child(4) > div > svg",
      (el) => el.outerHTML
    );
    const btnPlayIcon = await el.$eval(
      "div:nth-child(13) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const imgUrl = await el.$eval(
      "div:nth-child(9) > div > div.hWv4NA > div:nth-child(4) > div > div > img",
      (el) => el.src
    );
    const halfCircleUrl = await el.$eval(
      "div:nth-child(8) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const halfCircleLineUrl = await el.$eval(
      "div:nth-child(10) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    [
      {
        name: "heading",
        type: "text",
        color: "#0a2449",
        text: title + " " + txt,
        fontSize: "113.289px",
        fontWeight: 700,
        lineHeight: "101px",
        letterSpacing: "-0.005em",
      },
      {
        name: "website",
        type: "text",
        color: "#0a2449",
        text: webUrl,
        fontSize: "34px",
        fontWeight: 500,
        lineHeight: "41px",
        letterSpacing: "0em",
      },
      {
        name: "company",
        type: "text",
        color: "#e18d00",
        text: brand,
        fontSize: "85px",
        fontWeight: 700,
        lineHeight: "93px",
        letterSpacing: "-0.04em",
      },
      {
        name: "text content",
        type: "text",
        color: "#0a2449",
        text: description,
        fontSize: "28px",
        fontWeight: 400,
        lineHeight: "38px",
        letterSpacing: "0.01em",
      },
      {
        name: "Button Text",
        type: "text",
        color: "#ffffff",
        text: btnTxt,
        fontSize: "37px",
        fontWeight: 700,
        lineHeight: "42px",
        letterSpacing: "0.01em",
      },
      {
        src: btnPlayIcon,
        text: "Button Play Image",
        type: "image",
        width: "19px",
        height: "24px",
        x: "-1.77636e-15",
        y: "0",
      },
      {
        src: imgUrl,
        text: "Image",
        type: "image",
        width: "775.335px",
        height: "514.629px",
        x: "250",
        y: "250",
      },
      {
        src: halfCircleUrl,
        text: "Modern Geo Semicircle",
        type: "image",
        width: "874px",
        height: "437px",
        x: "0",
        y: "0",
      },
      {
        src: halfCircleLineUrl,
        text: "Half Circle Line Art",
        type: "image",
        width: "792px",
        height: "403px",
        x: "0",
        y: "0",
      },
    ].map((data) => {
      switch (data.type) {
        case "text":
          return pages.push(createTextStructure(data));
          break;
        case "image":
          return pages.push(createImageStructure(data));
          break;
        case "shape":
          pages.push(createShapeStructure(data));
          break;
        case "chart":
          return pages.push(createChartStructure(data));
        default:
          pages.push(['default']);
      }
    });

    fs.writeFileSync("pages.json", JSON.stringify({ pages }, null, 2));
    console.log(pages);
  });
};

scrapeWithLogin();
