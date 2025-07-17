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
  Execution Time: 0.0022ms
  Throughput: 2267.99 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 6.53KB

Compression - NumberMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0013ms
  Throughput: 3906.86 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.92KB

Compression - ArrayMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0023ms
  Throughput: 2155.54 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.91KB

Compression - StringMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0129ms
  Throughput: 1934.86 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 4.83KB

Compression - NumberMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0047ms
  Throughput: 5366.42 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 2.45KB

Compression - ArrayMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0058ms
  Throughput: 4320.77 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 2.00KB

Compression - StringMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0273ms
  Throughput: 1833.76 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 9.39KB

Compression - NumberMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0118ms
  Throughput: 4254.52 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 3.58KB

Compression - ArrayMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0147ms
  Throughput: 3397.52 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 3.04KB

Compression - StringMap-500:
  Data Size: 250/500 options
  Execution Time: 0.2568ms
  Throughput: 973.69 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 41.36KB

Compression - NumberMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1507ms
  Throughput: 1658.92 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 13.70KB

Compression - ArrayMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1626ms
  Throughput: 1537.66 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 12.95KB

Compression - StringMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8947ms
  Throughput: 558.83 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 84.58KB

Compression - NumberMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.5997ms
  Throughput: 833.76 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 29.73KB

Compression - ArrayMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6200ms
  Throughput: 806.48 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 25.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios

=== Performance Benchmark Results ===

Compression - SelectionRatio-0.1:
  Data Size: 100/1000 options
  Execution Time: 0.3887ms
  Throughput: 257.23 ops/ms
  Compression Ratio: 7.72:1
  Memory Usage: 85.79KB

Compression - SelectionRatio-0.3:
  Data Size: 300/1000 options
  Execution Time: 0.5620ms
  Throughput: 533.78 ops/ms
  Compression Ratio: 23.13:1
  Memory Usage: 80.03KB

Compression - SelectionRatio-0.5:
  Data Size: 500/1000 options
  Execution Time: 0.8095ms
  Throughput: 617.64 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 94.62KB

Compression - SelectionRatio-0.7:
  Data Size: 700/1000 options
  Execution Time: 0.7675ms
  Throughput: 912.00 ops/ms
  Compression Ratio: 53.84:1
  Memory Usage: 83.58KB

Compression - SelectionRatio-0.9:
  Data Size: 900/1000 options
  Execution Time: 1.1188ms
  Throughput: 804.41 ops/ms
  Compression Ratio: 69.41:1
  Memory Usage: 83.96KB


stdout | src/performance.test.ts > Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes

=== Performance Benchmark Results ===

Decompression - Decompression-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0013ms
  Throughput: 3814.46 ops/ms
  Memory Usage: 0.81KB

Decompression - Decompression-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0048ms
  Throughput: 5179.41 ops/ms
  Memory Usage: 2.55KB

Decompression - Decompression-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0082ms
  Throughput: 6068.11 ops/ms
  Memory Usage: 4.62KB

Decompression - Decompression-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0524ms
  Throughput: 4772.65 ops/ms
  Memory Usage: 18.45KB

Decompression - Decompression-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1164ms
  Throughput: 4294.40 ops/ms
  Memory Usage: 36.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle

=== Performance Benchmark Results ===

Compression - RoundTrip-10:
  Data Size: 5/10 options
  Execution Time: 0.0009ms
  Throughput: 5779.01 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.77KB

Decompression - RoundTrip-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0010ms
  Throughput: 5227.94 ops/ms
  Memory Usage: 0.81KB

Compression - RoundTrip-50:
  Data Size: 25/50 options
  Execution Time: 0.0103ms
  Throughput: 2429.73 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 4.84KB

Decompression - RoundTrip-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0040ms
  Throughput: 6191.80 ops/ms
  Memory Usage: 2.55KB

Compression - RoundTrip-100:
  Data Size: 50/100 options
  Execution Time: 0.0254ms
  Throughput: 1969.37 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 9.39KB

Decompression - RoundTrip-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0081ms
  Throughput: 6143.41 ops/ms
  Memory Usage: 4.62KB

Compression - RoundTrip-500:
  Data Size: 250/500 options
  Execution Time: 0.2458ms
  Throughput: 1016.94 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 40.63KB

