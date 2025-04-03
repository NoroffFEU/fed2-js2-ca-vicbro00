import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { JWT_TOKEN } from './src/js/api/constants.js';
import { fetchPostsWithAuthors, displayPosts } from './src/js/ui/post/display.js';
import { initPostCreateView } from './src/js/router/views/postCreate.js';

document.addEventListener('DOMContentLoaded', async () => {
    initSideMenu();
    initLoginForm();

    // Fetch and display posts
    const posts = await fetchPostsWithAuthors();
    displayPosts(posts);

    // Initialize post creation view
    initPostCreateView();

    // Logs out the user
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
            window.location.href = '/index.html';
        });
    }
});
