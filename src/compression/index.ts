import type { OptionMap, SelectedOptions, StringOptionMap, NumberOptionMap, ArrayOptionMap } from '../types/types.js';
import { CompressionOptions } from '../types/types.js';
import { compressCore } from './compression.js';

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * This function takes an option map and a list of selected options, then creates a binary 
 * representation where each bit indicates whether an option is selected. The binary data 
 * is then encoded using a URL-safe character set for compact storage or transmission.
 * 
 * @param optionMap - A map of options where keys are identifiers and values are the actual option values
 * @param selectedOptions - Array of selected option values to compress
 * @param compressionOptions - Compression options (optional, defaults to CompressionOptions.default())
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
  compressionOptions?: CompressionOptions
): string;

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * @param optionMap - A map of options with numeric keys and string values
 * @param selectedOptions - Array of selected option values to compress
 * @param compressionOptions - Compression options (optional, defaults to CompressionOptions.default())
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
  compressionOptions?: CompressionOptions
): string;

/**
 * Compresses a list of selected options into a compact URL-safe string representation.
 * 
 * @param optionMap - An array of option values where indices serve as keys
 * @param selectedOptions - Array of selected option values to compress
 * @param compressionOptions - Compression options (optional, defaults to CompressionOptions.default())
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
  compressionOptions?: CompressionOptions
): string;

export function compressOptions(
  optionMap: OptionMap,
  selectedOptions: SelectedOptions,
  compressionOptions: CompressionOptions = CompressionOptions.default()
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
      new Set([...optionMap]),
      selectedOptions,
      compressionOptions
    );
  } else {
    // StringOptionMap or NumberOptionMap
    const keys = Object.keys(optionMap);
    return compressCore(
      keys,
      (key) => optionMap[key as keyof typeof optionMap],
      new Set(Object.values(optionMap)),
      selectedOptions,
      compressionOptions
    );
  }
}