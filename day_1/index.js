const fs = require("fs");

// part one
function partOne() {
const FILENAME = "./partOneInput";

fs.readFile(FILENAME, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return
  }

  const depths = data.split("\n").map((value) => parseInt(value));
  let numberOfTimesDepthIncreased = 0;

  depths.forEach((currentDepth, index) => {
    if (index == 0) {
      return; // no continue in forEach
    }

    if (currentDepth > depths[index - 1]) {
      numberOfTimesDepthIncreased++;
    }
  }, depths[0]);

  console.log(numberOfTimesDepthIncreased);
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

  // Note that that the example file has A-H annotations
  // These are stripped out when we parseInt so no additional transforms needed
  const depths = data.split("\n").map((value) => parseInt(value));
  let numberOfTimesDepthIncreased = 0;

  depths.forEach((currentDepth, index) => {
    // if (index == 0) {
    //   return; // no continue in forEach
    // }

    const threeMeasurementWindow = depths.slice(index, index + 3);
    const previousThreeMeasurementWindow = depths.slice(index - 1, index + 2);

    // when we don't have enough data to compare
    if (threeMeasurementWindow.length !== 3 || previousThreeMeasurementWindow.length !== 3) {
      return;
    }

    if (threeMeasurementWindow.reduce((agg, i) => agg + i) > previousThreeMeasurementWindow.reduce((agg, i) => agg + i)) {
      numberOfTimesDepthIncreased++;
    }
  });

  console.log(numberOfTimesDepthIncreased);
});
}

partTwo();