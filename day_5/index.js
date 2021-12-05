const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    // parse coordinates
    const coordinates = data.split("\n").map((row) => {
      const pairs = row.split(" -> ");
      return pairs.map(pair => pair.split(",").map(i => parseInt(i)));
    });

    // find max x and y to build grid
    let maxX = 0;
    coordinates.forEach(coordinatePair => {
      coordinatePair.forEach((coordinate => {
        if (maxX < coordinate[0]) {
          maxX = coordinate[0];
        }
      }));
    });

    let maxY = 0;
    coordinates.forEach(coordinatePair => {
      coordinatePair.forEach((coordinate => {
        if (maxY < coordinate[1]) {
          maxY = coordinate[1];
        }
      }));
    });

    console.log({ maxX, maxY });

    let grid = Array.from({ length: maxX + 1 }, () => {
      return Array.from({ length: maxY + 1 }, () => 0);
    });

    console.log({ grid });

    // draw line
    for (x = 0; x < coordinates.length; x++) {
      const coordinatePair = coordinates[x];
      let [x1, x2, y1, y2] = [coordinatePair[0][0], coordinatePair[1][0], coordinatePair[0][1], coordinatePair[1][1]];
      console.log({ x1, y1, x2, y2 });

      // "only consider horizontal and vertical lines"
      if (x1 === x2 || y1 === y2) {
        // which direction are we moving?
        if (x1 !== x2) {
          // horizontal
          let linePoint = Math.min(x1, x2);
          while (linePoint <= Math.max(x1, x2)) {
            grid[y1][linePoint]++;
            linePoint++;
          }
        } else {
          // vertical
          let linePoint = Math.min(y1, y2);
          while (linePoint <= Math.max(y1, y2)) {
            grid[linePoint][x1]++;
            linePoint++;
          }
        }
      }
    }

    console.log({ grid });

    const dangerousAreas = grid.reduce((agg, row) => {
      row.forEach((cell) => {
        if (cell > 1) {
          agg++;
        }
      });

      return agg;
    }, 0);

    console.log({ dangerousAreas });
  });
}

// partOne();

// part two
function partTwo() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    // parse coordinates
    const coordinates = data.split("\n").map((row) => {
      const pairs = row.split(" -> ");
      return pairs.map(pair => pair.split(",").map(i => parseInt(i)));
    });

    // find max x and y to build grid
    let maxX = 0;
    coordinates.forEach(coordinatePair => {
      coordinatePair.forEach((coordinate => {
        if (maxX < coordinate[0]) {
          maxX = coordinate[0];
        }
      }));
    });

    let maxY = 0;
    coordinates.forEach(coordinatePair => {
      coordinatePair.forEach((coordinate => {
        if (maxY < coordinate[1]) {
          maxY = coordinate[1];
        }
      }));
    });

    console.log({ maxX, maxY });

    let grid = Array.from({ length: maxX + 1 }, () => {
      return Array.from({ length: maxY + 1 }, () => 0);
    });

    console.log({ grid });

    // draw line
    // can't use for in because of flattening
    for (x = 0; x < coordinates.length; x++) {
      const coordinatePair = coordinates[x];
      let [x1, x2, y1, y2] = [coordinatePair[0][0], coordinatePair[1][0], coordinatePair[0][1], coordinatePair[1][1]];
      console.log({ x1, y1, x2, y2 });

      // straight lines
      if (x1 === x2 || y1 === y2) {
        // which direction are we moving?
        if (x1 !== x2) {
          // horizontal
          let linePoint = Math.min(x1, x2);
          while (linePoint <= Math.max(x1, x2)) {
            grid[y1][linePoint]++;
            linePoint++;
          }
        } else {
          // vertical
          let linePoint = Math.min(y1, y2);
          while (linePoint <= Math.max(y1, y2)) {
            grid[linePoint][x1]++;
            linePoint++;
          }
        }
      // diagonal lines
      // 0,9 -> 5,9 right
      // 8,0 -> 0,8 down left
      // 9,4 -> 3,4 left
      // 2,2 -> 2,1 up
      // 7,0 -> 7,4 down
      // 6,4 -> 2,0 up left
      // 0,9 -> 2,9 right
      // 3,4 -> 1,4 left
      // 0,0 -> 8,8 up right
      // 5,5 -> 8,2 left down
      } else {
        const leftCoordinate = coordinatePair[0];
        const rightCoordinate = coordinatePair[1];

        let stepX = 0;
        let stepY = 0;

        // increment starting point
        // grid[leftCoordinate[1]][leftCoordinate[0]]++;

        // up
        if (leftCoordinate[1] > rightCoordinate[1]) {
          // left
          if (leftCoordinate[0] > rightCoordinate[0]) {
            while(leftCoordinate[1] + stepY >= rightCoordinate[1]) {
              grid[leftCoordinate[1] + stepY][leftCoordinate[0] + stepX]++;
              stepX--;
              stepY--;
            }
          // right
          } else {
            while(leftCoordinate[1] + stepY >= rightCoordinate[1]) {
              grid[leftCoordinate[1] + stepY][leftCoordinate[0] + stepX]++;
              stepX++;
              stepY--;
            }
          }
        // down
        } else {
          // left
          if (leftCoordinate[0] > rightCoordinate[0]) {
            while(leftCoordinate[1] + stepY <= rightCoordinate[1]) {
              grid[leftCoordinate[1] + stepY][leftCoordinate[0] + stepX]++;
              stepX--;
              stepY++;
            }
          // right
          } else {
            while(leftCoordinate[1] + stepY <= rightCoordinate[1]) {
              grid[leftCoordinate[1] + stepY][leftCoordinate[0] + stepX]++;
              stepX++;
              stepY++;
            }
          }
        }
      }
    }

    console.log({ grid });

    const dangerousAreas = grid.reduce((agg, row) => {
      row.forEach((cell) => {
        if (cell > 1) {
          agg++;
        }
      });

      return agg;
    }, 0);

    console.log({ dangerousAreas });
  });
}

partTwo();