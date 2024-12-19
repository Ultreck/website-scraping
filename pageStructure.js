function createTextStructure(data) {
  return {
    config: { name: data?.text || "" },
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
    },
    text: data.text || "",
    type: data.type || "text",
    width: `${data.width}` || "",
    x: data?.coordinates?.x || 0,
    y: data?.coordinates?.y || 0,
  };
}

// function createChartStructure() {
//   return {
//     config: {
//       backgroundColor: "#000",
//       backgroundImage: null,
//       config: {
//         bars: 5,
//         color: [
//           "#E66B5B",
//           "#1D9085",
//           "#264A5A",
//           "#E8C22C",
//           "#F6881F",
//           "#E66B5B",
//           "#1D9085",
//           "#264A5A",
//           "#E8C22C",
//           "#F6881F",
//         ],
//         data: [],
//         gradientColor: "#FFFFFF",
//         keys: { x: "name", y: "value" },
//         name: "",
//         showLegend: false,
//         useGradient: false,
//         styles: {
//           fontFamily: "Roboto",
//           fontSize: "14px",
//           fontWeight: "normal",
//           padding: "5px",
//           textAlign: "left",
//         },
//       },
//       fontWeight: "normal",
//       textAlign: "left",
//       textDecoration: "none",
//       textTransform: "none",
//     },
//     height: "",
//     id: crypto.randomUUID(),
//     rotate: 0,
//     style: {},
//     text: "",
//     type: "chart",
//     width: "",
//     x: 0,
//     y: 0,
//   };
// }

function createImageStructure(data) {
  console.log(data);
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
    rotate: 0,
    id: crypto.randomUUID(),
  };
}

function createFrameStructure(data, children) {
  return {
    text: "Frame rectangle",
    type: "frame",
    width: `${data.clipPath.width}` || "",
    height: `${data.clipPath.height}` || 300,
    children: [
      children
    ],
    style: {
      animationDuration: "1s",
      animationName: "",
      opacity: 1,
      order: null,
      shadow: data?.shadow ||"",
      background: data.clipPath.background || "",
    },
    config: { name: data.clipPath.name || "shape-", clipPath: data.clipPath.path || "" },
    tooltip: data.tooltip || {},
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
  // createChartStructure,
  // createShapeStructure,
};
