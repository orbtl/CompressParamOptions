import type { SelectedOptions } from '../types/types.js';
import { DecompressionOptions } from '../types/types.js';
import { characterBitDepth, characterMap } from '../constants.js';

export function characterToIndex(character: string): number {
  const index = characterMap[character];
  if (index === undefined) {
    throw new Error(`Character ${character} is not a valid character.`);
  }

  return index;
}

export function numberToBinaryString(number: number): string {
  return number.toString(2).padStart(characterBitDepth, '0');
}

export function handleUncaughtOptions(
  compressed: string,
  startIndex: number,
  decompressionOptions: DecompressionOptions
): Set<string> {
  let decompressed = new Set<string>();
  let compressedIterator = startIndex;

  while (compressedIterator < compressed.length) {
    let uncaughtOption = '';
    // Iterate, storing characters making up this uncaught option,
    // until we reach another separation character or the end of the string
    while (compressedIterator < compressed.length
      && compressed[compressedIterator] !== decompressionOptions.separationCharacter) {
      uncaughtOption += compressed[compressedIterator];
      compressedIterator++;
    }
    decompressed.add(uncaughtOption);
    // Move forward again past the separation charcter or past the end of the string
    compressedIterator++;
  }
  return decompressed;
}

export function getValueFromKeyIndex(
  keyIndex: number,
  keys: (string | number)[],
  getValue: (key: string | number) => string
): string | undefined {
  if (keyIndex < 0 || keyIndex >= keys.length) {
    console.error(`Key index ${keyIndex} is out of bounds for the keys array.`);
    return undefined;
  }
  const key = keys[keyIndex];
  const value = getValue(key);
  if (value === undefined) {
    console.error(`Value for key ${key} at index ${keyIndex} is undefined in the optionMap.`);
  }
  return value;
}

export function stringDecompression(
  characterIndex: number,
  compressedIterator: number,
  keys: (string | number)[],
  getValue: (key: string | number) => string,
): Set<string> {
  // Convert the character index to a binary string
  const binaryString = numberToBinaryString(characterIndex);
  const decompressed = new Set<string>();

  for (let binaryIterator = 0; binaryIterator < binaryString.length; binaryIterator++) {
    // Do not need to determine which option we are looking for if the binary digit is 0 indicating false
    if (binaryString[binaryIterator] === '0') {
      continue;
    }

    // Determine the key index in the optionMap based on our current position in the binaryString
    // plus the characterBitDepth times the compressed array index,
    // because each cycle represents a characterBitDepth amount of keys iterated over
    const keyIndex = binaryIterator + (compressedIterator * characterBitDepth);

    if (keyIndex >= keys.length) {
      // Note that there is no warning here because this is a common path
      // in cases where we padded the binary string with extra zeros
      // to ensure the compressed string is a multiple of characterBitDepth
      break;
    }

    const value = getValueFromKeyIndex(keyIndex, keys, getValue);
    if (value !== undefined) {
      decompressed.add(value);
    }
  }
  return decompressed;
}

export function bitwiseDecompression(
  characterIndex: number,
  compressedIterator: number,
  keys: (string | number)[],
  getValue: (key: string | number) => string,
): Set<string> {
  const decompressed = new Set<string>();
  for (let binaryIterator = 0; binaryIterator < characterBitDepth; binaryIterator++) {
    // Start iteration at characterBitDepth - 1 because we want the first of the 6 bits
    // to represent the first key of the 6, so we need to shift right 5x to get to the first bit
    const currentBinaryValue = characterIndex >> (characterBitDepth - 1 - binaryIterator);

    // Do not need to determine which option we are looking for if the binary digit is 0 indicating false
    // Bitwise AND with 1 will ignore all other digits except the rightmost,
    // which after the shift above should be the correct digit
    if ((currentBinaryValue & 1) !== 1) {
      continue;
    }

    // Determine the key index in the optionMap based on our current position in the binaryString
    // plus the characterBitDepth times the compressed array index,
    // because each cycle represents a characterBitDepth amount of keys iterated over
    const keyIndex = binaryIterator + (compressedIterator * characterBitDepth);

    if (keyIndex >= keys.length) {
      // Note that there is no warning here because this is a common path
      // in cases where we padded the binary string with extra zeros
      // to ensure the compressed string is a multiple of characterBitDepth
      break;
    }

    const value = getValueFromKeyIndex(keyIndex, keys, getValue);
    if (value !== undefined) {
      decompressed.add(value);
    }
  }
  return decompressed;
}

// Shared decompression logic
export function decompressCore(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  compressed: string,
  decompressionOptions: DecompressionOptions
): SelectedOptions {
  const decompressed = new Set<string>();
  let compressedIterator = 0;

  while (compressedIterator < compressed.length) {
    // Handle uncaught options
    if (compressed[compressedIterator] === decompressionOptions.separationCharacter) {
      // Pass compressedIterator + 1 to skip the separation character
      const uncaughtOptions = handleUncaughtOptions(compressed, compressedIterator + 1, decompressionOptions);
      // Exit after processing uncaught options as they will always be at the end of the compressed string
      return new Set([...decompressed, ...uncaughtOptions]);
    }

    // Convert from url safe character to character map index
    const index = characterToIndex(compressed[compressedIterator]);

    const decompressedFromThisCharacter = decompressionOptions.useBitwiseDecompression
      ? bitwiseDecompression(index, compressedIterator, keys, getValue)
      : stringDecompression(index, compressedIterator, keys, getValue);
    decompressedFromThisCharacter.forEach(value => decompressed.add(value));

    compressedIterator++;
  }

  return decompressed;
}