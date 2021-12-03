const fs = require('fs');

// Read input file and convert to array of numbers
const convertInputToArrayOfNumbers = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .map(number => parseInt(number));
};

exports.convertInputToArrayOfNumbers = convertInputToArrayOfNumbers;

const convertInputToArrayOfArrays = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .toString()
    .split('\n')
    .map(item => item.split(' '));
};

exports.convertInputToArrayOfArrays = convertInputToArrayOfArrays;

const convertInputToArrayOfStrings = filePath => {
  return fs.readFileSync(filePath, 'utf8').toString().split('\n');
};

exports.convertInputToArrayOfStrings = convertInputToArrayOfStrings;
