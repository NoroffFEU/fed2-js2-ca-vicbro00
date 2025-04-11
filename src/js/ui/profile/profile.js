import { API_BASE, API_KEY, JWT_TOKEN } from '../../api/constants.js';

export async function fetchAllProfiles() {
    const url = `${API_BASE}/social/profiles`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch profiles");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return [];
    }
}

export async function fetchProfileByName(name) {
    const url = `${API_BASE}/social/profiles/${name}`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}

export async function searchProfiles(queryParams = {}) {
    const url = new URL(`${API_BASE}/social/profiles/search`);
    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to search profiles");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error searching profiles:", error);
        return [];
    }
}

export async function fetchUserPostsByName(name) {
    const url = `${API_BASE}/social/profiles/${name}/posts`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch user posts");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return [];
    }
}
