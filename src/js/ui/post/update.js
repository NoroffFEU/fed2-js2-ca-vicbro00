import { API_BASE, API_KEY } from '../../api/constants.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Get postId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        alert('No post specified for editing');
        window.location.href = '/fed2-js2-ca-vicbro00/index.html';
        return;
    }

    try {
        // Fetch the post data
        const post = await fetchPostById(postId);
        
        if (!post) {
            throw new Error('Post not found');
        }

        // Populate the form with post data
        populateEditForm(post);

        // Set up form submission handler
        setupFormSubmission(postId);

    } catch (error) {
        console.error('Error loading post for editing:', error);
        alert('Error: ' + error.message);
        window.location.href = '/fed2-js2-ca-vicbro00/index.html';
    }
});

async function fetchPostById(postId) {
    const url = `${API_BASE}/social/posts/${postId}`;
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch post");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

function populateEditForm(post) {
    // Fill in all form fields with post data
    document.getElementById('title').value = post.title || '';
    document.getElementById('body').value = post.body || '';
    document.getElementById('tags').value = post.tags?.join(', ') || '';
    document.getElementById('media').value = post.media?.url || '';
}

function setupFormSubmission(postId) {
    document.getElementById('editPostForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get updated values from form
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
            // Call API to update post
            await updatePost(postId, updatedPost);
            alert('Post updated successfully!');
            window.location.href = `/profile.html?username=${localStorage.getItem('userName')}`;
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Update failed: ' + error.message);
        }
    });
}

async function updatePost(postId, postData) {
    const url = `${API_BASE}/social/posts/${postId}`;
    const headers = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers,
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