import * as fs from 'fs';

// part one
function partOne() {
  const FILENAME = "./partOneExampleInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    console.log({ data });
    let lines = data.split("\n");

    lines = [
      "[]",
      "([])",
      "{()()()}",
      "<([{}])>",
      "[<>({}){}[([])<>]]",
      "(((((((((())))))))))",
    ]

    function check(charArray) {
      let endDelimeter;
      let rightmostDelimeterIndex;

      if (charArray[0].includes("{", "[", "(", "<")) {
        switch(charArray[0]) {
          case "{":
            endDelimeter = "}";
            break;
          case "[":
            endDelimeter = "]";
            break;
          case "(":
            endDelimeter = ")";
            break;
          case "<":
            endDelimeter = ">";
            break;
        }
      } else {
        // this is a closing char
      }

      if (rightmostDelimeterIndex === 1) {
        // empty e.g. []
        if (rightmostDelimeterIndex < charArray.length - 1) {
          return check(charArray.slice(1));
        }

        return
      }

      return check(charArray.slice(1, rightmostDelimeterIndex));
    }

    const lineSummaries = lines.map((line) => {
      return check(line);
    })

    console.log({ lineSummaries });
  });
}

partOne();