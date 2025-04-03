import { API_KEY, JWT_TOKEN, API_BASE } from '../../api/constants.js';

/**
 * Creates a new post
 * @param {Object} postData - Post data to create
 * @returns {Promise<Object>} - The created post
 */
export async function createPost(postData) {
    try {
        const response = await fetch(`${API_BASE}/social/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${JWT_TOKEN}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}
