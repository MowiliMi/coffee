/**
 * Checks if the current environment is production.
 *
 * This module exports a boolean value that indicates whether the
 * `NODE_ENV` environment variable is set to 'production'.
 *
 * @returns {boolean} `true` if the `NODE_ENV` is 'production', otherwise `false`.
 */
export default process.env.NODE_ENV === 'production';