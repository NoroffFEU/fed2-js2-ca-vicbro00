import { displayPosts } from '../../ui/post/display.js';

let allPosts = [];

export function postSearch(posts) {
    allPosts = posts;

    const postSearchInput = document.getElementById('postSearchInput');
    if (!postSearchInput) return;

    postSearchInput.addEventListener('input', () => {
        const searchTerm = postSearchInput.value.toLowerCase();
        const filteredPosts = allPosts.filter(post =>
            (post.title?.toLowerCase().includes(searchTerm) || '') ||
            (post.body?.toLowerCase().includes(searchTerm) || '')
        );
        displayPosts(filteredPosts);
    });
}