// Type definitions for compress-param-options

export type StringOptionMap = Record<string, string>;
export type NumberOptionMap = Record<number, string>;
export type ArrayOptionMap = string[];
export type OptionMap = StringOptionMap | NumberOptionMap | ArrayOptionMap;
export type SelectedOptions = Set<string>;

/**
 * Configuration options for compression operations.
 * 
 * @example
 * ```typescript
 * // Use default options
 * const options = CompressionOptions.default();
 * 
 * // Create custom options
 * const customOptions = new CompressionOptions(true, false, ',', true);
 * 
 * // Create with specific settings
 * const options = new CompressionOptions(
 *   true,  // includeUncompressed
 *   false, // warnOnUncompressed
 *   ',',   // separationCharacter
 *   true   // useBitwiseCompression
 * );
 * ```
 */
export class CompressionOptions {
  /** Whether to include options not found in the map as uncompressed data */
  public includeUncompressed: boolean;

  /** Whether to warn when options cannot be compressed */
  public warnOnUncompressed: boolean;

  /** Character used to separate uncompressed options */
  public separationCharacter: string;

  /** Whether to use bitwise compression algorithm */
  public useBitwiseCompression: boolean;

  /**
   * Creates a new CompressionOptions instance.
   * 
   * @param includeUncompressed - Whether to include options not found in the map as uncompressed data (default: false)
   * @param warnOnUncompressed - Whether to warn when options cannot be compressed (default: true)
   * @param separationCharacter - Character used to separate uncompressed options (default: ',')
   * @param useBitwiseCompression - Whether to use bitwise compression algorithm (default: true)
   */
  constructor(
    includeUncompressed: boolean = false,
    warnOnUncompressed: boolean = true,
    separationCharacter: string = ',',
    useBitwiseCompression: boolean = true
  ) {
    this.includeUncompressed = includeUncompressed;
    this.warnOnUncompressed = warnOnUncompressed;
    this.separationCharacter = separationCharacter;
    this.useBitwiseCompression = useBitwiseCompression;
  }

  /**
   * Creates a CompressionOptions instance with default settings.
   * 
   * @returns A new CompressionOptions instance with default values
   */
  static default(): CompressionOptions {
    return new CompressionOptions();
  }
}

/**
 * Configuration options for decompression operations.
 * 
 * @example
 * ```typescript
 * // Use default options
 * const options = DecompressionOptions.default();
 * 
 * // Create custom options
 * const customOptions = new DecompressionOptions(',', true);
 * 
 * // Create with specific settings
 * const options = new DecompressionOptions(
 *   ',',  // separationCharacter
 *   true  // useBitwiseDecompression
 * );
 * ```
 */
export class DecompressionOptions {
  /** Character used to separate uncompressed options */
  public separationCharacter: string;

  /** Whether to use bitwise decompression algorithm */
  public useBitwiseDecompression: boolean;

  /**
   * Creates a new DecompressionOptions instance.
   * 
   * @param separationCharacter - Character used to separate uncompressed options (default: ',')
   * @param useBitwiseDecompression - Whether to use bitwise decompression algorithm (default: true)
   */
  constructor(
    separationCharacter: string = ',',
    useBitwiseDecompression: boolean = true
  ) {
    this.separationCharacter = separationCharacter;
    this.useBitwiseDecompression = useBitwiseDecompression;
  }

  /**
   * Creates a DecompressionOptions instance with default settings.
   * 
   * @returns A new DecompressionOptions instance with default values
   */
  static default(): DecompressionOptions {
    return new DecompressionOptions();
  }
}
