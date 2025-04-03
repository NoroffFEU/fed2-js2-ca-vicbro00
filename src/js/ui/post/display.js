import { API_KEY, JWT_TOKEN, API_BASE } from '../../api/constants.js';

const feedContainer = document.getElementById("feedContainer");

export async function fetchPostsWithAuthors() {
    try {
        const postsResponse = await fetch(`${API_BASE}/social/posts?_author=true&limit=20`, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
                "Authorization": `Bearer ${JWT_TOKEN}`
            }
        });
        
        if (!postsResponse.ok) {
            throw new Error("Failed to fetch posts");
        }

        const { data: posts } = await postsResponse.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export function displayPosts(posts) {
    if (!posts.length) {
        feedContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    feedContainer.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const imageUrl = post.media?.url ? post.media.url : null;
        const imageAlt = post.media?.alt || 'Post Image';
        const authorAvatar = post.author?.avatar?.url || 'default-avatar.jpg';
        const authorName = post.author?.name || "Unknown";

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${authorAvatar}" alt="Author avatar" class="author-avatar">
                <div class="author-info">
                    <span class="author-name">${authorName}</span>
                    <span class="post-time">${new Date(post.created).toLocaleString()}</span>
                </div>
            </div>
            <div class="post-content">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
            </div>
            <div class="post-footer">
                ${post.tags?.length ? `<div class="post-tags">Tags: ${post.tags.join(", ")}</div>` : ''}
            </div>
        `;

        feedContainer.appendChild(postElement);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    feedContainer.innerHTML = "<p>Loading posts...</p>";
    
    const posts = await fetchPostsWithAuthors();
    displayPosts(posts);
});