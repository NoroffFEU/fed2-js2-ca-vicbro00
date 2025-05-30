// Importing necessary modules and functions
import { sideMenu } from '/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js';
import { setupProfileSearch } from '/fed2-js2-ca-vicbro00/src/js/router/views/profileSearch.js';
import { editPostPage } from '/fed2-js2-ca-vicbro00/src/js/ui/post/update.js';
import { postSearch } from '/fed2-js2-ca-vicbro00/src/js/ui/post/search.js';
import { filterPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/filter.js';
import { displayPosts } from '/fed2-js2-ca-vicbro00/src/js/ui/post/display.js';
import { postCreateView } from '/fed2-js2-ca-vicbro00/src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from '/fed2-js2-ca-vicbro00/src/js/api/post/display.js';
import { authLoginForm } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/login.js';
import { registerPage } from '/fed2-js2-ca-vicbro00/src/js/ui/auth/register.js';
import { fetchProfileByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { displayUserPosts } from '/fed2-js2-ca-vicbro00/src/js/router/views/profile.js';
import { fetchUserPostsByName } from '/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js';
import { checkIfFollowing, followUser, unfollowUser } from '/fed2-js2-ca-vicbro00/src/js/api/profile/follow.js';
import { JWT_TOKEN } from '/fed2-js2-ca-vicbro00/src/js/api/constants.js';

// Main function to link everything together
export async function loadFeedPage() {
    const posts = await fetchPostsWithAuthors();

    displayPosts(posts);

    // Makes the user search or filter posts
    postSearch(posts);
    filterPosts(posts);
}

// Only execute the function if on the feed page
if (window.location.pathname.includes('post/feed')) {
    loadFeedPage();
}

sideMenu();

// Shows the side menu and forms
authLoginForm();
registerPage();
setupProfileSearch();

if (window.location.pathname.includes('/post/edit/')) {
    editPostPage();
}

// Views the creation for posts
postCreateView();

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