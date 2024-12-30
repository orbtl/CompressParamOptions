// Javascript numbers are accurate up to 15 digits
// At 49 bits, the max int is 562,949,953,421,312 which is 15 digits.  50 bits would go over
const maxBitDepth = 49;

const compressOptions = (
  optionMap,
  selectedOptions,
  includeUncompressed = false,
  warnOnUncompressed = true
) => {
  let compressed = [];
  let binaryRepresentation = [];
  const optionMapKeys = Object.keys(optionMap);

  for (const i = 0; i < optionMapKeys.length; i++) {
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

export default compressOptions;
