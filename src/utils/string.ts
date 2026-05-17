/**
 * Checks if a string is empty or contains only whitespace and invisible characters
 * Supports spaces, tabs, zero-width spaces, BOM, non-breaking spaces, and other Unicode whitespace
 * @param string - The string to check
 * @returns True if the string is empty, undefined, or contains only whitespace/invisible characters
 */
export function isEmptyString(string: string | null | undefined): boolean {
  // Use isNullOrEmpty for basic check first
  if (string == null) return true;

  return !string.replace(/[\s\u200B\uFEFF\u00A0\u1680\u180E\u2000-\u200F\u2028-\u202F\u205F\u3000]+/g, '');
}

/**
 * Checks if a string is empty, null, or undefined
 * @param string - The string to check
 * @returns True if string is empty, null, or undefined
 */
export function isNullOrEmpty(string: string | null | undefined): boolean {
  return string == null || string === '';
}

/**
 * Checks if a string contains only whitespace characters
 * @param string - The string to check
 * @returns True if string is not empty but contains only whitespace
 */
export function isWhitespace(string: string): boolean {
  return string.length > 0 && string.trim().length === 0;
}

/**
 * Converts the first character of a string to uppercase, leaving the rest unchanged
 * @param string - The string to convert
 * @returns The string with first character uppercase
 */
export function upperFirst(string: string): string {
  if (!string) return '';
  return upper(string.charAt(0)) + string.slice(1);
}

/**
 * Converts the first character of a string to lowercase, leaving the rest unchanged
 * @param string - The string to convert
 * @returns The string with first character lowercased
 */
export function lowerFirst(string: string): string {
  if (!string) return '';
  return lower(string.charAt(0)) + string.slice(1);
}

/**
 * Converts entire string to uppercase
 * @param string - The string to convert
 * @returns Uppercase string
 */
export function upper(string: string): string {
  return string.toUpperCase();
}

/**
 * Converts entire string to lowercase
 * @param string - The string to convert
 * @returns Lowercase string
 */
export function lower(string: string): string {
  return string.toLowerCase();
}

/**
 * Replaces all occurrences of a substring within a string
 * @param find - The substring to find
 * @param replace - The replacement string
 * @param string - The original string
 * @returns The string with all occurrences replaced
 */
export function replaceAll(find: string, replace: string, string: string): string {
  // Use split-join for better performance without regex
  return string.split(find).join(replace);
}

/**
 * Truncates a string to a specified length and appends suffix if truncated
 * @param string - The string to truncate
 * @param maxLength - Maximum number of characters to keep from the original string (excluding suffix)
 * @param suffix - Suffix to append if truncated (default: "...")
 * @param cutFromStart - If true, truncates from the beginning, otherwise from the end (default: false)
 * @returns Truncated string with suffix if needed
 */
export function truncate(
  string: string,
  maxLength: number,
  suffix: string = '...',
  cutFromStart: boolean = false,
): string {
  if (string.length <= maxLength) return string;

  if (cutFromStart) {
    return suffix + string.slice(-maxLength);
  }

  return string.slice(0, maxLength) + suffix;
}

/**
 * Converts a string to camelCase
 * @param string - The string to convert (supports kebab-case, snake_case, space separated)
 * @returns camelCase string
 */
export function toCamelCase(string: string): string {
  return lowerFirst(string.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : '')));
}

/**
 * Converts a string to kebab-case
 * @param string - The string to convert (supports camelCase, PascalCase, snake_case)
 * @returns kebab-case string
 */
export function toKebabCase(string: string): string {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case
 * @param string - The string to convert (supports camelCase, PascalCase, kebab-case)
 * @returns snake_case string
 */
export function toSnakeCase(string: string): string {
  return string
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Reverses a string
 * @param string - The string to reverse
 * @returns Reversed string
 */
export function reverse(string: string): string {
  return string.split('').reverse().join('');
}

/**
 * Converts bytes to a human readable string with automatic browser locale detection
 * @param bytes - The number of bytes to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with appropriate unit
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) {
    return new Intl.NumberFormat(navigator.language).format(0) + ' B';
  }

  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const unitTranslations: Record<string, string[]> = {
    ru: ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'],
    uk: ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЕБ', 'ЗБ', 'ЙБ'],
    de: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    fr: ['o', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'],
    es: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    it: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    pl: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    zh: ['字节', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    ja: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    ko: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    ar: ['ب', 'ك ب', 'م ب', 'ج ب', 'ت ب', 'ب ب', 'ا ب', 'ز ب', 'ي ب'],
    hi: ['बाइट', 'कीबी', 'मीबी', 'गीबी', 'तीबी', 'पीबी', 'ईबी', 'जीबी', 'यीबी'],
  };

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  const formattedValue = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  const langCode = navigator.language.split('-')[0];
  const localizedUnits = unitTranslations[langCode] || units;

  return `${formattedValue} ${localizedUnits[i]}`;
}

/**
 * Generates a random string of specified length
 * @param length - Length of the random string to generate
 * @param charset - Character set to use ("alphanumeric", "alpha", "numeric", "hex")
 * @returns Random string
 */
export function randString(
  length: number,
  charset: 'alphanumeric' | 'alpha' | 'numeric' | 'hex' = 'alphanumeric',
): string {
  const chars = {
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    hex: '0123456789abcdef',
  };

  const characters = chars[charset];
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

/**
 * Masks a portion of a string with a character (useful for hiding sensitive data)
 * @param string - The string to mask
 * @param startVisible - Number of characters to show at start (default: 4)
 * @param endVisible - Number of characters to show at end (default: 4)
 * @param maskChar - Character to use for masking (default: "*")
 * @returns Masked string
 */
export function mask(string: string, startVisible: number = 4, endVisible: number = 4, maskChar: string = '*'): string {
  if (string.length <= startVisible + endVisible) {
    return maskChar.repeat(string.length);
  }
  return (
    string.slice(0, startVisible) +
    maskChar.repeat(string.length - startVisible - endVisible) +
    string.slice(-endVisible)
  );
}
