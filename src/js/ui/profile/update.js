import { API_BASE, API_KEY } from '../../api/constants.js';

export async function initEditPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        console.error('No post ID found in URL');
        return;
    }

    try {
        const post = await fetchPostById(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        const currentUser = localStorage.getItem('userName');
        if (post.author !== currentUser) {
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = 'none';
            }
        }

        populateEditForm(post);
        setupFormSubmission(postId);
    } catch (error) {
        console.error('Error initializing edit page:', error);
    }
}

async function fetchPostById(postId) {
    const token = localStorage.getItem('JWT_TOKEN');
    const url = `${API_BASE}/social/posts/${postId}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error("Failed to fetch post");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

function populateEditForm(post) {
    document.getElementById('title').value = post.title || '';
    document.getElementById('body').value = post.body || '';
    document.getElementById('tags').value = post.tags?.join(', ') || '';
    document.getElementById('media').value = post.media?.url || '';
}

function setupFormSubmission(postId) {
    const form = document.getElementById('editPostForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const updatedPost = {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            tags: document.getElementById('tags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0),
            media: {
                url: document.getElementById('media').value || undefined
            }
        };

        try {
            await updatePost(postId, updatedPost);
            alert('Post updated successfully!');
            const username = localStorage.getItem('userName');
            window.location.href = `/fed2-js2-ca-vicbro00/profile.html?username=${username}`;
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post: ' + error.message);
        }
    });
}

async function updatePost(postId, postData) {
    const token = localStorage.getItem('JWT_TOKEN');
    const url = `${API_BASE}/social/posts/${postId}`;
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to update post");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}