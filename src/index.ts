// Re-export types
export type {
  OptionMap,
  SelectedOptions,
  StringOptionMap,
  NumberOptionMap,
  ArrayOptionMap
} from './types/types.js';

// Re-export classes
export { CompressionOptions, DecompressionOptions } from './types/types.js';

// Re-export compression functionality
export { compressOptions } from './compression.js';

// Re-export decompression functionality
export { decompressOptions } from './decompression.js';