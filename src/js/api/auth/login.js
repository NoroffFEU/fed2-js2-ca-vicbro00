import { API_AUTH_LOGIN, API_KEY } from '../constants.js';

/**
 * Authenticates user credentials with the API and stores the session token
 * @param {string} email - User's @stud.noroff.no email address
 * @param {string} password - User's password (min 8 characters)
 * @returns {Promise<Object>} Resolves with user data on successful login
 * @throws {Error} Throws with descriptive message for invalid domain, credentials, or API errors
 */
export async function loginUser(email, password) {
    if (!email.endsWith('@stud.noroff.no')) throw new Error('Invalid email domain');

    const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY
        },
        body: JSON.stringify({ email, password })
    });

    const { data, errors } = await response.json();

    if (!response.ok) {
        throw new Error(errors?.[0]?.message || 'Login failed');
    }

    // Store token and user data
    localStorage.setItem('JWT_TOKEN', data.accessToken);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.name);
    
    return data;
}