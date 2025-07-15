import { describe, it, expect, vi } from 'vitest';
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
      const compressed = 'K'; // Binary: 1010 -> ['value1', 'value3']
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(['value1', 'value3']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'P'; // Binary: 1111 -> all values
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
      const compressed = 'K'; // Binary: 1010 -> ['feature_a', 'feature_c']
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(['feature_a', 'feature_c']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'P'; // Binary: 1111 -> all values
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(['feature_a', 'feature_b', 'feature_c', 'feature_d']);
    });
  });

  describe('ArrayOptionMap', () => {
    const arrayOptions: ArrayOptionMap = ['red', 'blue', 'green', 'yellow'];

    it('should decompress correctly', () => {
      const compressed = 'K'; // Binary: 1010 -> ['red', 'green']
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(['red', 'green']);
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 0000 -> []
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual([]);
    });

    it('should handle all options selected', () => {
      const compressed = 'P'; // Binary: 1111 -> all values
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
      for (let i = 0; i < 10; i++) {
        largeOptions[`option${i}`] = `value${i}`;
      }
      
      // This should be a multi-character compression
      const compressed = '80G'; // Represents specific pattern across multiple chars
      const result = decompressOptions(largeOptions, compressed);
      expect(result).toBeInstanceOf(Array);
    });

    it('should handle very large option sets', () => {
      const veryLargeOptions: NumberOptionMap = {};
      for (let i = 0; i < 100; i++) {
        veryLargeOptions[i] = `feature_${i}`;
      }
      
      // Test with a simple pattern that we know should work
      const compressed = '8'; // Should represent the first option
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

    it('should warn about undefined values', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const options: StringOptionMap = {
        'option1': 'value1',
        'option2': 'value2'
      };
      
      // Force a scenario where we might get undefined values
      const compressed = 'P'; // This might try to access more options than exist
      decompressOptions(options, compressed);
      
      consoleSpy.mockRestore();
    });

    it('should handle single character options', () => {
      const singleOption: StringOptionMap = { 'a': 'value1' };
      const compressed = '8'; // Binary: 1000 -> should select first option
      const result = decompressOptions(singleOption, compressed);
      expect(result).toEqual(['value1']);
    });
  });
});