import { API_BASE, API_KEY, JWT_TOKEN } from '../../api/constants.js';
import { setupDeleteButtons } from '../../api/post/delete.js';

export async function fetchUserPostsByName(name) {
    const url = `${API_BASE}/social/profiles/${name}/posts`;
    const headers = {
        'X-Noroff-API-Key': API_KEY,
        'Authorization': `Bearer ${JWT_TOKEN}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch user posts');
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return [];
    }
}

// Displays user profile and posts
export function displayUserPosts(posts) {
    const container = document.getElementById('userPostsContainer');
    if (!container) return;

    container.innerHTML = posts.length > 0 
        ? posts.map(post => createUserPostHTML(post, true)).join('')
        : '<p>This user has no posts yet.</p>';

    setupEditButtons();
    setupDeleteButtons();
}

function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = event.target.dataset.id;
            if (postId) {
                window.location.href = `/fed2-js2-ca-vicbro00/post/edit/index.html?id=${postId}`;
            }
        });
    });
}

function createUserPostHTML(post, showButtons = false) {
    const { media, title, body, tags } = post;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';

    return `
    <div class='post'>
        <div class='post-content'>
            <h2>${title}</h2>
            ${imageUrl ? `<img src='${imageUrl}' alt='${imageAlt}' class='post-image'>` : ''}
            <p>${body}</p>
        </div>
        ${showButtons ? `
        <div class='post-buttons'>
            <button class='edit-button' data-id='${post.id}'>Edit</button>
            <button class='delete-button' data-id='${post.id}'>Delete</button>
        </div>` : ''}
        <div class='post-footer'>
            <div class='post-tags'>Tags: ${tags?.join(', ') || 'No tags'}</div>
        </div>
    </div>`;
}