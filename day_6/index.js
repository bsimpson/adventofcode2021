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

partOne();