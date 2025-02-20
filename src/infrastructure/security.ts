import helmet from 'helmet';
import cors from 'cors';

import isProduction from '@/utils/isProduction';
import Boom from '@hapi/boom';

/**
 * Configures security-related HTTP headers using the Helmet middleware.
 *
 * @constant
 * @type {object}
 * @property {boolean} hidePoweredBy - Hides the X-Powered-By header to prevent attackers from knowing the server technology.
 * @property {boolean} crossOriginEmbedderPolicy - Disables the Cross-Origin Embedder Policy.
 * @property {object} referrerPolicy - Sets the Referrer-Policy header to control the amount of referrer information sent with requests.
 * @property {string} referrerPolicy.policy - The policy for the Referrer-Policy header, set to "same-origin".
 * @property {object} crossOriginResourcePolicy - Sets the Cross-Origin-Resource-Policy header to control the resources that can be loaded.
 * @property {string} crossOriginResourcePolicy.policy - The policy for the Cross-Origin-Resource-Policy header, set to "cross-origin".
 * @property {object} permittedCrossDomainPolicies - Sets the X-Permitted-Cross-Domain-Policies header to control the cross-domain policies.
 * @property {string} permittedCrossDomainPolicies.permittedPolicies - The permitted policies for the X-Permitted-Cross-Domain-Policies header, set to "all".
 */
const HelmetLib = helmet({
  hidePoweredBy: true,
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  permittedCrossDomainPolicies: { permittedPolicies: 'all' },
});

const whitelist = ['http://localhost:3000'];

/**
 * Configures CORS (Cross-Origin Resource Sharing) settings for the application.
 * 
 * @constant
 * @type {import('cors').CorsOptions}
 * 
 * @property {function} origin - A function to determine if the request origin is allowed.
 * @property {boolean} credentials - Indicates whether or not the response to the request can be exposed when the credentials flag is true.
 * @property {number} optionsSuccessStatus - Provides a status code to use for successful OPTIONS requests.
 * @property {string} methods - Specifies the allowed methods for CORS.
 * @property {number} maxAge - Indicates how long (in seconds) the results of a preflight request can be cached.
 * @property {string[]} allowedHeaders - Specifies the headers that are allowed in the actual request.
 * 
 * The `origin` function checks if the application is in production mode and if the request origin is in the whitelist.
 * If the origin is allowed, it calls the callback with `null` and `true`. Otherwise, it calls the callback with a forbidden error.
 */
const CorsLib = cors({
  origin(requestOrigin: string | undefined, callback) {
    if (!isProduction) {
      callback(null, true);
      return;
    } else if ((requestOrigin && whitelist.indexOf(requestOrigin) !== -1) || !requestOrigin) {
      callback(null, true);
    } else {
      callback(Boom.forbidden('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,POST,OPTIONS',
  maxAge: 600,
  allowedHeaders: ['Content-Type', 'Referer', 'Set-Cookie', 'Cookie'],
});

export { HelmetLib as HelmetSecurity, CorsLib as CorsSecurity };
