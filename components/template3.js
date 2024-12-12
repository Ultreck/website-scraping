const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
  createFrameStructure,
} = require("../pageStructure");
const fs = require("fs");

const template4 = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYR0LWqfs/I9v7ndmTiRe5N08LZOZbaQ/edit"
  );

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
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );

  for (const el of productElements) {
    const firstImgUrl = await el.$eval(
      "div:nth-child(4) > div > div.hWv4NA > div > div > div > img",
      (el) => el.src
    );
    const secondImgUrl = await el.$eval(
      "div:nth-child(6) > div > div.hWv4NA > div > div > div > img",
      (el) => el.src
    );
    const thirdImgUrl = await el.$eval(
      "div:nth-child(8) > div > div.hWv4NA > div > div > div > img",
      (el) => el.src
    );
    const title1 = await el.$eval(
      "div:nth-child(15) > div > div > div > p > span",
      (el) => el.textContent
    );
    const title2 = await el.$eval(
      "div:nth-child(16) > div > div > div > p > span",
      (el) => el.textContent
    );
    const subTitle = await el.$eval(
      "div:nth-child(22) > div > div > div > p > span",
      (el) => el.textContent
    );
    const brandLogo = await el.$eval(
      "div:nth-child(14) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const contentHeading = await el.$eval(
      "div:nth-child(21) > div > div > div > p > span",
      (el) => el.textContent
    );
    const listOne = await el.$eval(
      "div:nth-child(17) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const listTwo = await el.$eval(
      "div:nth-child(18) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const listThree = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const listFour = await el.$eval(
      "div:nth-child(20) > div > div > div > ul > li > span",
      (el) => el.textContent
    );
    const contactNumber = await el.$eval(
      "div:nth-child(12) > div > div:nth-child(2) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contactImg = await el.$eval(
      "div:nth-child(12) > div > div:nth-child(1) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const addressImg = await el.$eval(
      "div:nth-child(12) > div > div:nth-child(3) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const address = await el.$eval(
        "div:nth-child(12) > div > div:nth-child(4) > div > div > div > p > span",
        (el) => el.textContent
    );
    const arrowIcon = await el.$eval(
      "div:nth-child(13) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );

    const secondImgClipPath = await el.$eval(
      "div:nth-child(3) > div > div > svg > defs > clipPath > path",
      (el) => el.getAttribute("d")
    );

    const ourSersviceClipPath = await el.$eval(
      "div:nth-child(10) > div > div > svg > defs > clipPath > path",
      (el) => el.getAttribute("d")
    );

    const contactClipPath = await el.$eval(
      "div:nth-child(10) > div > div > svg > defs > clipPath > path",
      (el) => el.getAttribute("d")
    );

    const dataElement = [
      {
        children: [
          {
            src: "",
            text: "",
            type: "image",
            width: "",
            height: "",
            x: "",
            y: "",
          },
        ],
        name: "frame",
        clipPath: secondImgClipPath,
        type: "frame",
        width: "1061px",
        height: "790px",
        text: "Background second half of canva",
        rotate: "21deg",
        bg: "b0e05e",
        x: "-217",
        y: "492",
      },
      {
        children: [
          {
            src: "",
            text: "",
            type: "image",
            width: "",
            height: "",
            x: "",
            y: "",
          },
        ],
        name: "frame",
        clipPath: ourSersviceClipPath,
        type: "frame",
        width: "433px",
        height: "92px",
        text: "Our service banner frame",
        rotate: "0",
        bg: "#1b1b2a",
        x: "-72",
        y: "675",
      },
      {
        src: firstImgUrl,
        text: "Hand drawn circle line 1",
        type: "image",
        width: "416px",
        height: "416px",
        x: "-17",
        y: "205",
      },
      {
        src: secondImgUrl,
        text: "Happy mother washing baby clothes in machine",
        type: "image",
        width: "346px",
        height: "346px",
        x: "264",
        y: "352",
      },
      {
        src: thirdImgUrl,
        text: "People Inside Laundry Facility",
        type: "image",
        width: "284px",
        height: "284px",
        x: "508",
        y: "504",
      },
      {
        name: "Laundry",
        type: "text",
        color: "#b0e05e",
        text: title1,
        fontSize: "47px",
        fontWeight: 800,
        lineHeight: "65px",
        letterSpacing: "0em",
        width: "450px",
        height: "91px",
        x: "263",
        y: "76",
      },
      {
        name: "Service",
        type: "text",
        color: "#b0e05e",
        text: title2,
        fontSize: "42px",
        fontWeight: 800,
        lineHeight: "59px",
        letterSpacing: "0em",
        width: "374px",
        height: "92px",
        x: "339",
        y: "145",
      },
      {
        name: "Sub title",
        type: "text",
        color: "#fff",
        text: subTitle,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "24px",
        letterSpacing: "0.015em",
        width: "366px",
        height: "32px",
        x: "348",
        y: "223",
      },
      {
        src: brandLogo,
        text: "Horiz More Icon",
        type: "image",
        width: "164px",
        height: "41px",
        x: "22",
        y: "43",
      },
      {
        name: "Our service",
        type: "text",
        color: "#b0e05e",
        text: contentHeading,
        fontSize: "25px",
        fontWeight: 500,
        lineHeight: "36px",
        letterSpacing: "0em",
        x: "90",
        y: "698",
      },
      {
        name: "list itme 1",
        type: "text",
        color: "#1b1b2a",
        text: listOne,
        fontSize: "17px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0em",
        width: "360px",
        height: "33px",
        x: "83",
        y: "783",
      },
      {
        name: "list item 2",
        type: "text",
        color: "#1b1b2a",
        text: listTwo,
        fontSize: "17px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0em",
        width: "307px",
        height: "33px",
        x: "79",
        y: "825",
      },
      {
        name: "list item 3",
        type: "text",
        color: "#1b1b2a",
        text: listThree,
        fontSize: "17px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0em",
        width: "291px",
        height: "33px",
        x: "79",
        y: "867",
      },
      {
        name: "list item 4",
        type: "text",
        color: "#1b1b2a",
        text: listFour,
        fontSize: "17px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0em",
        width: "268px",
        height: "33px",
        x: "79",
        y: "909",
      },
      {
        children: [
          {
            src: "",
            text: "",
            type: "image",
            width: "",
            height: "",
            x: "",
            y: "",
          },
        ],
        name: "frame",
        clipPath: contactClipPath,
        type: "frame",
        width: "664px",
        height: "48px",
        text: "Our service banner frame",
        rotate: "0",
        bg: "#1b1b2a",
        x: "79",
        y: "997",
      },
      {
        name: "Contact number",
        type: "text",
        color: "#fff",
        text: contactNumber,
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "22px",
        letterSpacing: "0em",
        x: "112",
        y: "1000",
      },
      {
        src: contactImg,
        text: "Phone Call Glyph Icon",
        type: "image",
        width: "26px",
        height: "26px",
        x: "79",
        y: "997 ",
      },
      {
        name: "location",
        type: "text",
        color: "#fff",
        text: address,
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "22px",
        letterSpacing: "0em",
        x: "276",
        y: "1000",
      },
      {
        src: addressImg,
        text: "location glyph icon",
        type: "image",
        width: "26px",
        height: "26px",
        x: "79",
        y: "997 ",
      },
      {
        src: arrowIcon,
        text: "Brushstroke Arrow Smooth Curve Down",
        type: "image",
        width: "167px",
        height: "123px",
        x: "79",
        y: "997 ",
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
            data.pages[0].elements.push(createFrameStructure(item, item.children));
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

  fs.writeFileSync("dataInfo3.json", JSON.stringify(data, null, 2));
  return data;
};

module.exports = template4;
