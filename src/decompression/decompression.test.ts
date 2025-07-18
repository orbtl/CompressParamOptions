import { describe, it, expect, vi } from 'vitest';
import { decompressOptions } from './index.js';
import {
  characterToIndex,
  numberToBinaryString,
  handleUncaughtOptions,
  getValueFromKeyIndex,
  stringDecompression,
  bitwiseDecompression,
  decompressCore
} from './decompression.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap } from '../types/types.js';
import { DecompressionOptions } from '../types/types.js';

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

describe('Decompression Utility Functions', () => {
  describe('characterToIndex', () => {
    it('should convert characters to indices correctly', () => {
      expect(characterToIndex('0')).toBe(0);
      expect(characterToIndex('1')).toBe(1);
      expect(characterToIndex('9')).toBe(9);
      expect(characterToIndex('A')).toBe(10);
      expect(characterToIndex('Z')).toBe(35);
      expect(characterToIndex('a')).toBe(36);
      expect(characterToIndex('z')).toBe(61);
      expect(characterToIndex('-')).toBe(62);
      expect(characterToIndex('_')).toBe(63);
    });

    it('should throw error for invalid characters', () => {
      expect(() => characterToIndex('!')).toThrow('Character ! is not a valid character.');
      expect(() => characterToIndex(' ')).toThrow('Character   is not a valid character.');
      expect(() => characterToIndex('~')).toThrow('Character ~ is not a valid character.');
    });
  });

  describe('numberToBinaryString', () => {
    it('should convert numbers to binary strings with correct padding', () => {
      expect(numberToBinaryString(0)).toBe('000000');
      expect(numberToBinaryString(1)).toBe('000001');
      expect(numberToBinaryString(32)).toBe('100000');
      expect(numberToBinaryString(63)).toBe('111111');
    });

    it('should handle edge cases correctly', () => {
      expect(numberToBinaryString(2)).toBe('000010');
      expect(numberToBinaryString(10)).toBe('001010');
      expect(numberToBinaryString(40)).toBe('101000');
    });
  });

  describe('handleUncaughtOptions', () => {
    it('should handle single uncaught option', () => {
      const compressed = 'option1';
      const options = new DecompressionOptions(',', true);

      const result = handleUncaughtOptions(compressed, 0, options);
      expect(result).toEqual(new Set(['option1']));
    });

    it('should handle multiple uncaught options', () => {
      const compressed = 'option1,option2,option3';
      const options = new DecompressionOptions(',', true);

      const result = handleUncaughtOptions(compressed, 0, options);
      expect(result).toEqual(new Set(['option1', 'option2', 'option3']));
    });

    it('should handle custom separation character', () => {
      const compressed = 'option1|option2|option3';
      const options = new DecompressionOptions('|', true);

      const result = handleUncaughtOptions(compressed, 0, options);
      expect(result).toEqual(new Set(['option1', 'option2', 'option3']));
    });

    it('should handle empty uncaught options', () => {
      const compressed = '';
      const options = new DecompressionOptions(',', true);

      const result = handleUncaughtOptions(compressed, 0, options);
      expect(result).toEqual(new Set());
    });

    it('should handle uncaught options starting from middle of string', () => {
      const compressed = 'W,option1,option2';
      const options = new DecompressionOptions(',', true);

      const result = handleUncaughtOptions(compressed, 2, options);
      expect(result).toEqual(new Set(['option1', 'option2']));
    });
  });

  describe('getValueFromKeyIndex', () => {
    const keys = ['key1', 'key2', 'key3', 'key4'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should return correct value for valid key index', () => {
      expect(getValueFromKeyIndex(0, keys, getValue)).toBe('value_key1');
      expect(getValueFromKeyIndex(1, keys, getValue)).toBe('value_key2');
      expect(getValueFromKeyIndex(3, keys, getValue)).toBe('value_key4');
    });

    it('should handle out of bounds indices gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

      const result = getValueFromKeyIndex(10, keys, getValue);
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Key index 10 is out of bounds for the keys array.');

      consoleSpy.mockRestore();
    });

    it('should handle negative indices gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

      const result = getValueFromKeyIndex(-1, keys, getValue);
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Key index -1 is out of bounds for the keys array.');

      consoleSpy.mockRestore();
    });

    it('should handle undefined values gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      const getUndefinedValue = (): string => undefined as any;

      const result = getValueFromKeyIndex(0, keys, getUndefinedValue);
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Value for key key1 at index 0 is undefined in the optionMap.');

      consoleSpy.mockRestore();
    });
  });

  describe('stringDecompression', () => {
    const keys = ['key1', 'key2', 'key3', 'key4', 'key5', 'key6', 'key7'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should decompress character using string method', () => {
      const result = stringDecompression(40, 0, keys, getValue); // 40 = 101000 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key3']));
    });

    it('should handle empty selection', () => {
      const result = stringDecompression(0, 0, keys, getValue); // 0 = 000000 binary
      expect(result).toEqual(new Set());
    });

    it('should handle all bits set', () => {
      const result = stringDecompression(63, 0, keys, getValue); // 63 = 111111 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key2', 'value_key3', 'value_key4', 'value_key5', 'value_key6']));
    });

    it('should handle keys beyond the available range', () => {
      const shortKeys = ['key1', 'key2'];
      const result = stringDecompression(63, 0, shortKeys, getValue); // 63 = 111111 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key2'])); // Should only include available keys
    });

    it('should handle multiple compressed iterations', () => {
      const result = stringDecompression(32, 1, keys, getValue); // 32 = 100000 binary, second iteration
      expect(result).toEqual(new Set(['value_key7'])); // Should offset by 6 positions
    });
  });

  describe('bitwiseDecompression', () => {
    const keys = ['key1', 'key2', 'key3', 'key4', 'key5', 'key6', 'key7'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should decompress character using bitwise method', () => {
      const result = bitwiseDecompression(40, 0, keys, getValue); // 40 = 101000 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key3']));
    });

    it('should handle empty selection', () => {
      const result = bitwiseDecompression(0, 0, keys, getValue); // 0 = 000000 binary
      expect(result).toEqual(new Set());
    });

    it('should handle all bits set', () => {
      const result = bitwiseDecompression(63, 0, keys, getValue); // 63 = 111111 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key2', 'value_key3', 'value_key4', 'value_key5', 'value_key6']));
    });

    it('should handle keys beyond the available range', () => {
      const shortKeys = ['key1', 'key2'];
      const result = bitwiseDecompression(63, 0, shortKeys, getValue); // 63 = 111111 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key2'])); // Should only include available keys
    });

    it('should handle multiple compressed iterations', () => {
      const result = bitwiseDecompression(32, 1, keys, getValue); // 32 = 100000 binary, second iteration
      expect(result).toEqual(new Set(['value_key7'])); // Should offset by 6 positions
    });
  });

  describe('decompressCore', () => {
    const keys = ['key1', 'key2', 'key3', 'key4'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should use bitwise decompression when useBitwiseDecompression is true', () => {
      const options = new DecompressionOptions(',', true);
      const result = decompressCore(keys, getValue, 'e', options); // 'e' = 40 = 101000 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key3']));
    });

    it('should use string decompression when useBitwiseDecompression is false', () => {
      const options = new DecompressionOptions(',', false);
      const result = decompressCore(keys, getValue, 'e', options); // 'e' = 40 = 101000 binary
      expect(result).toEqual(new Set(['value_key1', 'value_key3']));
    });

    it('should handle multiple characters', () => {
      const options = new DecompressionOptions(',', true);
      const result = decompressCore(keys, getValue, '00', options); // Two characters of all zeros
      expect(result).toEqual(new Set());
    });

    it('should handle uncaught options', () => {
      const options = new DecompressionOptions(',', true);
      const result = decompressCore(keys, getValue, 'W,unknown_option', options);
      expect(result).toEqual(new Set(['value_key1', 'unknown_option']));
    });

    it('should handle multiple uncaught options', () => {
      const options = new DecompressionOptions(',', true);
      const result = decompressCore(keys, getValue, 'W,unknown1,unknown2', options);
      expect(result).toEqual(new Set(['value_key1', 'unknown1', 'unknown2']));
    });

    it('should handle custom separation character', () => {
      const options = new DecompressionOptions('|', true);
      const result = decompressCore(keys, getValue, 'W|unknown1|unknown2', options);
      expect(result).toEqual(new Set(['value_key1', 'unknown1', 'unknown2']));
    });

    it('should handle empty compressed string', () => {
      const options = new DecompressionOptions(',', true);
      const result = decompressCore(keys, getValue, '', options);
      expect(result).toEqual(new Set());
    });

    it('should handle invalid characters', () => {
      const options = new DecompressionOptions(',', true);
      expect(() => decompressCore(keys, getValue, '!', options)).toThrow('Character ! is not a valid character.');
    });
  });
});