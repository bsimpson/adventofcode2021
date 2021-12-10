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

    const lineSummaries = lines.map((line) => {
      let delimeters = {
        "BRACKET": 0,
        "PAREN": 0,
        "CURLY": 0,
        "LESS_THAN": 0,
      };

      let illegalSyntax = false;

      line.split("").forEach((char, i) => {
        // console.log({ line, delimeters, char, i });
        switch(char) {
          case "[":
            delimeters.BRACKET++;
            break;
          case "]":

            delimeters.BRACKET--;
            break;
          case "(":
            delimeters.PAREN++;
            break;
          case ")":
            delimeters.PAREN--;
            break;
          case "{":
            delimeters.CURLY++;
            break;
          case "}":
            delimeters.CURLY--;
            break;
          case "<":
            delimeters.LESS_THAN++;
            break;
          case ">":
            delimeters.LESS_THAN--;
            break;
        }
      });

      return {
        illegalSyntax,
      }
    });

    console.log({ lineSummaries });

  });
}

partOne();