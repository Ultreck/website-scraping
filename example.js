const productData = [];
  const productElements = await page.$$(
    "main > div.vWU3Dw > div._6mOE8w > div > div > div > div.WVSfHg > div > div > div > div.LlCHmw.kMDoBQ > div > div.CAi1bQ > div.caBU6Q > div > div > div"
  );
  productElements.forEach(async (el, index) => {
    const title = await el.$eval(
      "div:nth-child(22) > div > div > div > p:nth-child(1) > span",
      (el) => el.textContent
    );
    const txt = await el.$eval(
      "div:nth-child(22) > div > div > div > p:nth-child(2) > span",
      (el) => el.textContent
    );
    productData.push(...productData, {
        name: "heading",
        type: "text",
        color: "#0a2449",
        text: title + " " + txt,
        fontSize: "113.289px",
        fontWeight: 700,
        lineHeight: "101px",
        letterSpacing: "-0.005em",
    })
    
    const webUrl = await el.$eval(
        "div:nth-child(17) > div > div > div > ul > li > span",
        (el) => el.textContent
    );
    productData.push(...productData, {
        name: "website url",
        type: "text",
        color: "#0a2449",
        text: webUrl,
        fontSize: "34px",
        fontWeight: 500,
        lineHeight: "41px",
        letterSpacing: "0em",
    })
    const brand = await el.$eval(
        "div:nth-child(16) > div > div > div > p > span",
        (el) => el.textContent
    );
    productData.push(...productData, {
        name: "company",
        type: "text",
        color: "#e18d00",
        text: brand,
        fontSize: "85px",
        fontWeight: 700,
        lineHeight: "93px",
        letterSpacing: "-0.04em",
    })
    const description = await el.$eval(
        "div:nth-child(19) > div > div > div > ul > li > span",
        (el) => el.textContent
    );
    productData.push(...productData, {
        name: "text content",
        type: "text",
        color: "#0a2449",
        text: description,
        fontSize: "28px",
        fontWeight: 400,
        lineHeight: "38px",
        letterSpacing: "0.01em",
    })
    const descriptionSvg = await el.$eval(
        "div:nth-child(12) > div > svg",
        (el) => el.outerHTML
    );
    const btnTxt = await el.$eval(
        "div:nth-child(18) > div > div > div > p > span",
        (el) => el.textContent
    );
    productData.push(...productData, {
        name: "Button Text",
        type: "text",
        color: "#ffffff",
        text: btnTxt,
        fontSize: "37px",
        fontWeight: 700,
        lineHeight: "42px",
        letterSpacing: "0.01em",
    })
    const btnSvg = await el.$eval(
        "div:nth-child(4) > div > svg",
        (el) => el.outerHTML
    );
    const btnPlayIcon = await el.$eval(
        "div:nth-child(13) > div > div.a26Xuw > div > div > div > img",
        (el) => el.src
    );
    productData.push(...productData, {
        src: btnPlayIcon,
        text: "Button Play Image",
        type: "image",
        width: "19px",
        height: '24px',
        x: "-1.77636e-15",
        y: "0",
    })
    const imgUrl = await el.$eval(
        "div:nth-child(9) > div > div.hWv4NA > div:nth-child(4) > div > div > img",
        (el) => el.src
    );
    productData.push(...productData, {
        src: imgUrl,
        text: "Image",
        type: "image",
        width: "775.335px",
        height: '514.629px',
        x: "250",
        y: "250",
    })
    const halfCircleUrl = await el.$eval(
        "div:nth-child(8) > div > div.a26Xuw > div > div > div > img",
        (el) => el.src
    );
    productData.push(...productData, {
        src: halfCircleUrl,
        text: "Modern Geo Semicircle",
        type: "image",
        width: "874px",
        height: '437px',
        x: "0",
        y: "0",
    })
    const halfCircleLineUrl = await el.$eval(
        "div:nth-child(10) > div > div.a26Xuw > div > div > div > img",
        (el) => el.src
    );
    productData.push(...productData, {
        src: halfCircleLineUrl,
        text: "Half Circle Line Art",
        type: "image",
        width: "792px",
        height: '403px',
        x: "0",
        y: "0",
    })

    [imgUrl, btnPlayIcon].forEach((img) => {
      pages[0].image.width = "100%";
      pages[0].image.height = "100%";
      pages[0].image.title = "";
      pages[0].image.Elements.forEach((element) => {
        element.config.src = img;
        element.height = "514.629px";
        element.width = "775.335px";
        element.text = "Image";
        element.type = "image";
        element.x = "387.667";
        element.y = "257.314";
      });
    });

    productData.push({
      title: title + " " + txt,
      webUrl,
      imgUrl,
      brand,
      description,
      descriptionSvg,
      btnTxt,
      btnSvg,
      btnPlayIcon,
    });
    console.log(productData);
    console.log(pages);
  });
