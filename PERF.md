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