import * as fs from 'fs';

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    const lines = data.split("\n").filter(x => x);
    let template = lines.shift().split("");
    const rules = lines.reduce((agg, line) => {
      const [key, insertion] = line.split(" -> ");
      agg[key] = insertion;
      return agg;
    }, {});

    // read file
    console.log({ template, rules });

    // step over and insert
    const STEPS = 10;
    for(let i = 1; i <= STEPS; i++) {
      console.log({ i, template });
      debugger;

      let insertions = []; // this will change so capture it first
      // note that we subtract 1 so we keep the last slice a pair of letters
      for(let x = 0; x < template.length - 1; x++) {
        const key = template[x] + template[x + 1]; // yes we want string concat
        insertions.push(rules[key]);
      };

      // zip insertions and template
      let newTemplate = [];
      for (let x = 0; x < insertions.length; x++) {
        newTemplate.push(template[x]);
        newTemplate.push(insertions[x]);
      }

      template = [...newTemplate, template[template.length - 1]];
    }

    // find most common subtract least common
    const letterFrequency = template.reduce((agg, letter) => {
      agg[letter] = agg[letter] || 0;

      agg[letter]++;
      return agg;
    }, {});

    console.log({ letterFrequency });

    const letterFrequencySorted = Object.keys(letterFrequency).sort((x,y) => {
      if (letterFrequency[x] < letterFrequency[y]) {
        return - 1;
      };
    });

    const minLetter = letterFrequencySorted[0];
    const maxLetter = letterFrequencySorted[letterFrequencySorted.length - 1];

    console.log({ minLetter, maxLetter });
    console.log(letterFrequency[maxLetter] - letterFrequency[minLetter]);
  });
}

partOne();