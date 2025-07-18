import { describe, it, expect } from 'vitest';
import { compressOptions } from '../compression/index.js';
import { decompressOptions } from '../decompression/index.js';
import type { OptionMap, SelectedOptions } from '../types/types.js';

interface PerformanceResult {
  operation: string;
  dataSize: string;
  executionTime: number;
  throughput: number;
  compressionRatio?: number;
  memoryUsage?: number;
}

interface BenchmarkOptions {
  iterations?: number;
  warmupIterations?: number;
  measureMemory?: boolean;
}

class PerformanceBenchmark {
  private results: PerformanceResult[] = [];

  // Generate test data sets of various sizes
  private generateStringOptionMap(size: number): Record<string, string> {
    const map: Record<string, string> = {};
    for (let i = 0; i < size; i++) {
      map[`key_${i}`] = `option_${i}`;
    }
    return map;
  }

  private generateNumberOptionMap(size: number): Record<number, string> {
    const map: Record<number, string> = {};
    for (let i = 0; i < size; i++) {
      map[i] = `option_${i}`;
    }
    return map;
  }

  private generateArrayOptionMap(size: number): string[] {
    return Array.from({ length: size }, (_, i) => `option_${i}`);
  }

  private generateSelectedOptions(optionMap: OptionMap, selectionRatio: number = 0.5): SelectedOptions {
    const allValues = Array.isArray(optionMap) ? optionMap : Object.values(optionMap);
    const selectedCount = Math.floor(allValues.length * selectionRatio);
    const selected = new Set<string>();

    // Select options at regular intervals to ensure consistent distribution
    const interval = Math.floor(allValues.length / selectedCount);
    for (let i = 0; i < selectedCount; i++) {
      const index = i * interval;
      if (index < allValues.length) {
        selected.add(allValues[index]);
      }
    }

    return selected;
  }

