import { API_BASE } from "../constants.js";

/**
 * Follows a user by sending a PUT request to the follow endpoint.
 * @param {string} username - The username of the user to follow.
 */
export async function followUser(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) throw new Error("You need to be logged in to follow users");

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}/follow`, {
            method: 'PUT',
            headers: {
                "X-Noroff-API-Key": import.meta.env.VITE_API_KEY || "b3c2f687-f212-4a96-a8bd-06309ffbc1bb",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to follow user");
        }

        const result = await response.json();

        let followingList = JSON.parse(localStorage.getItem('followingList')) || [];
        if (!followingList.includes(username)) {
            followingList.push(username);
            localStorage.setItem('followingList', JSON.stringify(followingList));
        }

        return result;
    } catch (error) {
        console.error("Follow error:", error);
        throw error;
    }
}

/**
 * Unfollows a user by sending a PUT request to the unfollow endpoint.
 * @param {string} username - The username of the user to unfollow.
 */
export async function unfollowUser(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) throw new Error("You need to be logged in to unfollow users");

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}/unfollow`, {
            method: 'PUT',
            headers: {
                "X-Noroff-API-Key": import.meta.env.VITE_API_KEY || "b3c2f687-f212-4a96-a8bd-06309ffbc1bb",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to unfollow user");
        }

        const result = await response.json();

        let followingList = JSON.parse(localStorage.getItem('followingList')) || [];
        followingList = followingList.filter(user => user !== username);
        localStorage.setItem('followingList', JSON.stringify(followingList));

        return result;
    } catch (error) {
        console.error("Unfollow error:", error);
        throw error;
    }
}

/**
 * Checks if the user is following a specific profile.
 * @param {string} username - The username of the user to check.
 * @returns {boolean} - True if following, false otherwise.
 */
export async function checkIfFollowing(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) return false;

    const followingList = JSON.parse(localStorage.getItem('followingList')) || [];
    if (followingList.includes(username)) {
        return true;
    }

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}`, {
            headers: {
                "X-Noroff-API-Key": import.meta.env.VITE_API_KEY || "b3c2f687-f212-4a96-a8bd-06309ffbc1bb",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error("Failed to check follow status");
        }

        const profile = await response.json();
        return profile.following || false;
    } catch (error) {
        console.error("Error checking follow status:", error);
        throw error;
    }
}
