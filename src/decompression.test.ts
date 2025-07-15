import { describe, it, expect } from 'vitest';
import { decompressOptions } from './decompression.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';

describe('decompressOptions', () => {
  describe('StringOptionMap', () => {
    const stringOptions: StringOptionMap = {
      'option1': 'value1',
      'option2': 'value2',
      'option3': 'value3',
      'option4': 'value4'
    };

    it('should decompress correctly', () => {
      const compressed = 'A'; // Binary: 1010 -> ['value1', 'value3']
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(['value1', 'value3']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'F'; // Binary: 1111 -> all values
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(['value1', 'value2', 'value3', 'value4']);
    });

    it('should handle compressed string with uncompressed options', () => {
      const compressed = '8,unknown_option'; // Binary: 1000 -> ['value1'] + uncompressed
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(['value1', 'unknown_option']);
    });

    it('should handle multiple uncompressed options', () => {
      const compressed = '8,unknown1,unknown2'; // Binary: 1000 -> ['value1'] + multiple uncompressed
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(['value1', 'unknown1', 'unknown2']);
    });

    it('should handle invalid compressed input', () => {
      const result = decompressOptions(stringOptions, null as any);
      expect(result).toEqual([]);
    });

    it('should handle empty string', () => {
      const result = decompressOptions(stringOptions, '');
      expect(result).toEqual([]);
    });
  });

  describe('NumberOptionMap', () => {
    const numberOptions: NumberOptionMap = {
      1: 'feature_a',
      2: 'feature_b',
      3: 'feature_c',
      4: 'feature_d'
    };

    it('should decompress correctly', () => {
      const compressed = 'A'; // Binary: 1010 -> ['feature_a', 'feature_c']
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(['feature_a', 'feature_c']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'F'; // Binary: 1111 -> all values
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(['feature_a', 'feature_b', 'feature_c', 'feature_d']);
    });
  });

  describe('ArrayOptionMap', () => {
    const arrayOptions: ArrayOptionMap = ['red', 'blue', 'green', 'yellow'];

    it('should decompress correctly', () => {
      const compressed = 'A'; // Binary: 1010 -> ['red', 'green']
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(['red', 'green']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'F'; // Binary: 1111 -> all values
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(['red', 'blue', 'green', 'yellow']);
    });

    it('should handle compressed string with uncompressed options', () => {
      const compressed = '8,purple'; // Binary: 1000 -> ['red'] + uncompressed
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(['red', 'purple']);
    });
  });

  describe('Large option sets', () => {
    it('should handle options that span multiple characters', () => {
      const largeOptions: StringOptionMap = {};
      for (let i = 0; i < 100; i++) {
        largeOptions[`option${i}`] = `value${i}`;
      }

      // Test with a valid multi-character compression
      // Use a pattern that should work with 100 options
      const compressed = '80'; // First char represents first 6 options, second char represents next 6
      const result = decompressOptions(largeOptions, compressed);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle very large option sets', () => {
      const veryLargeOptions: NumberOptionMap = {};
      for (let i = 0; i < 100; i++) {
        veryLargeOptions[i] = `feature_${i}`;
      }

      // Test with a simple pattern that we know should work
      // 'W' is index 32, binary 100000 (6 bits) - should select first option
      const compressed = 'W'; // Should represent the first option
      const result = decompressOptions(veryLargeOptions, compressed);
      expect(result).toContain('feature_0');
    });
  });

  describe('Edge cases', () => {
    it('should handle invalid characters gracefully', () => {
      const options: StringOptionMap = { 'a': 'value1' };
      expect(() => {
        decompressOptions(options, '!'); // Invalid character
      }).toThrow('Character ! is not a valid character.');
    });

    it('should throw error for negative offset (invalid compressed string)', () => {
      const options: StringOptionMap = { 'a': 'value1' };
      expect(() => {
        // Using a character that would result in a negative offset
        // Character '_' is index 63, which in binary is 111111 (6 bits)
        // For a single option, this would create a negative offset
        decompressOptions(options, '_');
      }).toThrow('Offset -5 is negative, indicating an invalid compressed string or option map.');
    });

    it('should handle single character options', () => {
      const singleOption: StringOptionMap = { 'a': 'value1' };
      const compressed = '1'; // Binary: 1 -> should select first option
      const result = decompressOptions(singleOption, compressed);
      expect(result).toEqual(['value1']);
    });

    it('should handle compressed strings that are too large for small option maps', () => {
      const smallOptions: StringOptionMap = { 'a': 'value1', 'b': 'value2' };
      expect(() => {
        // Character 'z' is index 61, binary 111101 (6 bits)
        // For only 2 options, this would create invalid offset
        decompressOptions(smallOptions, 'z');
      }).toThrow('Offset -4 is negative, indicating an invalid compressed string or option map.');
    });
  });
});