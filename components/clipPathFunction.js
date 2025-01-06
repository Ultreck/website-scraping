function determineShape(clipPath) {
  if (!clipPath) return "unknown";

  // if (/a[0-9.,\-]+\s+[0-9.,\-]+\s+[0-9.,\-]+\s+[01]\s+[01]\s+[0-9.,\-]+/.test(clipPath)) {
  //   return "circle";
  // }

  // if (/M[0-9.,\-]+.*C[0-9.,\-]+.*Z/.test(clipPath) || /M[0-9.,\-]+.*a[0-9.,\-]+.*Z/.test(clipPath)) {
  //   return "rectangle";
  // }


  const isCircle = /C.*[0-9]+\s?,\s?[0-9]+.*[0-9]+.*Z$/i.test(clipPath);
  if (isCircle) return "circle";

  const isRoundedRectangle = /C.*[0-9]+\s?,\s?[0-9]+.*[0-9]+.*[0-9]+/i.test(clipPath);
  if (isRoundedRectangle) return "rectangle";

  if (/^M[0-9.,\-]+L[0-9.,\-]+Z$/.test(clipPath)) {
    return "rectangle";
  }

  return classifyClipPath(clipPath);
}

function classifyClipPath(clipPath) {
  const matches = clipPath.match(/([ML])([\d.,\-]+)/g);

  if (!matches) {
    return "unknown shape";
  }

  const points = matches
    .filter((cmd) => cmd.startsWith("M") || cmd.startsWith("L"))
    .map((cmd) => cmd.slice(1).split(",").map(Number));

  const isClosed = clipPath.includes("Z");

  if (!isClosed) {
    return "open path";
  }

  const uniquePoints = points.filter(
    (point, index, arr) =>
      index === arr.findIndex((p) => p[0] === point[0] && p[1] === point[1])
  );

  const numVertices = uniquePoints.length;

  // Determine shape based on the number of vertices
  switch (numVertices) {
    case 3:
      return "triangle";
    case 4:
      if (isRectangle(uniquePoints)) {
        return "rectangle";
      }
      return "rhombus";
    case 5:
      return "pentagon";
    case 6:
      return "hexagon";
    case 7:
      return "heptagon";
    case 8:
      return "octagon";
    default:
      return `polygon with ${numVertices} sides`;
  }
}

function isRectangle(points) {
  if (points.length !== 4) return false;

  const [p1, p2, p3, p4] = points;

  const distances = [
    distance(p1, p2),
    distance(p2, p3),
    distance(p3, p4),
    distance(p4, p1),
  ];

  return (
    distances[0] === distances[2] &&
    distances[1] === distances[3] &&
    isRightAngle(p1, p2, p3) &&
    isRightAngle(p2, p3, p4)
  );
}

function distance(point1, point2) {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)
  );
}

function isRightAngle(p1, p2, p3) {
  const dotProduct =
    (p2[0] - p1[0]) * (p3[0] - p2[0]) + (p2[1] - p1[1]) * (p3[1] - p2[1]);
  return Math.abs(dotProduct) < 1e-10; // Close to zero
}

module.exports = determineShape;


















// const determineShape = (clipPath) => {
//     if (!clipPath) return "Unknown";

//     // Check for patterns in the path
//     if (/^M[0-9.,\-]+L[0-9.,\-]+Z$/.test(clipPath)) {
//       return "rectangle";
//     } else if (/C[0-9.,\-]+/.test(clipPath) && /M[0-9.,\-]+/.test(clipPath)) {
//       if (/a250/.test(clipPath) || /500/.test(clipPath)) {
//         return "circle";
//       }
//       if (/L[0-9.,\-]+/.test(clipPath)) {
//         return "rectangle";
//       }
//     } else if (/L/.test(clipPath)) {
//       return "polygon";
//     }

//     return "Unknown";
//   }

//   module.exports = determineShape;

// else if (/L[0-9.,\-]+Z/.test(clipPath)) {
//     const points = clipPath.split("L").length - 1;

//     // Dynamically determine the polygon name based on the number of points
//     const polygonNames = {
//       3: "Triangle",
//       4: "Quadrilateral",
//       5: "Pentagon",
//       6: "Hexagon",
//       7: "Heptagon",
//       8: "Octagon",
//       9: "Nonagon",
//       10: "Decagon",
//       11: "Hendecagon",
//       12: "Dodecagon",
//       13: "Tridecagon",
//       14: "Tetradecagon",
//       15: "Pentadecagon",
//       16: "Hexadecagon",
//       17: "Heptadecagon",
//       18: "Octadecagon",
//       19: "Enneadecagon",
//       20: "Icosagon",
//       // Add more names if needed
//     };

