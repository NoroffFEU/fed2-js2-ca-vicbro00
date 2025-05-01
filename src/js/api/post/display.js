import { API_BASE, API_KEY } from "/fed2-js2-ca-vicbro00/src/js/api/constants.js";

export async function fetchPostsWithAuthors() {
    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
    };

    try {
        const response = await fetch(`${API_BASE}/social/posts?_author=true`, { headers });

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