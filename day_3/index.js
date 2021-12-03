const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    let report = [];

    // e.g. 00100
    data.split("\n").forEach((row) => {
      // [0, 0, 1, 0, 0]
      report.push(row.split("").map(x => parseInt(x)));
    });

    // pivot table
    let pivotedReport = [];
    let reportRowSize = report[0].length;

    for (let column = 0; column < reportRowSize; column++) {
      let pivotedRow = [];
      for(let row = 0; row < report.length; row++) {
        pivotedRow.push(report[row][column]);
      }
      pivotedReport.push(pivotedRow);
    }

    console.log(pivotedReport);

    // mode
    let modeReport = [];
    pivotedReport.forEach((row, i) => {
      let zeroCount = row.filter(n => n === 0).length;
      let oneCount = row.filter(n => n === 1).length;

      zeroCount > oneCount ? modeReport.push(0) : modeReport.push(1);
    });

    console.log({ modeReport })

    // binary to decimal
    let gammaRateBinary = modeReport.join("");
    // https://stackoverflow.com/questions/10258828/how-to-convert-binary-string-to-decimal
    let gammaRateDecimal = parseInt(gammaRateBinary, 2);

    // this is the inverse of the mode
    let epsilonRateBinary = modeReport.map(x => x ? 0 : 1).join("");
    let epsilonRateDecimal = parseInt(epsilonRateBinary, 2);

    console.log({ gammaRateDecimal, epsilonRateDecimal })
    console.log(gammaRateDecimal * epsilonRateDecimal);
  });
}

// partOne();

// part one
function partTwo() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    let report = [];

    // e.g. 00100
    data.split("\n").forEach((row) => {
      // [0, 0, 1, 0, 0]
      report.push(row.split("").map(x => parseInt(x)));
    });

    // bit criteria
    // criteria array's last item is the one we match one - we only match last because this is recursive
    // so we know that previous positions have already been filtered to match
    // crtieria array's length tells us which column index we are on
    function bitCriteriaOxygenGenerator(input, criteria = []) {
      if (input.length === 1) {
        console.log(`break condition ${input}`);
        return parseInt(input[0].join(""), 2);
      }

      // mode
      let columnIndex = criteria.length;
      let zeroCount = 0;
      let oneCount = 0;

      input.forEach((row) => {
        row[columnIndex] ? oneCount++ : zeroCount++;
      });

      let mode = oneCount >= zeroCount ? 1 : 0; // TODO this changes between oxygen and CO2 rating
      criteria.push(mode);

      const matchingInput = input.filter(row => {
        let match = false;
        if (row[columnIndex] === criteria[columnIndex]) {
          match = true;
        }

        return match;
      });

      // call again with new criteria
      return bitCriteriaOxygenGenerator(matchingInput, criteria);
    }

    let oxygenGeneratorRating = bitCriteriaOxygenGenerator(report);
    console.log({ oxygenGeneratorRating });

    // bit criteria
    // criteria array's last item is the one we match one - we only match last because this is recursive
    // so we know that previous positions have already been filtered to match
    // crtieria array's length tells us which column index we are on
    function bitCriteriaCO2Scrubber(input, criteria = []) {
      if (input.length === 1) {
        console.log(`break condition ${input}`);
        return parseInt(input[0].join(""), 2);
      }

      // mode
      let columnIndex = criteria.length;
      let zeroCount = 0;
      let oneCount = 0;

      input.forEach((row) => {
        row[columnIndex] ? oneCount++ : zeroCount++;
      });

      let mode = zeroCount <= oneCount ? 0 : 1; // TODO this changes between oxygen and CO2 rating
      criteria.push(mode);

      const matchingInput = input.filter(row => {
        let match = false;
        if (row[columnIndex] === criteria[columnIndex]) {
          match = true;
        }

        return match;
      });

      // call again with new criteria
      return bitCriteriaCO2Scrubber(matchingInput, criteria);
    }

    let cO2ScrubberRating = bitCriteriaCO2Scrubber(report);
    console.log({ cO2ScrubberRating });
    console.log(oxygenGeneratorRating * cO2ScrubberRating);
  });
}

partTwo();
