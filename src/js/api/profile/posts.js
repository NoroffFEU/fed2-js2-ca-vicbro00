import { API_BASE, API_KEY, JWT_TOKEN } from '../constants.js';

/**
 * Fetches all posts by a specific user
 * @param {string} username - The profile name to fetch posts for
 * @param {Object} [options] - Optional query parameters
 * @param {string} [options.sort] - Sort field
 * @param {string} [options.sortOrder] - Sort order (asc/desc)
 * @param {number} [options.limit] - Number of posts per page
 * @param {number} [options.page] - Page number
 * @returns {Promise<Array>} - Array of posts
 */
export async function fetchUserPosts(username, options = {}) {
    try {
        const queryParams = new URLSearchParams();
        
        for (const [key, value] of Object.entries(options)) {
            if (value !== undefined) {
                queryParams.append(key, value);
            }
        }

        const url = `${API_BASE}/social/profiles/${username}/posts?${queryParams.toString()}`;
        console.log('Fetching posts from:', url);

        const response = await fetch(url, {
            headers: {
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${JWT_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(errorData.message || 'Failed to fetch user posts');
        }

        const data = await response.json();
        console.log('Posts data:', data);
        return data.data || [];  // Ensure an empty array is returned if no posts are available
    } catch (error) {
        console.error('Error in fetchUserPosts:', error);
        throw error;
    }
}
