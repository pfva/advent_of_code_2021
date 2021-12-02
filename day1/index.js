const { convertInputToArrayOfNumbers } = require('../utils/index');

/* Part One */

const depths = convertInputToArrayOfNumbers('./input.txt');

const calculateIncreasesInDepth = arrayOfDepths =>
  arrayOfDepths.filter((depth, index) => depth < arrayOfDepths[index + 1])
    .length;

// console.log(calculateIncreasesInDepth(depths));

/* Part Two */

const createRangeOfThree = (array, index, offset = 0) => {
  return [
    array[index + offset],
    array[index + offset + 1],
    array[index + offset + 2],
  ];
};

const calculateIncreasesInWindowDepth = arrayOfDepths =>
  arrayOfDepths.filter(
    (depth, index) =>
      createRangeOfThree(arrayOfDepths, index).reduce(
        (prev, current) => prev + current
      ) <
      createRangeOfThree(arrayOfDepths, index, 1).reduce(
        (prev, current) => prev + current
      )
  ).length;

// console.log(calculateIncreasesInWindowDepth(depths));

exports.calculateIncreasesInDepth = calculateIncreasesInDepth;
exports.calculateIncreasesInWindowDepth = calculateIncreasesInWindowDepth;
