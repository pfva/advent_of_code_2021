import { expect, it } from '@jest/globals';
import { calculatePosition, calculatePositionWithAim } from './index';

const testInput = [
  ['forward', '5'],
  ['down', '5'],
  ['forward', '8'],
  ['up', '3'],
  ['down', '8'],
  ['forward', '2'],
];

describe('calculatePosition', () => {
  it('takes an array of arrays and updated the position based on the command and value', () => {
    expect(calculatePosition(testInput)).toEqual({
      horizontalPosition: 15,
      depth: 10,
    });
  });
});

describe('calculatePositionWithAim', () => {
  it('takes an array of arrays and updated the position and aim based on the command and value', () => {
    expect(calculatePositionWithAim(testInput)).toEqual({
      horizontalPosition: 15,
      depth: 60,
      aim: 10,
    });
  });
});
