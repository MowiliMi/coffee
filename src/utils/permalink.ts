import speakingurl from 'speakingurl';

/**
 * Creates a permalink from the given text.
 *
 * This function uses the `speakingurl` library to generate a URL-friendly
 * string (permalink) from the input text. The resulting permalink will be
 * truncated to 50 characters, use hyphens as separators, and exclude symbols.
 *
 * @param text - The input text to be converted into a permalink.
 * @returns A URL-friendly string (permalink) generated from the input text.
 */
export const createPermalink = (text: string) => {
  return speakingurl(text, { truncate: 50, separator: '-', symbols: false });
};
