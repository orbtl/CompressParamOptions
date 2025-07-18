import { CompressionOptions } from '../types/types.js';
import { safeCharacters, characterBitDepth } from '../constants.js';

export function binaryNumberToCharacter(binaryNumber: number): string {
  // For safety, ensure the value is within the range of safe characters
  if (binaryNumber >= safeCharacters.length || binaryNumber < 0) {
    throw new Error(`Binary value ${binaryNumber} is out of bounds for safe characters.`);
  }
  return safeCharacters[binaryNumber];
}

export function binaryStringToCharacterer(binaryString: string): string {
  const intValue = parseInt(binaryString, 2);
  if (intValue >= safeCharacters.length || intValue < 0) {
    throw new Error(`Binary string ${binaryString} results in intValue ${intValue} which is out of bounds for safe characters.`);
  }
  return safeCharacters[intValue];
}

export function handleUncaughtOptions(
  selectedOptions: Set<string>,
  allValues: Set<string>,
  compressionOptions: CompressionOptions
): string {
  const uncaughtOptions = [...selectedOptions].filter(o => !allValues.has(o));
  let result = '';

  if (uncaughtOptions.length > 0) {
    if (compressionOptions.warnOnUncompressed) {
      console.warn('The following options are not in the optionMap and cannot be compressed:', uncaughtOptions);
    }
    if (compressionOptions.includeUncompressed) {
      result = compressionOptions.separationCharacter + uncaughtOptions.join(compressionOptions.separationCharacter);
    }
  }

  return result;
}

export function stringCompression(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  selectedOptions: Set<string>,
): string {
  let compressed = '';
  let binaryRepresentation = '';

  for (let i = 0; i < keys.length; i++) {
    const value = getValue(keys[i]);
    // Add binary true or false for if this index of the optionMap is included
    binaryRepresentation += selectedOptions.has(value) ? '1' : '0';

    // If we get to our character bit depth or the end of the map,
    // convert the binary representation to a url-safe character and add it to compressed
    if (binaryRepresentation.length >= characterBitDepth || i === keys.length - 1) {
      // Handle cases where the optionsMap is not a multiple of characterBitDepth,
      // so that future additions to optionsMap don't change the binary representation
      // Note that during compression we pad the end so that 
      // we will end up iterating over the correct indices first during decompressionn
      const paddedBinary = binaryRepresentation.padEnd(characterBitDepth, '0');
      compressed += binaryStringToCharacterer(paddedBinary);
      binaryRepresentation = '';
    }
  }

  return compressed;
}

export function bitwiseCompression(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  selectedOptions: Set<string>,
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

      compressed += binaryNumberToCharacter(binaryRepresentation);
      binaryRepresentation = 0;
      currentBinaryBits = 0;
    }
  }

  return compressed;
}

// Shared compression logic
export function compressCore(
  keys: (string | number)[],
  getValue: (key: string | number) => string,
  allValues: Set<string>,
  selectedOptions: Set<string>,
  compressionOptions: CompressionOptions
): string {
  let compressed = compressionOptions.useBitwiseCompression
    ? bitwiseCompression(keys, getValue, selectedOptions)
    : stringCompression(keys, getValue, selectedOptions);

  // Handle options in selectedOptions that do not exist in the optionMap and can't be compressed,
  // but only if the user wants them included or warned on
  if (compressionOptions.warnOnUncompressed || compressionOptions.includeUncompressed) {
    compressed += handleUncaughtOptions(selectedOptions, allValues, compressionOptions);
  }

  return compressed;
}