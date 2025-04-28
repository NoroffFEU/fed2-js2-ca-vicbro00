export async function getUserData(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) throw new Error("Authentication required");

    const response = await fetch(`${API_BASE}/social/profiles/${username}?_count=true`, {
        headers: {
            "X-Noroff-API-Key": API_KEY,
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
}