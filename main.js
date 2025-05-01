
import { JWT_TOKEN } from '/fed2-js2-ca-vicbro00/src/js/api/constants.js';
import { fetchProfileByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { displayUserPosts } from '/fed2-js2-ca-vicbro00/src/js/router/views/profile.js';
import { fetchUserPostsByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { followUser, checkIfFollowing, unfollowUser } from '/fed2-js2-ca-vicbro00/src/js/api/profile/follow.js';
import { initSideMenu } from '/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js';
import { fetchAndDisplayPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display.js';
import { setupProfileSearch } from '/fed2-js2-ca-vicbro00/src/js/router/views/profileSearch.js';
import { initEditPostPage } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/update.js';
import { initPostSearch } from '/fed2-js2-ca-vicbro00/src/js/ui/post/search.js';
import { filterPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/filter.js';
import { displayPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display.js';
import { initPostCreateView } from '/fed2-js2-ca-vicbro00/src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from '/fed2-js2-ca-vicbro00/src/js/api/post/display.js';
import { fetchPostById, displayPost } from '/fed2-js2-ca-vicbro00/src/js/router/views/post.js';
import { initAuthLoginForm } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/login.js';
import { initRegisterForm } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/register.js';
import { createPostHTML } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display';

// Fetches individual post
createPostHTML();

initSideMenu();

if (window.location.pathname.endsWith('/feed.html')) {
    fetchAndDisplayPosts();
}

// Initialize side menu and forms
initAuthLoginForm();
initRegisterForm();
setupProfileSearch();

if (window.location.pathname.includes('/post/edit/')) {
    initEditPostPage();
}

// Fetch and display posts
const posts = await fetchPostsWithAuthors();
displayPosts(posts);
initPostSearch(posts);
filterPosts(posts);

// Initialize post creation view
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (window.location.pathname.includes('/individual-post/')) {
    const postId = urlParams.get('id');
    
    if (postId) {
        const post = await fetchPostById(postId);
        displayPost(post);
    } else {
        console.error('No post ID found in URL.');
    }
}

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