const fs = require('fs');

const convertInputToArrayOfNums = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .split(',')
    .map(number => parseInt(number));
};

/* Part One */

const internalTimers = convertInputToArrayOfNums('./input.txt');

let days = 0;
let finalTimers = [];

function calculateTomorrowsTimers(arrayOfTimers) {
  if (days === 80) {
    finalTimers = arrayOfTimers;
    return;
  }

  const tomorrowsTimers = [...arrayOfTimers];
  let newFishToAdd = 0;

  for (let index = 0; index < arrayOfTimers.length; index++) {
    let timer = arrayOfTimers[index];
    if (timer === 0) {
      newFishToAdd += 1;
      timer = 6;
      tomorrowsTimers.splice(index, 1, timer);
    } else {
      tomorrowsTimers.splice(index, 1, timer - 1);
    }
  }
  if (newFishToAdd > 0) {
    tomorrowsTimers.push(...Array(newFishToAdd).fill(8));
  }

  days += 1;

  calculateTomorrowsTimers(tomorrowsTimers);
}

// calculateTomorrowsTimers(internalTimers);

// console.log(finalTimers.length);

/* Part Two */

// Cred to: https://github.com/constb/aoc2021/blob/master/06/index2.js (I was getting maximum call size exceeded with my navive solution)

const agesOfFish = Array.from({ length: 9 }, (v, i) => internalTimers.filter(n => n === i).length);

function calculateTomorrowsTimersByFishAge() {
  const zeroTimers = agesOfFish.shift();
  agesOfFish[6] += zeroTimers;
  agesOfFish.push(zeroTimers);
}

for (let i = 0; i < 256; i++) {
  calculateTomorrowsTimersByFishAge();
}

// console.log(agesOfFish.reduce((acc, v) => acc + v, 0));
