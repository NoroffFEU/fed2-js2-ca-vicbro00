import { createPost } from '../../ui/post/create.js';

export function postCreateView() {
    const form = document.getElementById('formContainer');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const postData = {
                title: document.getElementById('postTitle').value.trim(),
                body: document.getElementById('postBody').value.trim(),
                tags: document.getElementById('postTags').value
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0),
            };

            const mediaUrl = document.getElementById('postMediaUrl').value.trim();
            if (mediaUrl) {
                postData.media = {
                    url: mediaUrl,
                    alt: document.getElementById('postMediaAlt').value.trim() || ''
                };
            }

            // Check if required fields are filled
            if (!postData.title || !postData.body) {
                alert('Title and content are required.');
                return;
            }

            // Call the createPost function
            try {
                const result = await createPost(postData);
                alert('Post created successfully!');
                
                // Redirect to the feed page after creation
                window.location.href = '/fed2-js2-ca-vicbro00/post/feed.html';
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        });
    }
}
