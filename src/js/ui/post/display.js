export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;
    
    feedContainer.innerHTML = posts.length
        ? posts.map(createPostHTML).join("")
        : "<p>No posts available.</p>";
}

// Feed page link to individual post
export function createPostHTML(post) {
    // Only run this on feed.html
    if (!window.location.pathname.endsWith('/feed.html')) {
        return ''; // Return empty string if not on feed.html
    }
    
    const { id, media, author, created, title, body, tags } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

    // Just use the username in the profile URL (simpler and avoids extra API calls)
    const profileUrl = `/auth/profile.html?username=${encodeURIComponent(authorName)}`;

    return `
    <div class="post">
        <a href="${profileUrl}" class="profile-link">
            <div class="post-header">
                <img src="${authorAvatar}" alt="Author Avatar" class="author-avatar">
                <p class="author-name">${authorName}</p>
                <span class="post-time">${dateString}</span>
            </div>
        </a>
        <div class="post-content">
            <a href="${postUrl}" class="post-link">
                <h2>${title}</h2>
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}
            </a>
            <p>${body}</p>
        </div>
        <div class="post-footer">
            <div class="post-tags">Tags: ${tags?.join(", ") || 'No tags'}</div>
        </div>
    </div>`;
}