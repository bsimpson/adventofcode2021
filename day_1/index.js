const fs = require("fs");

// part one
const FILENAME = "./partOneInput";

fs.readFile(FILENAME, "utf-8", (err, data) => {
  if (err) {
    console.error(error);
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

// part two