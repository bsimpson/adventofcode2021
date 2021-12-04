const fs = require("fs");

// part one
function partOne() {
  const FILENAME = "./partOneInput";

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return
    }

    let rows = data.split("\n\n");
    const drawnNumbers = rows.shift().split(",");

    // boards = [
    //   [
    //     [
    //       [ '22', false ],
    //       [ '13', false ],
    //       [ '17', false ],
    //       [ '11', false ],
    //       [ '0',  false ],
    //     ],
    //     additional board rows
    //   ] ,
    //   aditional boards
    // ]
    let boards = rows.map((board) => {
      return board.split("\n").map((boardRow) => {
        return boardRow.split(" ").filter(i => i).reduce((agg, i) => {
          // can't use hash here because object properties don't assert order
          agg.push([i, false])
          return agg;
        }, []);
      });
    });

    console.log({ drawnNumbers })
    console.log(boards[0])

    function callNumber(drawnNumberIndex) {
      const drawnNumber = drawnNumbers[drawnNumberIndex];

      // mark drawn number on the boards
      boards.forEach((board) => {
        board.forEach((row) => {
          row.forEach((cell) => {
            if (cell[0] === drawnNumber) {
              cell[1] = true;
            }
          })
        })
      })

      // check the boards for winner
      // if found return winner
      // can't use forEach here because we can't break out
      for (let board of boards) {

        // winner by row
        for (let row of board) {
          // filter on row where true
          if (row.filter((cell) => cell[1]).length === 5) {
            // we have a winning row
            return { board, drawnNumber };
          }
        }

        // winner by column
        for(let i = 0; i < 5; i++) {
          // board[n] is the row
          // board[n][i] is the cell
          // board[n][i][1] is the true|false on whether this has been called
          // we check each row for all
          if (board[0][i][1] && board[1][i][1] && board[2][i][1] && board[3][i][1] && board[4][i][1]) {
            // we have a winning column
            return { board, drawnNumber };
          }
        }
      }

      return callNumber(drawnNumberIndex + 1);
    }

    const winningBoard = callNumber(0);
    console.log({ winningBoard });

    const winningBoardUnmarkedSum = winningBoard.board.reduce((sum, row) => {
      row.filter((cell) => cell[1] === false).map(cell => cell[0]).forEach((val) => {
        sum += parseInt(val);
      });

      return sum;
    }, 0);

    console.log({ winningBoardUnmarkedSum });

    console.log( `final score ${winningBoardUnmarkedSum * parseInt(winningBoard.drawnNumber)}`);
  });
}

partOne();