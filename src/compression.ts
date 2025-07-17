import type { OptionMap, SelectedOptions, StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';
import { safeCharacters, characterBitDepth, separationCharacter } from './constants.js';

function binaryToCharacter(binary: number): string {
  // For safety, ensure the value is within the range of safe characters
  if (binary >= safeCharacters.length || binary < 0) {
    throw new Error(`Binary value ${binary} is out of bounds for safe characters.`);
  }
  return safeCharacters[binary];
}

// Shared compression logic
function compressCore(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  allValues: string[],
  selectedOptions: Set<string>,
  includeUncompressed: boolean,
  warnOnUncompressed: boolean
): string {
  let compressed = '';
  let binaryRepresentation = 0;
  let currentBinaryBits = 0;

  for (let i = 0; i < keys.length; i++) {
    const value = getValue(keys[i]);

    // Shift left to make space for the new bit
    // This should not have any effect on the first iteration as 0 << 1 is 0
    binaryRepresentation <<= 1;
    currentBinaryBits++;

    // Add binary true or false for if this index of the optionMap is included
    if (selectedOptions.has(value)) {
      // bitwise OR 1 will change the newly shifted bit from 0 to 1 and leave the rest unchanged
      binaryRepresentation = binaryRepresentation | 1;
    }

    // If we get to our character bit depth or the end of the map,
    // convert the binary representation to a url-safe character and add it to compressed
    if (currentBinaryBits >= characterBitDepth || i === keys.length - 1) {
      // Note that if we get to the end of the map and we have not filled the characterBitDepth,
      // we need to shift to pad the rest of the 0s so they are in the right digits
      if (i === keys.length - 1) {
        binaryRepresentation <<= (characterBitDepth - currentBinaryBits);
      }

      compressed += binaryToCharacter(binaryRepresentation);
      binaryRepresentation = 0;
      currentBinaryBits = 0;
    }
  }

  // Handle options in selectedOptions that do not exist in the optionMap and can't be compressed,
  // but only if the user wants them included or warned on
  if (warnOnUncompressed || includeUncompressed) {
    const uncaughtOptions = [...selectedOptions].filter(o => !allValues.includes(o));
    if (uncaughtOptions.length > 0) {
      if (warnOnUncompressed) {
        console.warn('The following options are not in the optionMap and cannot be compressed:', uncaughtOptions);
      }
      if (includeUncompressed) {
        compressed += separationCharacter;
        compressed += uncaughtOptions.join(separationCharacter);
      }
    }
  }

  return compressed;
}

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * This function takes an option map and a list of selected options, then creates a binary 
 * representation where each bit indicates whether an option is selected. The binary data 
 * is then encoded using a URL-safe character set for compact storage or transmission.
 * 
 * @param optionMap - A map of options where keys are identifiers and values are the actual option values
 * @param selectedOptions - Array of selected option values to compress
 * @param includeUncompressed - Whether to include options not found in the map as uncompressed data
 * @param warnOnUncompressed - Whether to warn when options cannot be compressed
 * @returns A compressed string representation of the selected options
 * 
 * @example
 * ```typescript
 * const options = { a: 'option1', b: 'option2', c: 'option3' };
 * const selected = ['option1', 'option3'];
 * const compressed = compressOptions(options, selected);
 * console.log(compressed); // Returns a compact string like "A"
 * ```
 */
export function compressOptions(
  optionMap: StringOptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed?: boolean,
  warnOnUncompressed?: boolean
): string;

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * @param optionMap - A map of options with numeric keys and string values
 * @param selectedOptions - Array of selected option values to compress
 * @param includeUncompressed - Whether to include options not found in the map as uncompressed data
 * @param warnOnUncompressed - Whether to warn when options cannot be compressed
 * @returns A compressed string representation of the selected options
 * 
 * @example
 * ```typescript
 * const features = { 1: 'feature_a', 2: 'feature_b', 3: 'feature_c' };
 * const selected = ['feature_a', 'feature_c'];
 * const compressed = compressOptions(features, selected);
 * console.log(compressed); // Returns a compact string like "A"
 * ```
 */
export function compressOptions(
  optionMap: NumberOptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed?: boolean,
  warnOnUncompressed?: boolean
): string;

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * @param optionMap - An array of option values where indices serve as keys
 * @param selectedOptions - Array of selected option values to compress
 * @param includeUncompressed - Whether to include options not found in the map as uncompressed data
 * @param warnOnUncompressed - Whether to warn when options cannot be compressed
 * @returns A compressed string representation of the selected options
 * 
 * @example
 * ```typescript
 * const colors = ['red', 'blue', 'green', 'yellow'];
 * const selected = ['red', 'green'];
 * const compressed = compressOptions(colors, selected);
 * console.log(compressed); // Returns a compact string like "A"
 * ```
 */
export function compressOptions(
  optionMap: ArrayOptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed?: boolean,
  warnOnUncompressed?: boolean
): string;

export function compressOptions(
  optionMap: OptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed: boolean = false,
  warnOnUncompressed: boolean = true
): string {
  if (typeof selectedOptions === 'undefined'
    || selectedOptions === null
    || !(selectedOptions instanceof Set)) {
    console.warn('Selected options must be a Set.');
    return '';
  }

  if (Array.isArray(optionMap)) {
    // ArrayOptionMap
    const keys = Array.from({ length: optionMap.length }, (_, i) => i);
    return compressCore(
      keys,
      (key) => optionMap[key as number],
      [...optionMap],
      selectedOptions,
      includeUncompressed,
      warnOnUncompressed
    );
  } else {
    // StringOptionMap or NumberOptionMap
    const keys = Object.keys(optionMap);
    return compressCore(
      keys,
      (key) => optionMap[key as keyof typeof optionMap],
      Object.values(optionMap),
      selectedOptions,
      includeUncompressed,
      warnOnUncompressed
    );
  }
}