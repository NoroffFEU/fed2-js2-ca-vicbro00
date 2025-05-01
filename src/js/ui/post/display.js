let displayedPostsCount = 20;
let allPosts = [];

export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    if (!feedContainer) return;

    // Filter out invalid posts
    const validPosts = Array.isArray(posts) 
        ? posts.filter(post => post && post.id)
        : [];

    if (!validPosts.length) {
        feedContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    feedContainer.innerHTML = validPosts
        .slice(0, displayedPostsCount)
        .map(createPostHTML)
        .join("");

    // Add load more button if needed
    if (validPosts.length > displayedPostsCount) {
        const loadMoreButton = document.getElementById("loadMoreButton") || 
            document.createElement("button");
        
        loadMoreButton.id = "loadMoreButton";
        loadMoreButton.textContent = "Load More";
        loadMoreButton.onclick = loadMorePosts;
        
        if (!document.getElementById("loadMoreButton")) {
            feedContainer.appendChild(loadMoreButton);
        }
    }
}

function loadMorePosts() {
    displayedPostsCount += 20;
    displayPosts(allPosts);
}

// Feed page link to individual post
export function createPostHTML(post) {
    if (!post || typeof post !== "object" || !post.id) {
        console.warn("Invalid post data:", post);
        return '';
    }

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
    const profileUrl = `/fed2-js2-ca-vicbro00/auth/profile.html?username=${encodeURIComponent(authorName)}`;

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