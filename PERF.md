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
  Execution Time: 0.0023ms
  Throughput: 2131.83 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 0.00KB

Compression - NumberMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0015ms
  Throughput: 3389.37 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.16KB

Compression - ArrayMap-10:
  Data Size: 5/10 options
  Execution Time: 0.0024ms
  Throughput: 2053.39 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.15KB

Compression - StringMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0135ms
  Throughput: 1856.97 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 5.86KB

Compression - NumberMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0055ms
  Throughput: 4547.11 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 3.48KB

Compression - ArrayMap-50:
  Data Size: 25/50 options
  Execution Time: 0.0062ms
  Throughput: 4061.74 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 3.03KB

Compression - StringMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0270ms
  Throughput: 1855.15 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 11.38KB

Compression - NumberMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0128ms
  Throughput: 3913.28 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 5.57KB

Compression - ArrayMap-100:
  Data Size: 50/100 options
  Execution Time: 0.0149ms
  Throughput: 3348.69 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 5.03KB

Compression - StringMap-500:
  Data Size: 250/500 options
  Execution Time: 0.2602ms
  Throughput: 960.67 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 50.45KB

Compression - NumberMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1565ms
  Throughput: 1597.64 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 23.52KB

Compression - ArrayMap-500:
  Data Size: 250/500 options
  Execution Time: 0.1665ms
  Throughput: 1501.51 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 22.77KB

Compression - StringMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8250ms
  Throughput: 606.05 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 100.41KB

Compression - NumberMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6068ms
  Throughput: 823.95 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 49.30KB

Compression - ArrayMap-1000:
  Data Size: 500/1000 options
  Execution Time: 0.6255ms
  Throughput: 799.36 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 44.88KB


stdout | src/performance.test.ts > Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios

=== Performance Benchmark Results ===

Compression - SelectionRatio-0.1:
  Data Size: 100/1000 options
  Execution Time: 0.3956ms
  Throughput: 252.81 ops/ms
  Compression Ratio: 7.72:1
  Memory Usage: 103.05KB

Compression - SelectionRatio-0.3:
  Data Size: 300/1000 options
  Execution Time: 0.5658ms
  Throughput: 530.21 ops/ms
  Compression Ratio: 23.13:1
  Memory Usage: 98.84KB

Compression - SelectionRatio-0.5:
  Data Size: 500/1000 options
  Execution Time: 0.8194ms
  Throughput: 610.18 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 100.41KB

Compression - SelectionRatio-0.7:
  Data Size: 700/1000 options
  Execution Time: 0.7809ms
  Throughput: 896.38 ops/ms
  Compression Ratio: 53.84:1
  Memory Usage: 108.05KB

Compression - SelectionRatio-0.9:
  Data Size: 900/1000 options
  Execution Time: 1.1331ms
  Throughput: 794.31 ops/ms
  Compression Ratio: 69.41:1
  Memory Usage: 103.53KB


stdout | src/performance.test.ts > Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes

=== Performance Benchmark Results ===

Decompression - Decompression-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0012ms
  Throughput: 4018.65 ops/ms
  Memory Usage: 0.86KB

Decompression - Decompression-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0038ms
  Throughput: 6599.44 ops/ms
  Memory Usage: 2.76KB

Decompression - Decompression-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0077ms
  Throughput: 6523.50 ops/ms
  Memory Usage: 5.02KB

Decompression - Decompression-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0482ms
  Throughput: 5183.04 ops/ms
  Memory Usage: 20.41KB

Decompression - Decompression-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1103ms
  Throughput: 4533.11 ops/ms
  Memory Usage: 44.16KB


stdout | src/performance.test.ts > Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle

=== Performance Benchmark Results ===

Compression - RoundTrip-10:
  Data Size: 5/10 options
  Execution Time: 0.0007ms
  Throughput: 7673.42 ops/ms
  Compression Ratio: 28.00:1
  Memory Usage: 1.01KB

Decompression - RoundTrip-10:
  Data Size: 5 options from 2 chars
  Execution Time: 0.0011ms
  Throughput: 4393.67 ops/ms
  Memory Usage: 0.86KB

