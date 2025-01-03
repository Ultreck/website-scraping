const determineShape = require("./components/clipPathFunction");

function createTextStructure(data) {
  return {
    config: {name: data?.text || "" },
    height: `${data.height}` || "",
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
      shadow: data?.shadow || "",
      textAlign: "left",
      textTransform: data.textTransform || "uppercase",
      listStyleType: data.listStyleType || "none",
    },
    text: data.text || "",
    type: data.type || "text",
    width: `${data.width}` || "",
    x: data?.coordinates?.x || 0,
    y: data?.coordinates?.y || 0,
  };
}

function createListStructure(data) {
    return {
    config: {
      name: "list",
      texts: data?.listItems,
      type: "text",
    },
    height: data.height || "",
    id: crypto.randomUUID(),
    rotate: data.rotate || 0,
    style: {
      animationDuration: "1s",
      animationName: "",
      color: data.color || "#000000",
      fontSize: data.fontSize || "",
      fontWeight: data.fontWeight || 400,
      letterSpacing: data.letterSpacing || "0px",
      lineHeight: data.lineHeight || "1",
      opacity: 1,
      oder: null,
      shadow: data?.shadow || "",
      textAlign: "left",
      textTransform: data.textTransform || "none",
      listStyleType: data.listStyleType || "none",
    },
    text: "List",
    type: "text",
    width: data.width ||"",
    x: data.coordinates.x || 0,
    y: data.coordinates.y || 0,
  };
}

function createImageStructure(data) {
  return {
    type: "image",
    text: "Image",
    width: `${data.width}` || "",
    height: `${data.height}` || "",
    style: {
      animationDuration: "1s",
      animationName: "",
      color: "#000000",
      borderRadius: data.borderRadius || 0,
      borderWidth: data.borderWidth || 0,
      opacity: 1,
      shadow: data?.shadow || "",
    },
    config: { src: data.src || "" },
    x: data.coordinates.x || 0,
    y: data.coordinates.y || 0,
    rotate: data.rotate || 0,
    id: crypto.randomUUID(),
  };
}

function createFrameStructure(data, children) {
  return {
    type: "frame",
    text: `Frame ${determineShape(data.clipPath.path).split("-")[1]}`,
    width: `${data.width}` || 300,
    height: `${data.height}` || 300,
    children: children? [
      children
    ] : [],
    style: {
      order: null,
      opacity: 1,
      animationName: "",
      animationDuration: "1s",
      shadow: data?.shadow ||"",
      background: data.clipPath.background || "",
    },
    config: { name: `shape-${determineShape(data.clipPath.path)}`, clipPath: data.clipPath.path || "" },
    tooltip: data.tooltip || { "enabled": false},
    x: data.coordinates.x || 0,
    y: data.coordinates.y || 0,
    rotate: data.rotate || 0,
    id: data.id || crypto.randomUUID(),
  };
}

// function createShapeStructure(data) {
//   return {
//     config: { name: "" },
//     height: "",
//     id: crypto.randomUUID(),
//     rotate: 0,
//     style: {
//       animationDuration: "1s",
//       animationName: "",
//       background: "#ddd",
//       borderColor: "#000000",
//       borderRadius: 0,
//       borderWidth: 0,
//       opacity: 1,
//       order: null,
//       shadow: "",
//     },
//     text: "",
//     type: "shape",
//     width: "",
//     x: 0,
//     y: 0,
//   };
// }

module.exports = {
  createTextStructure,
  createImageStructure,
  createFrameStructure,
  createListStructure
};
