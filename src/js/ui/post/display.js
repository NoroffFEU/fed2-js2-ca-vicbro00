import { createPostHeader, createPostFooter, createPostComments, createPostReactions } from '../../ui/components/posts.js'; // Import the helper functions

export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;
    
    feedContainer.innerHTML = posts.length
        ? posts.map(createPostHTML).join("")
        : "<p>No posts available.</p>";
}   

// Feed page link to individual post
function createPostHTML(post) {
    const { id, media, author, created, title, body, tags, reactions, comments } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

    return `
    <div class="post">
        <a href="${postUrl}" class="post-link">
            ${createPostHeader(authorAvatar, authorName, dateString)}
            <div class="post-content">
                <h2>${title}</h2>
                <p>${body}</p>
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}  
            </div>
        </a>
        ${createPostFooter(tags)}
        ${createPostComments(comments)}
        ${createPostReactions(reactions, id)}
    </div>`;
}