Compression - RoundTrip-50:
  Data Size: 25/50 options
  Execution Time: 0.0112ms
  Throughput: 2236.22 ops/ms
  Compression Ratio: 32.89:1
  Memory Usage: 5.88KB

Decompression - RoundTrip-50:
  Data Size: 25 options from 9 chars
  Execution Time: 0.0034ms
  Throughput: 7317.64 ops/ms
  Memory Usage: 2.76KB

Compression - RoundTrip-100:
  Data Size: 50/100 options
  Execution Time: 0.0260ms
  Throughput: 1921.81 ops/ms
  Compression Ratio: 35.06:1
  Memory Usage: 11.38KB

Decompression - RoundTrip-100:
  Data Size: 50 options from 17 chars
  Execution Time: 0.0068ms
  Throughput: 7305.67 ops/ms
  Memory Usage: 5.02KB

Compression - RoundTrip-500:
  Data Size: 250/500 options
  Execution Time: 0.2528ms
  Throughput: 988.85 ops/ms
  Compression Ratio: 38.05:1
  Memory Usage: 50.73KB

Decompression - RoundTrip-500:
  Data Size: 250 options from 84 chars
  Execution Time: 0.0474ms
  Throughput: 5276.84 ops/ms
  Memory Usage: 21.66KB

Compression - RoundTrip-1000:
  Data Size: 500/1000 options
  Execution Time: 0.8168ms
  Throughput: 612.11 ops/ms
  Compression Ratio: 38.60:1
  Memory Usage: 100.41KB

Decompression - RoundTrip-1000:
  Data Size: 500 options from 167 chars
  Execution Time: 0.1106ms
  Throughput: 4519.95 ops/ms
  Memory Usage: 40.21KB


stdout | src/performance.test.ts > Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets

=== Performance Benchmark Results ===

Compression - LargeDataset-Compression:
  Data Size: 3000/10000 options
  Execution Time: 39.0298ms
  Throughput: 76.86 ops/ms
  Compression Ratio: 24.97:1
  Memory Usage: 0.00KB

Decompression - LargeDataset-Decompression:
  Data Size: 3000 options from 1667 chars
  Execution Time: 1.2381ms
  Throughput: 2423.02 ops/ms
  Memory Usage: 507.02KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections

=== Performance Benchmark Results ===

Compression - EmptySelection:
  Data Size: 0/1000 options
  Execution Time: 0.2604ms
  Throughput: 0.00 ops/ms
  Compression Ratio: 0.01:1
  Memory Usage: 96.48KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections

=== Performance Benchmark Results ===

Compression - FullSelection:
  Data Size: 500/500 options
  Execution Time: 0.3717ms
  Throughput: 1345.09 ops/ms
  Compression Ratio: 76.08:1
  Memory Usage: 52.40KB


stdout | src/performance.test.ts > Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option

=== Performance Benchmark Results ===

Compression - SingleSelection:
  Data Size: 1/1000 options
  Execution Time: 0.2658ms
  Throughput: 3.76 ops/ms
  Compression Ratio: 0.07:1
  Memory Usage: 96.51KB


stdout | src/performance.test.ts > Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches

Performance Comparison:
String Map: 0.8176ms, 611.56 ops/ms, 100.41KB
Number Map: 0.5959ms, 839.05 ops/ms, 49.30KB
Array Map: 0.6178ms, 809.27 ops/ms, 44.88KB

 ✓ src/performance.test.ts (9 tests) 11541ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different option map sizes  1511ms
   ✓ Performance Benchmarks > Compression Performance > should benchmark compression with different selection ratios  2039ms
   ✓ Performance Benchmarks > Decompression Performance > should benchmark decompression with different compressed string sizes 98ms
   ✓ Performance Benchmarks > Round-trip Performance > should benchmark full compression-decompression cycle  358ms
   ✓ Performance Benchmarks > Memory Usage Benchmarks > should measure memory usage for large datasets  4508ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with empty selections 288ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with full selections 206ms
   ✓ Performance Benchmarks > Edge Cases Performance > should benchmark performance with single option 294ms
   ✓ Performance Benchmarks > Performance Comparison > should provide performance comparison between different approaches  2239ms