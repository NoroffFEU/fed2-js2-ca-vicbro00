import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { initRegisterForm } from './src/js/ui/auth/register.js';
import { JWT_TOKEN } from './src/js/api/constants.js';
import { displayPosts } from './src/js/ui/post/display.js';
import { initPostCreateView } from './src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from './src/js/api/post/display.js';
import { fetchPostById, displayPost } from './src/js/router/views/post.js';

initSideMenu();
initLoginForm();
initRegisterForm();

// Fetch and display posts
const posts = await fetchPostsWithAuthors();
displayPosts(posts);

// Initialize post
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
    const post = await fetchPostById(postId);
    displayPost(post);
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