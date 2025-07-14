/*
  Built-in binary conversion in javascript is limited to string conversion, and does not reduce the size of the data.
  This implementation compresses options into a more compact form using a URL-safe character set.
*/

const safeCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.';
const characterBitDepth = safeCharacters.length;
const characterMap = {};
for (let i = 0; i < safeCharacters.length; i++) {
  characterMap[safeCharacters[i]] = i;
}

// For the purposes of options that are not in the map, we need a separation character to indicate
const separationCharacter = ',';

function binaryToCharacter(binaryString) {
  let intValue = parseInt(binaryString, 2);
  // For safety, ensure the value is within the range of safe characters
  return safeCharacters[intValue % characterBitDepth];
}

function characterToBinary(character) {
  const index = characterMap[character];
  if (index === undefined) {
    throw new Error(`Character ${character} is not a valid character.`);
  }
  // Note that we don't pad the start here,
  // As we need to ensure there are that many options left in the option map before padding
  return index.toString(2);
}

export const compressOptions = (
  optionMap,
  selectedOptions,
  includeUncompressed = false,
  warnOnUncompressed = true
) => {

  if (typeof selectedOptions === 'undefined'
    || selectedOptions === null
    || !Array.isArray(selectedOptions)) {
    console.warn('Selected options must be an array.');
    return '';
  }

  let compressed = '';
  let binaryRepresentation = '';
  const optionMapKeys = Object.keys(optionMap);

  for (let i = 0; i < optionMapKeys.length; i++) {
    // Add binary true or false for if this index of the optionMap is included
    binaryRepresentation += selectedOptions.includes(optionMap[optionMapKeys[i]]) ? '1' : '0';

    // If we get to our character bit depth or the end of the map,
    // convert the binary representation to a url-safe character and add it to compressed
    if (binaryRepresentation.length >= characterBitDepth || i === optionMapKeys.length - 1) {
      compressed += binaryToCharacter(binaryRepresentation);
      binaryRepresentation = '';
    }
  }

  // Handle options in selectedOptions that do not exist in the optionMap and can't be compressed
  const uncaughtOptions = selectedOptions.filter(o => !Object.values(objectMap).includes(o));
  if (uncaughtOptions.length > 0) {
    if (warnOnUncompressed) {
      console.warn('The following options are not in the optionMap and cannot be compressed:', uncaughtOptions);
    }
    if (includeUncompressed) {
      // Add the uncaught options as a string separated by the separation character, with a separation character at the start
      compressed += separationCharacter;
      compressed += uncaughtOptions.join(separationCharacter);
    }
  }

  return compressed;
};


export const decompressOptions = (
  optionMap,
  compressed
) => {
  if (typeof compressed !== 'string'
    && !(compressed instanceof String)) {
    return [];
  }

  const optionMapKeys = Object.keys(optionMap);
  const decompressed = [];

  let compressedIterator = 0;
  while (compressedIterator < compressed.length) {
    // Handle situations where uncaught options were included in the compressed array,
    // which would be indicated by the separation character
    if (compressed[compressedIterator] === separationCharacter) {
      // Move past the separation character
      compressedIterator++;
      const uncaughtOption = '';

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
    const lengthLeftInMap = optionMapKeys.length - (compressedIterator * characterBitDepth);
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
      const optionValue = optionMapKeys[keyIndex];
      decompressed.push(optionMap[optionValue]);
    }

    compressedIterator++;
  }

  return decompressed;
}
