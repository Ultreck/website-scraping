const {
  createTextStructure,
  createImageStructure,
  createShapeStructure,
  createChartStructure,
  createFrameStructure,
} = require("../pageStructure");
const fs = require("fs");

const template1 = async (page) => {
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.goto(
    "https://www.canva.com/design/DAGYNzHB7dQ/K-luEnlRMTijE7fjTn4Zgw/edit"
  );

  const pages = {
    elements: [],
    height: "1122px",
    width: "793px",
    style: {
      backgroundColor: "#111423",
    },
    title: "",
    id: "",
  };
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );

  for (const el of productElements) {
    const firstImgUrl = await el.$eval(
      "div:nth-child(3) > div > div > div > div > div > div > img",
      (el) => el.src
    );
    const secondImgUrl = await el.$eval(
      "div:nth-child(6) > div > div.hWv4NA > div:nth-child(4) > div > div > img",
      (el) => el.src
    );
    const thirdImgUrl = await el.$eval(
      "div:nth-child(5) > div > div.hWv4NA > div:nth-child(4) > div > div > img",
      (el) => el.src
    );
    const fourthImgUrl = await el.$eval(
      "div:nth-child(4) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const title = await el.$eval(
      "div:nth-child(10) > div > div > div > p > span",
      (el) => el.textContent
    );
    const brandName = await el.$eval(
      "div:nth-child(19) > div > div > div > p > span",
      (el) => el.textContent
    );
    const brandType = await el.$eval(
      "div:nth-child(20) > div > div > div > p > span",
      (el) => el.textContent
    );
    const content = await el.$eval(
      "div:nth-child(18) > div > div > div > p > span",
      (el) => el.textContent
    );
    const time = await el.$eval(
      "div:nth-child(13) > div > div > div > p > span",
      (el) => el.textContent
    );
    const date = await el.$eval(
      "div:nth-child(16) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contactUs = await el.$eval(
      "div:nth-child(12) > div > div > div > p > span",
      (el) => el.textContent
    );
    const contactNumber = await el.$eval(
      "div:nth-child(15) > div > div > div > p > span",
      (el) => el.textContent
    );
    const visitUs = await el.$eval(
      "div:nth-child(14) > div > div > div > p > span",
      (el) => el.textContent
    );
    const website = await el.$eval(
      "div:nth-child(17) > div > div > div > p > span",
      (el) => el.textContent
    );
    const calendarIcon = await el.$eval(
      "div:nth-child(9) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const phoneIcon = await el.$eval(
      "div:nth-child(21) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const webIcon = await el.$eval(
      "div:nth-child(22) > div > div.a26Xuw > div > div > div > img",
      (el) => el.src
    );
    const btnContent = await el.$eval(
      "div:nth-child(11) > div > div:nth-child(2) > div > div > div > p > span",
      (el) => el.textContent
    );
    const firstImgClipPath = await el.$eval(
      "div:nth-child(6) > div > div.hWv4NA > svg:nth-child(3) > defs > clipPath > path",
      (el) => el.getAttribute("d")
    );
    const secondImgClipPath =  await el.$eval(
      "div:nth-child(5) > div > div.hWv4NA > svg:nth-child(3) > defs > clipPath > path",
      (el) => el.getAttribute("d")
    )

    const data = [
      {
        children: [
          {
            src: secondImgUrl,
            text: "Man in Black Suit Jacket While Using Smartphone",
            type: "image",
            width: "651px",
            height: "433px",
            x: "490",
            y: "317",
          },
        ],
        name: "frame",
        clipPath: firstImgClipPath,
        type: "frame",
        width: "17px",
        height: "700px",
        text: "",
        x: "372",
        y: "634",
      },
      {
        children: [
          {
            src: thirdImgUrl,
            text: "Person Using Macbook Pro",
            type: "image",
            width: "651px",
            height: "433px",
            x: "372",
            y: "634",
          },
        ],
        name: "frame",
        clipPath: secondImgClipPath,
        type: "frame",
        width: "500px",
        height: "500px",
        text: "",
        x: "372",
        y: "634",
      },
      {
        name: "button text",
        type: "text",
        color: "#111423",
        text: btnContent,
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "17px",
        letterSpacing: "0em",
        x: "11",
        y: "7",
      },
      {
        src: webIcon,
        text: "web icon",
        type: "image",
        width: "41px",
        height: "41px",
        x: "79",
        y: "923",
      },
      {
        src: phoneIcon,
        text: "Telephone Call Icon",
        type: "image",
        width: "41px",
        height: "41px",
        x: "79",
        y: "866",
      },
      {
        src: calendarIcon,
        text: "time and date icon",
        type: "image",
        width: "25px",
        height: "24px",
        x: "86",
        y: "821",
      },
      {
        name: "website",
        type: "text",
        color: "#fff",
        text: website,
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "16px",
        letterSpacing: "0em",
        x: "124",
        y: "944",
      },
      {
        name: "visit us",
        type: "text",
        color: "#fff",
        text: visitUs,
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "16px",
        letterSpacing: "0em",
        x: "124",
        y: "925",
      },
      {
        name: "contact number",
        type: "text",
        color: "#fff",
        text: contactNumber,
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "16px",
        letterSpacing: "0em",
        x: "124",
        y: "886",
      },
      {
        name: "contact us",
        type: "text",
        color: "#fff",
        text: contactUs,
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "16px",
        letterSpacing: "0em",
        x: "124",
        y: "867",
      },
      {
        name: "date",
        type: "text",
        color: "#fff",
        text: date,
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "16px",
        letterSpacing: "0em",
        x: "124",
        y: "833",
      },
      {
        name: "time",
        type: "text",
        color: "#fff",
        text: time,
        fontSize: "21px",
        fontWeight: 400,
        lineHeight: "23px",
        letterSpacing: "0em",
        x: "124",
        y: "814",
      },
      {
        name: "business webinar",
        type: "text",
        color: "#fff",
        text: title,
        fontSize: "74px",
        fontWeight: 700,
        lineHeight: "79px",
        letterSpacing: "0em",
        x: "79",
        y: "519",
      },
      {
        name: "Warner & Spencer",
        type: "text",
        color: "#fff",
        text: brandName,
        fontSize: "13px",
        fontWeight: 700,
        lineHeight: "14px",
        letterSpacing: "0em",
        x: "119",
        y: "479",
      },
      {
        name: "company",
        type: "text",
        color: "#fff",
        text: brandType,
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: "14px",
        letterSpacing: "0em",
        x: "119",
        y: "496",
      },
      {
        name: "content",
        type: "text",
        color: "#fff",
        text: content,
        fontSize: "24px",
        fontWeight: 400,
        lineHeight: "29px",
        letterSpacing: "0em",
        x: "79",
        y: "690",
      },
      {
        src: firstImgUrl,
        text: "High Rise Buildings",
        type: "image",
        width: "817px",
        height: "339px",
        x: "-12",
        y: "-12",
      },
      {
        src: secondImgUrl,
        text: "Man in Black Suit Jacket While Using Smartphone",
        type: "image",
        width: "400px",
        height: "400px",
        x: "465",
        y: "327",
      },
      {
        src: thirdImgUrl,
        text: "Person Using Macbook Pro",
        type: "image",
        width: "540px",
        height: "540px",
        x: "372",
        y: "634",
      },
      {
        src: fourthImgUrl,
        text: "Abstract Wave Frame",
        type: "image",
        width: "875px",
        height: "485px",
        x: "-40",
        y: "32",
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
        case "frame":
          if (item.children.length > 0) {
            pages.elements.push(
              createFrameStructure(item, item.children)
            );
          } else {
            pages.elements.push(createFrameStructure(item));
          }
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

  fs.writeFileSync("dataInfo1.json", JSON.stringify(pages, null, 2));
  return pages;
};

module.exports = template1;