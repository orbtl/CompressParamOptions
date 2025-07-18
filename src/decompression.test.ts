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
      const compressed = 'e'; // Binary: 101000 -> Set(['value1', 'value3'])
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(new Set(['value1', 'value3']));
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 000000 -> Set()
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(new Set());
    });

    it('should handle all options selected', () => {
      const compressed = 'y'; // Binary: 111100 -> all values
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(new Set(['value1', 'value2', 'value3', 'value4']));
    });

    it('should handle compressed string with uncompressed options', () => {
      const compressed = 'W,unknown_option'; // Binary: 100000 -> Set(['value1']) + uncompressed
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(new Set(['value1', 'unknown_option']));
    });

    it('should handle multiple uncompressed options', () => {
      const compressed = 'W,unknown1,unknown2'; // Binary: 100000 -> Set(['value1']) + multiple uncompressed
      const result = decompressOptions(stringOptions, compressed);
      expect(result).toEqual(new Set(['value1', 'unknown1', 'unknown2']));
    });

    it('should handle invalid compressed input', () => {
      const result = decompressOptions(stringOptions, null as any);
      expect(result).toEqual(new Set());
    });

    it('should handle empty string', () => {
      const result = decompressOptions(stringOptions, '');
      expect(result).toEqual(new Set());
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
      const compressed = 'e'; // Binary: 101000 -> Set(['feature_a', 'feature_c'])
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(new Set(['feature_a', 'feature_c']));
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 000000 -> Set()
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(new Set());
    });

    it('should handle all options selected', () => {
      const compressed = 'y'; // Binary: 111100 -> all values
      const result = decompressOptions(numberOptions, compressed);
      expect(result).toEqual(new Set(['feature_a', 'feature_b', 'feature_c', 'feature_d']));
    });
  });

  describe('ArrayOptionMap', () => {
    const arrayOptions: ArrayOptionMap = ['red', 'blue', 'green', 'yellow'];

    it('should decompress correctly', () => {
      const compressed = 'e'; // Binary: 101000 -> Set(['red', 'green'])
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(new Set(['red', 'green']));
    });

    it('should handle empty compression', () => {
      const compressed = '0'; // Binary: 000000 -> Set()
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(new Set());
    });

    it('should handle all options selected', () => {
      const compressed = 'y'; // Binary: 111100 -> all values
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(new Set(['red', 'blue', 'green', 'yellow']));
    });

    it('should handle compressed string with uncompressed options', () => {
      const compressed = 'W,purple'; // Binary: 100000 -> Set(['red']) + uncompressed
      const result = decompressOptions(arrayOptions, compressed);
      expect(result).toEqual(new Set(['red', 'purple']));
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
      const compressed = 'RmW01_'; // 011011 110000 100000 000000 000001 111111 -> 27 48 32 0 1 63
      const result = decompressOptions(largeOptions, compressed);
      expect(result).toEqual(new Set([
        'value1', 'value2', 'value4', 'value5', 'value6', 'value7', 'value12', 'value29', 'value30', 'value31', 'value32', 'value33', 'value34', 'value35'
      ]));
    });

    it('should handle very large option sets with gaps', () => {
      const veryLargeOptions: NumberOptionMap = {};
      for (let i = 0; i < 1000; i++) {
        veryLargeOptions[i] = `feature_${i}`;
      }

      const compressed = 'W0000001';
      const result = decompressOptions(veryLargeOptions, compressed);
      expect(result).toEqual(new Set(['feature_0', 'feature_47']));
    });
  });

  describe('Edge cases', () => {
    it('should handle invalid characters gracefully', () => {
      const options: StringOptionMap = { 'a': 'value1' };
      expect(() => {
        decompressOptions(options, '!'); // Invalid character
      }).toThrow('Character ! is not a valid character.');
    });

    it('should handle single character options', () => {
      const singleOption: StringOptionMap = { 'a': 'value1' };
      const compressed = 'W'; // Binary: 100000 -> should select first option
      const result = decompressOptions(singleOption, compressed);
      expect(result).toEqual(new Set(['value1']));
    });
  });
});