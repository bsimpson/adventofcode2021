const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    const crabArmy = data.split(",").map(i => parseInt(i));
    const crabArmyMin = Math.min(...crabArmy);
    const crabArmyMax = Math.max(...crabArmy);

    console.log({ crabArmyMin, crabArmyMax });

    // cant use reduce because the ideal spot could be in between
    // current positions - so we have more entries than crabs
    let allFuelUsed = {};

    for(let i = crabArmyMin; i <= crabArmyMax; i++) {

      const fuelUsed = crabArmy.reduce((agg, crab) => {
        if (crab > i) {
          agg += crab - i;
        } else {
          agg += i - crab;
        }

        return agg;
      }, 0);

      allFuelUsed[i] = fuelUsed;
    }

    console.log({ allFuelUsed });

    const leastFuel = Object.keys(allFuelUsed).reduce((min, key) => {
      if (allFuelUsed[key] < min) {
        min = allFuelUsed[key];
      }

      return min;
    }, allFuelUsed[crabArmyMin]);

    console.log({ leastFuel });
    console.log(Object.keys(allFuelUsed).length);
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

    const crabArmy = data.split(",").map(i => parseInt(i));
    const crabArmyMin = Math.min(...crabArmy);
    const crabArmyMax = Math.max(...crabArmy);

    console.log({ crabArmyMin, crabArmyMax });

    // cant use reduce because the ideal spot could be in between
    // current positions - so we have more entries than crabs
    let allFuelUsed = {};

    for(let i = crabArmyMin; i <= crabArmyMax; i++) {

      const fuelUsed = crabArmy.reduce((agg, crab) => {
        if (crab > i) {
          agg += triangleNumber(crab - i);
        } else {
          agg += triangleNumber(i - crab);
        }

        return agg;
      }, 0);

      allFuelUsed[i] = fuelUsed;
    }

    console.log({ allFuelUsed });

    const leastFuel = Object.keys(allFuelUsed).reduce((min, key) => {
      if (allFuelUsed[key] < min) {
        min = allFuelUsed[key];
      }

      return min;
    }, allFuelUsed[crabArmyMin]);

    console.log({ leastFuel });
    console.log(Object.keys(allFuelUsed).length);
  });
}

// "add"-torial
// like factorial but with addition
// http://theflyingkeyboard.net/algorithms/javascript-triangle-number/
function triangleNumber(n) {
  return (n * (n + 1)) / 2;
}

partTwo();