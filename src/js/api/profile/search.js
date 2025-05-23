import { API_BASE, API_KEY } from '../../api/constants.js';

export async function searchProfilesAPI(query) {
    const token = localStorage.getItem('JWT_TOKEN');

    if (!token) {
        throw new Error('User is not logged in (no token found)');
    }

    const url = `${API_BASE}/social/profiles/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error('Failed to search profiles');

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}