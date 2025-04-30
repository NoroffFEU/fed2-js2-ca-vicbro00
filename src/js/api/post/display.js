import { API_KEY, JWT_TOKEN, API_BASE } from '../constants.js';

export async function fetchPostsWithAuthors() {
    const url = `${API_BASE}/social/posts?_author=true`;
    const headers = {
        'X-Noroff-API-Key': API_KEY,
        'Authorization': `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const { data } = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}