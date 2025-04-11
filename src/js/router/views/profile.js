import { API_BASE, API_KEY, JWT_TOKEN } from '../../api/constants.js';
import { createPostHTML } from '../../ui/post/display.js';

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

// Displays user profile and posts
export function displayUserPosts(posts) {
    const container = document.getElementById('userPostsContainer');
    if (!container) return;

    container.innerHTML = posts.length > 0 
        ? posts.map(post => createUserPostHTML(post)).join('')
        : '<p>This user has no posts yet.</p>';
}

function createUserPostHTML(post) {
    const { id, media, title, body, tags } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';

    // Get username from URL for consistent profile linking
    const urlParams = new URLSearchParams(window.location.search);

    return `
    <div class="post">
        <div class="post-content">
            <h2>${title}</h2>
            ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
        <p>${body}</p>
        </div>
        <div class="post-footer">
            <div class="post-tags">Tags: ${tags?.join(", ") || 'No tags'}</div>
        </div>
    </div>`;
}