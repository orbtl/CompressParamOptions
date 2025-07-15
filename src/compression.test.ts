import { describe, it, expect, vi } from 'vitest';
import { compressOptions } from './compression.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';

describe('compressOptions', () => {
  describe('StringOptionMap', () => {
    const stringOptions: StringOptionMap = {
      'option1': 'value1',
      'option2': 'value2',
      'option3': 'value3',
      'option4': 'value4'
    };

    it('should compress selected options correctly', () => {
      const selected = ['value1', 'value3'];
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('A'); // Binary: 1010 -> 10 (decimal) -> 'A'
    });

    it('should handle empty selection', () => {
      const selected: string[] = [];
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('0'); // Binary: 0000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = ['value1', 'value2', 'value3', 'value4'];
      const result = compressOptions(stringOptions, selected);
      expect(result).toBe('F'); // Binary: 1111 -> 15 (decimal) -> 'F'
    });

    it('should handle uncompressed options when includeUncompressed is true', () => {
      const selected = ['value1', 'unknown_option'];
      const result = compressOptions(stringOptions, selected, true, false);
      expect(result).toBe('8,unknown_option'); // Binary: 1000 -> 8 (decimal) -> '8', then separator and unknown option
    });

    it('should warn about uncompressed options when warnOnUncompressed is true', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const selected = ['value1', 'unknown_option'];
      compressOptions(stringOptions, selected, false, true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'The following options are not in the optionMap and cannot be compressed:',
        ['unknown_option']
      );
      consoleSpy.mockRestore();
    });

    it('should handle invalid selectedOptions input', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = compressOptions(stringOptions, null as any);
      expect(result).toBe('');
      expect(consoleSpy).toHaveBeenCalledWith('Selected options must be an array.');
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
      const selected = ['feature_a', 'feature_c'];
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('A'); // Binary: 1010 -> 10 (decimal) -> 'A'
    });

    it('should handle empty selection', () => {
      const selected: string[] = [];
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('0'); // Binary: 0000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = ['feature_a', 'feature_b', 'feature_c', 'feature_d'];
      const result = compressOptions(numberOptions, selected);
      expect(result).toBe('F'); // Binary: 1111 -> 15 (decimal) -> 'F'
    });
  });

  describe('ArrayOptionMap', () => {
    const arrayOptions: ArrayOptionMap = ['red', 'blue', 'green', 'yellow'];

    it('should compress selected options correctly', () => {
      const selected = ['red', 'green'];
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('A'); // Binary: 1010 -> 10 (decimal) -> 'A'
    });

    it('should handle empty selection', () => {
      const selected: string[] = [];
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('0'); // Binary: 0000 -> 0 -> '0'
    });

    it('should handle all options selected', () => {
      const selected = ['red', 'blue', 'green', 'yellow'];
      const result = compressOptions(arrayOptions, selected);
      expect(result).toBe('F'); // Binary: 1111 -> 15 (decimal) -> 'F'
    });

    it('should handle uncompressed options', () => {
      const selected = ['red', 'purple'];
      const result = compressOptions(arrayOptions, selected, true, false);
      expect(result).toBe('8,purple'); // Binary: 1000 -> 8 (decimal) -> '8', then separator and unknown option
    });
  });

  describe('Large option sets', () => {
    it('should handle options that span multiple characters', () => {
      const largeOptions: StringOptionMap = {};
      for (let i = 0; i < 10; i++) {
        largeOptions[`option${i}`] = `value${i}`;
      }
      
      const selected = ['value0', 'value6', 'value7', 'value8'];
      const result = compressOptions(largeOptions, selected);
      expect(result).toHaveLength(2); // Should span 2 characters
    });

    it('should handle very large option sets', () => {
      const veryLargeOptions: NumberOptionMap = {};
      for (let i = 0; i < 100; i++) {
        veryLargeOptions[i] = `feature_${i}`;
      }
      
      const selected = ['feature_0', 'feature_99'];
      const result = compressOptions(veryLargeOptions, selected);
      expect(result.length).toBeGreaterThan(10); // Should span many characters
    });
  });
});