import { API_KEY, API_BASE } from '../../api/constants.js';
import { authGuard } from '../../utilities/authGuard.js';

document.addEventListener("DOMContentLoaded", () => {
    // Authguard on create page
    if (window.location.pathname.includes('/fed2-js2-ca-vicbro00/post/create/index.html')) {
        authGuard();
    }
});
/**
 * Creates a new post
 * @param {Object} postData - Post data to create
 * @returns {Promise<Object>} - The created post
 */
export async function createPost(postData) {
    try {
        const token = localStorage.getItem('JWT_TOKEN');

        const response = await fetch(`${API_BASE}/social/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${token}`
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