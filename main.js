import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { initRegisterForm } from './src/js/ui/auth/register.js';
import { JWT_TOKEN } from './src/js/api/constants.js';
import { displayPosts } from './src/js/ui/post/display.js';
import { initPostCreateView } from './src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from './src/js/api/post/display.js';
import { fetchPostById, displayPost } from './src/js/router/views/post.js';
import { fetchProfileByName } from './src/js/ui/profile/profile.js';

initSideMenu();
initLoginForm();
initRegisterForm();

// Fetch and display posts
const posts = await fetchPostsWithAuthors();
displayPosts(posts);

// Initialize post creation view
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const username = urlParams.get('username');

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

if (username) {
    // Fetch the profile by username
    const profile = await fetchProfileByName(username);

    if (profile) {
        // Assuming you want to display profile data somewhere on the page
        console.log(profile);
        // Display the profile data - For example, update some elements with profile details
        document.getElementById("profileName").innerText = profile.name || "Unknown User";
        document.getElementById("profileBio").innerText = profile.bio || "No bio available";
        // You can add other profile info as needed, like avatar or email
    } else {
        console.error("Profile not found or failed to fetch.");
    }
} else {
    console.error("No username found in URL.");
}