Decompression - RoundTrip-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0527ms
  Throughput: 4744.77 ops/ms
  Memory Usage: 18.45KB

Compression - RoundTrip-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8026ms
  Throughput: 622.99 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 80.84KB

Decompression - RoundTrip-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1178ms
  Throughput: 4244.93 ops/ms
  Memory Usage: 36.30KB


stdout | src/performance.test.ts > Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets

=== Performance Benchmark Results ===

Compression - LargeDataset-Compression:
  Data Size: 3000/10000 options
  Execution Time: 39.0512ms
  Throughput: 76.82 ops/ms
  Compression Ratio: 24.97:1
  Memory Usage: 1071.89KB

Decompression - LargeDataset-Decompression:
  Data Size: 3000 options from 1667 chars
  Execution Time: 1.3120ms
  Throughput: 2286.66 ops/ms
  Memory Usage: 353.20KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections

=== Performance Benchmark Results ===

Compression - EmptySelection:
  Data Size: 0/1000 options
  Execution Time: 0.2560ms
  Throughput: 0.00 ops/ms
  Compression Ratio: 0.01:1
  Memory Usage: 76.91KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections

=== Performance Benchmark Results ===

Compression - FullSelection:
  Data Size: 500/500 options
  Execution Time: 0.3615ms
  Throughput: 1383.15 ops/ms
  Compression Ratio: 76.08:1
  Memory Usage: 42.58KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option

=== Performance Benchmark Results ===

Compression - SingleSelection:
  Data Size: 1/1000 options
  Execution Time: 0.2564ms
  Throughput: 3.90 ops/ms
  Compression Ratio: 0.07:1
  Memory Usage: 76.94KB


stdout | src/performance.test.ts > Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches

Performance Comparison:
String Map: 0.8031ms, 622.55 ops/ms, 80.84KB
Number Map: 0.5822ms, 858.84 ops/ms, 29.73KB
Array Map: 0.6110ms, 818.33 ops/ms, 25.30KB

 ✓ src/performance.test.ts (9 tests) 11500ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1531ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2016ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 104ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  356ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4523ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 283ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 200ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 284ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2200ms







## String Operations:
stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes

=== Performance Benchmark Results ===

Compression - StringMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0024ms
  Throughput: 2109.17 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 6.77KB

Compression - NumberMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0015ms
  Throughput: 3337.78 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.16KB

Compression - ArrayMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0026ms
  Throughput: 1952.67 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.15KB

Compression - StringMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0131ms
  Throughput: 1903.86 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 5.86KB

Compression - NumberMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0055ms
  Throughput: 4576.41 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 3.48KB

Compression - ArrayMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0065ms
  Throughput: 3864.35 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 3.03KB

Compression - StringMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0278ms
  Throughput: 1799.04 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 11.75KB

Compression - NumberMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0130ms
  Throughput: 3832.18 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 5.57KB

Compression - ArrayMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0155ms
  Throughput: 3233.02 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 5.03KB

Compression - StringMap-500:
  Data Size: 250/500 options
  Execution Time: 0.2636ms
  Throughput: 948.24 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 50.55KB

Compression - NumberMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1567ms
  Throughput: 1595.84 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 23.52KB

Compression - ArrayMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1688ms
  Throughput: 1481.01 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 22.77KB

Compression - StringMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8374ms
  Throughput: 597.11 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 102.99KB

Compression - NumberMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6111ms
  Throughput: 818.20 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 49.30KB

Compression - ArrayMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6322ms
  Throughput: 790.93 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 52.59KB


stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios

=== Performance Benchmark Results ===

Compression - SelectionRatio-0.1:
  Data Size: 100/1000 options
  Execution Time: 0.4011ms
  Throughput: 249.34 ops/ms
  Compression Ratio: 7.72:1
  Memory Usage: 97.39KB

Compression - SelectionRatio-0.3:
  Data Size: 300/1000 options
  Execution Time: 0.5675ms
  Throughput: 528.66 ops/ms
  Compression Ratio: 23.13:1
  Memory Usage: 113.70KB

Compression - SelectionRatio-0.5:
  Data Size: 500/1000 options
  Execution Time: 0.8199ms
  Throughput: 609.86 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 102.99KB

