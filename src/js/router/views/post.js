import { API_KEY, API_BASE } from '../../api/constants.js';
import { createPostHeader, createPostFooter } from '../../ui/components/posts.js';

// Fetch individual post by ID
export async function fetchPostById(id) {
    try {
        const response = await fetch(`${API_BASE}/social/posts/${id}?_author=true&_comments=true`, {
            headers: {
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const { data } = await response.json();
        return data || null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

// Display the post on the page
export function displayPost(post) {
    const feedContainer = document.getElementById('feedContainer');
    
    if (!feedContainer) return;

    if (post) {
        feedContainer.innerHTML = createPostHTML(post);
    } else {
        feedContainer.innerHTML = '<p>Post not found.</p>';
    }
}

// Individual post HTML
function createPostHTML(post) {
    const { media, author, created, title, body, tags } = post;

    const imageUrl = media?.url || 'default-image.jpg';
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || 'Unknown Author';
    const dateString = new Date(created).toLocaleString();
    const postBody = (body && body !== 'string') ? body : '<p>No content available.</p>';
    
    return `
    <div class='post'>
        ${createPostHeader(authorAvatar, authorName, dateString)}
        <div class='post-content'>
            <h2>${title !== 'string' ? title : 'Untitled'}</h2>
            <p>${postBody}</p>
            ${imageUrl !== 'string' ? `<img src='${imageUrl}' alt='${imageAlt}' class='post-image'>` : ''}
        </div>
        ${createPostFooter(tags)}
    </div>`;
}
    