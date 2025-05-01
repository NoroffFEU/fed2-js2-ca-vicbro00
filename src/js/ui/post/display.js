let displayedPostsCount = 20;
let allPosts = [];

export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;

    const postsToDisplay = posts.slice(0, displayedPostsCount);
    
    feedContainer.innerHTML = postsToDisplay.length
        ? postsToDisplay.map(createPostHTML).join("")
        : "<p>No posts available.</p>";

    if (posts.length > displayedPostsCount) {
        const loadMoreButton = document.getElementById("loadMoreButton");
        if (!loadMoreButton) {
            const button = document.createElement("button");
            button.id = "loadMoreButton";
            button.textContent = "Load More";
            button.addEventListener("click", loadMorePosts);
            feedContainer.appendChild(button);
        }
    }
}

function loadMorePosts() {
    displayedPostsCount += 20;
    displayPosts(allPosts);
}

// Feed page link to individual post
export function createPostHTML(post) {
    if (!post || typeof post !== 'object') {
        console.error('Invalid post data:', post);
        return '<div class="post-error">Invalid post data</div>';
    }

    // Safely destructure with defaults
    const {
        id = '',
        media = {},
        author = {},
        created = new Date().toISOString(),
        title = 'Untitled Post',
        body = 'No content available',
        tags = []
    } = post;

    const postUrl = `/fed2-js2-ca-vicbro00/post/individual-post.html?id=${id}`;
    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown Author";
    const dateString = new Date(created).toLocaleString();
    const profileUrl = `/fed2-js2-ca-vicbro00/post/profile.html?username=${encodeURIComponent(authorName)}`;

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
            <div class="post-tags">${tags.length ? `Tags: ${tags.join(", ")}` : 'No tags'}</div>
        </div>
    </div>`;
}