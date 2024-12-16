const fs = require("fs");

async function getSvgDivProperties(page) {
  const elements = await page.evaluate(() => {
    const svgDefs = document.querySelectorAll("defs > clipPath");
    const clipPaths = {};

    svgDefs.forEach((clipPath) => {
      const id = clipPath.id;
      const path = clipPath.querySelector("path")?.getAttribute("d");
      if (id && path) {
        clipPaths[`#${id}`] = path;
      }
    });

    const elementsWithClipPath = [];
    const elements = document.querySelectorAll("*[style]");
    elements.forEach((el) => {
      const style = el.getAttribute("style");
      const clipPathMatch = style.match(/clip-path:\s*url\((#[^)]+)\)/);

      if (clipPathMatch) {
        const clipPathId = clipPathMatch[1];
        const clipPathData = clipPaths[clipPathId];

        elementsWithClipPath.push({
          tagName: el.tagName.toLowerCase(),
          clipPathId,
          clipPathData,
          style,
          properties: {
            backgroundColor: window.getComputedStyle(el).backgroundColor,
            color: window.getComputedStyle(el).color,
            width: el.offsetWidth,
            height: el.offsetHeight,
            position: (() => {
              const rect = el.getBoundingClientRect();
              return { x: rect.x, y: rect.y };
            })(),
          },
        });
      }
    });

    return elementsWithClipPath;
  });

  fs.writeFileSync("dataSvgDivProperties.json", JSON.stringify(elements, null, 2));
  return elements;
}

module.exports = getSvgDivProperties;
