import { API_BASE, API_KEY, JWT_TOKEN } from '../../api/constants.js';

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
export function displayUserPosts(posts, isOwnProfile) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear any existing posts

    posts.forEach(post => {
        const postHTML = createPostHTML(post, isOwnProfile);
        postsContainer.innerHTML += postHTML;
    });
}

function createPostHTML(post, isOwnProfile) {
    const { id, title, body, author } = post;
    
    let editDeleteButtons = '';
    if (isOwnProfile) {
        editDeleteButtons = `
            <button class="edit-button" data-id="${id}">Edit</button>
            <button class="delete-button" data-id="${id}">Delete</button>
        `;
    }

    return `
        <div class="post">
            <div class="post-header">
                <a href="/post/profile.html?username=${encodeURIComponent(author.name)}">${author.name}</a>
            </div>
            <div class="post-content">
                <h3>${title}</h3>
                <p>${body}</p>
            </div>
            <div class="post-footer">
                ${editDeleteButtons}
            </div>
        </div>
    `;
}