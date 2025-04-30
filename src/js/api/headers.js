import { API_KEY } from './constants.js';

/**
 * Generates headers for API requests.
 * Includes the API key for authentication if available.
 * 
 * @returns {Headers} A Headers object containing authentication information.
 */
export function headers() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append('Authorization', `Bearer ${API_KEY}`);
    }

    return headers;
}