Compression - SelectionRatio-0.7:
  Data Size: 700/1000 options
  Execution Time: 0.7822ms
  Throughput: 894.92 ops/ms
  Compression Ratio: 53.84:1
  Memory Usage: 101.97KB

Compression - SelectionRatio-0.9:
  Data Size: 900/1000 options
  Execution Time: 1.1371ms
  Throughput: 791.47 ops/ms
  Compression Ratio: 69.41:1
  Memory Usage: 103.53KB


stdout | src/performance.test.ts > Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes

=== Performance Benchmark Results ===

Decompression - Decompression-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0013ms
  Throughput: 3939.49 ops/ms
  Memory Usage: 0.86KB

Decompression - Decompression-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0039ms
  Throughput: 6406.31 ops/ms
  Memory Usage: 2.76KB

Decompression - Decompression-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0074ms
  Throughput: 6738.00 ops/ms
  Memory Usage: 5.02KB

Decompression - Decompression-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0506ms
  Throughput: 4944.33 ops/ms
  Memory Usage: 20.41KB

Decompression - Decompression-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1136ms
  Throughput: 4403.26 ops/ms
  Memory Usage: 40.21KB


stdout | src/performance.test.ts > Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle

=== Performance Benchmark Results ===

Compression - RoundTrip-10:
  Data Size: 5/10 options
  Execution Time: 0.0007ms
  Throughput: 7436.05 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.01KB

Decompression - RoundTrip-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0005ms
  Throughput: 9527.44 ops/ms
  Memory Usage: 0.86KB

Compression - RoundTrip-50:
  Data Size: 25/50 options
  Execution Time: 0.0114ms
  Throughput: 2202.10 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 5.88KB

Decompression - RoundTrip-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0045ms
  Throughput: 5612.93 ops/ms
  Memory Usage: 2.76KB

Compression - RoundTrip-100:
  Data Size: 50/100 options
  Execution Time: 0.0259ms
  Throughput: 1930.14 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 11.38KB

Decompression - RoundTrip-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0080ms
  Throughput: 6246.25 ops/ms
  Memory Usage: 5.02KB

Compression - RoundTrip-500:
  Data Size: 250/500 options
  Execution Time: 0.2560ms
  Throughput: 976.70 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 50.45KB

Decompression - RoundTrip-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0494ms
  Throughput: 5058.15 ops/ms
  Memory Usage: 20.41KB

Compression - RoundTrip-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8203ms
  Throughput: 609.55 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 102.99KB

Decompression - RoundTrip-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1117ms
  Throughput: 4477.30 ops/ms
  Memory Usage: 40.21KB


stdout | src/performance.test.ts > Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets

=== Performance Benchmark Results ===

Compression - LargeDataset-Compression:
  Data Size: 3000/10000 options
  Execution Time: 37.3652ms
  Throughput: 80.29 ops/ms
  Compression Ratio: 24.97:1
  Memory Usage: 1247.84KB

Decompression - LargeDataset-Decompression:
  Data Size: 3000 options from 1667 chars
  Execution Time: 1.2476ms
  Throughput: 2404.71 ops/ms
  Memory Usage: 511.77KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections

=== Performance Benchmark Results ===

Compression - EmptySelection:
  Data Size: 0/1000 options
  Execution Time: 0.2632ms
  Throughput: 0.00 ops/ms
  Compression Ratio: 0.01:1
  Memory Usage: 96.48KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections

=== Performance Benchmark Results ===

Compression - FullSelection:
  Data Size: 500/500 options
  Execution Time: 0.3710ms
  Throughput: 1347.70 ops/ms
  Compression Ratio: 76.08:1
  Memory Usage: 52.40KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option

=== Performance Benchmark Results ===

Compression - SingleSelection:
  Data Size: 1/1000 options
  Execution Time: 0.2679ms
  Throughput: 3.73 ops/ms
  Compression Ratio: 0.07:1
  Memory Usage: 96.51KB


stdout | src/performance.test.ts > Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches

Performance Comparison:
String Map: 0.8177ms, 611.47 ops/ms, 100.41KB
Number Map: 0.5954ms, 839.75 ops/ms, 49.30KB
Array Map: 0.6202ms, 806.16 ops/ms, 44.88KB

 ✓ src/performance.test.ts (9 tests) 11399ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1529ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2046ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 103ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  361ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4324ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 292ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 205ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 296ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2241ms