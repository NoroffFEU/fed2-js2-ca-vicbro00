import { JWT_TOKEN } from '/fed2-js2-ca-vicbro00/src/js/api/constants.js';
import { fetchProfileByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { displayUserPosts } from '/fed2-js2-ca-vicbro00/src/js/router/views/profile.js';
import { fetchUserPostsByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { followUser, checkIfFollowing, unfollowUser } from '/fed2-js2-ca-vicbro00/src/js/api/profile/follow.js';
import { initSideMenu } from '/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js';
import { setupProfileSearch } from '/fed2-js2-ca-vicbro00/src/js/router/views/profileSearch.js';
import { initEditPostPage } from '/fed2-js2-ca-vicbro00/src/js/ui/post/update.js';
import { initPostSearch } from '/fed2-js2-ca-vicbro00/src/js/ui/post/search.js';
import { filterPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/filter.js';
import { displayPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display.js';
import { initPostCreateView } from '/fed2-js2-ca-vicbro00/src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from '/fed2-js2-ca-vicbro00/src/js/api/post/display.js';
import { fetchPostById } from '/fed2-js2-ca-vicbro00/src/js/router/views/post.js';
import { initAuthLoginForm } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/login.js';
import { initRegisterForm } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/register.js';
import { createPostHTML } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display.js';

// Main function to link everything together
export async function loadFeedPage() {
    // Fetch posts from API
    const posts = await fetchPostsWithAuthors();

    // Display posts on the feed page
    displayPosts(posts);
}

// Only execute the function if on the feed page
if (window.location.pathname.includes('feed/index.html')) {
    loadFeedPage();
}

/*
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Feed page
        if (window.location.pathname.endsWith('/feed/index.html')) {
            initPostSearch(posts);
            filterPosts(posts);
        }
        
        // Individual post page
        if (window.location.pathname.endsWith('individual-post.html')) {
            const postId = new URLSearchParams(window.location.search).get('id');
            if (postId) {
                const post = await fetchPostById(postId);
                const feedContainer = document.getElementById('feedContainer');
                if (feedContainer) {
                    feedContainer.innerHTML = post ? createPostHTML(post) : '<p>Post not found</p>';
                }
            }
        }
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});
*/

/*
const posts = await fetchPostsWithAuthors();
displayPosts(posts);
*/

initSideMenu();

// Initialize side menu and forms
initAuthLoginForm();
initRegisterForm();
setupProfileSearch();

if (window.location.pathname.includes('/post/edit/')) {
    initEditPostPage();
}

// Initialize post creation view
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Logs out the user
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
        window.location.href = '/fed2-js2-ca-vicbro00/index.html';
    });
}

if (username) {
    const profile = await fetchProfileByName(username);

    if (profile) {
        const profileNameElement = document.getElementById('profileName');
        const profileBioElement = document.getElementById('profileBio');

        if (profileNameElement) profileNameElement.innerText = profile.name || 'Unknown User';
        if (profileBioElement) profileBioElement.innerText = profile.bio || 'No bio available';

        const profileImageElement = document.getElementById('profileImage');
        if (profileImageElement && profile.avatar) {
            profileImageElement.src = profile.avatar.url || '';
            profileImageElement.alt = profile.avatar.alt || 'Profile Image';
        }

        const profileFollowerCountElement = document.getElementById('profileFollowerCount');
        if (profileFollowerCountElement) {
            let followerCount = profile._count.followers;
            profileFollowerCountElement.innerText = `${followerCount} Followers`;
        }

        const followButton = document.getElementById('followButton');
        if (followButton) {
            try {
                const isFollowing = await checkIfFollowing(username);
                updateFollowButton(followButton, isFollowing);

                followButton.addEventListener('click', async () => {
                    try {
                        followButton.disabled = true;

                        if (followButton.classList.contains('following')) {
                            await unfollowUser(username);
                            updateFollowButton(followButton, false);
                            alert(`You have unfollowed ${username}`);
                        } else {
                            await followUser(username);
                            updateFollowButton(followButton, true);
                            alert(`You are now following ${username}`);
                        }

                        const updatedProfile = await fetchProfileByName(username);
                        if (updatedProfile && profileFollowerCountElement) {
                            const updatedFollowerCount = updatedProfile._count.followers;
                            profileFollowerCountElement.innerText = `${updatedFollowerCount} Followers`;
                        }

                    } catch (error) {
                        console.error('Error:', error);
                        alert(error.message);
                        const currentStatus = await checkIfFollowing(username);
                        updateFollowButton(followButton, currentStatus);
                    }
                });
            } catch (error) {
                console.error('Error checking follow status:', error);
                followButton.style.display = 'none';
            }
        }

        const userPosts = await fetchUserPostsByName(username);
        displayUserPosts(userPosts);
    }
}

function updateFollowButton(button, isFollowing) {
    button.disabled = false;
    if (isFollowing) {
        button.textContent = 'Following';
        button.classList.add('following');
    } else {
        button.textContent = 'Follow';
        button.classList.remove('following');
    }
}