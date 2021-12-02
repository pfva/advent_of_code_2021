const { convertInputToArrayOfArrays } = require('../utils/index');

/* Part One */

const input = convertInputToArrayOfArrays('./input.txt');

const calculatePosition = arrayOfInstructions => {
  let position = {
    horizontalPosition: 0,
    depth: 0,
  };

  arrayOfInstructions.forEach(instruction => {
    const command = instruction[0];
    const value = Number(instruction[1]);

    switch (command) {
      case 'forward':
        position = {
          ...position,
          horizontalPosition: position.horizontalPosition + value,
        };
        break;
      case 'down':
        position = {
          ...position,
          depth: position.depth + value,
        };
        break;
      case 'up':
        position = {
          ...position,
          depth: position.depth - value,
        };
        break;
    }
  });

  return position;
};

// const finalPosition = calculatePosition(input);
// console.log(finalPosition.horizontalPosition * finalPosition.depth);

/* Part Two */

const calculatePositionWithAim = arrayOfInstructions => {
  let position = {
    horizontalPosition: 0,
    depth: 0,
    aim: 0,
  };

  arrayOfInstructions.forEach(instruction => {
    const command = instruction[0];
    const value = Number(instruction[1]);

    switch (command) {
      case 'forward':
        position = {
          ...position,
          horizontalPosition: position.horizontalPosition + value,
          depth: position.depth + position.aim * value,
        };
        break;
      case 'down':
        position = {
          ...position,
          aim: position.aim + value,
        };
        break;
      case 'up':
        position = {
          ...position,
          aim: position.aim - value,
        };
        break;
    }
  });

  return position;
};

const finalPosition = calculatePositionWithAim(input);
console.log(finalPosition.horizontalPosition * finalPosition.depth);

exports.calculatePosition = calculatePosition;
exports.calculatePositionWithAim = calculatePositionWithAim;
