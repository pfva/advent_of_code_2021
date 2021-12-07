const fs = require('fs');

const convertInputToArrayOfNums = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .split(',')
    .map(number => parseInt(number));
};

/* Part One */

const crabs = convertInputToArrayOfNums('./input.txt');

crabs.sort((a, b) => a - b);

let median = crabs[Math.floor(crabs.length / 2)];

let fuelSpent = 0;

crabs.forEach(num => {
  fuelSpent += Math.abs(num - median);
});

console.log(fuelSpent);

/* Part Two */

let average = Math.floor(crabs.reduce((a, b) => a + b) / crabs.length);

let newFuelSpent = 0;

crabs.forEach(num => {
  let n = Math.abs(num - average);
  newFuelSpent += Math.floor((n * n + n) / 2);
});

console.log(newFuelSpent);
