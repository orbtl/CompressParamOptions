// Javascript numbers are accurate up to 15 digits
// At 49 bits, the max int is 562,949,953,421,312 which is 15 digits.  50 bits would go over
const maxBitDepth = 49;

export const compressOptions = (
  optionMap,
  selectedOptions,
  includeUncompressed = false,
  warnOnUncompressed = true
) => {
  let compressed = [];
  let binaryRepresentation = [];
  const optionMapKeys = Object.keys(optionMap);

  for (let i = 0; i < optionMapKeys.length; i++) {
    // Add binary true or false for if this index of the optionMap is included
    binaryRepresentation.push(selectedOptions.includes(optionMap[optionMapKeys[i]]) ? '1' : '0');

    // Add a series of numbers to compressed, each representing up to the maxBitDepth bits of binary information
    if (binaryRepresentation.length >= maxBitDepth || i === optionMapKeys.length - 1) {
      // We have reached the max length for our binary string or reached the end of the map,
      // convert to ddecimal and move on
      compressed.push(parseInt(binaryRepresentation.join(''), 2));
      binaryRepresentation = [];
    }

    // Handle options in selectedOptions that do not exist in the optionMap and can't be compressed
    const uncaughtOptions = selectedOptions.filter(o => !Object.values(objectMap).includes(o));
    if (uncaughtOptions.length > 0) {
      if (warnOnUncompressed) {
        console.warn('The following options are not in the optionMap and cannot be compressed:', uncaughtOptions);
      }
      if (includeUncompressed) {
        compressed.concat(uncaughtOptions);
      }
    }

    return compressed;
  }
};

export const decompressOptions = (
  optionMap,
  compressed
) => {
  if (typeof compressed === 'undefined'
    || compressed === null
    || !Array.isArray(compressed)) {
    return [];
  }
  
  const optionMapKeys = Object.keys(optionMap);
  const decompressed = [];

  for (let i = 0; i < compressed.length; i++) {
    // Handle situations where uncaught options were included in the compressed array
    if (!Number.isInteger(compressed[i])) {
      decompressed.push(compressed[i]);
      continue;
    }
    
    // Convert from int to binary string
    const binaryString = compressed[i].toString(2);
    // If the value is too low we might not end up with our full bit depth
    // Pad with any missing length of characters
    // But first have to make sure there are that many entries left in the map
    const lengthLeftInMap = optionMapKeys.length - (i * maxBitDepth);
    const offset = Math.min(maxBitDepth, lengthLeftInMap) - binaryString.length;

    for (let j = 0; j < binaryString.length; j++) {
      // Determine the key index in the optionMap based on our current position in the binaryString
      // plus the maxBitDepth times the compressed array index,
      // because each cycle represents a maxBitDepth amount of keys iterated over
      // But add the offset to account for leading zeros in the binary string that weren't generated when converting to binary
      const keyIndex = j + (i * maxBitDepth) + offset;
      const mapIndex = optionMapKeys[keyIndex];
      if (binaryString[j] === '1' && mapIndex in optionMap) {
        decompressed.push(optionMap[mapIndex]);
      }
    }
  }

  return decompressed;
}
