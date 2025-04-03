const API_KEY = '9a919101-04d7-4ce4-ab4a-41d4e0211e7f';
const BASE_URL = 'https://v2.api.noroff.dev';

/**
 * Registers a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} - Response data
 * @throws {Error} - If registration fails
 */
export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = data.errors?.[0]?.message || 
                (response.status === 409 ? 'Email already registered' : 'Registration failed');
    throw new Error(error);
  }

  return data;
}
