const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
  createFrameStructure,
} = require("../pageStructure");
const fs = require("fs");

const template2 = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYMfPotGQ/S1TpdOETpb9X_5nvkL65tg/edit"
  );

  const data = {
    pages: [
      {
        elements: [],
        height: "1122px",
        id: crypto.randomUUID(),
        style: {
          background: "#111423",
        },
        title: "untitled",
        width: "793px",
      },
    ],
  };
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );

  for (const el of productElements) {
    const firstImgUrl = await el.$eval(
      "div:nth-child(6) > div > div.hWv4NA > div > div > div > img",
      (el) => el.src
    );
    const secondImgUrl = await el.$eval(
      "div:nth-child(14) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const thirdImgUrl = await el.$eval(
      "div:nth-child(13) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const fourthImgUrl = await el.$eval(
      "div:nth-child(12) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const title = await el.$eval(
      "div:nth-child(8) > div > div > div > p > span",
      (el) => el.textContent
    );
    const brandName = await el.$eval(
      "div:nth-child(10) > div > div > div > p > span",
      (el) => el.textContent
    );
    const brandType = await el.$eval(
      "div:nth-child(11) > div > div > div > p > span",
      (el) => el.textContent
    );
    const listHeading = await el.$eval(
      "div:nth-child(17) > div > div > div > p > span",
      (el) => el.textContent
    );
    const listOne = await el.$eval(
      "div:nth-child(19) > div",
      (el) => el.textContent
    );
    const templateLogo = await el.$eval(
      "div:nth-child(9) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const contactInfoHeading = await el.$eval(
      "div:nth-child(18) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contactInfoList = await el.$eval(
      "div:nth-child(20) > div",
      (el) => el.textContent
    );
    const email = await el.$eval(
      "div:nth-child(20) > div > div > div > p:nth-child(2) > span",
      (el) => el.textContent
    );
    const website = await el.$eval(
      "div:nth-child(20) > div > div > div > p:nth-child(3) > span",
      (el) => el.textContent
    );
    const address = await el.$eval(
      "div:nth-child(20) > div > div > div > p:nth-child(4) > span",
      (el) => el.textContent
    );

    const firstImgClipPath = await el.$eval(
      "div:nth-child(6) > div > div.hWv4NA > svg > defs > clipPath > path",
      (el) => el.getAttribute("d")
    );

    const listUnderlineBar = await el.$eval(
      "div:nth-child(15) > div > svg > path",
      (el) => el.getAttribute("d")
    );

    const dataElement = [
      {
        children: [
          {
            src: firstImgUrl,
            text: "Blue and Gray Concrete House With Attic during Twilight",
            type: "image",
            width: "793px",
            height: "647px",
            x: "0",
            y: "0",
          },
        ],
        name: "House frame",
        clipPath: firstImgClipPath,
        type: "frame",
        width: "357px",
        height: "140px",
        text: "",
        x: "0",
        y: "0",
      },
      {
        src: templateLogo,
        text: "Real Estate Logo",
        type: "image",
        width: "55px",
        height: "67px",
        x: "58",
        y: "416",
      },
      {
        name: "Liceria & Co.",
        type: "text",
        color: "#fff",
        text: brandName,
        fontSize: "24px",
        fontWeight: 900,
        lineHeight: "26px",
        letterSpacing: "-0.009em",
        width: "192px",
        height: "28px",
        x: "129",
        y: "425",
      },
      {
        name: "Real Estate",
        type: "text",
        color: "#fff",
        text: brandType,
        fontSize: "21px",
        fontWeight: 300,
        lineHeight: "24px",
        letterSpacing: "0em",
        width: "128px",
        height: "25px",
        x: "129",
        y: "450",
      },
      {
        name: "House for sale",
        type: "text",
        color: "#fff",
        text: title,
        fontSize: "64px",
        fontWeight: 700,
        lineHeight: "64px",
        letterSpacing: "0em",
        width: "357px",
        height: "140px",
        x: "58",
        y: "506",
      },
      {
        src: firstImgUrl,
        text: "Blue and Gray Concrete House With Attic during Twilight",
        type: "image",
        width: "793px",
        height: "647px",
        x: "0",
        y: "0",
      },
      {
        src: secondImgUrl,
        text: "Photo of Bedroom",
        type: "image",
        width: "263px",
        height: "121px",
        x: "58",
        y: "679",
      },
      {
        src: thirdImgUrl,
        text: "Minimalist Interior ,Yellow Sofa Furniture and Plants,Green Mode",
        type: "image",
        width: "263px",
        height: "121px",
        x: "58",
        y: "817",
      },
      {
        src: fourthImgUrl,
        text: "Interior of a Modern Kitchen",
        type: "image",
        width: "263px",
        height: "123px",
        x: "58",
        y: "955",
      },
      {
        name: "content",
        type: "text",
        color: "#fff",
        text: listHeading,
        fontSize: "25px",
        fontWeight: 600,
        lineHeight: "40px",
        letterSpacing: "0em",
        width: "265px",
        height: "29px",
        x: "409",
        y: "680",
      },
      {
        children: [
          {
            src: "",
            text: "",
            type: "",
            width: "",
            height: "",
            x: "",
            y: "",
          },
        ],
        name: "House frame",
        clipPath: listUnderlineBar,
        type: "frame",
        width: "71px",
        height: "3px",
        text: "",
        x: "409",
        y: "721",
      },
      {
        name: "list itme 1",
        type: "text",
        color: "#fff",
        text: listOne,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
      },
      {
        name: "website",
        type: "text",
        color: "#fff",
        text: website,
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "21px",
        letterSpacing: "0em",
        x: "409",
        y: "997",
      },
      {
        name: "address",
        type: "text",
        color: "#fff",
        text: address,
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "21px",
        letterSpacing: "0em",
        x: "409",
        y: "997",
      },
      {
        name: "Email address",
        type: "text",
        color: "#fff",
        text: email,
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "21px",
        letterSpacing: "0em",
        x: "409",
        y: "997",
      },
      {
        name: "Contact info list",
        type: "text",
        color: "#fff",
        text: contactInfoList,
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "21px",
        letterSpacing: "0em",
        width: "316px",
        height: "81px",
        x: "409",
        y: "997",
      },
      {
        name: "contact information heading",
        type: "text",
        color: "#fff",
        text: contactInfoHeading,
        fontSize: "25px",
        fontWeight: 600,
        lineHeight: "40px",
        letterSpacing: "0em",
        x: "409",
        y: "942",
      },
    ];

    dataElement.forEach((item) => {
      switch (item.type) {
        case "text":
          data.pages[0].elements.push(createTextStructure(item));
          break;
        case "image":
          data.pages[0].elements.push(createImageStructure(item));
          break;
        case "frame":
          if (item.children.length > 0) {
            data.pages[0].elements.push(
              createFrameStructure(item, item.children)
            );
          } else {
            data.pages[0].elements.push(createFrameStructure(item));
          }
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
  }

  // Save elements to file
  fs.writeFileSync("dataInfo2.json", JSON.stringify(data, null, 2));
  return data;
};

module.exports = template2;
