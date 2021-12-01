const convertInputToArrayOfNumbers = require('../utils/index');

/* Part One */

const depths = convertInputToArrayOfNumbers;

export const calculateIncreasesInDepth = arrayOfDepths =>
  arrayOfDepths.filter((depth, index) => depth < arrayOfDepths[index + 1])
    .length;

// console.log(calculateIncreasesInDepth(depths));

/* Part Two */

export const calculateIncreasesInWindowDepth = arrayOfDepths =>
  arrayOfDepths.filter(
    (depth, index) =>
      [depth, arrayOfDepths[index + 1], arrayOfDepths[index + 2]].reduce(
        (prev, current) => prev + current
      ) <
      [
        arrayOfDepths[index + 1],
        arrayOfDepths[index + 2],
        arrayOfDepths[index + 3],
      ].reduce((prev, current) => prev + current)
  ).length;

// console.log(calculateIncreasesInWindowDepth(depths));

// exports.calculateIncreasesInDepth = calculateIncreasesInDepth;
// exports.calculateIncreasesInWindowDepth = calculateIncreasesInWindowDepth;
