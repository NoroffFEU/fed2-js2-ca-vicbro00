import { API_KEY, JWT_TOKEN, API_BASE } from '../../api/constants.js';
import { createPostHeader, createPostFooter } from '../../ui/components/posts.js';

// Fetch individual post by ID
export async function fetchPostById(id) {
    const url = `${API_BASE}/social/posts/${id}?_author=true`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,    
        "Authorization": `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch post");
        const result = await response.json();
        
        // Check if the data contains placeholder values
        if (result.data && result.data.title === "string") {
            throw new Error("Received placeholder data from API");
        }
        
        return result.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        return [];
    }
}

// Display the post on the page
export function displayPost(post) {
    console.log(post);
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;

    if (post) {
        feedContainer.innerHTML = createPostHTML(post);
    } else {
        feedContainer.innerHTML = "<p>Post not found.</p>";
    }
}

// Individual post HTML
function createPostHTML(post) {
    const { media, author, created, title, body, tags } = post;

    const imageUrl = media?.url || 'default-image.jpg';
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown Author";
    const dateString = new Date(created).toLocaleString();
    const postBody = (body && body !== "string") ? body : "<p>No content available.</p>";
    
    return `
    <div class="post">
        ${createPostHeader(authorAvatar, authorName, dateString)}
        <div class="post-content">
            <h2>${title !== "string" ? title : "Untitled"}</h2>
            <p>${postBody}</p>
            ${imageUrl !== "string" ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
        </div>
        ${createPostFooter(tags)}
    </div>`;
}
    