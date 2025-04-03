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