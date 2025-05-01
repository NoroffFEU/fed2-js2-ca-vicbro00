import { API_KEY, API_BASE } from '../constants.js';

export async function fetchPostsWithAuthors() {
    const token = localStorage.getItem(JWT_TOKEN);
    const headers = {
        'Content-Type': 'application/json',
    };

    // Only set Authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/social/posts?_author=true&_reactions=true`, {
            headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}