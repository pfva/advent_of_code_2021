const { convertInputToArrayOfStrings } = require('../utils/index');

/* Part One */

const binaryStrings = convertInputToArrayOfStrings('./input.txt');

let gammaRate = '';
let epsilonRate = '';

const parseBinaryStrings = (arrayOfBinaryStrings, binaryStringPosition) => {
  let numberOfZeroBits = 0;
  let numberOfOneBits = 0;

  arrayOfBinaryStrings.forEach(string => {
    string[binaryStringPosition] === '0'
      ? numberOfZeroBits++
      : numberOfOneBits++;
  });

  if (numberOfZeroBits > numberOfOneBits) {
    gammaRate += '0';
    epsilonRate += '1';
  } else {
    gammaRate += '1';
    epsilonRate += '0';
  }
};

for (let index = 0; index < binaryStrings[0].length; index++) {
  parseBinaryStrings(binaryStrings, index);
}

const gammaRateInDecimal = parseInt(gammaRate, 2);
const epsilonRateInDecimal = parseInt(epsilonRate, 2);

// console.log(gammaRateInDecimal * epsilonRateInDecimal);

/* Part Two */

const parseAndFilterBinaryStrings = (
  arrayOfBinaryStrings,
  binaryStringPosition,
  isOxygen = false
) => {
  let numberOfZeroBits = 0;
  let numberOfOneBits = 0;

  arrayOfBinaryStrings.forEach(string => {
    string[binaryStringPosition] === '0'
      ? numberOfZeroBits++
      : numberOfOneBits++;
  });

  let filteredStrings;

  if (numberOfZeroBits > numberOfOneBits) {
    isOxygen
      ? (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '0'
        ))
      : (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '1'
        ));
  } else if (numberOfZeroBits < numberOfOneBits) {
    isOxygen
      ? (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '1'
        ))
      : (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '0'
        ));
  } else if (numberOfZeroBits === numberOfOneBits) {
    isOxygen
      ? (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '1'
        ))
      : (filteredStrings = arrayOfBinaryStrings.filter(
          string => string[binaryStringPosition] === '0'
        ));
  }

  if (filteredStrings.length === 1) {
    console.log('This is the only remaining binary value:', filteredStrings[0]);
    return filteredStrings;
  }

  parseAndFilterBinaryStrings(
    filteredStrings,
    binaryStringPosition + 1,
    isOxygen
  );
};

parseAndFilterBinaryStrings(binaryStrings, 0, true); // oxygen generator rating = 100010111011
parseAndFilterBinaryStrings(binaryStrings, 0, false); // CO2 scrubber rating = 000111000011

const oxygenGeneratorRateingInDecimal = parseInt('100010111011', 2);
const CO2ScrubbingRatingInDecimal = parseInt('000111000011', 2);

console.log(oxygenGeneratorRateingInDecimal);
console.log(CO2ScrubbingRatingInDecimal);

console.log(oxygenGeneratorRateingInDecimal * CO2ScrubbingRatingInDecimal);

exports.parseBinaryStrings = parseBinaryStrings;
