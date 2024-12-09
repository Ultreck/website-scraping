const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
} = require("../pageStructure");
const fs = require("fs");

const template2 = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYMfPotGQ/S1TpdOETpb9X_5nvkL65tg/edit"
  );

  const pages = {
    elements: [],
    height: "100%",
    width: "100%",
    title: "",
    style: {},
    id: "",
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
      "div:nth-child(19) > div > div > div > ul > li.Xp24Nw._bsDhw.cgHgbA.nxe3IQ._4c44Ng.PanoWQ > span",
      (el) => el.textContent
    );
    const listTwo = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li:nth-child(2) > span",
      (el) => el.textContent
    );
    const listThree = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li:nth-child(3) > span",
      (el) => el.textContent
    );
    const listFour = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li:nth-child(4) > span",
      (el) => el.textContent
    );
    const listFive = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li:nth-child(5) > span",
      (el) => el.textContent
    );
    const listSix = await el.$eval(
      "div:nth-child(19) > div > div > div > ul > li:nth-child(6) > span",
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
    const contactNumber = await el.$eval(
      "div:nth-child(20) > div > div > div > p.cgHgbA.nxe3IQ.Xp24Nw.PanoWQ > span",
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

    const data = [
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
        name: "Contact number",
        type: "text",
        color: "#fff",
        text: contactNumber,
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "21px",
        letterSpacing: "0em",
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
        name: "list itme 6",
        type: "text",
        color: "#fff",
        text: listSix,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
      },
      {
        name: "list item 5",
        type: "text",
        color: "#fff",
        text: listFive,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
      },
      {
        name: "list item 4",
        type: "text",
        color: "#fff",
        text: listFour,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
      },
      {
        name: "list item 3",
        type: "text",
        color: "#fff",
        text: listThree,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
      },
      {
        name: "list item 2",
        type: "text",
        color: "#fff",
        text: listTwo,
        fontSize: "17px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "409",
        y: "742",
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
        name: "content",
        type: "text",
        color: "#fff",
        text: listHeading,
        fontSize: "25px",
        fontWeight: 600,
        lineHeight: "40px",
        letterSpacing: "0em",
        x: "409",
        y: "680",
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
        x: "58",
        y: "506",
      },
      {
        name: "Warner & Spencer",
        type: "text",
        color: "#fff",
        text: brandName,
        fontSize: "24px",
        fontWeight: 900,
        lineHeight: "26px",
        letterSpacing: "-0.009em",
        x: "129",
        y: "425",
      },
      {
        name: "company",
        type: "text",
        color: "#fff",
        text: brandType,
        fontSize: "21px",
        fontWeight: 300,
        lineHeight: "24px",
        letterSpacing: "0em",
        x: "129",
        y: "450",
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

  // Save elements to file
  fs.writeFileSync("dataInfo2.json", JSON.stringify(pages, null, 2));
  return pages;
};

module.exports = template2;