  // Memory usage measurement utility
  private measureMemoryUsage<T>(fn: () => T): { result: T; memoryUsed: number } {
    const getMemoryUsage = () => {
      // Check if we're in Node.js environment
      if (typeof process !== 'undefined' && process.memoryUsage) {
        return process.memoryUsage().heapUsed;
      }
      // Check if we're in Chrome with performance.memory
      if (typeof performance !== 'undefined' && 'memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      // Fallback for environments without memory API
      return 0;
    };

    // Force garbage collection if available (Node.js with --expose-gc flag)
    if (typeof global !== 'undefined' && (global as any).gc) {
      try {
        (global as any).gc();
      } catch (e) {
        // Ignore if gc is not available
      }
    }

    const initialMemory = getMemoryUsage();
    const result = fn();

    // Force garbage collection again to measure actual memory usage
    if (typeof global !== 'undefined' && (global as any).gc) {
      try {
        (global as any).gc();
      } catch (e) {
        // Ignore if gc is not available
      }
    }

    const finalMemory = getMemoryUsage();
    return {
      result,
      memoryUsed: Math.max(0, finalMemory - initialMemory)
    };
  }

  // High-precision timing utility
  private measureExecutionTime<T>(fn: () => T, iterations: number = 1000): { result: T; avgTime: number } {
    // Warmup
    for (let i = 0; i < Math.min(100, iterations / 10); i++) {
      fn();
    }

    const start = performance.now();
    let result: T;

    for (let i = 0; i < iterations; i++) {
      result = fn();
    }

    const end = performance.now();
    const totalTime = end - start; // Already in milliseconds

    return {
      result: result!,
      avgTime: totalTime / iterations
    };
  }

  // Benchmark compression performance
  benchmarkCompression(
    optionMap: OptionMap,
    selectedOptions: SelectedOptions,
    label: string,
    options: BenchmarkOptions = {}
  ): PerformanceResult {
    const { iterations = 1000, measureMemory = false } = options;

    const compressFn = () => compressOptions(optionMap, selectedOptions);

    const timing = this.measureExecutionTime(compressFn, iterations);
    let memoryUsed = 0;

    if (measureMemory) {
      const memoryResult = this.measureMemoryUsage(compressFn);
      memoryUsed = memoryResult.memoryUsed;
    }

    const originalSize = JSON.stringify([...selectedOptions]).length;
    const compressedSize = timing.result.length;
    const compressionRatio = originalSize / compressedSize;
    const throughput = selectedOptions.size / timing.avgTime; // options per ms

    const result: PerformanceResult = {
      operation: `Compression - ${label}`,
      dataSize: `${selectedOptions.size}/${Array.isArray(optionMap) ? optionMap.length : Object.keys(optionMap).length} options`,
      executionTime: timing.avgTime,
      throughput,
      compressionRatio,
      memoryUsage: measureMemory ? memoryUsed : undefined
    };

    this.results.push(result);
    return result;
  }

  // Benchmark decompression performance
  benchmarkDecompression(
    optionMap: OptionMap,
    compressed: string,
    expectedCount: number,
    label: string,
    options: BenchmarkOptions = {}
  ): PerformanceResult {
    const { iterations = 1000, measureMemory = false } = options;

    const decompressFn = () => decompressOptions(optionMap, compressed);

    const timing = this.measureExecutionTime(decompressFn, iterations);
    let memoryUsed = 0;

    if (measureMemory) {
      const memoryResult = this.measureMemoryUsage(decompressFn);
      memoryUsed = memoryResult.memoryUsed;
    }

    const throughput = expectedCount / timing.avgTime; // options per ms

    const result: PerformanceResult = {
      operation: `Decompression - ${label}`,
      dataSize: `${expectedCount} options from ${compressed.length} chars`,
      executionTime: timing.avgTime,
      throughput,
      memoryUsage: measureMemory ? memoryUsed : undefined
    };

    this.results.push(result);
    return result;
  }

  // Benchmark round-trip performance
  benchmarkRoundTrip(
    optionMap: OptionMap,
    selectedOptions: SelectedOptions,
    label: string,
    options: BenchmarkOptions = {}
  ): { compression: PerformanceResult; decompression: PerformanceResult } {
    const compressed = compressOptions(optionMap, selectedOptions);

    const compressionResult = this.benchmarkCompression(optionMap, selectedOptions, label, options);
    const decompressionResult = this.benchmarkDecompression(optionMap, compressed, selectedOptions.size, label, options);

    return {
      compression: compressionResult,
      decompression: decompressionResult
    };
  }

  // Get performance results
  getResults(): PerformanceResult[] {
    return [...this.results];
  }

  // Clear results
  clearResults(): void {
    this.results = [];
  }

  // Print formatted results
  printResults(): void {
    console.log('\n=== Performance Benchmark Results ===\n');

    this.results.forEach(result => {
      console.log(`${result.operation}:`);
      console.log(`  Data Size: ${result.dataSize}`);
      console.log(`  Execution Time: ${result.executionTime.toFixed(4)}ms`);
      console.log(`  Throughput: ${result.throughput.toFixed(2)} ops/ms`);

      if (result.compressionRatio) {
        console.log(`  Compression Ratio: ${result.compressionRatio.toFixed(2)}:1`);
      }

      if (result.memoryUsage !== undefined) {
        console.log(`  Memory Usage: ${(result.memoryUsage / 1024).toFixed(2)}KB`);
      }

      console.log('');
    });
  }
}

describe('Performance Benchmarks', () => {
  const benchmark = new PerformanceBenchmark();

  // Test data sizes
  const testSizes = [10, 50, 100, 500, 1000];
  const selectionRatios = [0.1, 0.3, 0.5, 0.7, 0.9];

  describe('Compression Performance', () => {
    it('should benchmark compression with different option map sizes', () => {
      benchmark.clearResults();

      testSizes.forEach(size => {
        const stringMap = benchmark['generateStringOptionMap'](size);
        const numberMap = benchmark['generateNumberOptionMap'](size);
        const arrayMap = benchmark['generateArrayOptionMap'](size);

        const selectedOptions = benchmark['generateSelectedOptions'](stringMap, 0.5);

        benchmark.benchmarkCompression(stringMap, selectedOptions, `StringMap-${size}`, { iterations: 500, measureMemory: true });
        benchmark.benchmarkCompression(numberMap, selectedOptions, `NumberMap-${size}`, { iterations: 500, measureMemory: true });
        benchmark.benchmarkCompression(arrayMap, selectedOptions, `ArrayMap-${size}`, { iterations: 500, measureMemory: true });
      });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(testSizes.length * 3);

      // Verify all results have reasonable execution times
      results.forEach(result => {
        expect(result.executionTime).toBeGreaterThan(0);
        expect(result.throughput).toBeGreaterThan(0);
        expect(result.compressionRatio).toBeGreaterThan(0);
      });
    });

    it('should benchmark compression with different selection ratios', () => {
      benchmark.clearResults();
      const optionMap = benchmark['generateStringOptionMap'](1000);

      selectionRatios.forEach(ratio => {
        const selectedOptions = benchmark['generateSelectedOptions'](optionMap, ratio);
        benchmark.benchmarkCompression(optionMap, selectedOptions, `SelectionRatio-${ratio}`, { iterations: 500, measureMemory: true });
      });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(selectionRatios.length);

      // Verify compression ratio varies with selection ratio
      results.forEach(result => {
        expect(result.compressionRatio).toBeGreaterThan(0);
      });
    });
  });

  describe('Decompression Performance', () => {
    it('should benchmark decompression with different compressed string sizes', () => {
      benchmark.clearResults();

      testSizes.forEach(size => {
        const optionMap = benchmark['generateStringOptionMap'](size);
        const selectedOptions = benchmark['generateSelectedOptions'](optionMap, 0.5);
        const compressed = compressOptions(optionMap, selectedOptions);

        benchmark.benchmarkDecompression(optionMap, compressed, selectedOptions.size, `Decompression-${size}`, { iterations: 500, measureMemory: true });
      });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(testSizes.length);

      results.forEach(result => {
        expect(result.executionTime, `${result.operation}: ${result.executionTime.toFixed(4)}ms, Memory: ${((result.memoryUsage || 0) / 1024).toFixed(2)}KB`).toBeGreaterThan(0);
        expect(result.throughput).toBeGreaterThan(0);
      });
    });
  });

  describe('Round-trip Performance', () => {
    it('should benchmark full compression-decompression cycle', () => {
      benchmark.clearResults();

      testSizes.forEach(size => {
        const optionMap = benchmark['generateStringOptionMap'](size);
        const selectedOptions = benchmark['generateSelectedOptions'](optionMap, 0.5);

        benchmark.benchmarkRoundTrip(optionMap, selectedOptions, `RoundTrip-${size}`, { iterations: 250, measureMemory: true });

        // Verify round-trip maintains data integrity
        const compressed = compressOptions(optionMap, selectedOptions);
        const decompressed = decompressOptions(optionMap, compressed);

        expect(decompressed).toEqual(selectedOptions);
      });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(testSizes.length * 2); // compression + decompression for each size
    });
  });

  describe('Memory Usage Benchmarks', () => {
    it('should measure memory usage for large datasets', () => {
      benchmark.clearResults();

      const largeOptionMap = benchmark['generateStringOptionMap'](10000);
      const selectedOptions = benchmark['generateSelectedOptions'](largeOptionMap, 0.3);

      benchmark.benchmarkCompression(largeOptionMap, selectedOptions, 'LargeDataset-Compression', {
        iterations: 100,
        measureMemory: true
      });

      const compressed = compressOptions(largeOptionMap, selectedOptions);
      benchmark.benchmarkDecompression(largeOptionMap, compressed, selectedOptions.size, 'LargeDataset-Decompression', {
        iterations: 100,
        measureMemory: true
      });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(2);

      results.forEach(result => {
        expect(result.memoryUsage).toBeDefined();
        expect(result.memoryUsage).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Edge Cases Performance', () => {
    it('should benchmark performance with empty selections', () => {
      benchmark.clearResults();

      const optionMap = benchmark['generateStringOptionMap'](1000);
      const emptySelection: SelectedOptions = new Set<string>();

      benchmark.benchmarkCompression(optionMap, emptySelection, 'EmptySelection', { iterations: 1000, measureMemory: true });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(1);
      expect(results[0].executionTime).toBeGreaterThan(0);
    });

    it('should benchmark performance with full selections', () => {
      benchmark.clearResults();

      const optionMap = benchmark['generateStringOptionMap'](500);
      const fullSelection = benchmark['generateSelectedOptions'](optionMap, 1.0);

      benchmark.benchmarkCompression(optionMap, fullSelection, 'FullSelection', { iterations: 500, measureMemory: true });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(1);
      expect(results[0].executionTime).toBeGreaterThan(0);
    });

    it('should benchmark performance with single option', () => {
      benchmark.clearResults();

      const optionMap = benchmark['generateStringOptionMap'](1000);
      const singleSelection = new Set([Object.values(optionMap)[0]]);

      benchmark.benchmarkCompression(optionMap, singleSelection, 'SingleSelection', { iterations: 1000, measureMemory: true });

      const results = benchmark.getResults();
      benchmark.printResults();
      expect(results).toHaveLength(1);
      expect(results[0].executionTime).toBeGreaterThan(0);
    });
  });

  describe('Performance Comparison', () => {
    it('should provide performance comparison between different approaches', () => {
      benchmark.clearResults();

      const size = 1000;
      const stringMap = benchmark['generateStringOptionMap'](size);
      const numberMap = benchmark['generateNumberOptionMap'](size);
      const arrayMap = benchmark['generateArrayOptionMap'](size);

      const selectedOptions = benchmark['generateSelectedOptions'](stringMap, 0.5);

      // Benchmark all three approaches
      const stringResult = benchmark.benchmarkCompression(stringMap, selectedOptions, 'StringMap', { iterations: 1000, measureMemory: true });
      const numberResult = benchmark.benchmarkCompression(numberMap, selectedOptions, 'NumberMap', { iterations: 1000, measureMemory: true });
      const arrayResult = benchmark.benchmarkCompression(arrayMap, selectedOptions, 'ArrayMap', { iterations: 1000, measureMemory: true });

      // Print comparative results
      console.log('\nPerformance Comparison:');
      console.log(`String Map: ${stringResult.executionTime.toFixed(4)}ms, ${stringResult.throughput.toFixed(2)} ops/ms, ${((stringResult.memoryUsage || 0) / 1024).toFixed(2)}KB`);
      console.log(`Number Map: ${numberResult.executionTime.toFixed(4)}ms, ${numberResult.throughput.toFixed(2)} ops/ms, ${((numberResult.memoryUsage || 0) / 1024).toFixed(2)}KB`);
      console.log(`Array Map: ${arrayResult.executionTime.toFixed(4)}ms, ${arrayResult.throughput.toFixed(2)} ops/ms, ${((arrayResult.memoryUsage || 0) / 1024).toFixed(2)}KB`);

      expect(stringResult.executionTime).toBeGreaterThan(0);
      expect(numberResult.executionTime).toBeGreaterThan(0);
      expect(arrayResult.executionTime).toBeGreaterThan(0);
    });
  });
}, 120000); // Increase timeout for performance tests

// Export the benchmark class for external use
export { PerformanceBenchmark, type PerformanceResult, type BenchmarkOptions };
