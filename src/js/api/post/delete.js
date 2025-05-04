import { API_BASE, API_KEY, JWT_TOKEN } from '../constants.js';

export async function deletePost(postId) {
    const url = `${API_BASE}/social/posts/${postId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Noroff-API-Key': API_KEY,
                'Authorization': `Bearer ${JWT_TOKEN}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete post');
        }

        return true;

    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

export function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.dataset.id;

            if (!postId) return;

            const confirmDelete = confirm('Are you sure you want to delete this post?');
            if (!confirmDelete) return;

            try {
                await deletePost(postId);
                alert('Post deleted successfully!');
                const username = localStorage.getItem('userName');
                window.location.href = '/fed2-js2-ca-vicbro00/post/feed.html';
            } catch (error) {
                alert('Failed to delete post: ' + error.message);
            }
        });
    });
}