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


  function determineShape(clipPath) {
    if (!clipPath) return "unknown";

    if (/^M[0-9.,\-]+L[0-9.,\-]+Z$/.test(clipPath)) {
      return "rectangle";
    } else if (/C[0-9.,\-]+/.test(clipPath) && /M[0-9.,\-]+/.test(clipPath)) {
      if (/a[0-9.,\-]+/.test(clipPath)) {
        return "Circle";
      }
      if (/L[0-9.,\-]+/.test(clipPath)) {
        return "rectangle";
      }
    } else if (/L[0-9.,\-]+Z/.test(clipPath)) {
      const points = clipPath.split("L").length - 1;
      if (points === 3) return "triangle";
      if (points === 4) return "rhombus";
      if (points === 5) return "pentagon";
      if (points === 6) return "hexagon";
      if (points === 7) return "heptagon";
      if (points === 8) return "octagon";
    } else if (/M[0-9.,\-]+L[0-9.,\-]+L[0-9.,\-]+C[0-9.,\-]+/.test(clipPath)) {
      return "Heart";
    } else if (/M[0-9.,\-]+C[0-9.,\-]+/.test(clipPath)) {
      if (/arrow-left/.test(clipPath)) return "arrow-left";
      if (/arrow-right/.test(clipPath)) return "arrow-right";
      if (/arrow-up/.test(clipPath)) return "arrow-up";
      if (/arrow-down/.test(clipPath)) return "arrow-down";
    } else if (/Z.*M/.test(clipPath)) {
      if (/four-pointed-star/.test(clipPath)) return "four-pointed-star";
      if (/five-pointed-star/.test(clipPath)) return "five-pointed-star";
      if (/six-pointed-star/.test(clipPath)) return "six-pointed-star";
      if (/eight-pointed-star/.test(clipPath)) return "eight-pointed-star";
    } else if (/L.*L.*C.*/.test(clipPath)) {
      if (/parallelogram/.test(clipPath)) return "parallelogram";
      if (/trapezoid/.test(clipPath)) return "trapezoid";
    } else if (/M.*L.*C.*L/.test(clipPath)) {
      if (/chevron-left/.test(clipPath)) return "chevron-left";
      if (/chevron-right/.test(clipPath)) return "chevron-right";
    } else if (/M.*L.*Q.*L/.test(clipPath)) {
      return "bevel";
    }
  
    return "Unknown";
  }
  
  
module.exports = determineShape;
  