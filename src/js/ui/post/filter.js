import { displayPosts } from '../../ui/post/display.js';

export function filterPosts(posts) {
    const allPosts = posts;

    const tagFilterInput = document.getElementById('tagFilterInput');

    function applyTagFilter() {
        const tagSearchTerm = tagFilterInput?.value.toLowerCase() || '';

        const filteredPosts = allPosts.filter(post => {
            const matchesTag = !tagSearchTerm || post.tags?.some(tag => tag.toLowerCase().includes(tagSearchTerm));

            return matchesTag;
        });

        displayPosts(filteredPosts);
    }

    if (tagFilterInput) {
        tagFilterInput.addEventListener('input', applyTagFilter);
    }
}
