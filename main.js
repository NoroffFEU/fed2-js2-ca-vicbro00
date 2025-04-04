import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { initRegisterForm } from './src/js/ui/auth/register.js';
import { JWT_TOKEN } from './src/js/api/constants.js';
import { displayPosts } from './src/js/ui/post/display.js';
import { initPostCreateView } from './src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from './src/js/api/post/display.js';
import { fetchPostById, displayPost } from './src/js/router/views/post.js';
import { initReactionButtons } from './src/js/ui/components/reactions.js';
import { createPostReactions } from './src/js/ui/components/posts.js';

initSideMenu();
initLoginForm();
initRegisterForm();

const refreshPostData = async (postId) => {
    try {
        const updatedPost = await fetchPostById(postId);
        displayPost(updatedPost);

        // Update the reactions section with new data
        const reactionsContainer = document.getElementById('reactions-container'); 
        if (reactionsContainer) {
            reactionsContainer.innerHTML = createPostReactions(updatedPost.reactions, postId);
        }
    } catch (error) {
        console.error('Failed to refresh post data:', error);
    }
};

initReactionButtons(refreshPostData);

// Fetch and display posts
const posts = await fetchPostsWithAuthors();
displayPosts(posts);

// Initialize post creation view
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
    const post = await fetchPostById(postId);
    displayPost(post);

    // Add the reactions section to the post if applicable
    const reactionsContainer = document.getElementById('reactions-container');
    if (reactionsContainer) {
        reactionsContainer.innerHTML = createPostReactions(post.reactions, postId);
    }
} else {
    console.error("No post ID found in URL.");
}

// Logs out the user
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
        window.location.href = '/index.html';
    });
}