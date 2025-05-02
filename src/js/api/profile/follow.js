import { API_BASE } from '../constants.js';

/**
 * Follows a user by sending a PUT request to the follow endpoint.
 * @param {string} username - The username of the user to follow.
 */
export async function followUser(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    const loggedInUser = localStorage.getItem('userName');

    if (!token) throw new Error('You need to be logged in to follow users');
    if (username === loggedInUser) throw new Error('You cannot follow yourself');

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}/follow`, {
            method: 'PUT',
            headers: {
                'X-Noroff-API-Key': 'b3c2f687-f212-4a96-a8bd-06309ffbc1bb',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message || 'Failed to follow user';
            console.error('Follow request failed:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();

        let followingList = JSON.parse(localStorage.getItem('followingList')) || [];
        if (!followingList.includes(username)) {
            followingList.push(username);
            localStorage.setItem('followingList', JSON.stringify(followingList));
        }

        return result;
    } catch (error) {
        console.error('Error during follow action:', error);
        if (error instanceof TypeError) {
            // Handles potential network or fetch-related errors
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error(`Failed to follow user: ${error.message}`);
        }
    }
}

/**
 * Unfollows a user by sending a PUT request to the unfollow endpoint.
 * @param {string} username - The username of the user to unfollow.
 */
export async function unfollowUser(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) throw new Error('You need to be logged in to unfollow users');

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}/unfollow`, {
            method: 'PUT',
            headers: {
                'X-Noroff-API-Key': 'b3c2f687-f212-4a96-a8bd-06309ffbc1bb',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message || 'Failed to unfollow user';
            console.error('Unfollow request failed:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();

        let followingList = JSON.parse(localStorage.getItem('followingList')) || [];
        followingList = followingList.filter(user => user !== username);
        localStorage.setItem('followingList', JSON.stringify(followingList));

        return result;
    } catch (error) {
        console.error('Error during unfollow action:', error);
        if (error instanceof TypeError) {
            // Handles potential network or fetch-related errors
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error(`Failed to unfollow user: ${error.message}`);
        }
    }
}

/**
 * Checks if the user is following a specific profile.
 * @param {string} username - The username of the user to check.
 * @returns {boolean} - True if following, false otherwise.
 */
export async function checkIfFollowing(username) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) {
        console.warn('No JWT token found, unable to check follow status');
        return false;
    }

    const followingList = JSON.parse(localStorage.getItem('followingList')) || [];
    if (followingList.includes(username)) {
        return true;
    }

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${username}`, {
            headers: {
                'X-Noroff-API-Key': 'b3c2f687-f212-4a96-a8bd-06309ffbc1bb',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message || 'Failed to fetch user profile';
            console.error('Failed to check follow status:', errorMessage);
            throw new Error(errorMessage);
        }

        const profile = await response.json();
        return profile.following || false;
    } catch (error) {
        console.error('Error checking follow status:', error);
        if (error instanceof TypeError) {
            // Handles potential network or fetch-related errors
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error(`Failed to check follow status: ${error.message}`);
        }
    }
}