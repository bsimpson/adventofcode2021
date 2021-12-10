const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    // be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
    console.log({ data });

    let counts = {
      1: 0,
      4: 0,
      7: 0,
      8: 0,
    };

    data.split("\n").forEach((line) => {
      const [input, output] = line.split("|");
      const inputs = input.split(" ").filter(x => x);
      const outputs = output.split(" ").filter(x => x);

      // console.log({ inputs, outputs });

      /*
      1 => 2 -- unique!
      2 => 5
      3 => 5
      4 => 4 -- unique!
      5 => 5
      6 => 6
      7 => 3 -- unique!
      8 => 7 -- unique!
      9 => 6
      */
      outputs.reduce((agg, output) => {
        if (output.length === 2) {
          agg[1]++;
        } else if (output.length === 4) {
          agg[4]++;
        } else if (output.length === 3) {
          agg[7]++;
        } else if (output.length === 7) {
          agg[8]++;
        }
        return agg;
      }, counts);
    });

    console.log({ counts });
    console.log(Object.values(counts).reduce((agg, v) => agg += v));
  });
}

partOne();