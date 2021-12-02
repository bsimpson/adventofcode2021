const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    let horizontal = 0;
    let depth = 0;

    // e.g. forward 5
    data.split("\n").forEach((movement) => {
      // position = forward
      // amount = 5
      let [position, amount] = movement.split(" ");
      amount = parseInt(amount);

      switch(position) {
        case "forward":
          horizontal += amount;
          break;
        case "up":
          depth -= amount;
          break;
        case "down":
          depth += amount;
          break;
        default:
          throw `Unknown position: ${position}`;
      }
    });

    console.log({ horizontal, depth });
    console.log(horizontal * depth);
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

    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    // e.g. forward 5
    data.split("\n").forEach((movement) => {
      // position = forward
      // amount = 5
      let [position, amount] = movement.split(" ");
      amount = parseInt(amount);

      switch(position) {
        case "forward":
          horizontal += amount;
          depth += (aim * amount);
          break;
        case "up":
          aim -= amount;
          break;
        case "down":
          aim += amount;
          break;
        default:
          throw `Unknown position: ${position}`;
      }
    });

    console.log({ horizontal, depth, aim });
    console.log(horizontal * depth);
  });
}

partTwo();