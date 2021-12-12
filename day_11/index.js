import * as fs from 'fs';

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    const octopusArray = data.split("\n").map((line) => {
      return line.split("").map(i => parseInt(i));
    });

    const maxX = octopusArray[0].length - 1;
    const maxY = octopusArray.length - 1;
    let totalFlashes = 0;

    const STEP = 100000000;

    for(let step = 0; step <= STEP; step++) {

      let alreadyFlashed = [];
      console.log({ step, octopusArray, totalFlashes });

      for(let x = 0; x <= maxX; x++) {
        for(let y = 0; y <= maxY; y++) {
          // increase the grid by 1 if we haven't already flashed
          if (!alreadyFlashed.find(([foundX, foundY]) => x === foundX && y === foundY)) {
            octopusArray[x][y]++;
          }

          // flash > 9
          if (octopusArray[x][y] > 9) {
            flash(x,y);
          }
        }
      }

      function flash(x, y) {
        totalFlashes++;
        alreadyFlashed.push([x, y]);
        octopusArray[x][y] = 0;
        let octopusNeighbors = [];

        // increment and flash neighbors
        // right
        if (y + 1 <= maxY) {
          octopusNeighbors.push([x, y + 1]);
        }
        // left
        if (y - 1 >= 0) {
          octopusNeighbors.push([x, y - 1]);
        }
        // down
        if (x + 1 <= maxX) {
          octopusNeighbors.push([x + 1, y]);
        }
        // up
        if (x - 1 >= 0) {
          octopusNeighbors.push([x - 1, y]);
        }
        // up right
        if (x + 1 <= maxX && y - 1 >= 0) {
          octopusNeighbors.push([x + 1, y - 1]);
        }
        // down right
        if (x + 1 <= maxX && y + 1 <= maxY) {
          octopusNeighbors.push([x + 1, y + 1]);
        }
        // up left
        if (x - 1 >= 0 && y - 1 >= 0) {
          octopusNeighbors.push([x - 1, y - 1]);
        }
        // down left
        if (x - 1 >= 0 && y + 1 <= maxY) {
          octopusNeighbors.push([x - 1, y + 1]);
        }

        octopusNeighbors.map(([x, y]) => {
          if (alreadyFlashed.find(([foundX, foundY]) => x === foundX && y === foundY)) { // already flashed
            return
          }

          octopusArray[x][y]++; // increment
          if (octopusArray[x][y] > 9) { // flash
            flash(x, y);
          }
        });
      }

      let allZeroes = true;
      for(let x = 0; x <= maxX; x++) {
        for(let y = 0; y <= maxY; y++) {
          if (octopusArray[x][y] !== 0) {
            allZeroes = false;
          }
        }
      }

      if (allZeroes) {
        console.log(step + 1)
        return;
      }
    }
  });
}

partOne();