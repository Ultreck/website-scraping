const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const fs = require("fs");
const { log } = require("util");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(2 * 60 * 1000);
  
  const cookiesFilePath = "cookies.json";
  if (fs.existsSync(cookiesFilePath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, "utf-8"));
    await page.setCookie(...cookies);
  }

  await page.goto("https://www.canva.com", { waitUntil: "networkidle2" });

  if (await page.$('a[href="/login"]')) {
    console.log("Logging in...");
    await page.click('a[href="/login"]');

    const cookies = await page.cookies();
    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
    console.log("Login successful and cookies saved.");
  }
    
  
  const canvaData = [];
  
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
    const canvaElement = await page.$$("main > div:nth-child(2) > div:nth-child(1) > div > div > div > div:nth-child(4) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div");
    canvaElement.forEach(async (el, index) => {

      const title1 = await el.$eval("div:nth-child(22) > div > div > div > p:nth-child(1) > span", (el) => el.textContent.trim());

      const title2 = await el.$$eval("div:nth-child(22) > div > div > div > p:nth-child(2) > span", (el) => el.textContent.trim());

      const txt = await el.$$eval("div:nth-child(9) > div > div:nth-child(1) > div:nth-child(2) > div > div > img:nth-child(1)", (el) => el.textContent);

      const img = await el.$eval("div:nth-child(19) > div > div > div > ul > li > span", (el) => el.textConten);

      const websiteUrl = await el.$eval("div:nth-child(17) > div > div > div > ul > li > span", (el) => el.textConten);


      ["text", "chart", "image", "shapes"].forEach((key) => {
        page[0][key].height = "470px";
        page[0][key].width = "470px";
        page[0][key].id = "";
        page[0][key].title =
          "Cyber Monday Instagram Post Ad, Cyberpunk Futuristic style Sale Promo";
        page[0][key].title = "";
        page[0][key].width = "";
      page[0][key].height = "";
      if (key === "text") {
        [];

        page[0][key].elemements.forEach((element) => {
          element.x = 0;
          element.y = 0;
          element.width = "";
          element.type = "text";
          element.text = title + " " + txt;
          element.config.name = "heading";
          element.style.fontSize = "113.289px";
          element.style.fontWeight = 700;
          element.style.color = "#0a2449";
          element.style.letterSpacing = "-0.005em";
          element.style.lineHeight = "101px";
        });
      } else if (key === "image") {
        page[0][key].elemements.forEach((element) => {
          element.config.src = imgUrl;
          element.height = "514.629px";
          element.width = "775.335px";
          element.text = "Image";
          element.type = "image";
          element.x = "387.667";
          element.y = "257.314";
        });
      } else if (key === "chart") {
        page[0][key].elemements.forEach((element) => {});
      } else if (key === "shape") {
        page[0][key].elemements.forEach((element) => {});
      }
    });
      canvaData.push({
        title1,
        title2,
        img,
        txt,
        websiteUrl,
      })

      console.log(canvaData);
      
    })
  


  
 
  await page.goto(
    "https://www.canva.com/design/DAGXxKxxOGU/Pvt05xwxEfKdwd86zG7M9w/edit?ui=eyJEIjp7IlEiOnsiQSI6dHJ1ZX19fQ",
    { waitUntil: "networkidle2" }
  );

  // Example: Scrape template titles
  const templates = await page.$$eval("._mXnjA > div", (elements) =>
    elements.map((el) => el.textContent.trim())
  );
  
  

  // await browser.close();
})();
