import { fetchPostsWithAuthors } from "../../api/post/display.js";

let displayedPostsCount = 20;
let allPosts = [];

export function displayPosts(posts) {
    console.log(posts);
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

export async function fetchPostsWithAuthors() {
    try {
        const response = await fetch(`${API_BASE}/social/posts?_author=true`);
        const data = await response.json();
        console.log(data);
        return data.posts || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// Feed page link to individual post
export function createPostHTML(post) {
    if (!post || !post.id) {
        console.error("Invalid post object:", post);
        return '';
    }

    if (!window.location.pathname.endsWith('/feed.html')) {
        return '';
    }
    
    const { id, media, author, created, title, body, tags } = post;
    const postUrl = `/fed2-js2-ca-vicbro00/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
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
            <div class="post-tags">Tags: ${tags?.join(", ") || 'No tags'}</div>
        </div>
    </div>`;
}