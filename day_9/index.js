const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

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
        
        let lowest = true;

        // left
        if (j - 1 >= 0) {
          if (floorArray[i][j - 1] <= floorCell) {
            lowest = false;
          }
        }
        // top
        if (i - 1 >= 0) {
          if (floorArray[i - 1][j] <= floorCell) {
            lowest = false;
          }
        }
        // right
        if (j < floorArray[0].length - 1) {
          if (floorArray[i][j + 1] <= floorCell) {
            lowest = false;
          }
        }
        // bottom
        if (i < floorArray.length - 1) {
          if (floorArray[i + 1][j] <= floorCell) {
            lowest = false;
          }
        }

        if (lowest) {
          debugger;
          lowPoints.push(floorCell);
        }
      }
    }

    console.log({ lowPoints });

    // sum of low points
    const sum = lowPoints.reduce((agg, point) => {
      return agg += point + 1; // "risk level"
    }, 0);

    console.log({ sum });
  });
}

partOne();
// guessed 1797 - too high