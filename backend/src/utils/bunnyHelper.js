import crypto from 'crypto';

/**
 * Generate a secure URL token for Bunny.net Stream
 * @param {string} videoId - The Bunny.net video ID
 * @param {number} expiresInSeconds - How long the token is valid (e.g. 3600 for 1 hr)
 * @returns {string} - The token signature to append to the URL
 */
export const generateBunnyToken = (videoId, expiresInSeconds = 3600) => {
  const securityKey = process.env.BUNNY_TOKEN_KEY;
  if (!securityKey) {
    console.error("BUNNY_TOKEN_KEY is not defined in .env");
    return '';
  }

  // Token expiration time
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;

  // The string to sign: securityKey + videoId + expires
  const dataToSign = securityKey + videoId + expires;

  // Create SHA256 hash
  const hash = crypto.createHash('sha256').update(dataToSign).digest('hex');

  // Return the query string parameters required by Bunny.net
  return `?token=${hash}&expires=${expires}`;
};
