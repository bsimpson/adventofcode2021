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
        if (i < floorArray.length - 1) {
          if (floorArray[i + 1][j] <= floorCell) {
            lowest = false;
          }
        }

        if (lowest) {
          debugger;
          lowPointCoordinates.push([i,j]);
        }
      }
    }

    // console.log({ lowPointCoordinates });

    let coordinateSizes = [];
    for(let x = 0; x < lowPointCoordinates.length; x++) {
      coordinateSizes.push(check(lowPointCoordinates[x]));
    }

    // console.log({ coordinateSizes });

    // sort, take top 3, then sum
    // goddamnit it I hate you Javascript sort()
    const sorted = coordinateSizes.map(x => x.length).sort((a,b) => b - a);
    const sliced = sorted.slice(0, 3);
    const reduced = sliced.reduce((agg, n) => {
      return agg * n;
    }, 1);

    console.log({ sorted, sliced, reduced });


    function check(coordinate, floodedCoordinates = []) {
      const [i, j] = coordinate;

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
          floodedCoordinates = check([i, j - 1], floodedCoordinates);
        }
      }
      // top
      if (i - 1 >= 0) {
        if (floorArray[i - 1][j] !== 9) {
          floodedCoordinates = check([i - 1, j], floodedCoordinates);
        }
      }
      // right
      if (j < floorArray[0].length - 1) {
        if (floorArray[i][j + 1] !== 9) {
          floodedCoordinates = check([i, j + 1], floodedCoordinates);
        }
      }
      // bottom
      if (i < floorArray.length - 1) {
        if (floorArray[i + 1][j] !== 9) {
          floodedCoordinates = check([i + 1, j], floodedCoordinates);
        }
      }

      return floodedCoordinates;
    }
  });
}

partTwo();
// guessed 106392 which was too low