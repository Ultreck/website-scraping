function createTextStructure(data) {
  return {
    config: { name: data?.name || "" },
    height: "",
    id: "",
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
    type: data.type || "",
    width: "",
    x: 0,
    y: 0,
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
    id: "",
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
  return {
    config: { src: data.src || "" },
    height: data.height || "",
    id: "",
    rotate: 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      color: "#000000",
      borderRadius: 0,
      borderWidth: 0,
      opacity: 1,
      shadow: "",
    },
    text: data.text || "",
    type: data.type || "image",
    width: data.width || "",
    x: data.x || 0,
    y: data.y || 0,
  };
}

function createFrameStructure(data, children) {
  return {
    children: [
      {
        config: { src: children[0].src || "" },
        height: children[0].height || "",
        id: "",
        rotate: 0,
        style: {
          animationDuration: "1s",
          animationName: "",
          color: "#000000",
          borderRadius: 0,
          borderWidth: 0,
          opacity: 1,
          shadow: "",
        },
        text: children[0].text || "",
        type: children[0].type || "image",
        width: children[0].width || "",
        x: children[0].x || 0,
        y: children[0].y || 0,
      }
    ],
    config: { name: data.name || "", clipPath: data.clipPath || ""},
    height: data.height || 300,
    id: data.id || "",
    rotate: 0,
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
    width: data.width || "",
    x: data.x || 0,
    y: data.y || 0,
  };
}

function createShapeStructure(data) {
  return {
    config: { name: "" },
    height: "",
    id: "",
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
