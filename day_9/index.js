const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneExampleInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    // parse floor
    const floorArray = [];
    data.split("\n").forEach((line) => {
      floorArray.push(line.split("").map(i => parseInt(i)));
    });

    console.log({ floorArray });

    let lowPoints = [];

    // find low points
    for(let i = 0; i < floorArray.length; i++) {
      for (let j = 0; j < floorArray[0].length; j++) {

        const floorCell = floorArray[i][j];
        // left
        let leftFloorCell = j > 0 && floorArray[i][j - 1];
        if (leftFloorCell !== 0) { // we check false explicitly because in JS 0 is falsey
          leftFloorCell = 10;
        }
        // right
        let rightFloorCell = j < floorArray[i].length && floorArray[i][j + 1];
        if (rightFloorCell === false) {
          rightFloorCell = 10;
        }
        // top
        let topFloorCell = i > 0 && floorArray[i - 1][j];
        if (topFloorCell === false) {
          topFloorCell = 10;
        }
        // bottom
        let bottomFloorCell = i < floorArray.length - 1 && floorArray[i + 1][j];
        if (bottomFloorCell === false) {
          bottomFloorCell = 10;
        }

        if (i === 0 && j === 9) {
          debugger;
        }

        if (floorCell < leftFloorCell && floorCell < rightFloorCell && floorCell < topFloorCell && floorCell < bottomFloorCell) {
          lowPoints.push(floorCell);
        }
      }
    }

    console.log({ lowPoints });

    // sum of low points
  });
}

partOne();