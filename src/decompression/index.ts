import type { OptionMap, SelectedOptions, StringOptionMap, NumberOptionMap, ArrayOptionMap } from '../types/types.js';
import { DecompressionOptions } from '../types/types.js';
import { decompressCore } from './decompression.js';

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * This function takes a compressed string created by compressOptions and reconstructs 
 * the original array of selected options using the provided option map as a reference.
 * 
 * @param optionMap - The same option map used during compression
 * @param compressed - The compressed string to decompress
 * @param decompressionOptions - Decompression options (optional, defaults to DecompressionOptions.default())
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
  compressed: string,
  decompressionOptions?: DecompressionOptions
): SelectedOptions;

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * @param optionMap - The same option map with numeric keys used during compression
 * @param compressed - The compressed string to decompress
 * @param decompressionOptions - Decompression options (optional, defaults to DecompressionOptions.default())
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
  compressed: string,
  decompressionOptions?: DecompressionOptions
): SelectedOptions;

/**
 * Decompresses a compressed string back into an array of selected options.
 * 
 * @param optionMap - The same array of options used during compression
 * @param compressed - The compressed string to decompress
 * @param decompressionOptions - Decompression options (optional, defaults to DecompressionOptions.default())
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
  compressed: string,
  decompressionOptions?: DecompressionOptions
): SelectedOptions;

export function decompressOptions(
  optionMap: OptionMap,
  compressed: string,
  decompressionOptions: DecompressionOptions = DecompressionOptions.default()
): SelectedOptions {
  if (typeof compressed !== 'string') {
    return new Set<string>();
  }

  if (Array.isArray(optionMap)) {
    // ArrayOptionMap
    const keys = Array.from({ length: optionMap.length }, (_, i) => i);
    return decompressCore(
      keys,
      (key) => optionMap[key as number],
      compressed,
      decompressionOptions
    );
  } else {
    // StringOptionMap or NumberOptionMap
    const keys = Object.keys(optionMap);
    return decompressCore(
      keys,
      (key) => optionMap[key as keyof typeof optionMap],
      compressed,
      decompressionOptions
    );
  }
}