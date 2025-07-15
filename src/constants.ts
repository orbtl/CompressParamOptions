// URL-safe character set for compression
export const safeCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

// Each character can represent 6 bits (2^6 = 64 characters)
export const characterBitDepth = 6;

// Character used to separate uncompressed options
export const separationCharacter = ',';

// Mapping of characters to their indices for fast lookup
export const characterMap: Record<string, number> = [...safeCharacters].reduce(
  (map, char, index) => ({ ...map, [char]: index }),
  {});
