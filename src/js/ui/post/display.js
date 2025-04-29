import { fetchPostsWithAuthors } from "../../api/post/display.js";

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

export async function fetchAndDisplayPosts() {
    allPosts = await fetchPostsWithAuthors();
    displayPosts(allPosts);
}

// Feed page link to individual post
export function createPostHTML(post) {
    if (!window.location.pathname.endsWith('/feed.html')) {
        return '';
    }
    
    const { id, media, author, created, title, body, tags } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

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