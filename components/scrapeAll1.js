const puppeteer = require("puppeteer");
const fs = require("fs");
const getSvgDivProperties = require("../svgDivContainer");
const {
  createTextStructure,
  createImageStructure,
  createFrameStructure,
  createShapeStructure,
  createChartStructure,
} = require("../pageStructure");
const { text } = require("stream/consumers");

async function scrapeTemplate(page) {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYNzHB7dQ/K-luEnlRMTijE7fjTn4Zgw/edit"
  );
  const productElements = await page.$$("div.WVSfHg > div > div > div > div");

  const scrapedData = [];
  const data = {
    pages: [
      {
        elements: [],
        height: "1122px",
        id: crypto.randomUUID(),
        style: {
          background: "#1b1b2a",
        },
        title: "untitled",
        width: "793px",
      },
    ],
  };

  for (const el of productElements) {
    const childElements = await el.$$("*");

    const elementsData = [];

    for (const child of childElements) {
      const tagName = await child.evaluate((el) => el.tagName.toLowerCase());

      const elementData = { tagName };

      if (tagName === "img") {
        elementData.src = await child.evaluate((el) => el.src || null);
        // elementData.width = await child.evaluate(
        //   (el) => el.offsetWidth || null
        // );
        // elementData.height = await child.evaluate(
        //   (el) => el.offsetHeight || null
        // );
        elementData.name = await child.evaluate(
          (el) => el.getAttribute("alt") || null
        );
        elementData.borderRadius = await child.evaluate(
          (el) => window.getComputedStyle(el).borderRadius
        );
        elementData.width = await child.evaluate(
          (el) => window.getComputedStyle(el).width
        );
        elementData.height = await child.evaluate(
          (el) => window.getComputedStyle(el).height
        );

        elementData.coordinates = await child.evaluate((el) => {
          const transform = window.getComputedStyle(el).transform;
          if (transform && transform.includes("matrix")) {
            const match = transform.match(
              /matrix\([^,]+, [^,]+, [^,]+, [^,]+, ([^,]+), ([^)]+)\)/
            );
            if (match) {
              return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2]),
              };
            }
          }

          return { x: null, y: null };
        });
        elementData.borderWidth = await child.evaluate(
          (el) => window.getComputedStyle(el).borderWidth
        );
      } else if (tagName === "div") {
        elementData.style = await child.evaluate((el) =>
          el.getAttribute("style")
        );
        elementData.width = await child.evaluate(
          (el) => window.getComputedStyle(el).width
        );
        elementData.height = await child.evaluate(
          (el) => window.getComputedStyle(el).height
        );
        elementData.text = await child.evaluate((el) => el.textContent || null);
        elementData.imageSrc = await child.evaluate((el) => {
          const img = el.querySelector("img");
          return img ? img.src : null;
        });
        elementData.textAlt = await child.evaluate((el) => {
          const img = el.querySelector("img");
          return img ? img.getAttribute("alt") : null;
        });
        elementData.position = await child.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.x,
            y: rect.y,
          };
        });
        elementData.spanStyle = await child.evaluate((el) => {
          const p = el.querySelector("p");
          const span = el.querySelector("span");
          const rec = p.getBoundingClientRect();
          const rect = span.getBoundingClientRect();

          return span
            ? {
              p: {
                x: rec.x,
                y: rec.y,
                width: window.getComputedStyle(p).width || null,
                height: window.getComputedStyle(p).height || null,
              },
                position: {
                  x: rect.x,
                  y: rect.y,
                },
                text: span.textContent,
                width: window.getComputedStyle(span).width || ull,
                height: window.getComputedStyle(span).height || null,
                backgroundColor:
                  window.getComputedStyle(span).backgroundColor || null,
                color: window.getComputedStyle(span).color || null,
                fontStyle: window.getComputedStyle(span).fontStyle || null,
                fontWeight: window.getComputedStyle(span).fontWeight || null,
                fontSize: window.getComputedStyle(span).fontSize || null,
                letterSpacing:
                  window.getComputedStyle(span).letterSpacing || null,
                lineHeight: window.getComputedStyle(span).lineHeight || null,
              }
            : null;
        });
        elementData.imgStyle = await child.evaluate((el) => {
          const img = el.querySelector("img");
          return img
            ? {
                width: window.getComputedStyle(img).width || null,
                height: window.getComputedStyle(img).height || null,
                borderRadius: window.getComputedStyle(img).borderRadius || null,
                borderWidth: window.getComputedStyle(img).borderWidth || null,
              }
            : null;
        });
        elementData.coordinates = await child.evaluate((el) => {
          const transform = window.getComputedStyle(el).transform;
          if (transform && transform.includes("matrix")) {
            const match = transform.match(
              /matrix\([^,]+, [^,]+, [^,]+, [^,]+, ([^,]+), ([^)]+)\)/
            );
            if (match) {
              return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2]),
              };
            }
          } else if (transform && transform.includes("translate")) {
            const match = transform.match(/translate\(([^,]+), ([^)]+)\)/);
            if (match) {
              return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2]),
              };
            }
          }

          return { x: null, y: null };
        });
      } else if (tagName === "svg") {
        elementData.clipPath = await child.evaluate((el) => {
          const path = el.querySelector("path");
          return path ? path.getAttribute("d") : null;
        });
        elementData.viewBox = await child.evaluate(
          (el) => el.getAttribute("viewBox") || null
        );

        elementData.clipPathId = await child.evaluate((el) => {
          const clipPath = el.querySelector("clipPath");
          return clipPath ? clipPath.getAttribute("id") : null;
        });

        elementData.referencingDiv = await child.evaluate((svg) => {
          // fs.writeFileSync("dataTest.json", JSON.stringify(svg, null, 2));
          //   const clipPath = svg.querySelector("clipPath");
          //   if (!clipPath) return null;
          //   const clipPathId = clipPath.getAttribute("id");
          //   if (!clipPathId) return null;
          //   // Find the referencing div
          //   const referencingDiv = Array.from(
          //     document.querySelectorAll("*")
          //   ).find((el) => {
          //     const style = el.getAttribute("style") || "";
          //     return style.includes(`clip-path: url(#${clipPathId})`);
          //   });
          //   if (referencingDiv) {
          //     const rect = referencingDiv.getBoundingClientRect();
          //     return {
          //       tagName: referencingDiv.tagName.toLowerCase(),
          //       clipPathStyle: referencingDiv.getAttribute("style"),
          //       backgroundColor:
          //         window.getComputedStyle(referencingDiv).backgroundColor,
          //       color: window.getComputedStyle(referencingDiv).color,
          //       position: {
          //         x: rect.x,
          //         y: rect.y,
          //         width: rect.width,
          //         height: rect.height,
          //       },
          //     };
          //   }
          //   return null;
        });
      } else if (tagName.match(/^p|span|ul|ol$/)) {
        elementData.text = await child.evaluate((el) => el.textContent || null);
        elementData.width = await child.evaluate(
          (el) => window.getComputedStyle(el).width
        );
        elementData.height = await child.evaluate(
          (el) => window.getComputedStyle(el).height
        );
        elementData.color = await child.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        elementData.coordinates = await child.evaluate((el) => {
          const transform = window.getComputedStyle(el).transform;
          if (transform && transform.includes("matrix")) {
            const match = transform.match(
              /matrix\([^,]+, [^,]+, [^,]+, [^,]+, ([^,]+), ([^)]+)\)/
            );
            if (match) {
              return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2]),
              };
            }
          }

          return { x: null, y: null };
        });
        elementData.fontSize = await child.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        elementData.fontWeight = await child.evaluate(
          (el) => window.getComputedStyle(el).fontWeight
        );
        elementData.fontStyle = await child.evaluate(
          (el) => window.getComputedStyle(el).fontStyle
        );
        elementData.letterSpacing = await child.evaluate(
          (el) => window.getComputedStyle(el).letterSpacing
        );
        elementData.lineHeight = await child.evaluate(
          (el) => window.getComputedStyle(el).lineHeight
        );
        elementData.backgroundColor = await child.evaluate(
          (el) => window.getComputedStyle(el).backgroundColor
        );
      }

      // if (tagName.match(/^div|p|span|ul|img|ol|svg$/)) {
      //   elementData.position = await child.evaluate((el) => {
      //     const rect = el.getBoundingClientRect();
      //     return {
      //       x: rect.x,
      //       y: rect.y,
      //       width: rect.width,
      //       height: rect.height,
      //     };
      //   });

      // }
      elementsData.push(elementData);
    }

    elementsData.forEach((item) => {
      switch (item.tagName) {
        case "span":
          if (item.text !== null && item.text !== "+ Add page") {
            data.pages[0].elements.push(createTextStructure(item));
          }
          break;
        case "div":
          if (
            item.imageSrc !== null &&
            item.coordinates.x !== null &&
            item.coordinates.y !== null &&
            item.coordinates.x !== 0 &&
            item.coordinates.y !== 0
          ) {
            data.pages[0].elements.push(createImageStructure(item));
          }
          break;
        case "svg":
          data.pages[0].elements.push(createFrameStructure(item));
          break;
        case "shape":
          data.pages[0].elements.push(createShapeStructure(item));
          break;
        case "chart":
          data.pages[0].elements.push(createChartStructure(item));
          break;
        default:
          break;
      }
    });

    scrapedData.push(elementsData);
  }
  //   console.log(JSON.stringify(scrapedData, null, 2));

  fs.writeFileSync(
    "dataScrapeItAllStructure2.json",
    JSON.stringify(data, null, 2)
  );
  fs.writeFileSync(
    "dataScrapeItAll2.json",
    JSON.stringify(scrapedData, null, 2)
  );
  return scrapedData;
}
module.exports = scrapeTemplate;