//     if (polygonNames[points]) {
//       return polygonNames[points];
//     } else if (points > 20) {
//       return `${points}-gon`; // Use generic naming for polygons with more than 20 sides
//     }
//   }

// function determineShape(clipPath) {
//   if (!clipPath) return "unknown";

//   if (/^M[0-9.,\-]+L[0-9.,\-]+Z$/.test(clipPath)) {
//     return "rectangle";
//   } else if (/C[0-9.,\-]+/.test(clipPath) && /M[0-9.,\-]+/.test(clipPath)) {
//     if (/a[0-9.,\-]+/.test(clipPath)) {
//       return "Circle";
//     }
//     if (/L[0-9.,\-]+/.test(clipPath)) {
//       return "round-rectangle";
//     }
//   } else if (clipPath.match(/([MLZ])([\d.,\-]+)/g)) {
//     return classifyClipPath(clipPath);
//   } else if (/M[0-9.,\-]+L[0-9.,\-]+L[0-9.,\-]+C[0-9.,\-]+/.test(clipPath)) {
//     return "Heart";
//   } else if (/M[0-9.,\-]+C[0-9.,\-]+/.test(clipPath)) {
//     if (/arrow-left/.test(clipPath)) return "arrow-left";
//     if (/arrow-right/.test(clipPath)) return "arrow-right";
//     if (/arrow-up/.test(clipPath)) return "arrow-up";
//     if (/arrow-down/.test(clipPath)) return "arrow-down";
//   } else if (/Z.*M/.test(clipPath)) {
//     if (/four-pointed-star/.test(clipPath)) return "four-pointed-star";
//     if (/five-pointed-star/.test(clipPath)) return "five-pointed-star";
//     if (/six-pointed-star/.test(clipPath)) return "six-pointed-star";
//     if (/eight-pointed-star/.test(clipPath)) return "eight-pointed-star";
//   } else if (/L.*L.*C.*/.test(clipPath)) {
//     if (/parallelogram/.test(clipPath)) return "parallelogram";
//     if (/trapezoid/.test(clipPath)) return "trapezoid";
//   } else if (/M.*L.*C.*L/.test(clipPath)) {
//     if (/chevron-left/.test(clipPath)) return "chevron-left";
//     if (/chevron-right/.test(clipPath)) return "chevron-right";
//   } else if (/M.*L.*Q.*L/.test(clipPath)) {
//     return "bevel";
//   }

//   return "circle";
// }

// module.exports = determineShape;

// function classifyClipPath(clipPath) {
//   const matches = clipPath.match(/([MLZ])([\d.,\-]+)/g);

//   if (!matches) {
//     return "Unknown shape";
//   }
//   const points = matches
//     .filter((cmd) => cmd.startsWith("M") || cmd.startsWith("L"))
//     .map((cmd) => cmd.slice(1).split(",").map(Number));
//   const isClosed = clipPath.includes("Z");
//   if (!isClosed) {
//     return "Unknown shape (open path)";
//   }
//   const uniquePoints = points.filter(
//     (point, index, arr) =>
//       index === arr.findIndex((p) => p[0] === point[0] && p[1] === point[1])
//   );
//   const numVertices = uniquePoints.length;
//   switch (numVertices) {
//     case 3:
//       return "triangle";
//     case 4:
//       if (isRectangle(uniquePoints)) {
//         return "rectangle";
//       }
//       return "rhombus";
//     case 5:
//       return "pentagon";
//     case 6:
//       return "hexagon";
//     case 7:
//       return "heptagon";
//     case 8:
//       return "octagon";
//     default:
//       return `polygon with ${numVertices} sides`;
//   }
// }
// function isRectangle(points) {
//   if (points.length !== 4) return false;

//   const distances = points.map((point, i) => {
//     const nextPoint = points[(i + 1) % points.length];
//     return Math.sqrt(
//       Math.pow(nextPoint[0] - point[0], 2) +
//         Math.pow(nextPoint[1] - point[1], 2)
//     );
//   });
//   return distances[0] === distances[2] && distances[1] === distances[3];
// }
