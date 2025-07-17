## Results of performance benchmarks with original (array SelectedOptions `.includes`) implementation:

Performance Comparison:
String Map: 1.6081ms, 310.92 ops/ms
Number Map: 1.3837ms, 361.35 ops/ms
Array Map: 1.4091ms, 354.84 ops/ms

 ✓ src/performance.test.ts (9 tests) 24262ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  3169ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  3929ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 81ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  622ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  10702ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 290ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections  332ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 289ms
   ✓ Performance Benchmarks > should provide performance comparison between different approaches  4845ms

## Results of performance benchmarks with SelectedOptions changed to Set<string>:

Performance Comparison:
String Map: 0.8306ms, 602.00 ops/ms
Number Map: 0.5973ms, 837.03 ops/ms
Array Map: 0.6210ms, 805.19 ops/ms

 ✓ src/performance.test.ts (9 tests) 11553ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1534ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2051ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 98ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  359ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4465ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 288ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 205ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 296ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2255ms

## Results of performance benchmarks with binary operations done with bitwise operations instead of string manipulation

Performance Comparison:
String Map: 0.8009ms, 624.32 ops/ms
Number Map: 0.5820ms, 859.07 ops/ms
Array Map: 0.6044ms, 827.28 ops/ms

 ✓ src/performance.test.ts (9 tests) 11263ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1499ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2025ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 104ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  357ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4325ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 280ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 200ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 281ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2189ms







# Additional data including memory usage for each test:

## Binary Operations:
stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes

=== Performance Benchmark Results ===

Compression - StringMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0021ms
  Throughput: 2331.87 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 6.53KB

Compression - NumberMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0013ms
  Throughput: 3839.07 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.92KB

Compression - ArrayMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0018ms
  Throughput: 2733.14 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.91KB

Compression - StringMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0123ms
  Throughput: 2032.36 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 4.83KB

Compression - NumberMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0047ms
  Throughput: 5273.15 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 2.45KB

Compression - ArrayMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0057ms
  Throughput: 4372.01 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 2.00KB

Compression - StringMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0266ms
  Throughput: 1879.29 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 9.39KB

Compression - NumberMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0122ms
  Throughput: 4109.27 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 3.58KB

Compression - ArrayMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0138ms
  Throughput: 3634.14 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 3.04KB

Compression - StringMap-500:
  Data Size: 250/500 options
  Execution Time: 0.2607ms
  Throughput: 959.09 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 40.63KB

Compression - NumberMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1517ms
  Throughput: 1648.22 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 13.70KB

Compression - ArrayMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1638ms
  Throughput: 1526.46 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 12.95KB

Compression - StringMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8323ms
  Throughput: 600.76 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 89.58KB

Compression - NumberMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.5947ms
  Throughput: 840.77 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 29.73KB

Compression - ArrayMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6234ms
  Throughput: 801.99 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 25.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios

=== Performance Benchmark Results ===

Compression - SelectionRatio-0.1:
  Data Size: 100/1000 options
  Execution Time: 0.3855ms
  Throughput: 259.41 ops/ms
  Compression Ratio: 7.72:1
  Memory Usage: 77.71KB

Compression - SelectionRatio-0.3:
  Data Size: 300/1000 options
  Execution Time: 0.5606ms
  Throughput: 535.16 ops/ms
  Compression Ratio: 23.13:1
  Memory Usage: 79.27KB

Compression - SelectionRatio-0.5:
  Data Size: 500/1000 options
  Execution Time: 0.8099ms
  Throughput: 617.36 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 80.84KB

Compression - SelectionRatio-0.7:
  Data Size: 700/1000 options
  Execution Time: 0.7937ms
  Throughput: 881.99 ops/ms
  Compression Ratio: 53.84:1
  Memory Usage: 82.40KB

Compression - SelectionRatio-0.9:
  Data Size: 900/1000 options
  Execution Time: 1.1279ms
  Throughput: 797.93 ops/ms
  Compression Ratio: 69.41:1
  Memory Usage: 83.96KB


