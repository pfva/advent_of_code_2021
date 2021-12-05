const fs = require('fs');

const parseInput = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .toString()
    .split('\n\n')
    .map(string =>
      string
        .replace(/\n+/g, ' ')
        .trim()
        .split(' ')
        .filter(item => item !== '')
    );
};

/* Part One */

const input = parseInput('./input.txt');

// The list of numbers to draw from in order
const numbersToDraw = input[0]
  .map(rowOfNumbers => rowOfNumbers.split(','))
  .flat();

const boards = input.slice(1);

// The different boards, able to be marked
const convertedBoards = boards.map(board =>
  board.map(number => {
    return {
      number,
      marked: false,
    };
  })
);

// The main function, drawing a number at a time
// If a winner is found, save the final number called
function drawNumber(seriesOfNumbers) {
  for (let number of seriesOfNumbers) {
    markNumberInBoards(number);
    let winnerIsFound = checkForWinningBoard(convertedBoards);
    if (winnerIsFound) {
      finalNumberCalled = number;
      break;
    }
  }
}

// The function for marking the drawn number in all of the boards
function markNumberInBoards(number) {
  convertedBoards.map(board =>
    board.map(numberItem => {
      if (numberItem.number === number) {
        numberItem.marked = true;
      }
    })
  );
}

// Checks if a row or column is completely marked, and if so, notifies that a winner has been found and which board it was
function checkForWinningBoard(boardsToCheck) {
  let winnerIsFound = false;
  boardsToCheck.forEach(board => {
    if (
      checkRow(board, 0) ||
      checkRow(board, 5) ||
      checkRow(board, 10) ||
      checkRow(board, 15) ||
      checkRow(board, 20) ||
      checkColumn(board, 0) ||
      checkColumn(board, 1) ||
      checkColumn(board, 2) ||
      checkColumn(board, 3) ||
      checkColumn(board, 4)
    ) {
      winnerIsFound = true;
      winningBoard = board;
    }
  });
  return winnerIsFound;
}

// Util function to check rows
function checkRow(board, index) {
  if (
    board[index].marked === true &&
    board[index + 1].marked === true &&
    board[index + 2].marked === true &&
    board[index + 3].marked === true &&
    board[index + 4].marked === true
  ) {
    return true;
  }
}

// Util function to check columns
function checkColumn(board, index) {
  if (
    board[index].marked === true &&
    board[index + 5].marked === true &&
    board[index + 10].marked === true &&
    board[index + 15].marked === true &&
    board[index + 20].marked === true
  ) {
    return true;
  }
}

// The winning board
let winningBoard;
// The final number called for the board to win
let finalNumberCalled;

// drawNumber(numbersToDraw);

// The numbers left on the winning board that weren't marked
// const unmarkedNumbersInWinningBoard = winningBoard.filter(
//   numberItem => numberItem.marked === false
// );
// const sumOfUnmarkedNumbers = unmarkedNumbersInWinningBoard.reduce(
//   (prev, current) => {
//     return prev + parseInt(current.number);
//   },
//   0
// );

// console.log(sumOfUnmarkedNumbers);
// console.log(finalNumberCalled);

// console.log(sumOfUnmarkedNumbers * finalNumberCalled);

/* Part Two */

/* Some idea of recursion that didn't pan out*/

// function drawNumberWithRecursiveCheck(seriesOfNumbers) {
//   for (let number of seriesOfNumbers) {
//     markNumberInBoards(number);
//     checkForWinningBoardRecursive(convertedBoards, number);
//   }
// }

// function checkForWinningBoardRecursive(boardsToCheck, number) {
//   let winnerIsFound = false;
//   if (boardsToCheck.length === 1) {
//     winningBoard = boardsToCheck[0];
//     return winningBoard;
//   }
//   boardsToCheck.forEach(board => {
//     if (
//       checkRow(board, 0) ||
//       checkRow(board, 5) ||
//       checkRow(board, 10) ||
//       checkRow(board, 15) ||
//       checkRow(board, 20) ||
//       checkColumn(board, 0) ||
//       checkColumn(board, 1) ||
//       checkColumn(board, 2) ||
//       checkColumn(board, 3) ||
//       checkColumn(board, 4)
//     ) {
//       winnerIsFound = true;
//       winningBoard = board;
//     }
//   });
//   if (winnerIsFound) {
//     checkForWinningBoardRecursive(
//       boardsToCheck.filter(boards => boards !== winningBoard),
//       number
//     );
//   }
// }

// drawNumberWithRecursiveCheck(numbersToDraw);

// console.log('winningBoard', winningBoard, 'at number', finalNumberCalled);

// Uglified version of above function(s)
function drawNumberLoop(seriesOfNumbers) {
  outer: for (let number of seriesOfNumbers) {
    finalNumberCalled = number;
    markNumberInBoards(number);
    const boardsToCheck = convertedBoards;
    for (const board of boardsToCheck) {
      if (
        checkRow(board, 0) ||
        checkRow(board, 5) ||
        checkRow(board, 10) ||
        checkRow(board, 15) ||
        checkRow(board, 20) ||
        checkColumn(board, 0) ||
        checkColumn(board, 1) ||
        checkColumn(board, 2) ||
        checkColumn(board, 3) ||
        checkColumn(board, 4)
      ) {
        const boardIndex = boardsToCheck.indexOf(board);
        if (boardsToCheck.length === 1 && boardIndex === 0) {
          // console.log(boardsToCheck);
          // console.log(number);
          winningBoard = board;
          break outer;
        }
        boardsToCheck.splice(boardIndex, 1);
      }
    }
  }
}

drawNumberLoop(numbersToDraw);

const unmarkedNumbersInWinningBoard = winningBoard.filter(
  numberItem => numberItem.marked === false
);
const sumOfUnmarkedNumbers = unmarkedNumbersInWinningBoard.reduce(
  (prev, current) => {
    return prev + parseInt(current.number);
  },
  0
);

// console.log(sumOfUnmarkedNumbers);
// console.log(finalNumberCalled);

// console.log(sumOfUnmarkedNumbers * finalNumberCalled);
