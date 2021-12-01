import { expect, it } from '@jest/globals';
import {
  calculateIncreasesInDepth,
  calculateIncreasesInWindowDepth,
} from './index';

const testInputOne = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const testInputTwo = [607, 618, 618, 617, 647, 716, 769, 792];

describe('calculateIncreasesInDepth', () => {
  it('takes an array of numbers and returns the number of increasing values', () => {
    expect(calculateIncreasesInDepth(testInputOne)).toEqual(7);
  });
});

describe('calculateIncreasesInWindowDepth', () => {
  it('takes an array of numbers and returns the number of increasing values between three-increment windows', () => {
    expect(calculateIncreasesInWindowDepth(testInputTwo)).toEqual(5);
  });
});
