const fs = require('fs');

// Parse lines into array of objects (a single line) of two objects (pointA and pointB) containing x and y coordinates
const parseLines = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .toString()
    .split('\n')
    .map(string => string.split(' -> '))
    .map(string => {
      const [startX, startY] = string[0].split(',');
      const [endX, endY] = string[1].split(',');
      return {
        pointA: {
          x: Number(startX),
          y: Number(startY),
        },
        pointB: {
          x: Number(endX),
          y: Number(endY),
        },
      };
    });
};

/* Part One */

const lines = parseLines('./input.txt');

// Create board out of maximum X and Y values
const xCoordinates = [];
const yCoordinates = [];
for (const line of lines) {
  const points = Object.values(line);
  const coordinates = Object.values(points);
  for (const coordinatePair of coordinates) {
    const x = Object.values(coordinatePair)[0];
    xCoordinates.push(x);
    const y = Object.values(coordinatePair)[1];
    yCoordinates.push(y);
  }
}

const boardWidth = Math.max(...xCoordinates) + 1;
const boardHeight = Math.max(...yCoordinates) + 1;

const board = Array(boardWidth)
  .fill(0)
  .map(x => Array(boardHeight).fill(0));

// Filter out only horizontal and vertical lines for part 1
// const horizontalAndVerticalLines = [];
// for (const line of lines) {
//   const points = Object.values(line);
//   const coordinates = Object.values(points);
//   if (
//     coordinates[0].x === coordinates[1].x ||
//     coordinates[0].y === coordinates[1].y
//   ) {
//     horizontalAndVerticalLines.push(line);
//   }
// }

// Mark the lines on the board
function markLinesOnBoard(lines) {
  for (const line of lines) {
    const points = Object.values(line);
    const coordinates = Object.values(points);

    const x1 = coordinates[0].x;
    const x2 = coordinates[1].x;
    const y1 = coordinates[0].y;
    const y2 = coordinates[1].y;

    // Horizontal
    if (y1 === y2 && x1 !== x2) {
      if (x1 < x2) {
        for (let index = x1; index <= x2; index++) {
          board[y1][index]++;
        }
      } else if (x1 > x2) {
        for (let index = x1; index >= x2; index--) {
          board[y1][index]++;
        }
      }
    }
    // Vertical
    if (x1 === x2 && y1 !== y2) {
      if (y1 < y2) {
        for (let index = y1; index <= y2; index++) {
          board[index][x1]++;
        }
      } else if (y1 > y2) {
        for (let index = y1; index >= y2; index--) {
          board[index][x1]++;
        }
      }
    }
    /* Part Two */
    // Diagonal
    if (y1 !== y2 && x1 !== x2) {
      if (x1 < x2) {
        // If it grows in the positive x direction and positive y direction
        if (y1 < y2) {
          for (let y_index = y1, x_index = x1; y_index <= y2; y_index++, x_index++) {
            board[y_index][x_index]++;
          }
          // If it grows in the positive x direction and negative y direction
        } else if (y1 > y2) {
          for (let y_index = y1, x_index = x1; y_index >= y2; y_index--, x_index++) {
            board[y_index][x_index]++;
          }
        }
      } else if (x1 > x2) {
        // If it grows in the negative x direction and positive y direction
        if (y1 < y2) {
          for (let y_index = y1, x_index = x1; y_index <= y2; y_index++, x_index--) {
            board[y_index][x_index]++;
          }
          // If it grows in the positive x direction and negative y direction
        } else if (y1 > y2) {
          for (let y_index = y1, x_index = x1; y_index >= y2; y_index--, x_index--) {
            board[y_index][x_index]++;
          }
        }
      }
    }
  }
}

markLinesOnBoard(lines);

function findPointsWithMultipleVents(board) {
  let pointsWithMultipleVents = 0;
  for (const row of board) {
    for (const point of row) {
      if (point > 1) {
        pointsWithMultipleVents++;
      }
    }
  }
  return pointsWithMultipleVents;
}

const pointsWithMultipleVents = findPointsWithMultipleVents(board);

console.log(pointsWithMultipleVents);
