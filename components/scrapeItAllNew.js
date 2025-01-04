const puppeteer = require("puppeteer");
const fs = require("fs");
const getSvgDivProperties = require("../svgDivContainer");
const {
  createTextStructure,
  createImageStructure,
  createFrameStructure,
  createShapeStructure,
  createChartStructure,
  createListStructure,
} = require("../pageStructure");
const { text } = require("stream/consumers");
const { stringify } = require("querystring");
const determineShape = require("./clipPathFunction");

const getTemplateData = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYNzHB7dQ/K-luEnlRMTijE7fjTn4Zgw/edit"
  );

  const productElements = await page.$$(".DF_utQ");
  const parentStyles = await page.$("._14BoqA");
  const parentBackgroundColor = await page.$(".fbzKiw");
  const data = {
    pages: [
      {
        elements: [],
        height: "1122px",
        width: "793px",
        id: crypto.randomUUID(),
        title: "Untitled",
        style: {
          background: "#1b1b2a",
        },
      },
    ],
  };

  const elementsData = [];
  data.pages[0].height = await parentStyles.evaluate((el) => {
    return window.getComputedStyle(el).height || null;
  });
  data.pages[0].width = await parentStyles.evaluate((el) => {
    return window.getComputedStyle(el).width || null;
  });
  data.pages[0].style.background = await parentBackgroundColor.evaluate(
    (el) => {
      return window.getComputedStyle(el).backgroundColor || null;
    }
  );

  for (const child of productElements) {
    const tagName = await child.evaluate((el) => el.tagName.toLowerCase());

    const elementObject = { tagName };

    elementObject.width = await child.evaluate(
      (el) => window.getComputedStyle(el).width || null
    );
    elementObject.height = await child.evaluate(
      (el) => window.getComputedStyle(el).height || null
    );
    elementObject.shadow = await child.evaluate((el) => {
      const span = el.querySelector("span");
      return span ? window.getComputedStyle(span).shadow : null;
    });
    elementObject.coordinates = await child.evaluate((el) => {
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

    elementObject.rotate = await child.evaluate((el) => {
      const transform = window.getComputedStyle(el).transform;
      if (transform && transform.includes("matrix")) {
        const match = transform.match(
          /matrix\(([^,]+),\s*([^\s,]+),\s*([^\s,]+),\s*([^\s,]+),/
        );
        if (match) {
          const a = parseFloat(match[1]);
          const b = parseFloat(match[2]);
          const c = parseFloat(match[3]);
          const d = parseFloat(match[4]);
          const angleInRadians = Math.atan2(b, a);
          const angleInDegrees = angleInRadians * (180 / Math.PI);
          return angleInDegrees;
        }
      }
      return null;
    });
    elementObject.src = await child.evaluate((el) => {
      const img = el.querySelector("img");
      if (img) {
        return img.src;
      }
      return null;
    });

    elementObject.text = await child.evaluate((el) => {
      const textContent = el.textContent;
      if (textContent) {
        return textContent.trim();
      }
      return null;
    });

    elementObject.list = await child.evaluate((el) => {
      const ul = el.querySelector("ul");
      return ul ? true : false;
    });

    elementObject.type = await child.evaluate((el) => {
      const textContent = el.textContent;
      const img = el.querySelector("img")?.src || null;
      const path = el.querySelector("path")?.getAttribute("d") || null;
      if (textContent) {
        return "text";
      } else if (img) {
        return "image";
      } else if (path) {
        return "frame";
      }
      return null;
    });
    elementObject.altName = await child.evaluate((el) => {
      const alt = el.querySelector("img")?.getAttribute("alt");
      if (alt) {
        return alt.trim();
      }
      return null;
    });
    elementObject.color = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const color = window.getComputedStyle(span).color;
        return color;
      }
      return null;
    });
    elementObject.fontStyle = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const fontStyle = window.getComputedStyle(span).fontStyle;
        return fontStyle;
      }
      return null;
    });
    elementObject.textTransform = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const textTransform = window.getComputedStyle(span).textTransform;
        return textTransform;
      }
      return null;
    });
    elementObject.fontWeight = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const fontWeight = window.getComputedStyle(span).fontWeight;
        return fontWeight;
      }
      return null;
    });
    elementObject.fontSize = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const fontSize = window.getComputedStyle(span).fontSize;
        return fontSize;
      }
      return null;
    });
    elementObject.letterSpacing = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const letterSpacing = window.getComputedStyle(span).letterSpacing;
        return letterSpacing;
      }
      return null;
    });
    elementObject.lineHeight = await child.evaluate((el) => {
      const span = el.querySelector("span");
      if (span) {
        const lineHeight = window.getComputedStyle(span).lineHeight;
        return lineHeight;
      }
      return null;
    });
    elementObject.listStyleType = await child.evaluate((el) => {
      const list = el.querySelector("li");
      if (list) {
        const listStyleType = window.getComputedStyle(list).listStyleType;
        return listStyleType;
      }
      return null;
    });

    elementObject.imgStyle = await child.evaluate((el) => {
      const img = el.querySelector("img");
      if (img) {
        const width = window.getComputedStyle(img).width;
        const height = window.getComputedStyle(img).height;
        return {
          type: "image",
          src: img.src,
          width: width,
          height: height,
        };
      }
      return null;
    });

    elementObject.imgClipPath = await child.evaluate((el) => {
      const textContent = el.textContent;
      const imgPath =
        el
          .querySelector("svg + div + svg > defs > clipPath > path")
          ?.getAttribute("d") || null;
      const svg2 = el.querySelector("svg + div + svg");
      const svgDiv2 = el.querySelector("svg + div + svg + div");
      if (svgDiv2 && svg2) {
        const svgWidth2 = window.getComputedStyle(svgDiv2).width || null;
        const svgHeight2 = window.getComputedStyle(svgDiv2).height || null;
        const svgBackground2 =
          window.getComputedStyle(svgDiv2).backgroundColor || null;
        return {
          type: "frame",
          text: textContent,
          path: imgPath,
          width: svgWidth2,
          height: svgHeight2,
          background: svgBackground2,
        };
      }
      return null;
    });
    elementObject.firstClipPath = await child.evaluate((el) => {
      const path = el.querySelector("path")?.getAttribute("d");
      const svg = el.querySelector("svg");
      const svgDiv = el.querySelector("svg + div");
      if (svgDiv && svg) {
        const svgWidth = window.getComputedStyle(svgDiv).width || null;
        const svgHeight = window.getComputedStyle(svgDiv).height || null;
        const svgBackground =
        window.getComputedStyle(svgDiv).backgroundColor || null;
        return {
          // type: "frame",
          path: path,
          width: svgWidth,
          height: svgHeight,
          background: svgBackground,
        };
      }
      return null;
    });

    elementsData.push(elementObject);
  }

  const listFound = elementsData.find((listIstrue) => listIstrue.list);
  const listData = elementsData
    .filter((list) => list.list)
    .map((mappedList) => {
      return mappedList.text || [];
    });
  if (listFound) {
    listFound.listItems = listData;
  }

  // co

  elementsData.forEach((item) => {
    if (item.listItems) {
      return data.pages[0].elements.push(createListStructure(listFound));
    }

    if (item.type === "text" && item.imgClipPath?.type === "frame") {
      return data.pages[0].elements.push(
        createFrameStructure(item, createTextStructure(item.imgClipPath))
      );
    } else if (item.type === "image" && item.imgClipPath?.type === "frame") {
      const children = {
        type: "image",
        text: item.altName || "Image",
        width: "100%",
        height: "100%",
        style: {
          order: null,
          opacity: 1,
          animationName: "",
          animationDuration: "1s",
          shadow: item?.shadow || "",
          borderWidth: item.borderWidth || 0,
          borderColor: "#000000",
          borderRadius: item.borderRadius || 0,
        },
        config: { src: item.src || "" },
        x: 0,
        y: 0,
        rotate: item.rotate || 0,
        id: crypto.randomUUID(),
        frame: 0,
      };
      return data.pages[0].elements.push(createFrameStructure(item, children));
    } else if (item.type === "text" && item.list === false && !item.clipPath) {
      return data.pages[0].elements.push(createTextStructure(item));
    } else if (item.type === "image" && !item.clipPath) {
      return data.pages[0].elements.push(createImageStructure(item));
    } else if (item.type === "frame" && item.firstClipPath?.type === "frame") {
      return data.pages[0].elements.push(createFrameStructure(item));
    }else if(item.type === "frame" && item.firstClipPath.type === "frame" && item.imgClipPath.type === "frame"){
      return data.pages[0].elements.push(createFrameStructure(item)); 
    }
  });

  // const listItem = elementsData.find((item) => item.list === true);
  // if (listItem) {
  //   data.pages[0].elements.push(createListStructure(listItem, listData));
  // };

  fs.writeFileSync(
    "dataScrapeItAllStructure2.json",
    JSON.stringify(data, null, 2)
  );
  fs.writeFileSync(
    "dataScrapeItAll2.json",
    JSON.stringify(elementsData, null, 2)
  );
  //   fs.writeFileSync(
  //     "dataScrapeItAllStructure4.json",
  //     JSON.stringify(data, null, 2)
  //   );
  //   fs.writeFileSync(
  //     "dataScrapeItAll4.json",
  //     JSON.stringify(elementsData, null, 2)
  //   );
  return data;
};
module.exports = getTemplateData;
