const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
} = require("../pageStructure");
const fs = require("fs");

const template3 = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYQ2GFjoU/j4NavTzOo1x0rj5i33RbLQ/edit"
  );

  const pages = {
    elements: [],
    height: "1122px", 
    width: "793px%",
    title: "",
    style: {},
    id: "",
  };
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );

  for (const el of productElements) {
    const profileImg = await el.$eval(
      "div:nth-child(5) > div > div.hWv4NA > div > div > div > img",
      (el) => el.src
    );
    const brandImg = await el.$eval(
      "div:nth-child(7) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const title = await el.$eval(
      "div:nth-child(11) > div > div > div > p > span",
      (el) => el.textContent
    );
    const txt = await el.$eval(
      "div:nth-child(12) > div > div > div > p > span",
      (el) => el.textContent
    );

    const brandName = await el.$eval(
      "div:nth-child(20) > div > div > div > p > span",
      (el) => el.textContent
    );
    const subTitle = await el.$eval(
      "div:nth-child(19) > div > div > div > p > span",
      (el) => el.textContent
    );
    const registerHeading = await el.$eval(
      "div:nth-child(18) > div > div > div > p > span",
      (el) => el.textContent
    );
    const date = await el.$eval(
      "div:nth-child(13) > div > div > div > p > span",
      (el) => el.textContent
    );
    const time = await el.$eval(
      "div:nth-child(14) > div > div > div > p > span",
      (el) => el.textContent
    );
    const infoHeading = await el.$eval(
      "div:nth-child(15) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contact = await el.$eval(
      "div:nth-child(16) > div > div > div > p > span",
      (el) => el.textContent
    );
    const address = await el.$eval(
      "div:nth-child(17) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contactIcon = await el.$eval(
      "div:nth-child(9) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const addressIcon = await el.$eval(
      "div:nth-child(10) > div > div.a26Xuw > div > div > div > img",
      (el) => el.textContent
    );

    const data = [
      {
        name: "heading",
        type: "text",
        color: "#0a2449",
        text: title,
        fontSize: "116px",
        fontWeight: 900,
        lineHeight: "163px",
        letterSpacing: "0em",
        x: "79",
        y: "189",
      },
      {
        name: "sub-heading",
        type: "text",
        color: "#0a2449",
        text: txt,
        fontSize: "96px",
        fontWeight: 700,
        lineHeight: "135px",
        letterSpacing: "0em",
        x: "79",
        y: "318",
      },
      {
        src: profileImg,
        text: "Profile",
        type: "image",
        width: "285px",
        height: "426px",
        x: "396",
        y: "388",
      },
      {
        src: brandImg,
        text: "Business finance design logo",
        type: "image",
        width: "96px",
        height: "96px",
        x: "79",
        y: "76",
      },
      {
        name: "brand name",
        type: "text",
        color: "#fff",
        text: brandName,
        fontSize: "51px",
        fontWeight: 700,
        lineHeight: "71px",
        letterSpacing: "0em",
        x: "197",
        y: "94",
      },
      {
        name: "Sub-title",
        type: "text",
        color: "#fff",
        text: subTitle,
        fontSize: "34px",
        fontWeight: 700,
        lineHeight: "48px",
        letterSpacing: "0em",
        x: "79",
        y: "446",
      },
      {
        name: "register now",
        type: "text",
        color: "#fff",
        text: registerHeading,
        fontSize: "40px",
        fontWeight: 700,
        lineHeight: "56px",
        letterSpacing: "0em",
        x: "409",
        y: "997",
      },
      {
        name: "Date",
        type: "text",
        color: "#fff",
        text: date,
        fontSize: "51px",
        fontWeight: 700,
        lineHeight: "71px",
        letterSpacing: "0em",
        x: "79",
        y: "745",
      },
      {
        name: "Time",
        type: "text",
        color: "#fff",
        text: time,
        fontSize: "34px",
        fontWeight: 700,
        lineHeight: "48px",
        letterSpacing: "0em",
        x: "79",
        y: "808",
      },
      {
        name: "Information heading",
        type: "text",
        color: "#111423",
        text: infoHeading,
        fontSize: "41px",
        fontWeight: 700,
        lineHeight: "57px",
        letterSpacing: "0em",
        x: "79",
        y: "858",
      },
      {
        name: "Phone number",
        type: "text",
        color: "#fff",
        text: contact,
        fontSize: "37px",
        fontWeight: 400,
        lineHeight: "52px",
        letterSpacing: "0em",
        x: "141",
        y: "918",
      },
      {
        name: "Address",
        type: "text",
        color: "#fff",
        text: address,
        fontSize: "30px",
        fontWeight: 400,
        lineHeight: "42px",
        letterSpacing: "0em",
        x: "141",
        y: "986",
      },
      {
        src: contactIcon,
        text: "Phone in Circle Illustration",
        type: "image",
        width: "48px",
        height: "48px",
        x: "79",
        y: "917",
      },
      {
        src: addressIcon,
        text: "GPS Location Pin",
        type: "image",
        width: "48px",
        height: "59px",
        x: "79",
        y: "974",
      },
    ];

    data.forEach((item) => {
      switch (item.type) {
        case "text":
          pages.elements.push(createTextStructure(item));
          break;
        case "image":
          pages.elements.push(createImageStructure(item));
          break;
        case "shape":
          pages.elements.push(createShapeStructure(item));
          break;
        case "chart":
          pages.elements.push(createChartStructure(item));
          break;
        default:
          break;
      }
    });
  }

  fs.writeFileSync("dataInfo3.json", JSON.stringify(pages, null, 2));
  return pages;
};

module.exports = template3;
