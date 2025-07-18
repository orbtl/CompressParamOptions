import { describe, it, expect } from 'vitest';
import { compressOptions, decompressOptions } from './index.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap } from './types/types.js';
import { CompressionOptions } from './types/types.js';

describe('Integration Tests - Compression and Decompression', () => {
  describe('Round-trip tests', () => {
    it('should preserve data through compression and decompression - StringOptionMap', () => {
      const options: StringOptionMap = {
        'darkMode': 'dark_mode',
        'notifications': 'enable_notifications',
        'autoSave': 'auto_save',
        'spellCheck': 'spell_check'
      };
      
      const originalSelected = new Set(['dark_mode', 'auto_save']);
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should preserve data through compression and decompression - NumberOptionMap', () => {
      const options: NumberOptionMap = {
        1: 'feature_a',
        2: 'feature_b',
        3: 'feature_c',
        4: 'feature_d'
      };
      
      const originalSelected = new Set(['feature_a', 'feature_c', 'feature_d']);
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should preserve data through compression and decompression - ArrayOptionMap', () => {
      const options: ArrayOptionMap = ['red', 'blue', 'green', 'yellow', 'purple'];
      
      const originalSelected = new Set(['red', 'yellow', 'purple']);
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle empty selections', () => {
      const options: StringOptionMap = {
        'a': 'option1',
        'b': 'option2',
        'c': 'option3'
      };
      
      const originalSelected = new Set<string>();
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle all options selected', () => {
      const options: ArrayOptionMap = ['alpha', 'beta', 'gamma', 'delta'];
      
      const originalSelected = new Set(['alpha', 'beta', 'gamma', 'delta']);
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle single option selected', () => {
      const options: StringOptionMap = {
        'first': 'option1',
        'second': 'option2',
        'third': 'option3'
      };
      
      const originalSelected = new Set(['option2']);
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });
  });

  describe('Large dataset tests', () => {
    it('should handle large StringOptionMap efficiently', () => {
      const options: StringOptionMap = {};
      const originalSelected = new Set<string>();
      
      // Create 100 options
      for (let i = 0; i < 100; i++) {
        options[`key_${i}`] = `value_${i}`;
        if (i % 5 === 0) { // Select every 5th option
          originalSelected.add(`value_${i}`);
        }
      }
      
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
      expect(compressed.length).toBeLessThan(Array.from(originalSelected).join('').length);
    });

    it('should handle large NumberOptionMap efficiently', () => {
      const options: NumberOptionMap = {};
      const originalSelected = new Set<string>();
      
      // Create 50 options
      for (let i = 0; i < 50; i++) {
        options[i] = `feature_${i}`;
        if (i % 3 === 0) { // Select every 3rd option
          originalSelected.add(`feature_${i}`);
        }
      }
      
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle large ArrayOptionMap efficiently', () => {
      const options: ArrayOptionMap = [];
      const originalSelected = new Set<string>();
      
      // Create 75 options
      for (let i = 0; i < 75; i++) {
        const value = `item_${i}`;
        options.push(value);
        if (i % 4 === 0) { // Select every 4th option
          originalSelected.add(value);
        }
      }
      
      const compressed = compressOptions(options, originalSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });
  });

  describe('Uncompressed options handling', () => {
    it('should handle uncompressed options in round-trip', () => {
      const options: StringOptionMap = {
        'a': 'option1',
        'b': 'option2',
        'c': 'option3'
      };
      
      const originalSelected = new Set(['option1', 'unknown_option', 'option3']);
      const compressionOptions = new CompressionOptions(true, false);
      const compressed = compressOptions(options, originalSelected, compressionOptions);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle multiple uncompressed options', () => {
      const options: ArrayOptionMap = ['red', 'blue', 'green'];
      
      const originalSelected = new Set(['red', 'purple', 'orange', 'green']);
      const compressionOptions = new CompressionOptions(true, false);
      const compressed = compressOptions(options, originalSelected, compressionOptions);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });

    it('should handle only uncompressed options', () => {
      const options: StringOptionMap = {
        'a': 'option1',
        'b': 'option2'
      };
      
      const originalSelected = new Set(['unknown1', 'unknown2']);
      const compressionOptions = new CompressionOptions(true, false);
      const compressed = compressOptions(options, originalSelected, compressionOptions);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(originalSelected);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle user preferences scenario', () => {
      const userPreferences: StringOptionMap = {
        'darkMode': 'dark_mode',
        'notifications': 'enable_notifications',
        'autoSave': 'auto_save',
        'spellCheck': 'spell_check',
        'autoComplete': 'auto_complete',
        'lineNumbers': 'show_line_numbers',
        'wordWrap': 'word_wrap',
        'minimap': 'show_minimap'
      };
      
      const userSelections = new Set([
        'dark_mode',
        'auto_save',
        'show_line_numbers',
        'word_wrap'
      ]);
      
      const compressed = compressOptions(userPreferences, userSelections);
      const decompressed = decompressOptions(userPreferences, compressed);
      
      expect(decompressed).toEqual(userSelections);
      expect(compressed.length).toBeLessThan(Array.from(userSelections).join('').length);
    });

    it('should handle feature flags scenario', () => {
      const featureFlags: NumberOptionMap = {};
      for (let i = 1; i <= 20; i++) {
        featureFlags[i] = `FEATURE_${i}_ENABLED`;
      }
      
      const enabledFeatures = new Set([
        'FEATURE_1_ENABLED',
        'FEATURE_5_ENABLED',
        'FEATURE_12_ENABLED',
        'FEATURE_20_ENABLED'
      ]);
      
      const compressed = compressOptions(featureFlags, enabledFeatures);
      const decompressed = decompressOptions(featureFlags, compressed);
      
      expect(decompressed).toEqual(enabledFeatures);
    });

    it('should handle color selection scenario', () => {
      const colors: ArrayOptionMap = [
        'red', 'blue', 'green', 'yellow', 'purple', 'orange',
        'pink', 'black', 'white', 'gray', 'brown', 'cyan'
      ];
      
      const selectedColors = new Set(['red', 'blue', 'black', 'white']);
      
      const compressed = compressOptions(colors, selectedColors);
      const decompressed = decompressOptions(colors, compressed);
      
      expect(decompressed).toEqual(selectedColors);
    });
  });

  describe('Compression efficiency', () => {
    it('should achieve compression for moderate datasets', () => {
      const options: StringOptionMap = {};
      const selected = new Set<string>();
      
      // Create 30 options, select 5
      for (let i = 0; i < 30; i++) {
        options[`option_${i}`] = `very_long_option_name_${i}`;
        if (i < 5) {
          selected.add(`very_long_option_name_${i}`);
        }
      }
      
      const compressed = compressOptions(options, selected);
      const originalSize = Array.from(selected).join('').length;
      
      expect(compressed.length).toBeLessThan(originalSize);
      
      // Verify decompression works
      const decompressed = decompressOptions(options, compressed);
      expect(decompressed).toEqual(selected);
    });

    it('should maintain correctness even with maximum selections', () => {
      const options: ArrayOptionMap = [];
      for (let i = 0; i < 64; i++) { // One full character worth of options
        options.push(`option_${i}`);
      }
      
      const allSelected = new Set(options);
      const compressed = compressOptions(options, allSelected);
      const decompressed = decompressOptions(options, compressed);
      
      expect(decompressed).toEqual(allSelected);
    });
  });
});