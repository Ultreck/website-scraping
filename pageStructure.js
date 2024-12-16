function createTextStructure(data) {
  return {
    config: { name: data?.text || "" },
    height: `${data.height}px` || "",
    id: crypto.randomUUID(),
    rotate: 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      color: data.color || "#000000",
      fontSize: data.fontSize || "",
      fontWeight: data.fontWeight || 400,
      letterSpacing: data.letterSpacing || "0px",
      lineHeight: data.lineHeight || "1",
      opacity: 1,
      shadow: "",
      textAlign: "left",
    },
    text: data.text || "",
    type: data.type || "text",
    width: `${data.width}px` || "",
    x: data.coordinates.x || 0,
    y: data.coordinates.y || 0,
  };
}
function createChartStructure() {
  return {
    config: {
      backgroundColor: "#000",
      backgroundImage: null,
      config: {
        bars: 5,
        color: [
          "#E66B5B",
          "#1D9085",
          "#264A5A",
          "#E8C22C",
          "#F6881F",
          "#E66B5B",
          "#1D9085",
          "#264A5A",
          "#E8C22C",
          "#F6881F",
        ],
        data: [],
        gradientColor: "#FFFFFF",
        keys: { x: "name", y: "value" },
        name: "",
        showLegend: false,
        useGradient: false,
        styles: {
          fontFamily: "Roboto",
          fontSize: "14px",
          fontWeight: "normal",
          padding: "5px",
          textAlign: "left",
        },
      },
      fontWeight: "normal",
      textAlign: "left",
      textDecoration: "none",
      textTransform: "none",
    },
    height: "",
    id: crypto.randomUUID(),
    rotate: 0,
    style: {},
    text: "",
    type: "chart",
    width: "",
    x: 0,
    y: 0,
  };
}

function createImageStructure(data) {
  console.log(data);
  return {
    config: { src: data.imageSrc || "" },
    height: `${data.imgStyle.height}px` || "",
    id: crypto.randomUUID(),
    rotate: 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      color: "#000000",
      borderRadius: data.imgStyle.borderRadius || 0,
      borderWidth: data.imgStyle.borderWidth || 0,
      opacity: 1,
      shadow: "",
    },
    text: data.textAlt || "",
    type: data.type || "image",
    width: `${data.imgStyle.width}px` || "",
    x: data.coordinates.x || 0,
    y: data.coordinates.y || 0,
  };
}

function createFrameStructure(data, children) {
  return {
    // children: [
    //   {
    //     config: { src: children[0].src || "" },
    //     height: children[0].height || "",
    //     id: crypto.randomUUID(),
    //     rotate: 0,
    //     style: {
    //       animationDuration: "1s",
    //       animationName: "",
    //       color: "#000000",
    //       borderRadius: 0,
    //       borderWidth: 0,
    //       opacity: 1,
    //       shadow: "",
    //     },
    //     text: children[0].text || "",
    //     type: children[0].type || "image",
    //     width: children[0].width || "",
    //     x: children[0].x || 0,
    //     y: children[0].y || 0,
    //   },
    // ],
    config: { name: data.name || "", clipPath: data.clipPath || "" },
    height: `${data.position.height}` || 300,
    id: data.id || crypto.randomUUID(),
    rotate: data.rotate || 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      opacity: 1,
      order: null,
      shadow: "",
    },
    text: data.text || "",
    tooltip: data.tooltip || {},
    type: data.type || "frame",
    width: `${data.position.width}` || "",
    background: data.bg || "",
    x: data.position.x || 0,
    y: data.position.y || 0,
  };
}

function createShapeStructure(data) {
  return {
    config: { name: "" },
    height: "",
    id: crypto.randomUUID(),
    rotate: 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      background: "#ddd",
      borderColor: "#000000",
      borderRadius: 0,
      borderWidth: 0,
      opacity: 1,
      order: null,
      shadow: "",
    },
    text: "",
    type: "shape",
    width: "",
    x: 0,
    y: 0,
  };
}

module.exports = {
  createTextStructure,
  createImageStructure,
  createFrameStructure,
  createChartStructure,
  createShapeStructure,
};
