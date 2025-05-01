import { API_KEY, JWT_TOKEN, API_BASE } from '../constants.js';

export async function fetchPostsWithAuthors() {
    try {
        const response = await fetch(`${API_BASE}/social/posts?_author=true&_reactions=true`, {
            headers: {
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const { data } = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}