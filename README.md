# Compress Param Options
A package for compressing large amounts of URL param options into a shorter, consistent format that can be used for sharing links that include all of the selected options

## Installation
- Add this package to your project with `npm i compress-param-options`
- Import compression and decompression functions with `import { compressOptions, decompressOptions } from 'compress-param-options';`
- Import necessary types if working in TypeScript with `import type { StringOptionMap, NumberOptionMap, ArrayOptionMap, OptionMap, SelectedOptions } from 'compress-param-options';`
- Import configuration classes with `import { CompressionOptions, DecompressionOptions } from 'compress-param-options';`

## Usage
### OptionMap
Create and use a consistent option map so compression and decompression have a consistent mapping of param options to work with.  This can be a simple array of string options, a mapping of string keys to string values, or a mapping of number keys to string values.

Examples:

##### String Keys
```
const stringOptionMap: StringOptionMap = {
  'lg': 'size-large',
  'med': 'size-medium',
  'sm': 'size-small',
  'cold': 'temperature-cold',
  'hot': 'temperature-hot'
};
```

##### Number Keys
```
const numberOptionMap: NumberOptionMap = {
  1: 'option-1',
  2: 'option-2',
  3: 'option-3'
};
```

##### Array
```
const arrayOptionMap: ArrayOptionMap = [
  'option1',
  'option2',
  'option3',
]
```

*Note that the advantage of having set keys instead of an array is that if in the future you wish to change the ordering of your options, it won't change compression results (and therefore saved URLs using these param strings) as long as you keep the existing keys the same.* 

### Compression
Pass the `compressOptions` function your option map, and a Set with the values of options that are currently selected, and it will return a compressed string representing the selections.

Example using the String Keys option map from above:
```
const selectedOptions: SelectedOptions = new Set(['size-small', 'temperature-cold']);
const compressedOptions = compressOptions(stringOptionMap, selectedOptions);
console.log(compressedOptions); // Result: 'C'
```

### Decompression
Pass the `decompressOptions` function your option map, and a compressed options string received from the `compressOptions` function, and it will return a Set of strings representing option values that were enabled when the values were compressed.

Example using the above compression:
```
const decompressedOptions = decompressOptions(stringOptionMap, compressedOptions);
console.log(decompressedOptions); // Result: Set(2): {'size-small', 'temperature-cold'}
```

## Configuration Options

### CompressionOptions
Configure compression behavior with the `CompressionOptions` class:

```typescript
import { CompressionOptions } from 'compress-param-options';

// Use default options
const options = CompressionOptions.default();

// Create custom options
const customOptions = new CompressionOptions(
  includeUncompressed: true,
  warnOnUncompressed: false,
  separationCharacter: ',',
  useBitwiseCompression: true
);

const compressed = compressOptions(stringOptionMap, selectedOptions, customOptions);
```

#### Parameters:
- **includeUncompressed** (default: `false`): Whether to include options not found in the map as uncompressed data
- **warnOnUncompressed** (default: `true`): Whether to warn when options cannot be compressed due to not existing in the map
- **separationCharacter** (default: `','`): Character used to separate uncompressed options in the resulting string (see below)
- **useBitwiseCompression** (default: `true`): Whether to use bitwise compression algorithm (see below)

### DecompressionOptions
Configure decompression behavior with the `DecompressionOptions` class:

```typescript
import { DecompressionOptions } from 'compress-param-options';

// Use default options
const options = DecompressionOptions.default();

// Create custom options
const customOptions = new DecompressionOptions(
  separationCharacter: ',',
  useBitwiseDecompression: true
);

const decompressed = decompressOptions(stringOptionMap, compressed, customOptions);
```

#### Parameters:
- **separationCharacter** (default: `','`): Character used to separate uncompressed options (see below and ensure this is the same in compression and decompression)
- **useBitwiseDecompression** (default: `true`): Whether to use bitwise decompression algorithm (see below)

## ⚠️ Important Considerations

### Separation Character Pitfalls
When using custom separation characters, be aware of these critical requirements:

1. **URL Safety**: The separation character must be URL-safe. Avoid characters that require URL encoding (like spaces, `#`, `%`, etc.)
2. **Option Map Conflicts**: Ensure your option map values do not contain the separation character
3. **Compression Map Conflicts**: Ensure your separation character is not already a character in use in the algorithm's compression character map: `'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'`
4. **Consistency**: Use the same separation character for both compression and decompression

#### Examples of Safe Separation Characters:
- `,` (comma) - default and recommended
- `.` (period)
- `|` (pipe)

#### Examples of Unsafe Separation Characters:
- ` ` (space) - requires URL encoding
- `#` (hash) - has special meaning in URLs
- `%` (percent) - used in URL encoding
- `&` (ampersand) - used in URL parameters

### Performance Considerations

Based on comprehensive performance testing, here are the key considerations for choosing between bitwise and string compression:

#### When to Use Bitwise Algorithm (Default for Compression)
✅ **Recommended for most use cases**
- **Memory Efficiency**: 14-52% less memory usage
- **Compression Speed**: 0.5-14.5% faster compression
- **Scalability**: Better performance with larger datasets
- **Consistency**: More consistent performance across different selection ratios

#### When to Use String Algorithm (Default for Decompression)
- **Decompression Speed Priority**: 4-31% faster decompression
- **Development Simplicity**: Easier to debug and understand
- **Memory Not Critical**: When memory usage is not a primary concern

#### Performance Summary (1000 options, 50% selection):
| Metric | Bitwise | String | Improvement |
|--------|---------|--------|-------------|
| Compression Time | 0.80ms | 0.82ms | 2.4% faster |
| Memory Usage | 45KB | 67KB | 33% less memory |
| Decompression Time | 0.12ms | 0.11ms | 8% slower |

For detailed performance analysis, see `/src/perf/perfComparison.md`

## Building Locally
If you wish to contribute or test things locally, run `npm run build` and the compiled files will be output into the `/dist` directory.

### Examples
Try running `node ./dist/quickExamples.js` after building to see some examples of what the compression looks like.
