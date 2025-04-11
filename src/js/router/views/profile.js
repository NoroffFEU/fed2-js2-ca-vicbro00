import { API_BASE, API_KEY, JWT_TOKEN } from '../../api/constants.js';

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

import { createPostHeader, createPostFooter } from '../../ui/components/posts.js';

export function displayUserPosts(posts) {
    const feedContainer = document.getElementById("userPostsContainer");

    if (!feedContainer) return;

    feedContainer.innerHTML = posts.length
        ? posts.map(createPostHTML).join("")
        : "<p>No posts available.</p>";
}

// Feed page link to individual post
function createPostHTML(post) {
    const { id, media, author, created, title, body, tags } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

    // Construct the profile URL using the author's name
    const profileUrl = `/profile/individual-profile.html?username=${encodeURIComponent(authorName)}`;

    return `
    <div class="post">
        <a href="${profileUrl}" class="profile-link">
            <div class="post-header">
                ${createPostHeader(authorAvatar, authorName, dateString)}
            </div>
        </a>
        <div class="post-content">
            <a href="${postUrl}" class="post-link">
                <h2>${title}</h2>
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
            </a>
            <p>${body}</p>
        </div>
        ${createPostFooter(tags)}
    </div>`;
}
