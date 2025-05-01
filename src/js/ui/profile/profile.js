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
    const url = `${API_BASE}/social/profiles/${name}?_count=true&_followers=true`;
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

import { initializeFollowButton } from "../../router/views/follow.js";

/**
 * Renders the user profile and initializes the follow button.
 * @param {string} username - The username to display.
 */
export async function displayUserProfile(username) {
    try {
        const userData = await getUserData(username);
        const followersCount = userData._count.followers;

        document.getElementById('profileUsername').textContent = userData.username;
        document.getElementById('profileImage').src = userData.profileImage;
        document.getElementById('profileFollowersCount').textContent = `${followersCount} Followers`;

        initializeFollowButton(username);
    } catch (error) {
        console.error("Error displaying user profile:", error);
    }
}

/**
 * Displays the followers list for a profile
 * @param {Array} followers - Array of follower objects
 */
export function displayFollowers(followers) {
    const followersContainer = document.getElementById('followersContainer');
    if (!followersContainer) return;

    followersContainer.innerHTML = '';

    if (!followers || followers.length === 0) {
        followersContainer.innerHTML = '<p>No followers yet</p>';
        return;
    }

    const followersList = document.createElement('div');
    followersList.className = 'followers-list';

    followers.forEach(follower => {
        const followerElement = document.createElement('div');
        followerElement.className = 'follower-item';
        followerElement.innerHTML = `
            <img src="${follower.avatar?.url || 'default-avatar.jpg'}" 
                 alt="${follower.avatar?.alt || follower.name}" 
                 class="follower-avatar">
            <div class="follower-info">
                <h4>${follower.name}</h4>
                <p>${follower.bio || 'No bio available'}</p>
            </div>
        `;
        followersList.appendChild(followerElement);
    });

    followersContainer.appendChild(followersList);
}

// Users profiles
const urlParams = new URLSearchParams(window.location.search);
const profileUsername = urlParams.get('username');
const loggedInUsername = localStorage.getItem('userName');

// Fetch posts for the profile
const userPosts = await fetchUserPostsByName(profileUsername);

// Determine if it's the logged-in user's profile
const isOwnProfile = profileUsername === loggedInUsername;

// Pass this flag to the function to control button visibility
displayUserPosts(userPosts, isOwnProfile);