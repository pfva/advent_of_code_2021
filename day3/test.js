import { expect, it } from '@jest/globals';
import { parseBinaryStrings } from './index';

const testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

describe('parseBinaryStrings', () => {
  it('takes an array of strings and calculates the number of ones and zeroes', () => {
    expect(parseBinaryStrings(testInput)).toEqual(undefined);
  });
});
