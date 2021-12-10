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

// partOne();
// guessed 1797 - too high

// part two
function partTwo() {
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

    let lowPointCoordinates = [];

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


        if (lowest) {
          lowPointCoordinates.push([i, j]);
        }
      }
    }

    console.log({ lowPointCoordinates });
    lowPointCoordinates = [ [ 0, 1 ] ]; // TODO delete me - just work on one for now

    let coordinateSizes = [];
    for(let x = 0; x < lowPointCoordinates.length; x++) {
      coordinateSizes.push(check(lowPointCoordinates[x]));
    }

    console.log({ coordinateSizes });
    // TODO sort, take top 3, then sum

    function check(coordinate, floodedCoordinates = []) {
      const [i, j] = coordinate;

      if (i === 0 && j === 0) {
        debugger;
      }

      // break condition
      // we've already seen this before so don't recalculate
      if (floodedCoordinates.find(known => (known[0] == i && known[1] === j))) {
        return floodedCoordinates;
      } else {
        floodedCoordinates.push(coordinate);
      }

      // left
      if (j - 1 >= 0) {
        if (floorArray[i][j - 1] !== 9) {
          return check([i, j - 1], floodedCoordinates);
        }
      // top
      } else if (i - 1 >= 0) {
        if (floorArray[i - 1][j] !== 9) {
          return check([i - 1, j], floodedCoordinates);
        }
      // right
      } else if (j < floorArray[0].length - 1) {
        if (floorArray[i][j + 1] !== 9) {
          return check([i, j + 1], floodedCoordinates);
        }
      // bottom
      } else if (i < floorArray.length - 1) {
        if (floorArray[i + 1][j] !== 9) {
          return check([i + 1, j], floodedCoordinates);
        }
      }

      return floodedCoordinates;
    }
  });
}

partTwo();