stdout | src/performance.test.ts > Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes

=== Performance Benchmark Results ===

Decompression - Decompression-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0012ms
  Throughput: 4065.04 ops/ms
  Memory Usage: 232.73KB

Decompression - Decompression-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0043ms
  Throughput: 5748.45 ops/ms
  Memory Usage: 2.55KB

Decompression - Decompression-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0084ms
  Throughput: 5925.86 ops/ms
  Memory Usage: 4.62KB

Decompression - Decompression-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0515ms
  Throughput: 4855.95 ops/ms
  Memory Usage: 18.45KB

Decompression - Decompression-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1151ms
  Throughput: 4345.28 ops/ms
  Memory Usage: 36.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle

=== Performance Benchmark Results ===

Compression - RoundTrip-10:
  Data Size: 5/10 options
  Execution Time: 0.0005ms
  Throughput: 10339.12 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.77KB

Decompression - RoundTrip-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0006ms
  Throughput: 8344.46 ops/ms
  Memory Usage: 0.81KB

Compression - RoundTrip-50:
  Data Size: 25/50 options
  Execution Time: 0.0110ms
  Throughput: 2264.82 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 4.84KB

Decompression - RoundTrip-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0040ms
  Throughput: 6327.83 ops/ms
  Memory Usage: 2.55KB

Compression - RoundTrip-100:
  Data Size: 50/100 options
  Execution Time: 0.0249ms
  Throughput: 2005.04 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 9.39KB

Decompression - RoundTrip-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0079ms
  Throughput: 6366.51 ops/ms
  Memory Usage: 4.62KB

Compression - RoundTrip-500:
  Data Size: 250/500 options
  Execution Time: 0.2459ms
  Throughput: 1016.88 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 46.34KB

Decompression - RoundTrip-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0510ms
  Throughput: 4899.85 ops/ms
  Memory Usage: 18.45KB

Compression - RoundTrip-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8336ms
  Throughput: 599.79 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 80.84KB

Decompression - RoundTrip-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1162ms
  Throughput: 4302.99 ops/ms
  Memory Usage: 36.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets

=== Performance Benchmark Results ===

Compression - LargeDataset-Compression:
  Data Size: 3000/10000 options
  Execution Time: 36.6297ms
  Throughput: 81.90 ops/ms
  Compression Ratio: 24.97:1
  Memory Usage: 1071.89KB

Decompression - LargeDataset-Decompression:
  Data Size: 3000 options from 1667 chars
  Execution Time: 1.2856ms
  Throughput: 2333.54 ops/ms
  Memory Usage: 344.24KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections

=== Performance Benchmark Results ===

Compression - EmptySelection:
  Data Size: 0/1000 options
  Execution Time: 0.2556ms
  Throughput: 0.00 ops/ms
  Compression Ratio: 0.01:1
  Memory Usage: 76.91KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections

=== Performance Benchmark Results ===

Compression - FullSelection:
  Data Size: 500/500 options
  Execution Time: 0.3624ms
  Throughput: 1379.77 ops/ms
  Compression Ratio: 76.08:1
  Memory Usage: 42.58KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option

=== Performance Benchmark Results ===

Compression - SingleSelection:
  Data Size: 1/1000 options
  Execution Time: 0.2553ms
  Throughput: 3.92 ops/ms
  Compression Ratio: 0.07:1
  Memory Usage: 81.83KB


stdout | src/performance.test.ts > Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches

Performance Comparison:
String Map: 0.8026ms, 623.01 ops/ms, 80.84KB
Number Map: 0.5813ms, 860.10 ops/ms, 29.73KB
Array Map: 0.6051ms, 826.30 ops/ms, 25.30KB

 ✓ src/performance.test.ts (9 tests) 11231ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1500ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2028ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 103ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  363ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4277ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 282ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 201ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 282ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2192ms