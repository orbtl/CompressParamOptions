import { describe, it, expect, vi } from 'vitest';
import { compressOptions } from './index.js';
import { 
  binaryNumberToCharacter, 
  binaryStringToCharacterer, 
  handleUncaughtOptions, 
  stringCompression,
  bitwiseCompression,
  compressCore
} from './compression.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap } from '../types/types.js';
import { CompressionOptions } from '../types/types.js';

describe('compressOptions', () => {
  describe('StringOptionMap', () => {
    const stringOptions: StringOptionMap = {
      'option1': 'value1',
      'option2': 'value2',
      'option3': 'value3',
      'option4': 'value4'
    };

    it('should compress selected options correctly', () => {
      const selected = new Set(['value1', 'value3']);
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('e'); // Binary: 101000 -> 40 (decimal) -> 'e'
    });

    it('should handle empty selection', () => {
      const selected = new Set<string>();
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('0'); // Binary: 000000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = new Set(['value1', 'value2', 'value3', 'value4']);
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('y'); // Binary: 111100 -> 60 (decimal) -> 'y'
    });

    it('should handle uncompressed options when includeUncompressed is true', () => {
      const selected = new Set(['value1', 'unknown_option']);
      const options = new CompressionOptions(true, false);
      const result = compressOptions(stringOptions, selected, options);
      expect(result).toBe('W,unknown_option'); // Binary: 100000 -> 32 (decimal) -> 'W', then separator and unknown option
    });

    it('should warn about uncompressed options when warnOnUncompressed is true', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
      const selected = new Set(['value1', 'unknown_option']);
      const options = new CompressionOptions(false, true);
      compressOptions(stringOptions, selected, options);
      expect(consoleSpy).toHaveBeenCalledWith(
        'The following options are not in the optionMap and cannot be compressed:',
        ['unknown_option']
      );
      consoleSpy.mockRestore();
    });

    it('should handle invalid selectedOptions input', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
      const result = compressOptions(stringOptions, null as any);
      expect(result).toBe('');
      expect(consoleSpy).toHaveBeenCalledWith('Selected options must be a Set.');
      consoleSpy.mockRestore();
    });
  });

  describe('NumberOptionMap', () => {
    const numberOptions: NumberOptionMap = {
      1: 'feature_a',
      2: 'feature_b',
      3: 'feature_c',
      4: 'feature_d'
    };

    it('should compress selected options correctly', () => {
      const selected = new Set(['feature_a', 'feature_c']);
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('e'); // Binary: 101000 -> 40 (decimal) -> 'e'
    });

    it('should handle empty selection', () => {
      const selected = new Set<string>();
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('0'); // Binary: 000000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = new Set(['feature_a', 'feature_b', 'feature_c', 'feature_d']);
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('y'); // Binary: 111100 -> 60 (decimal) -> 'y'
    });
  });

  describe('ArrayOptionMap', () => {
    const arrayOptions: ArrayOptionMap = ['red', 'blue', 'green', 'yellow'];

    it('should compress selected options correctly', () => {
      const selected = new Set(['red', 'green']);
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('e'); // Binary: 101000 -> 40 (decimal) -> 'e'
    });

    it('should handle empty selection', () => {
      const selected = new Set<string>();
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('0'); // Binary: 000000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = new Set(['red', 'blue', 'green', 'yellow']);
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('y'); // Binary: 111100 -> 60 (decimal) -> 'y'
    });

    it('should handle uncompressed options', () => {
      const selected = new Set(['red', 'purple']);
      const options = new CompressionOptions(true, false);
      const result = compressOptions(arrayOptions, selected, options);
      expect(result).toBe('W,purple'); // Binary: 100000 -> 32 (decimal) -> 'W', then separator and unknown option
    });
  });

  describe('Large option sets', () => {
    it('should handle options that span multiple characters', () => {
      const largeOptions: StringOptionMap = {};
      for (let i = 0; i < 10; i++) {
        largeOptions[`option${i}`] = `value${i}`;
      }

      const selected = new Set(['value0', 'value6', 'value7', 'value8']);
      const result = compressOptions(largeOptions, selected);
      expect(result).toHaveLength(2); // Should span 2 characters
    });

    it('should handle very large option sets', () => {
      const veryLargeOptions: NumberOptionMap = {};
      for (let i = 0; i < 100; i++) {
        veryLargeOptions[i] = `feature_${i}`;
      }

      const selected = new Set(['feature_0', 'feature_99']);
      const result = compressOptions(veryLargeOptions, selected);
      expect(result.length).toBeGreaterThan(10); // Should span many characters
    });
  });
});

