// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information

/**
 * API key for authentication.
 * Note: This should be stored securely and not exposed in frontend code.
 * @constant {string}
 */
export const API_KEY = 'b3c2f687-f212-4a96-a8bd-06309ffbc1bb';

/**
 * Base URL for the Noroff API.
 * @constant {string}
 */
export const API_BASE = 'https://v2.api.noroff.dev';

export const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');

/**
 * Endpoints for various API functionalities.
 * @constant {string}
 */
export const API_PROFILES = `${API_BASE}/social/profiles`;

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_BASE}/auth/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_BASE}/social/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;