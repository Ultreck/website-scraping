const {
    createTextStructure,
    createImageStructure,
    createShapeStructure,
    createChartStructure,
  } = require("../pageStructure");
  const fs = require("fs");
  
  const template5 = async (page) => {
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.goto(
      "https://www.canva.com/design/DAGYVs63-a4/T5rLPA65qebTrAA9vVlhBw/edit"
    );
  
    const pages = {
      elements: [],
      background: "#161717",
      height: "793px",
      width: "1122px",
      title: "",
      style: {},
      id: "",
    };
    const productElements = await page.$$(
      "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
    );
  
    for (const el of productElements) {
      const firstImgUrl = await el.$eval(
        "div:nth-child(5) > div > div.a26Xuw > div > div > div > img",
        (el) => el.src
      );
      const secondImgUrl = await el.$eval(
        "div:nth-child(7) > div > div.a26Xuw > div > div > div > img",
        (el) => el.src
      );
      const thirdImgUrl = await el.$eval(
        "div:nth-child(9) > div > div.a26Xuw > div > div > div > img",
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
  
      const data = [
        {
          src: firstImgUrl,
          text: "Hand drawn circle line 1",
          type: "image",
          width: "493px",
          height: "444px",
          x: "-44",
          y: "191",
        },
        {
          src: secondImgUrl,
          text: "Hand drawn circle line 2",
          type: "image",
          width: "384px",
          height: "346px",
          x: "256",
          y: "352",
        },
        {
          src: thirdImgUrl,
          text: "Hand drawn circle line 3",
          type: "image",
          width: "340px",
          height: "306px",
          x: "497",
          y: "493",
        },
        // {
        //   src: fourthImgUrl,
        //   text: "Interior of a Modern Kitchen",
        //   type: "image",
        //   width: "263px",
        //   height: "123px",
        //   x: "58",
        //   y: "955",
        // },
        {
          name: "Laundry",
          type: "text",
          color: "#b0e05e",
          text: title1,
          fontSize: "47px",
          fontWeight: 800,
          lineHeight: "65px",
          letterSpacing: "0em",
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
          x: "83",
          y: "783",
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
          x: "83",
          y: "783",
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
          x: "83",
          y: "783",
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
          x: "33",
          y: "3",
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
          x: "197",
          y: "3",
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
  
    fs.writeFileSync("dataInfo4.json", JSON.stringify(pages, null, 2));
    return pages;
  };
  
  module.exports = template5;
  