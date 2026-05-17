import { getChildNodes } from './dom';

/**
 * Strips HTML tags from a string
 * @param string - The string containing HTML
 * @returns String with all HTML tags removed
 */
export function stripHtml(string: string): string {
  return string.replace(/<[^>]*>/g, '');
}

/**
 * Removes HTML fragment wrapper tags
 * @param html - Raw HTML string that may contain fragment tags
 * @returns Cleaned HTML string without fragment tags
 */
export function stripFragment(html: string): string {
  return html.replace(/<!--StartFragment-->([^<]*(?:<(?!!--(?:Start|End)Fragment-->)[^<]*)*)<!--EndFragment-->/g, '$1');
}

/**
 * Escapes HTML special characters in a string
 * @param input - String containing special characters
 * @returns String with HTML entities
 */
export function escapeHtml(input: string): string {
  const charToEntity: Record<string, string> = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#039;',
    '<': '&lt;',
    '>': '&gt;',
  };

  return input.replace(/[&"'<>]/g, (char) => charToEntity[char]);
}

/**
 * Decodes HTML special entities to their character equivalents
 * @param input - String containing HTML entities
 * @returns Decoded string
 */
export function decodeHtml(input: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&quot;': '"',
    '&#039;': "'",
    '&lt;': '<',
    '&gt;': '>',
  };

  return input.replace(/&(?:amp|quot|#039|lt|gt);/g, (match) => entities[match] || match);
}

/**
 * Parses an HTML string into DOM nodes
 * @param html - HTML string to parse
 * @param isStripFragment - Whether the HTML contains fragment tags that need stripping (default: false)
 * @returns Array of child nodes, or empty array if parsing failed
 */
export function parseHtml(html: string, isStripFragment: boolean = false): Node[] {
  const parser = new DOMParser(),
    input = isStripFragment ? stripFragment(html) : html;

  const doc = parser.parseFromString(`<parser-raw-block>${input}</parser-raw-block>`, 'text/html');

  const node = doc.querySelector('parser-raw-block');

  if (!node) return [];

  return getChildNodes(node);
}
