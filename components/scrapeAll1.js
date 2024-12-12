const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeTemplate(page) {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYR0LWqfs/I9v7ndmTiRe5N08LZOZbaQ/edit"
  );
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div"
  );

  const scrapedData = [];
  console.log(JSON.stringify(productElements, null, 2));

  for (const el of productElements) {
    const childElements = await el.$$("*");

    const elementsData = [];

    for (const child of childElements) {
      const tagName = await child.evaluate((el) => el.tagName.toLowerCase());

      // Create a structure to hold element data
      const elementData = { tagName };

      // Extract properties based on element type
      if (tagName === "img") {
        elementData.src = await child.evaluate((el) => el.src || null);
        elementData.width = await child.evaluate(
          (el) => el.offsetWidth || null
        );
        elementData.height = await child.evaluate(
          (el) => el.offsetHeight || null
        );
        elementData.name = await child.evaluate(
          (el) => el.getAttribute("alt") || null
        );
      } else if (tagName === "svg") {
        elementData.clipPath = await child.evaluate((el) => {
          const path = el.querySelector("path");
          return path ? path.getAttribute("d") : null;
        });
      } else if (tagName === "p" || tagName === "span" || tagName === "li") {
        elementData.text = await child.evaluate((el) => el.textContent || null);
        elementData.color = await child.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        elementData.backgroundColor = await child.evaluate(
          (el) => window.getComputedStyle(el).backgroundColor
        );
      }
      if (tagName === "p" || tagName === "span" || tagName === "li" || tagName === "img") {
        elementData.position = await child.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          };
        });

        elementsData.push(elementData);
      }
    }

    scrapedData.push(elementsData);
  }
  //   console.log(JSON.stringify(scrapedData, null, 2));

  fs.writeFileSync(
    "dataScrapeItAll1.json",
    JSON.stringify(scrapedData, null, 2)
  );
  return scrapedData;
}
module.exports = scrapeTemplate;
