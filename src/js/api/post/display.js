import { JWT_TOKEN, API_BASE, API_KEY } from "/fed2-js2-ca-vicbro00/src/js/api/constants.js";

export async function fetchPostsWithAuthors() {
    const token = localStorage.getItem(JWT_TOKEN);
    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
    };

    // Add Authorization header ONLY if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE}/social/posts?_author=true&_reactions=true`;
    console.log('Fetching posts from:', url);
    console.log('Headers:', headers);

    try {
        const response = await fetch(url, {
            headers,
        });

        if (!response.ok) {
            // More detailed error message
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data || result.posts || []; // Handle different response formats

    } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts. ' + (error.message || 'Please try again later.'));
        return [];
    }
}