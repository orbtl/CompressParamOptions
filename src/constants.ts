// URL-safe character set for compression
//                             0         10        20        30        40        50        60
export const safeCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

// Each character can represent 6 bits (2^6 = 64 characters)
export const characterBitDepth = 6;

// Mapping of characters to their indices for fast lookup
export const characterMap: Record<string, number> = [...safeCharacters].reduce(
  (map, char, index) => ({ ...map, [char]: index }),
  {});
