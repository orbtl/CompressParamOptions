# Compress Param Options
A package for compressing large amounts of URL param options into a shorter, consistent format that can be used for sharing links that include all of the selected options

## Installation
- Add this package to your project with `npm i compress-param-options`
- Import compression and decompression functions with `import { compressOptions, decompressOptions } from 'compress-param-options';`
- Import necessary types if working in TypeScript with `import { StringOptionMap, NumberOptionMap, ArrayOptionMap, OptionMap, SelectedOptions } from 'compress-param-options';

## Usage
### OptionMap
Create and use a consistent option map so compression and decompression have a consistent mapping of param options to work with.  This can be a simple array of string options, a mapping of string keys to string values, or a mapping of number keys to string values.

Examples:

##### String Keys
```
const stringOptionMap = {
  'lg': 'size-large',
  'med': 'size-medium',
  'sm': 'size-small',
  'cold': 'temperature-cold',
  'hot': 'temperature-hot'
};
```

##### Number Keys
```
const numberOptionMap = {
  1: 'option-1',
  2: 'option-2',
  3: 'option-3'
};
```

##### Array
```
const arrayOptionMap = [
  'option1',
  'option2',
  'option3',
]
```

*Note that the advantage of having set keys instead of an array is that if in the future you wish to change the ordering of your options, it won't change compression results (and therefore saved URLs using these param strings) as long as you keep the existing keys the same.* 

### Compression
Pass the `compressOptions` function your option map, and an array with the values of options that are currently selected, and it will return a compressed string representing the selections.

Example using the String Keys option map from above:
```
const selectedOptions = ['size-small', 'temperature-cold'];
const compressedOptions = compressOptions(stringOptionMap, selectedOptions);
console.log(compressedOptions); // Result: 6
```

### Decompression
Pass the `decompressOptions` function your option map, and a compressed options string received from the `compressOptions` function, and it will return an array of strings representing option values that were enabled when the values were compressed.

Example using the above compression:
```
const decompressedOptions = decompressOptions(stringOptionMap, compressedOptions);
console.log(decompressedOptions); // Result: [ 'size-small', 'temperature-cold' ]
```

## Examples
Try running `node ./dist/quickExamples.js` after building to see some examples of what the compression looks like.
