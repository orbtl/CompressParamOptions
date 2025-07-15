import type { OptionMap, SelectedOptions, StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';
import { safeCharacters, characterBitDepth, separationCharacter, characterMap } from './constants.js';

function binaryToCharacter(binaryString: string): string {
  const intValue = parseInt(binaryString, 2);
  // For safety, ensure the value is within the range of safe characters
  return safeCharacters[intValue % safeCharacters.length];
}

function characterToBinary(character: string): string {
  const index = characterMap[character];
  if (index === undefined) {
    throw new Error(`Character ${character} is not a valid character.`);
  }
  // Note that we don't pad the start here,
  // As we need to ensure there are that many options left in the option map before padding
  return index.toString(2);
}

// Shared compression logic
function compressCore(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  allValues: string[],
  selectedOptions: SelectedOptions,
  includeUncompressed: boolean,
  warnOnUncompressed: boolean
): string {
  let compressed = '';
  let binaryRepresentation = '';

  for (let i = 0; i < keys.length; i++) {
    const value = getValue(keys[i]);
    // Add binary true or false for if this index of the optionMap is included
    binaryRepresentation += selectedOptions.includes(value) ? '1' : '0';

    // If we get to our character bit depth or the end of the map,
    // convert the binary representation to a url-safe character and add it to compressed
    if (binaryRepresentation.length >= characterBitDepth || i === keys.length - 1) {
      compressed += binaryToCharacter(binaryRepresentation);
      binaryRepresentation = '';
    }
  }

  // Handle options in selectedOptions that do not exist in the optionMap and can't be compressed,
  // but only if the user wants them included or warned on
  if (warnOnUncompressed || includeUncompressed) {
    const uncaughtOptions = selectedOptions.filter(o => !allValues.includes(o));
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

    // If the value is too low we might not end up with our full bit depth
    // Pad with any missing length of characters by using an offset when we calculate our option index
    // But first have to make sure there are that many entries left in the map
    const lengthLeftInMap = keys.length - (compressedIterator * characterBitDepth);
    const offset = Math.min(characterBitDepth, lengthLeftInMap) - binaryString.length;

    for (let binaryIterator = 0; binaryIterator < binaryString.length; binaryIterator++) {
      // Do not need to determine which option we are looking for if the binary digit is 0 indicating false
      if (binaryString[binaryIterator] === '0') {
        continue;
      }

      // Determine the key index in the optionMap based on our current position in the binaryString
      // plus the characterBitDepth times the compressed array index,
      // because each cycle represents a characterBitDepth amount of keys iterated over
      // But add the offset to account for leading zeros in the binary string that weren't generated when converting to binary
      const keyIndex = binaryIterator + (compressedIterator * characterBitDepth) + offset;
      const key = keys[keyIndex];
      if (key !== undefined) {
        const value = getValue(key);
        if (value !== undefined) {
          decompressed.push(value);
        }
      }
    }

    compressedIterator++;
  }

  return decompressed;
}

// Function overloads for compressOptions
export function compressOptions(
  optionMap: StringOptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed?: boolean,
  warnOnUncompressed?: boolean
): string;
export function compressOptions(
  optionMap: NumberOptionMap,
  selectedOptions: SelectedOptions,
  includeUncompressed?: boolean,
  warnOnUncompressed?: boolean
): string;
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
    || !Array.isArray(selectedOptions)) {
    console.warn('Selected options must be an array.');
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

// Function overloads for decompressOptions
export function decompressOptions(
  optionMap: StringOptionMap,
  compressed: string
): SelectedOptions;
export function decompressOptions(
  optionMap: NumberOptionMap,
  compressed: string
): SelectedOptions;
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
