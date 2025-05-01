import { API_BASE, API_KEY } from "/fed2-js2-ca-vicbro00/src/js/api/constants.js";

export async function fetchPostsWithAuthors() {
    const token = localStorage.getItem('JWT_TOKEN');

    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE}/social/posts?_author=true`, {
            headers,
        });

        if (response.status === 401 && !token) {
            const publicResponse = await fetch(`${API_BASE}/public/posts?_author=true`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Noroff-API-Key': API_KEY
                },
            });

            if (!publicResponse.ok) {
                throw new Error(`HTTP error! status: ${publicResponse.status}`);
            }

            const publicResult = await publicResponse.json();
            return publicResult.data || publicResult.posts || [];
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
