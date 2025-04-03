import { API_KEY, JWT_TOKEN, API_BASE } from '../../api/constants.js';

export async function fetchPostsWithAuthors() {
    const url = `${API_BASE}/social/posts?_author=true&limit=20`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const { data } = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;
    
    feedContainer.innerHTML = posts.length
        ? posts.map(createPostHTML).join("")
        : "<p>No posts available.</p>";
}

function createPostHTML(post) {
    const { media, author, created, title, body, tags } = post;
    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

    return `
    <div class="post">
        <div class="post-header">
            <img src="${authorAvatar}" alt="Author avatar" class="author-avatar">
            <div class="author-info">
                <span class="author-name">${authorName}</span>
                <span class="post-time">${dateString}</span>
            </div>
        </div>
        <div class="post-content">
            <h2>${title}</h2>
            <p>${body}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
        </div>
        ${tags?.length ? `
        <div class="post-footer">
            <div class="post-tags">Tags: ${tags.join(", ")}</div>
        </div>` : ''}
    </div>`;
}