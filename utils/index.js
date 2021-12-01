// Read input file and convert to array of numbers
const fs = require('fs');
const convertInputToArrayOfNumbers = fs
  .readFileSync('./input.txt', 'utf8')
  .split('\n')
  .map(number => parseInt(number));

module.exports = convertInputToArrayOfNumbers;
