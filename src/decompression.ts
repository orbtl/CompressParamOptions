import type { OptionMap, SelectedOptions, StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';
import { characterBitDepth, separationCharacter, characterMap } from './constants.js';

function characterToBinary(character: string): string {
  const index = characterMap[character];
  if (index === undefined) {
    throw new Error(`Character ${character} is not a valid character.`);
  }

  // Convert to binary and pad with zeros to ensure consistent bit depth
  // Note that unlike compression, during decompression we pad the start
  // because we are rebuilding from an index that might be too small to include leading digits,
  // such as '001000' which would return as '1000' if we didn't pad
  return index.toString(2).padStart(characterBitDepth, '0');
}

// Shared decompression logic
function decompressCore(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  compressed: string
): SelectedOptions {
  const decompressed: SelectedOptions = [];
  let compressedIterator = 0;

  while (compressedIterator < compressed.length) {
    // Handle uncaught options
    if (compressed[compressedIterator] === separationCharacter) {
      // Move past the separation character
      compressedIterator++;
      let uncaughtOption = '';

      // Iterate, storing characters making up this uncaught option,
      // until we reach another separation character or the end of the string
      while (compressedIterator < compressed.length
        && compressed[compressedIterator] !== separationCharacter) {
        uncaughtOption += compressed[compressedIterator];
        compressedIterator++;
      }

      decompressed.push(uncaughtOption);
      continue;
    }

    // Convert from url safe character to binary string
    const binaryString = characterToBinary(compressed[compressedIterator]);

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

      const key = keys[keyIndex];
      if (key !== undefined) {
        const value = getValue(key);
        if (value !== undefined) {
          decompressed.push(value);
        } else {
          console.warn(`Value for key ${key} at index ${keyIndex} is undefined in the optionMap.`);
        }
      } else {
        console.warn(`Key at index ${keyIndex} is undefined in the optionMap.`);
      }
    }

    compressedIterator++;
  }

  return decompressed;
}

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * This function takes a compressed string created by compressOptions and reconstructs 
 * the original array of selected options using the provided option map as a reference.
 * 
 * @param optionMap - The same option map used during compression
 * @param compressed - The compressed string to decompress
 * @returns An array of decompressed option values
 * 
 * @example
 * ```typescript
 * const options = { a: 'option1', b: 'option2', c: 'option3' };
 * const compressed = "A"; // Previously compressed string
 * const decompressed = decompressOptions(options, compressed);
 * console.log(decompressed); // Returns ['option1', 'option3']
 * ```
 */
export function decompressOptions(
  optionMap: StringOptionMap,
  compressed: string
): SelectedOptions;

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * @param optionMap - The same option map with numeric keys used during compression
 * @param compressed - The compressed string to decompress
 * @returns An array of decompressed option values
 * 
 * @example
 * ```typescript
 * const features = { 1: 'feature_a', 2: 'feature_b', 3: 'feature_c' };
 * const compressed = "A"; // Previously compressed string
 * const decompressed = decompressOptions(features, compressed);
 * console.log(decompressed); // Returns ['feature_a', 'feature_c']
 * ```
 */
export function decompressOptions(
  optionMap: NumberOptionMap,
  compressed: string
): SelectedOptions;

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * @param optionMap - The same array of options used during compression
 * @param compressed - The compressed string to decompress
 * @returns An array of decompressed option values
 * 
 * @example
 * ```typescript
 * const colors = ['red', 'blue', 'green', 'yellow'];
 * const compressed = "A"; // Previously compressed string
 * const decompressed = decompressOptions(colors, compressed);
 * console.log(decompressed); // Returns ['red', 'green']
 * ```
 */
export function decompressOptions(
  optionMap: ArrayOptionMap,
  compressed: string
): SelectedOptions;

export function decompressOptions(
  optionMap: OptionMap,
  compressed: string
): SelectedOptions {
  if (typeof compressed !== 'string') {
    return [];
  }

  if (Array.isArray(optionMap)) {
    // ArrayOptionMap
    const keys = Array.from({ length: optionMap.length }, (_, i) => i);
    return decompressCore(
      keys,
      (key) => optionMap[key as number],
      compressed
    );
  } else {
    // StringOptionMap or NumberOptionMap
    const keys = Object.keys(optionMap);
    return decompressCore(
      keys,
      (key) => optionMap[key as keyof typeof optionMap],
      compressed
    );
  }
}