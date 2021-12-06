const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    let fishArray = data.split(",").map(i => parseInt(i));

    const DAYS = 80;

    for(let i = 1; i <= DAYS; i++) {
      console.log(i);
      console.log({ fishArray });
      debugger;

      let frys = [];
      for(let j = 0; j < fishArray.length; j++) {
        // spawning new fish
        if (fishArray[j] === 0) {
          frys.push(8);
          fishArray[j] = 6; // reset fish
        } else {
          fishArray[j]--;
        }
      }

      // add new fish after we are done iterating
      fishArray.push(...frys);
    }

    console.log(fishArray.length);
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

    let fishArray = data.split(",").map(i => parseInt(i));
    let fishObject = fishArray.reduce((agg, fish) => {
      // e.g. fish = 4
      agg[fish]++;

      return agg;
    }, { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });

    console.log({ fishObject });

    const DAYS = 256;

    for(let i = 1; i <= DAYS; i++) {
      console.log(i);
      console.log({ fishObject });
      debugger;

      // new fish come in at 8
      // record the old 8 to move to 7
      const temp8 = 0 + fishObject[8];
      const temp0 = 0 + fishObject[0];

      // and set new fish on 8
      fishObject[8] = fishObject[0];

      // step everything down
      fishObject[0] = fishObject[1];
      fishObject[1] = fishObject[2];
      fishObject[2] = fishObject[3];
      fishObject[3] = fishObject[4];
      fishObject[4] = fishObject[5];
      fishObject[5] = fishObject[6];
      fishObject[6] = fishObject[7] + temp0; // resetting fish come in at 0
      fishObject[7] = temp8;
    }

    const numberOfFish = Object.keys(fishObject).reduce((sum, key) => {
      sum = sum + fishObject[key];
      return sum;
    }, 0);

    console.log({ numberOfFish });
  });
}

partTwo();