describe('Compression Utility Functions', () => {
  describe('binaryNumberToCharacter', () => {
    it('should convert binary number to character correctly', () => {
      expect(binaryNumberToCharacter(0)).toBe('0');
      expect(binaryNumberToCharacter(1)).toBe('1');
      expect(binaryNumberToCharacter(32)).toBe('W');
      expect(binaryNumberToCharacter(63)).toBe('_');
    });

    it('should throw error for out of bounds values', () => {
      expect(() => binaryNumberToCharacter(-1)).toThrow('Binary value -1 is out of bounds for safe characters.');
      expect(() => binaryNumberToCharacter(64)).toThrow('Binary value 64 is out of bounds for safe characters.');
      expect(() => binaryNumberToCharacter(100)).toThrow('Binary value 100 is out of bounds for safe characters.');
    });
  });

  describe('binaryStringToCharacterer', () => {
    it('should convert binary string to character correctly', () => {
      expect(binaryStringToCharacterer('000000')).toBe('0');
      expect(binaryStringToCharacterer('000001')).toBe('1');
      expect(binaryStringToCharacterer('100000')).toBe('W');
      expect(binaryStringToCharacterer('111111')).toBe('_');
    });

    it('should handle binary strings with leading zeros', () => {
      expect(binaryStringToCharacterer('000010')).toBe('2');
      expect(binaryStringToCharacterer('001010')).toBe('A');
    });

    it('should throw error for out of bounds binary strings', () => {
      expect(() => binaryStringToCharacterer('1000000')).toThrow('Binary string 1000000 results in intValue 64 which is out of bounds for safe characters.');
      expect(() => binaryStringToCharacterer('1111111')).toThrow('Binary string 1111111 results in intValue 127 which is out of bounds for safe characters.');
    });
  });

  describe('handleUncaughtOptions', () => {
    it('should return empty string when no uncaught options', () => {
      const selectedOptions = new Set(['value1', 'value2']);
      const allValues = new Set(['value1', 'value2', 'value3']);
      const options = new CompressionOptions(false, false);
      
      const result = handleUncaughtOptions(selectedOptions, allValues, options);
      expect(result).toBe('');
    });

    it('should return empty string when includeUncompressed is false', () => {
      const selectedOptions = new Set(['value1', 'unknown']);
      const allValues = new Set(['value1', 'value2']);
      const options = new CompressionOptions(false, false);
      
      const result = handleUncaughtOptions(selectedOptions, allValues, options);
      expect(result).toBe('');
    });

    it('should include uncaught options when includeUncompressed is true', () => {
      const selectedOptions = new Set(['value1', 'unknown1', 'unknown2']);
      const allValues = new Set(['value1', 'value2']);
      const options = new CompressionOptions(true, false);
      
      const result = handleUncaughtOptions(selectedOptions, allValues, options);
      expect(result).toBe(',unknown1,unknown2');
    });

    it('should warn about uncaught options when warnOnUncompressed is true', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const selectedOptions = new Set(['value1', 'unknown1', 'unknown2']);
      const allValues = new Set(['value1', 'value2']);
      const options = new CompressionOptions(false, true);
      
      handleUncaughtOptions(selectedOptions, allValues, options);
      expect(consoleSpy).toHaveBeenCalledWith(
        'The following options are not in the optionMap and cannot be compressed:',
        ['unknown1', 'unknown2']
      );
      consoleSpy.mockRestore();
    });

    it('should use custom separation character', () => {
      const selectedOptions = new Set(['value1', 'unknown1', 'unknown2']);
      const allValues = new Set(['value1', 'value2']);
      const options = new CompressionOptions(true, false, '|');
      
      const result = handleUncaughtOptions(selectedOptions, allValues, options);
      expect(result).toBe('|unknown1|unknown2');
    });
  });

  describe('stringCompression', () => {
    const keys = ['key1', 'key2', 'key3', 'key4'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should compress selected options using string method', () => {
      const selectedOptions = new Set(['value_key1', 'value_key3']);
      const result = stringCompression(keys, getValue, selectedOptions);
      expect(result).toBe('e'); // Binary: 101000 -> 40 -> 'e'
    });

    it('should handle empty selection', () => {
      const selectedOptions = new Set<string>();
      const result = stringCompression(keys, getValue, selectedOptions);
      expect(result).toBe('0'); // Binary: 000000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selectedOptions = new Set(['value_key1', 'value_key2', 'value_key3', 'value_key4']);
      const result = stringCompression(keys, getValue, selectedOptions);
      expect(result).toBe('y'); // Binary: 111100 -> 60 -> 'y'
    });

    it('should handle keys not divisible by character bit depth', () => {
      const shortKeys = ['key1', 'key2'];
      const selectedOptions = new Set(['value_key1']);
      const result = stringCompression(shortKeys, getValue, selectedOptions);
      expect(result).toBe('W'); // Binary: 100000 -> 32 -> 'W'
    });
  });

  describe('bitwiseCompression', () => {
    const keys = ['key1', 'key2', 'key3', 'key4'];
    const getValue = (key: string | number) => `value_${key}`;

    it('should compress selected options using bitwise method', () => {
      const selectedOptions = new Set(['value_key1', 'value_key3']);
      const result = bitwiseCompression(keys, getValue, selectedOptions);
      expect(result).toBe('e'); // Binary: 101000 -> 40 -> 'e'
    });

    it('should handle empty selection', () => {
      const selectedOptions = new Set<string>();
      const result = bitwiseCompression(keys, getValue, selectedOptions);
      expect(result).toBe('0'); // Binary: 000000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selectedOptions = new Set(['value_key1', 'value_key2', 'value_key3', 'value_key4']);
      const result = bitwiseCompression(keys, getValue, selectedOptions);
      expect(result).toBe('y'); // Binary: 111100 -> 60 -> 'y'
    });

    it('should handle keys not divisible by character bit depth', () => {
      const shortKeys = ['key1', 'key2'];
      const selectedOptions = new Set(['value_key1']);
      const result = bitwiseCompression(shortKeys, getValue, selectedOptions);
      expect(result).toBe('W'); // Binary: 100000 -> 32 -> 'W'
    });
  });

  describe('compressCore', () => {
    const keys = ['key1', 'key2', 'key3', 'key4'];
    const getValue = (key: string | number) => `value_${key}`;
    const allValues = new Set(['value_key1', 'value_key2', 'value_key3', 'value_key4']);

    it('should use bitwise compression when useBitwiseCompression is true', () => {
      const selectedOptions = new Set(['value_key1', 'value_key3']);
      const options = new CompressionOptions(false, false, ',', true);
      
      const result = compressCore(keys, getValue, allValues, selectedOptions, options);
      expect(result).toBe('e'); // Should match bitwise compression result
    });

    it('should use string compression when useBitwiseCompression is false', () => {
      const selectedOptions = new Set(['value_key1', 'value_key3']);
      const options = new CompressionOptions(false, false, ',', false);
      
      const result = compressCore(keys, getValue, allValues, selectedOptions, options);
      expect(result).toBe('e'); // Should match string compression result
    });

    it('should handle uncaught options', () => {
      const selectedOptions = new Set(['value_key1', 'unknown_option']);
      const options = new CompressionOptions(true, false);
      
      const result = compressCore(keys, getValue, allValues, selectedOptions, options);
      expect(result).toBe('W,unknown_option');
    });

    it('should warn about uncaught options when warnOnUncompressed is true', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const selectedOptions = new Set(['value_key1', 'unknown_option']);
      const options = new CompressionOptions(false, true);
      
      compressCore(keys, getValue, allValues, selectedOptions, options);
      expect(consoleSpy).toHaveBeenCalledWith(
        'The following options are not in the optionMap and cannot be compressed:',
        ['unknown_option']
      );
      consoleSpy.mockRestore();
    });
  });
});