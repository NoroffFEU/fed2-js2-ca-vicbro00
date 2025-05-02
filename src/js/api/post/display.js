import { API_BASE, API_KEY } from "/fed2-js2-ca-vicbro00/src/js/api/constants.js";

/**
 * Fetches all posts with their authors from the API.
 *
 * @async
 * @function fetchPostsWithAuthors
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */
export async function fetchPostsWithAuthors() {
    const token = localStorage.getItem('JWT_TOKEN');

    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE}/social/posts?_author=true`, { headers });

        if (response.status === 401 && !token) {
            alert('You need to log in to view posts.');
            window.location.href = '/fed2-js2-ca-vicbro00/auth/login/index.html';
            return [];
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data || result.posts || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}