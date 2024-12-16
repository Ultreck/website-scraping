const fs = require("fs");

async function getSvg(page) {
  const clipPaths = await  page.evaluate(() => {
    const svgDefs = document.querySelectorAll("defs > clipPath");
    const clipPaths = {};

    svgDefs.forEach((clipPath) => {
      const id = clipPath.id;
      const path = clipPath.querySelector("path")?.getAttribute("d");
      if (id && path) {
        clipPaths[`#${id}`] = path;
      }
    });

    console.log("Extracted clipPaths:", clipPaths);
    return clipPaths;
  });

  const elements = await page.evaluate(
    (clipPaths) => {
      const elementsData = [];
      const elements = document.querySelectorAll("*[style]");
      elements.forEach((el) => {
        const style = el.getAttribute("style");
        const clipPathMatch = style?.match(/clip-path:\s*url\((#[^)]+)\)/);

        if (clipPathMatch) {
          const clipPathId = clipPathMatch[1];
          const clipPathData = clipPaths[clipPathId];

          elementsData.push({
            tagName: el.tagName.toLowerCase(),
            clipPathId,
            clipPathData,
            style,
            backgroundColor: window.getComputedStyle(el).backgroundColor,
            dimensions: {
              width: el.offsetWidth,
              height: el.offsetHeight,
            },
            position: (() => {
              const rect = el.getBoundingClientRect();
              return { x: rect.x, y: rect.y };
            })(),
          });
        }
      });

      console.log("Extracted elementsData:", elementsData);
      return elementsData;
    },
    clipPaths
  );

  if (elements.length === 0) {
    console.warn("No elements found with clip-path!");
  }

  fs.writeFileSync("dataSvg.json", JSON.stringify(elements, null, 2));
  return elements;
}

module.exports = { getSvg };
